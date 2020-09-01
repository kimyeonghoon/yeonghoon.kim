/**
 * profile 페이지 로딩 시 실행 script 정의
 */

// 프로파일 초기화
function init_profile() {
	// 이미지 변수화
	var businessCard1 = "<img src='../image/giftm.jpg' width='100%' />";
	var businessCard2 = "<img src='../image/smileserv.jpg' width='100%' />";
	var dongauniv = "<img src='../image/dongauniv.jpg' width='100%' />";
	var gdi = "<img src='../image/gdi.jpg' width='100%' />";
	var itwillbs = "<img src='../image/itwillbs.jpg' width='100%' />";
	var eip = "<img src='../image/eip.jpg' width='100%' />";
	var csisdl2 = "<img src='../image/csisdl2.jpg' width='100%' />";
	var ieoa = "<img src='../image/ieoa.jpg' width='100%' />";
	var pc1 = "<img src='../image/pc1.jpg' width='100%' />";

	// 팝오버 정의
	$("#businessCard1").popover({
		content: businessCard1, html: true
	});
	$("#businessCard2").popover({
		content: businessCard2, html: true
	});
	$("#dongauniv").popover({
		content: dongauniv, html: true
	});
	$("#gdi").popover({
		content: gdi, html: true
	});
	$("#itwillbs").popover({
		content: itwillbs, html: true
	});
	$("#eip").popover({
		content: eip, html: true
	});
	$("#csisdl2").popover({
		content: csisdl2, html: true
	});
	$("#ieoa").popover({
		content: ieoa, html: true
	});
	$("#pc1").popover({
		content: pc1, html: true
	});
	
	
	redrawBriefHistory();
}


