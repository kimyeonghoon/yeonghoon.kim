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
	}
	html += "</h4>";
	html += "</div>";
	html += "<div class=\"modal-body\">";
	switch (id) {
		case "1-2": html += "<div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">이름</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">생년</span></div><input type=\"text\" class=\"form-control\" id=\"yearInput\" maxlength=\"4\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">성별</span></div><select class=\"form-control\" id=\"gender\"><option value=\"0\">남</option><option value=\"1\">여</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">주소</span></div><input type=\"text\" class=\"form-control\" id=\"addressInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학력</span></div><input type=\"text\" class=\"form-control\" id=\"educationInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력</span></div><input type=\"text\" class=\"form-control\" id=\"careerInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격</span></div><input type=\"text\" class=\"form-control\" id=\"certificateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">사진</span></div><input type=\"file\" class=\"form-control\" id=\"imageInput\"></div>";
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
	}
	html += "</div>";
	html += "<div class=\"modal-footer\">";
	switch (id) {
		case "2-1", "3-1", "3-4", "4-1", "5-1", "6-1": html += "<button type=\"button\" class=\"btn btn-danger\">등록</button>";
										 break;
		case "1-2", "2-2", "3-2", "3-5", "5-2", "6-2": html += "<button type=\"button\" class=\"btn btn-danger\">수정</button>"; 
						   		  		 break;
		case "2-3", "3-3", "3-6", "4-3", "5-3", "6-3": html += "<button type=\"button\" class=\"btn btn-danger\">삭제</button>";
										 break;
	}
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">취소</button>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	$("#contentsArea").prepend(html);
	$("#notifyModal").modal("show");
}