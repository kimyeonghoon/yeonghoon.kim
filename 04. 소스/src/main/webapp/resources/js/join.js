/**
 * join js 파일
 */


/**
 * 회원가입 유효성 체크
 */
function validateCheck() {
	// 이메일 형식 체크를 위해 함수를 변수로 담음
	var inputEmailcheck = emailCheck();
	// 이메일 비어있는지 확인
	if($("#emailInput").val() == '' || $("#emailInput").val() == null) {
		joinModalPopup(0);
	// 이메일 형식 확인
	} else if(!inputEmailcheck) {
		joinModalPopup(1);
	// 패스워드 항목 비어있는지 확인
	} else if($("#passwordInput").val() == '' || $("#passwordInput").val() == null) {
		joinModalPopup(2);
	// 패스워드 확인 항목 비어있는지 확인
	} else if($("#passwordCheckInput").val() == '' || $("#passwordCheckInput").val() == null) {
		joinModalPopup(3);
	// 패스워드 항목 비어있는지 확인
	} else if($("#passwordInput").val() != $("#passwordCheckInput").val()) {
		joinModalPopup(4);
	// 이름 비어있는지 확인
	} else if($("#nameInput").val() == '' || $("#nameInput").val() == null) {
		joinModalPopup(5);
	// 주소 비어있는지 확인
	} else if($("#addressInput").val() == '' || $("#addressInput").val() == null) {
		joinModalPopup(6);
	// 상세주소 비어있는지 확인
	} else if($("#detailAddressInput").val() == '' || $("#detailAddressInput").val() == null) {
		joinModalPopup(7);
	// 성별 체크했는지 확인
	} else if($("input:radio[name=gender]").is(":checked") == false) {
		joinModalPopup(8);
	// 기지국 선택 확인
	} else if($("#telFirstNo").val() == '' || $("#telFirstNo").val() == null || $("#telFirstNo").val() == 'notSelected') {
		joinModalPopup(9);
	// 전화번호가 비어있는지 확인
	} else if($("#telNo").val() == '' || $("#telNo").val() == null || $("#telNo").val() == 'notSelected') {
		joinModalPopup(10);
	// 기지국을 제외한 전화번호 자리수 체크
	} else if($("#telNo").val().length < 7) {
		joinModalPopup(11);
	} else {
		// 주소 disabled 속성 제거
		$("#addressInput").removeAttr("disabled");
		$("#joinCheck").attr("action", "addUser");
		addUser();
	}
}


/**
 * 회원가입 팝업창 생성
 */
function joinModalPopup(no) {
	// 기존 모달 삭제
	$("#notifyModal").remove();
	var html = "";
	html += "<div class=\"modal fade\" id=\"notifyModal\">";
	html += "<div class=\"modal-dialog p-3 \">";
	html += "<div class=\"modal-content\">";
	html += "<div class=\"modal-header\">";
	html += "<h4 class=\"modal-title\">알림</h4>";
	html += "</div>";
	html += "<div class=\"modal-body\">";
	// 팝업창 생성(상황에 따라 표출되는 내용 다름)
	switch(no) {
		case 0 : html += "이메일을 입력해주세요.";
				  break;
		case 1 : html += "이메일 형식이 올바르지 않습니다.";
			   	  break;
		case 2 : html += "비밀번호를 입력해주세요.";
				  break;
		case 3 : html += "비밀번호확인을 입력해주세요.";
				  break;
		case 4 : html += "비밀번호가 일치하지 않습니다.";
				  break;
		case 5 : html += "이름을 입력해주세요.";
				  break;
		case 6 : html += "주소를 검색해주세요.";
				  break;
		case 7 : html += "상세주소를 입력해주세요.";
				  break;
		case 8 : html += "성별을 선택해주세요.";
				  break;
		case 9 : html += "전화번호 앞자리를 선택해주세요.";
				  break;
		case 10: html += "전화번호 뒷자리를 입력해주세요.";
				  break;
		case 11: html += "전화번호를 정확히 입력해주세요.";
				  break;
		case 97 : html += "기지국 번호를 받아올 수 없습니다. 관리자에게 문의하세요.";
				  break;
		case 98 : html += "회원가입이 완료되었습니다.";
				  break;
		case 99 : html += "사용할 수 없는 이메일입니다.";
				  break;
	}
	html += "</div>";
	html += "<div class=\"modal-footer\">";
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">닫기</button>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	$("#contentsArea").prepend(html);
	$("#notifyModal").modal("show");
}


/**
 * 다음 주소 api
 */
function searchAddress() {
	new daum.Postcode({
	    oncomplete: function(data) {
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            $("#addressInput").val(addr);
            if($("#addressInput").val() != null || $("#addressInput").val() != "") {
            	$("#detailAddressInput").removeAttr("disabled");
			}
		$("#addressSearchForm").removeClass("p-4 bg-secondary");
	    },
	    width : '100%'
	}).embed(addressSearchForm);
}


/**
 * 이메일 형식 체크 함수
 */
function emailCheck() {
	var emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	var userInputEmail = $("#emailInput").val();
	if(emailRegExp.test(userInputEmail)) {
		return true;
	} else {
		return false;
	}
}


/**
 * 회원가입 ajax
 */
function addUser() {
	var params = $("#joinCheck").serialize();
	$.ajax({
		type : "post",			  
		url : "addUserAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 성공 시 팝업 표시 -> 닫기 버튼 누르면 profile로 이동
				joinModalPopup(98);
				location.href = "profile";
			} else if(res.result == "duplication"){
				// 이메일이 이미 존재하는 경우
				joinModalPopup(99);
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}

/**
 * 버튼 클릭 이벤트
 */
function joinButtonEvent() {
	// 회원가입 버튼 클릭 이벤트
	$("#joinBtn").on("click", function() {
		validateCheck();
	});
	// 주소 검색 버튼 클릭 이벤트
	$("#searchAddress").on("click", function() {
		$("#addressSearchForm").addClass("p-2 bg-secondary");
		searchAddress();
	});
}