// 팝업창 생성
function modalPopup(id) {
	// 배열에 팝업 허용 값 추가(나중에 서버단으로 해당 기능 넘길 예정)
	var arrPopupList = new Array("1-1","1-2","2-1","2-2","2-3","3-1","3-2","3-3","3-4","3-5","3-6","4-1","4-2","4-3","5-1","5-2","5-3","6-1","6-2","6-3");
	var popupCheck = true;
	
	for(var i = 0; i < arrPopupList.length; i++) {
		if(id == arrPopupList[i]) {
			popupCheck = false;
		}
	}
	
	if(id == null || popupCheck) {
		return false;
	}
	
	// 기존 모달 삭제
	$("#notifyModal").remove();
	var html = "";
	html += "<div class=\"modal fade\" id=\"notifyModal\">";
	html += "<div class=\"modal-dialog p-3 \">";
	html += "<div class=\"modal-content\">";
	html += "<div class=\"modal-header\">";
	html += "<h4 class=\"modal-title\">";
	switch (id) {
		case "1-2" : html += "약력 수정";
				    break;
		case "2-1" : html += "학력 추가";
					 break;
		case "2-2" : html += "학력 수정";
					 break;
		case "2-3" : html += "학력 삭제";
					 break;
		case "3-1" : html += "회사 추가";
					 break;
		case "3-2" : html += "회사 수정";
					 break;
		case "3-3" : html += "회사 삭제";
					 break;
		case "3-4" : html += "경력 추가";
					 break;
		case "3-5" : html += "경력 수정";
					 break;
		case "3-6" : html += "경력 삭제";
					 break;
		case "4-1" : html += "스킬 추가";
					 break;
		case "4-3" : html += "스킬 삭제";
					 break;
		case "5-1" : html += "교육 추가";
					 break;
		case "5-2" : html += "교육 수정";
					 break;
		case "5-3" : html += "교육 삭제";
					 break;
		case "6-1" : html += "자격증 추가";
					 break;
		case "6-2" : html += "자격증 수정";
					 break;
		case "6-3" : html += "자격증 삭제";
					 break;
		case "x" : html += "알림";
					 break;
	}
	html += "</h4>";
	html += "</div>";
	html += "<form action=\"#\" method=\"post\" id=\"actionForm\">"
	html += "<div class=\"modal-body\">";
	switch (id) {
		case "1-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"1-2\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">이름</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">생년</span></div><input type=\"number\" class=\"form-control\" id=\"yearInput\" name=\"yearInput\" maxlength=\"4\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">주소</span></div><input type=\"text\" class=\"form-control\" id=\"addressInput\" name=\"addressInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학력</span></div><input type=\"text\" class=\"form-control\" id=\"educationInput\" name=\"educationInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력</span></div><input type=\"text\" class=\"form-control\" id=\"careerInput\" name=\"careerInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격</span></div><input type=\"text\" class=\"form-control\" id=\"certificateInput\" name=\"certificateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">사진</span></div><input type=\"file\" class=\"form-control\" id=\"imageInput\" name=\"imageInput\"></div>";
				  break;
		case "2-1": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학교명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학과명</span></div><input type=\"text\" class=\"form-control\" id=\"departmentInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" id=\"status\"><option value=\"0\">졸업</option><option value=\"1\">수료</option><option value=\"2\">자퇴</option><option value=\"3\">퇴학</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입학년월</span></div><input type=\"text\" class=\"form-control\" id=\"admissionInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">졸업년월</span></div><input type=\"text\" class=\"form-control\" id=\"graduatedInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">기타사항</span></div><input type=\"text\" class=\"form-control\" id=\"etcInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\"></div>";
					break;
		case "2-2": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학교명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학과명</span></div><input type=\"text\" class=\"form-control\" id=\"departmentInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" id=\"status\"><option value=\"0\">졸업</option><option value=\"1\">수료</option><option value=\"2\">자퇴</option><option value=\"3\">퇴학</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입학년월</span></div><input type=\"text\" class=\"form-control\" id=\"admissionInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">졸업년월</span></div><input type=\"text\" class=\"form-control\" id=\"graduatedInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">기타사항</span></div><input type=\"text\" class=\"form-control\" id=\"etcInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\"></div>";
					break;
		case "2-3": html += "학력을 삭제하시겠습니까?";
					break;
		case "3-1": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입사년월</span></div><input type=\"text\" class=\"form-control\" id=\"joinInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">퇴사년월</span></div><input type=\"text\" class=\"form-control\" id=\"leaveInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\"></div>";
					break;
		case "3-2": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입사년월</span></div><input type=\"text\" class=\"form-control\" id=\"joinInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">퇴사년월</span></div><input type=\"text\" class=\"form-control\" id=\"leaveInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\"></div>";
					break;
		case "3-3": html += "회사를 삭제하시겠습니까?";
					break;
		case "3-4": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><select class=\"form-control\" id=\"companyName\"><option value=\"0\">회사 선택</option><option value=\"1\">기프트엠</option><option value=\"2\">스마일서브</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">주요업무</span></div><input type=\"text\" class=\"form-control\" id=\"taskInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력기술</span></div><textarea class=\"form-control\" id=\"careerInput\"></textarea></div>";
					break;
		case "3-5": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><select class=\"form-control\" id=\"companyName\"><option value=\"0\">회사 선택</option><option value=\"1\">기프트엠</option><option value=\"2\">스마일서브</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">주요업무</span></div><input type=\"text\" class=\"form-control\" id=\"taskInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력기술</span></div><textarea class=\"form-control\" id=\"careerInput\"></textarea></div>";
					break;
		case "3-6": html += "경력을 삭제하시겠습니까?";
					break;
		case "4-1": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">카테고리</span></div><select class=\"form-control\" id=\"categoryName\"><option value=\"0\">카테고리 선택</option><option value=\"1\">언어</option><option value=\"2\">프레임워크</option><option value=\"3\">라이브러리</option><option value=\"4\">데이터베이스</option><option value=\"5\">서버</option><option value=\"6\">형상관리</option><option value=\"7\">API</option><option value=\"8\">그외 사용도구</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">스킬명</span></div><input type=\"text\" class=\"form-control\" id=\"skillNameInput\"></div>";
					break;
		case "4-3": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">카테고리</span></div><select class=\"form-control\" id=\"categoryName\"><option value=\"0\">카테고리 선택</option><option value=\"1\">언어</option><option value=\"2\">프레임워크</option><option value=\"3\">라이브러리</option><option value=\"4\">데이터베이스</option><option value=\"5\">서버</option><option value=\"6\">형상관리</option><option value=\"7\">API</option><option value=\"8\">그외 사용도구</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">스킬명</span></div><select class=\"form-control\" id=\"skillName\"><option value=\"0\">스킬 선택</option><option value=\"1\">Java</option><option value=\"2\">Javascript</option><option value=\"3\">html</option><option value=\"4\">CSS</option></select></div>";
					break;
		case "5-1": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학원명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">시작년월</span></div><input type=\"text\" class=\"form-control\" id=\"startInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">종료년월</span></div><input type=\"text\" class=\"form-control\" id=\"endInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" id=\"status\"><option value=\"0\">상태 선택</option><option value=\"1\">수료</option><option value=\"2\">미수료</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육과정</span></div><input type=\"text\" class=\"form-control\" id=\"curriculumInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육내용</span></div><textarea class=\"form-control\" id=\"contentInput\"></textarea></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\"></div>";
					break;
		case "5-2": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학원명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">시작년월</span></div><input type=\"text\" class=\"form-control\" id=\"startInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">종료년월</span></div><input type=\"text\" class=\"form-control\" id=\"endInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" id=\"status\"><option value=\"0\">상태 선택</option><option value=\"1\">수료</option><option value=\"2\">미수료</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육과정</span></div><input type=\"text\" class=\"form-control\" id=\"curriculumInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육내용</span></div><textarea class=\"form-control\" id=\"contentInput\"></textarea></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\"></div>";
					break;
		case "5-3": html += "교육을 삭제하시겠습니까?";
					break;
		case "6-1": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격증</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급기관</span></div><input type=\"text\" class=\"form-control\" id=\"certAutorityInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">합격여부</span></div><select class=\"form-control\" id=\"status\"><option value=\"0\">합격여부</option><option value=\"1\">합격</option><option value=\"2\">불합격</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급일자</span></div><input type=\"text\" class=\"form-control\" id=\"dateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\"></div>";
					break;
		case "6-2": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격증</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급기관</span></div><input type=\"text\" class=\"form-control\" id=\"certAutorityInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">합격여부</span></div><select class=\"form-control\" id=\"status\"><option value=\"0\">합격여부</option><option value=\"1\">합격</option><option value=\"2\">불합격</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급일자</span></div><input type=\"text\" class=\"form-control\" id=\"dateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\"></div>";
					break;
		case "6-3": html += "자격증을 삭제하시겠습니까?";
					break;
		case "x": html += "에러가 발생하였습니다.";
					break;
	}
	html += "</div>";
	html += "</form>";
	html += "<div class=\"modal-footer\">";
	switch (id) {
		case "2-1":
		case "3-1":
		case "3-4":
		case "4-1":
		case "5-1":
		case "6-1": html += "<button type=\"button\" class=\"btn btn-danger\ id=\"addBtn\">등록</button>";
					break;
		case "1-2":
		case "2-2":
		case "3-2": 
		case "3-5":
		case "5-2":
		case "6-2": html += "<button type=\"button\" class=\"btn btn-danger\" id=\"modBtn\" onclick=\"modSelect();\" >수정</button>"; 
					break;
		case "2-3":
		case "3-3":
		case "3-6":
		case "4-3":
		case "5-3":
		case "6-3": html += "<button type=\"button\" class=\"btn btn-danger\" id=\"delBtn\">삭제</button>";
					break;
	}
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">닫기</button>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	$("#contentsArea").prepend(html);
	$("#notifyModal").modal("show");
}

