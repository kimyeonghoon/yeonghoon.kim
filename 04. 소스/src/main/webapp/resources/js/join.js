/**
 * join js 파일
 */

// 회원가입 버튼 클릭 이벤트
$("#joinBtn").on("click", function() {
	if($("#emailInput").val() == '' || $("#emailInput").val() == null) {
		$("[name='popupCheck']").val("0");
		modalPopup();
	} else if($("#passwordInput").val() == '' || $("#passwordInput").val() == null) {
		$("[name='popupCheck']").val("1");
		modalPopup();
	} else if($("#passwordCheckInput").val() == '' || $("#passwordCheckInput").val() == null) {
		$("[name='popupCheck']").val("2");
		modalPopup();
	} else if($("#passwordInput").val() != $("#passwordCheckInput").val()) {
		$("[name='popupCheck']").val("3");
		modalPopup();
	} else if($("#nicknameInput").val() == '' || $("#nicknameInput").val() == null) {
		$("[name='popupCheck']").val("4");
		modalPopup();
	} else if($("#addressInput").val() == '' || $("#addressInput").val() == null) {
		$("[name='popupCheck']").val("5");
		modalPopup();
	} else if($("#detailAddressInput").val() == '' || $("#detailAddressInput").val() == null) {
		$("[name='popupCheck']").val("6");
		modalPopup();
	} else if($("input:radio[name=gender]").is(":checked") == false) {
		$("[name='popupCheck']").val("7");
		modalPopup();
	} else if($("#telFirstNo").val() == '' || $("#telFirstNo").val() == null || $("#telFirstNo").val() == 'notSelected') {
		$("[name='popupCheck']").val("8");
		modalPopup();
	} else if($("#telNo").val() == '' || $("#telNo").val() == null || $("#telNo").val() == 'notSelected') {
		$("[name='popupCheck']").val("9");
		modalPopup();
	} else {
		$("#joinCheck").attr("joinCheckAjax");
		alert("회원가입 체크 아작스");
	}
});


// 팝업창 생성
function modalPopup() {
	// 기존 모달 삭제
	$("#notifyModal").remove();
	var html = "";
	html += "<div class=\"modal fade\" id=\"notifyModal\">";
	html += "<div class=\"modal-dialog modal-sm p-3 \">";
	html += "<div class=\"modal-content\">";
	html += "<div class=\"modal-header\">";
	html += "<h4 class=\"modal-title\">알림</h4>";
	html += "</div>";
	html += "<div class=\"modal-body\">";
	switch ($("[name='popupCheck']").val()) {
		case "0": html += "이메일을 입력해주세요.";
				  break;
		case "1": html += "비밀번호를 입력해주세요.";
				  break;
		case "2": html += "비밀번호확인을 입력해주세요.";
				  break;
		case "3": html += "비밀번호가 일치하지 않습니다.";
				  break;
		case "4": html += "닉네임을 입력해주세요.";
				  break;
		case "5": html += "주소를 검색해주세요.";
				  break;
		case "6": html += "상세주소를 입력해주세요.";
				  break;
		case "7": html += "성별을 선택해주세요.";
				  break;
		case "8": html += "전화번호 앞자리를 선택해주세요.";
				  break;
		case "9": html += "전화번호 뒷자리를 입력해주세요.";
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

// 다음 주소 API
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