function getBriefHistory() {
	var params = "1";
	$.ajax({
		type : "post",			  
		url : "getBriefHistoryAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#nameInput").val(res.list.nameInput);
				$("#yearInput").val(res.list.yearInput);
				if(res.list.gender) {
					$("#gender").val("0");
				} else {
					$("#gender").val("1");
				}
				$("#addressInput").val(res.list.addressInput);
				$("#educationInput").val(res.list.educationInput);
				$("#careerInput").val(res.list.careerInput);
				$("#certificateInput").val(res.list.certificateInput);
				$("#imageInput").val(res.list.imageInput);
			} else if(res.result == "fail"){
				modalPopup("x");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}


function briefHistoryModify() {
	$("#actionForm").attr("action", "briefHistoryModifyAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "briefHistoryModifyAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawBriefHistory();
			} else {
				modalPopup("x");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}

//약력 그리기
function redrawBriefHistory() {
	$.ajax({
		type : "post",			  
		url : "briefHistoryAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<div class=\"d-flex justify-content-center\">";
				html += "<div id=\"briefHistoryModifyBtn\" class=\"btn btn-secondary\">약력수정</div>";
				html += "<img src=\"../image/img_avatar1.png\" style=\"width: 150px; height: 180px;\">";
				html += "</div><p class=\"text-center font-weight-bold pt-3\">";
				html += res.briefHistory.nameInput + "(" + res.briefHistory.yearInput + "년생, 34세)</p>";
				html += "<table class=\"table table-borderless table-sm d-flex justify-content-center\">";
				html += "<colgroup><col width=\"25%\"><col width=\"*\"></colgroup>";
				html += "<tbody><tr><td class=\"font-weight-bold\">주소</td>";
				html += "<td>" + res.briefHistory.addressInput + "</td></tr><tr><td class=\"font-weight-bold\">학력</td>";
				html += "<td>" + res.briefHistory.educationInput + "</td></tr><tr><td class=\"font-weight-bold\">경력</td>";
				html += "<td>" + res.briefHistory.careerInput + "</td></tr><tr><td class=\"font-weight-bold\">자격증</td>";
				html += "<td>" + res.briefHistory.certificateInput + "</td></tr></tbody></table>";
				$("#briefHistory").html(html);
				
				// 약력 수정버튼 클릭(팝업)
				$("#briefHistoryModifyBtn").on("click", function(){
					modalPopup("1-2");
					getBriefHistory();
				});
			} else {
				modalPopup("x");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}

// 수정버튼 클릭 시 동작
function modSelect() {
	switch ($("#modSelect").val()) {
	case "1-2": briefHistoryModify();
		break;
	case "2-2": alert("학력 수정");
		break;
	case "3-2": alert("회사 수정");
		break;
	case "3-5": alert("경력 수정");
		break;
	case "5-2": alert("교육 수정");
		break;
	case "6-2": alert("자격증 수정");
		break;
	}
}
