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
	
	$("#educationAddBtn").on("click", function(){
		modalPopup("2-1");
	});
	// 회사 추가버튼 동작
	$("#companyAddBtn").on("click", function(){
		modalPopup("3-1");
	});
	// 경력 추가버튼 동작
	$("#careerAddBtn").on("click", function(){
		modalPopup("3-4");
	});
	// 보유기술 추가버튼 동작
	$("#skillAddBtn").on("click", function(){
		modalPopup("4-1");
	});
	// 보유기술 삭제버튼 동작
	$("#skillDelBtn").on("click", function(){
		modalPopup("4-3");
	});
	// 교육 추가버튼 동작
	$("#academyAddBtn").on("click", function(){
		modalPopup("5-1");
	});
	// 자격증 등록버튼 동작
	$("#certificationAddBtn").on("click", function(){
		modalPopup("6-1");
	});
	
	redrawBriefHistory();
	redrawTech();
	redrawEducation();
	redrawCareer();
	redrawAcademy();
	redrawCertificate();
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
		case "2-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"2-1\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학교명</span></div><input type=\"text\" class=\"form-control\" name=\"nameInput\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학과명</span></div><input type=\"text\" class=\"form-control\" name=\"departmentInput\" id=\"departmentInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" name=\"status\" id=\"status\"><option value=\"0\">상태 선택</option><option value=\"1\">졸업</option><option value=\"2\">수료</option><option value=\"3\">재적</option><option value=\"4\">퇴학</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입학년월</span></div><input type=\"text\" class=\"form-control\" name=\"admissionInput\" id=\"admissionInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">졸업년월</span></div><input type=\"text\" class=\"form-control\" name=\"graduatedInput\" id=\"graduatedInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">기타사항</span></div><input type=\"text\" class=\"form-control\" name=\"etcInput\" id=\"etcInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" name=\"certificateInput\" id=\"certificateInput\"></div>";
				  break;
		case "2-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"2-2\" /><input type=\"hidden\" id=\"educationNo\" name=\"educationNo\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학교명</span></div><input type=\"text\" class=\"form-control\" name=\"nameInput\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학과명</span></div><input type=\"text\" class=\"form-control\" name=\"departmentInput\" id=\"departmentInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" name=\"status\" id=\"status\"><option value=\"0\">상태 선택</option><option value=\"1\">졸업</option><option value=\"2\">수료</option><option value=\"3\">재적</option><option value=\"4\">퇴학</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입학년월</span></div><input type=\"text\" class=\"form-control\" name=\"admissionInput\" id=\"admissionInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">졸업년월</span></div><input type=\"text\" class=\"form-control\" name=\"graduatedInput\" id=\"graduatedInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">기타사항</span></div><input type=\"text\" class=\"form-control\" name=\"etcInput\" id=\"etcInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" name=\"certificateInput\" id=\"certificateInput\"></div>";
					break;
		case "2-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"2-3\" /><input type=\"hidden\" id=\"educationNo\" name=\"educationNo\" />학력을 삭제하시겠습니까?";
					break;
		case "3-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"3-1\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><input type=\"text\" class=\"form-control\" name=\"nameInput\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입사년월</span></div><input type=\"text\" class=\"form-control\" name=\"joinInput\" id=\"joinInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">퇴사년월</span></div><input type=\"text\" class=\"form-control\" name=\"leaveInput\" id=\"leaveInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" name=\"certificateInput\" id=\"certificateInput\"></div>";
					break;
		case "3-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"3-2\" /><input type=\"hidden\" id=\"companyNo\" name=\"companyNo\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><input type=\"text\" class=\"form-control\" name=\"nameInput\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입사년월</span></div><input type=\"text\" class=\"form-control\" name=\"joinInput\" id=\"joinInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">퇴사년월</span></div><input type=\"text\" class=\"form-control\" name=\"leaveInput\" id=\"leaveInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" name=\"certificateInput\" id=\"certificateInput\"></div>";
					break;
		case "3-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"3-3\" /><input type=\"hidden\" id=\"companyNo\" name=\"companyNo\" />회사를 삭제하시겠습니까?";
					break;
		case "3-4": html += "<input type=\"hidden\" id=\"addSelect\" value=\"3-4\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><select class=\"form-control\" name=\"companyName\" id=\"companyName\"><option value=\"0\">회사 선택</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">근무부서</span></div><input type=\"text\" class=\"form-control\" name=\"departmentInput\" id=\"departmentInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">주요업무</span></div><input type=\"text\" class=\"form-control\" name=\"taskInput\" id=\"taskInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력기술</span></div><textarea class=\"form-control\" name=\"careerInput\" id=\"careerInput\"></textarea></div>";
					break;
		case "3-5": html += "<input type=\"hidden\" id=\"modSelect\" value=\"3-5\" /><input type=\"hidden\" id=\"careerNo\" name=\"careerNo\" /><div class=\"input-group\"><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">근무부서</span></div><input type=\"text\" class=\"form-control\" name=\"departmentInput\" id=\"departmentInput\"></div><div class=\"input-group-prepend\"><span class=\"input-group-text\">주요업무</span></div><input type=\"text\" class=\"form-control\" name=\"taskInput\" id=\"taskInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력기술</span></div><textarea class=\"form-control\" name=\"careerInput\" id=\"careerInput\"></textarea></div>";
					break;
		case "3-6": html += "<input type=\"hidden\" id=\"delSelect\" value=\"3-6\" /><input type=\"hidden\" id=\"careerNo\" name=\"careerNo\" />경력을 삭제하시겠습니까?";
					break;
		case "4-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"4-1\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">카테고리</span></div><select class=\"form-control\" name=\"categoryName\"id=\"categoryName\"><option value=\"0\">카테고리 선택</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">스킬명</span></div><input type=\"text\" class=\"form-control\" name=\"skillNameInput\" id=\"skillNameInput\"></div>";
					break;
		case "4-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"4-3\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">카테고리</span></div><select class=\"form-control\" name=\"categoryName\" id=\"categoryName\" onchange=\"techList()\"><option value=\"0\">카테고리 선택</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">스킬명</span></div><select class=\"form-control\" id=\"skillName\" name=\"skillName\" disabled=\"disabled\"><option value=\"0\">스킬 선택</option></select></div>";
					break;
		case "5-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"5-1\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학원명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">시작년월</span></div><input type=\"text\" class=\"form-control\" id=\"startInput\" name=\"startInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">종료년월</span></div><input type=\"text\" class=\"form-control\" id=\"endInput\" name=\"endInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" id=\"status\" name=\"status\"><option value=\"-1\">상태 선택</option><option value=\"1\">수료</option><option value=\"0\">미수료</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육과정</span></div><input type=\"text\" class=\"form-control\" id=\"curriculumInput\" name=\"curriculumInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육내용</span></div><textarea class=\"form-control\" name=\"contentInput\" id=\"contentInput\"></textarea></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\" name=\"certificateInput\"></div>";
					break;
		case "5-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"5-2\" /><input type=\"hidden\" id=\"academyNo\" name=\"academyNo\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학원명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">시작년월</span></div><input type=\"text\" class=\"form-control\" id=\"startInput\" name=\"startInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">종료년월</span></div><input type=\"text\" class=\"form-control\" id=\"endInput\" name=\"endInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" id=\"status\" name=\"status\"><option value=\"-1\">상태 선택</option><option value=\"1\">수료</option><option value=\"0\">미수료</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육과정</span></div><input type=\"text\" class=\"form-control\" name=\"curriculumInput\" id=\"curriculumInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육내용</span></div><textarea class=\"form-control\" id=\"contentInput\" name=\"contentInput\"></textarea></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\" name=\"certificateInput\"></div>";
					break;
		case "5-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"5-3\" /><input type=\"hidden\" id=\"academyNo\" name=\"academyNo\" />교육을 삭제하시겠습니까?";
					break;
		case "6-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"6-1\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격증</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급기관</span></div><input type=\"text\" class=\"form-control\" id=\"certAutorityInput\" name=\"certAutorityInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">합격여부</span></div><select class=\"form-control\" id=\"status\" name=\"status\"><option value=\"-1\">합격여부</option><option value=\"1\">합격</option><option value=\"0\">불합격</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급일자</span></div><input type=\"text\" class=\"form-control\" id=\"dateInput\" name=\"dateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\" name=\"certificateInput\"></div>";
					break;
		case "6-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"6-2\" /><input type=\"hidden\" id=\"certificateNo\" name=\"certificateNo\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격증</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급기관</span></div><input type=\"text\" class=\"form-control\" id=\"certAutorityInput\" name=\"certAutorityInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">합격여부</span></div><select class=\"form-control\" id=\"status\" name=\"status\"><option value=\"-1\">합격여부</option><option value=\"1\">합격</option><option value=\"0\">불합격</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급일자</span></div><input type=\"text\" class=\"form-control\" id=\"dateInput\" name=\"dateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control\" id=\"certificateInput\" name=\"certificateInput\"></div>";
					break;
		case "6-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"6-3\" /><input type=\"hidden\" id=\"certificateNo\" name=\"certificateNo\" />자격증을 삭제하시겠습니까?";
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
		case "6-1": html += "<button type=\"button\" class=\"btn btn-danger\ id=\"addBtn\" onclick=\"addSelect();\">등록</button>";
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
		case "6-3": html += "<button type=\"button\" class=\"btn btn-danger\" id=\"delBtn\" onclick=\"delSelect();\">삭제</button>";
					break;
	}
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">닫기</button>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	
	
	$("#contentsArea").prepend(html);
	$("#notifyModal").modal("show");
	
	$("#admissionInput, #graduatedInput, #joinInput, #leaveInput, #startInput, #endInput, #dateInput").datepicker({
		dateFormat: 'yy-mm-dd', changeMonth: true, changeYear: true, yearRange: '2000:2020',
		monthNames: ["1","2","3","4","5","6","7","8","9","10","11","12"],
		monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
		dayNamesMin: ["일","월","화","수","목","금","토"] 
	});
	$(".hasDatepicker").css("z-index", 1300);
	
	if(id == "2-2") {
		educationOneView();
	}
	
	if(id == "3-2") {
		companyOneView();
	}
	
	if(id == "4-1" || id == "4-3") {
		techCategoryList();
	}
	
	if(id == "3-4") {
		companyList();
	}
	if(id == "3-5") {
		companyList(id);
		careerOneView();
	}
	if(id == "5-2") {
		academyOneView();
	}
	if(id == "6-2") {
		certificateOneView();
	}
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
				if(res.modBtn != undefined) {
					html += res.modBtn;
				}
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

// 보유기술 그리기
function redrawTech() {
	$.ajax({
		type : "post",			  
		url : "redrawTechAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<div class=\"card\">";
				html += "<table class=\"card-body table table-sm table-borderless bg-light m-0\">";
				html += "<colgroup><col width=\"40%\"></col><col width=\"*\"></col></colgroup><tbody>";
				
				for(var i in res.getTechCategory) {
					html += "<tr class=\"border border-top-0 border-left-0 border-right-0\"><td>";
					html += "<h6>";
					html += res.getTechCategory[i].tech_category_name;
					html += "</h6></td>";
					html += "<td class=\"text-secondary\">";
					if(i == 0) {
						for(var j in res.tech0) {
							html += res.tech0[j] + "<br/>";
						}
					} else if(i == 1) {
						for(var j in res.tech1) {
							html += res.tech1[j] + "<br/>";
						}
					} else if(i == 2){
						for(var j in res.tech2) {
							html += res.tech2[j] + "<br/>";
						}
					} else if(i == 3){
						for(var j in res.tech3) {
							html += res.tech3[j] + "<br/>";
						}
					} else if(i == 4){
						for(var j in res.tech4) {
							html += res.tech4[j] + "<br/>";
						}
					} else if(i == 5){
						for(var j in res.tech5) {
							html += res.tech5[j] + "<br/>";
						}
					} else if(i == 6){
						for(var j in res.tech6) {
							html += res.tech6[j] + "<br/>";
						}
					} else if(i == 7){
						for(var j in res.tech7) {
							html += res.tech7[j] + "<br/>";
						}
					}
					html += "</td></tr>";
				}
				html += "</tbody></table></div>";
				$("#skillList").html(html);
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

//학력 그리기
function redrawEducation() {
	$.ajax({
		type : "post",			  
		url : "redrawEducationAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<div class=\"card\">";
				html += "<table class=\"card-body table table-sm table-borderless bg-light m-0\">";
				html += "<colgroup><col width=\"40%\"></col><col width=\"*\"></col></colgroup><tbody>";
				for(var i in res.getEducation) {
					html += "<tr data-no=" + res.getEducation[i].education_no + " class=\"border border-top-0 border-left-0 border-right-0\"><td><H6>";
					html += res.getEducation[i].startdate;
					html += " ~ ";
					if(res.getEducation[i].enddate != undefined) {
						html += res.getEducation[i].enddate;
					}
					html += "</H6><span class=\"text-primary\">";
					if(res.getEducation[i].status == "1") {
						html += "졸업";
					} else if(res.getEducation[i].status == "2") {
						html += "수료";
					} else if (res.getEducation[i].status == "3") {
						html += "재학";
					} else if (res.getEducation[i].status == "4") {
						html += "제적";
					}
					html += "</span>";
					if(res.educationModDelBtn != undefined) {
						html += "&nbsp" + res.educationModDelBtn + "";
					}
					html += "</td><td><h6>";
					html += res.getEducation[i].name + " "
					if(res.getEducation[i].department != undefined) {
						html += res.getEducation[i].department;
					}
					html += "</H6><span class=\"text-secondary\">";
					if(res.getEducation[i].etc != null) {
						html += res.getEducation[i].etc;
					}
					html += "</span></td></tr>";
				}
				html += "</tbody></table></div>";
				$("#educationList").html(html);
				
				// 학력 수정버튼 동작
				$(".educationModBtn").on("click", function(){
					$("#pickEdu").val($(this).parent().parent().attr("data-no"));
					modalPopup("2-2");
				});
				// 학력 삭제버튼 동작
				$(".educationDelBtn").on("click", function(){
					$("#pickEdu").val($(this).parent().parent().attr("data-no"));
					modalPopup("2-3");
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

// 스킬 추가
function techAdd() {
	if($("#categoryName").val() == 0 || $("#categoryName").val() == '' || $("#categoryName").val() == null) {
		return false;
	}   
	if($("#skillNameInput").val() == '' || $("#categoryName").val() == null) {
		return false;
	}   
	$("#actionForm").attr("action", "techAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "techAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawTech();
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

// 스킬 삭제
function techDel() {
	if($("#categoryName").val() == 0 || $("#categoryName").val() == '' || $("#categoryName").val() == null) {
		return false;
	}   
	if($("#skillName").val() == '' || $("#skillName").val() == null) {
		return false;
	}   
	$("#actionForm").attr("action", "techDelAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "techDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawTech();
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

// 회사 추가
function companyAdd() {
	$("#actionForm").attr("action", "companyAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "companyAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCareer();
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

//학력 추가
function educationAdd() {
	if($("#nameInput").val() == null || $("#nameInput").val() == '') {
		alert("학교명을 입력해주세요");
	} else if ($("#status").val() == null || $("#status").val() == '' || $("#status").val() == "0") {
		alert("상태를 선택해주세요.");
	} else if ($("#admissionInput").val() == null || $("#admissionInput").val() == '') {
		alert("입학년월을 입력해주세요.");
	} else {
		$("#actionForm").attr("action", "educationAddAjax");
		var params = $("#actionForm").serialize();
		
		$.ajax({
			type : "post",			  
			url : "educationAddAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				if(res.result == "success") {
					$("#notifyModal").modal("hide");
					redrawEducation();
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
}

//학력 수정
function educationMod() {
	$("#educationNo").val($("#pickEdu").val());
	if($("#nameInput").val() == null || $("#nameInput").val() == '') {
		alert("학교명을 입력해주세요");
	} else if ($("#status").val() == null || $("#status").val() == '' || $("#status").val() == "0") {
		alert("상태를 선택해주세요.");
	} else if ($("#admissionInput").val() == null || $("#admissionInput").val() == '') {
		alert("입학년월을 입력해주세요.");
	} else {
		$("#actionForm").attr("action", "educationModAjax");
		var params = $("#actionForm").serialize();
		
		$.ajax({
			type : "post",			  
			url : "educationModAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				if(res.result == "success") {
					$("#notifyModal").modal("hide");
					redrawEducation();
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
}


// 등록버튼 클릭 시 동작
function addSelect() {
	switch ($("#addSelect").val()) {
	case "2-1": educationAdd();
		break;
	case "2-2": alert("학력 수정");
		break;
	case "3-1": companyAdd();
		break;
	case "3-4": careerAdd();
		break;
	case "4-1": techAdd();
		break;
	case "5-1": academyAdd();
		break;
	case "6-1": certificateAdd();
		break;
	}
}

// 수정버튼 클릭 시 동작
function modSelect() {
	switch ($("#modSelect").val()) {
	case "1-2": briefHistoryModify();
		break;
	case "2-2": educationMod();
		break;
	case "3-2": companyMod();
		break;
	case "3-5": careerMod();
		break;
	case "5-2": academyMod();
		break;
	case "6-2": certificateMod();
		break;
	}
}

//삭제버튼 클릭 시 동작
function delSelect() {
	switch ($("#delSelect").val()) {
	case "2-3": educationDel();
		break;
	case "3-3": companyDel();
		break;
	case "3-6": careerDel();
		break;
	case "4-3": techDel();
		break;
	case "5-3": academyDel();
		break;
	case "6-3": certificateDel();
		break;
	}
}


// 기술 카테고리의 내용 조회
function techList() {
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "techListAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<option value=\"0\">스킬 선택</option>";
				if(res.techList.length < 1) { // 해당 카테고리에 기술이 없을 경우
					$("#skillName").attr("disabled", "disabled");
				} else { // 해당 부서에 기술이 있을 경우
					$("#skillName").removeAttr("disabled");
				}
				for(var i = 0; i < res.techList.length; i++) {
					html += "<option value=\"" + res.techList[i].tech_no +"\">" + res.techList[i].tech_name + "</option>";
				}
				// emplyNo 아래에 있는 모든 요소 제거
				$("#skillName *").remove();
				
				$("#skillName").prepend(html);
			} else {
				modalPopup("x");
			}
		},
		error : function(reqsuest, status, error) {
			console.log("text : " + reqsuest.responseTxt);
			console.log("error : " + error);
		}			
	});
}

// 기술 카테고리의 내용 조회
function techCategoryList() {
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "techCategoryListAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<option value=\"0\">카테고리 선택</option>";
				for(var i = 0; i < res.techCategoryList.length; i++) {
					html += "<option value=\"" + res.techCategoryList[i].tech_category_no +"\">" + res.techCategoryList[i].tech_category_name + "</option>";
				}
				$("#categoryName *").remove();
				
				$("#categoryName").prepend(html);
			} else {
				modalPopup("x");
			}
		},
		error : function(reqsuest, status, error) {
			console.log("text : " + reqsuest.responseTxt);
			console.log("error : " + error);
		}			
	});
}


function educationOneView() {
	$("#educationNo").val($("#pickEdu").val());
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "educationOneViewAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#nameInput").val(res.getEducation[0].name);
				$("#departmentInput").val(res.getEducation[0].department);
				$("#status").val(res.getEducation[0].status);
				$("#admissionInput").val(res.getEducation[0].startdate);
				$("#graduatedInput").val(res.getEducation[0].enddate);
				$("#etcInput").val(res.getEducation[0].etc);
				$("#certificateInput").val(res.getEducation[0].upload_path);
			} else {
				modalPopup("x");
			}
		},
		error : function(reqsuest, status, error) {
			console.log("text : " + reqsuest.responseTxt);
			console.log("error : " + error);
		}			
	});
}



function educationDel() {
	$("#educationNo").val($("#pickEdu").val());
	$("#actionForm").attr("action", "educationDelAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "educationDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawEducation();
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


// 경력 그리기
function redrawCareer() {
	$.ajax({
		type : "post",			  
		url : "redrawCareerAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<div class=\"card\">";
				html += "<table class=\"card-body table table-sm table-borderless bg-light m-0\">";
				html += "<colgroup><col width=\"40%\"></col><col width=\"*\"></col></colgroup><tbody>";
				for(var i = 0; i < res.companyList.length; i++) {
					html += "<tr data-no=\"" + res.companyList[i].company_no + "\" class=\"border border-top-0 border-left-0 border-right-0\"><td><H6>";
					html += res.companyList[i].company_name;
					html += "</h6><h6>";
					html += res.companyList[i].startdate;
					html += " ~ ";
					html += res.companyList[i].enddate;
					html += "</h6><span class=\"text-primary\">";
					if(res.companyList[i].cha >= 12) {
						var year = Math.round(res.companyList[i].cha / 12);
						var month = res.companyList[i].cha % 12;
						html += year + "년 " + month + "개월";
					} else {
						html += res.companyList[i].cha + "개월";
					}
					html += "</span>";
					if(res.companyModDelBtn != undefined) {
						html += res.companyModDelBtn;
					}
					html += "</td><td>";
					for(var j = 0; j < res.careerList.length; j++) {
						if(res.companyList[i].company_no == res.careerList[j].company_no) {
							html += "<h6 data-no=\"" + res.careerList[j].career_no + "\">";
							html += res.careerList[j].career_department;
							if(res.careerModDelBtn != undefined) {
								html += res.careerModDelBtn;
							}
							html += "</h6><h6 class=\"text-primary\">";
							html += "주요업무 : " + res.careerList[j].career_responsibility;
							html += "</h6><p class=\"text-secondary\">";
							var description = res.careerList[j].career_description.replace(/(?:\r\n|\r|\n)/g, '<br/>');
							html += description;
							html += "</p>";
						}
					}
					html += "</td></tr>";
				}
				html +=	"</td></tr>";
				html += "</tbody></table></div>";
				$("#careerList").html(html);
				
				// 회사 수정버튼 동작
				$(".companyModBtn").on("click", function(){
					$("#pickCompany").val($(this).parent().parent().attr("data-no"));
					modalPopup("3-2");
				});
				// 회사 삭제버튼 동작
				$(".companyDelBtn").on("click", function(){
					$("#pickCompany").val($(this).parent().parent().attr("data-no"));
					modalPopup("3-3");
				});
				// 경력 수정버튼 동작
				$(".careerModBtn").on("click", function(){
					$("#pickCareer").val($(this).parent().attr("data-no"));
					modalPopup("3-5");
				});
				// 경력 삭제버튼 동작
				$(".careerDelBtn").on("click", function(){
					$("#pickCareer").val($(this).parent().attr("data-no"));
					modalPopup("3-6");
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

// 회사리스트 호출 
function companyList(id) {
	$.ajax({
		type : "post",			  
		url : "companyListAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				if(id != "3-5") {
					html += "<option value=\"0\">회사 선택</option>";
					for(var i = 0; i < res.companyList.length; i++) {
					html += "<option value=\"" + res.companyList[i].company_no +"\">" + res.companyList[i].company_name + "</option>";
					}
				}
					
				$("#companyName *").remove();
				
				$("#companyName").prepend(html);
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

//회사 수정
function companyOneView() {
	$("#companyNo").val($("#pickCompany").val());
	$("#actionForm").attr("action", "companyOneViewAjax");
	var params = $("#actionForm").serialize();
	
	$.ajax({
		type : "post",			  
		url : "companyOneViewAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#nameInput").val(res.companyList[0].company_name);
				$("#joinInput").val(res.companyList[0].startdate);
				$("#leaveInput").val(res.companyList[0].enddate);
				$("#certificateInput").val(res.companyList[0].company_upload_path);
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

//회사 수정
function companyMod() {
	$("#companyNo").val($("#pickCompany").val());
	$("#actionForm").attr("action", "companyModAjax");
	var params = $("#actionForm").serialize();
	
	$.ajax({
		type : "post",			  
		url : "companyModAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCareer();
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

//회사 삭제
function companyDel() {
	$("#companyNo").val($("#pickCompany").val());
	$("#actionForm").attr("action", "companyDelAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "companyDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCareer();
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


// 경력 추가
function careerAdd() {
	$("#actionForm").attr("action", "careerAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "careerAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCareer();
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

// 경력 수정
function careerOneView() {
	$("#careerNo").val($("#pickCareer").val());
	$("#actionForm").attr("action", "careerOneViewAjax");
	var params = $("#actionForm").serialize();
	
	$.ajax({
		type : "post",			  
		url : "careerOneViewAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#taskInput").val(res.careerList[0].career_responsibility);
				$("#departmentInput").val(res.careerList[0].career_department);
				$("#careerInput").val(res.careerList[0].career_description);
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

//경력 수정
function careerMod() {
	$("#careerNo").val($("#pickCareer").val());
	$("#actionForm").attr("action", "careerModAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "careerModAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCareer();
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

//경력 삭제
function careerDel() {
	$("#careerNo").val($("#pickCareer").val());
	$("#actionForm").attr("action", "careerDelAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "careerDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCareer();
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

// 교육 그리기
function redrawAcademy() {
	$.ajax({
		type : "post",			  
		url : "redrawAcademyAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				var academy = res.getAcademy;
				html += "<div class=\"card\"><table class=\"card-body table table-sm table-borderless bg-light m-0\"><colgroup><col width=\"40%\"></col><col width=\"*\"></col></colgroup><tbody>";
				for (var i = 0; i < res.getAcademy.length; i++) {
					html += "<tr class=\"border border-top-0 border-left-0 border-right-0\" data-no=\"" + academy[i].academy_no + "\"><td><h6>";
					html += academy[i].startdate + " ~ " + academy[i].enddate;
					html += "</h6><span class=\"text-primary\">";
					if(academy[i].status == true) {
						html += "수료";
					} else {
						html += "미수료";
					}
					html += "</span>";
					if(res.academyModDelBtn != undefined) {
						html += res.academyModDelBtn;
					}
					html +=	"</td><td><h6>";
					html += academy[i].academy;
					html += "</h6><p class=\"text-primary\">교육과정 : ";
					html += academy[i].course;
					html += "</p><div class=\"text-secondary\">";
					html += academy[i].content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
					html += "</div></td></tr>";
				}
				html += "</tbody></table></div>";
				$("#academyList").html(html);
				
				// 교육 추가버튼 동작
				$(".academyAddBtn").on("click", function(){
					modalPopup("5-1");
				});
				// 교육 삭제버튼 동작
				$(".academyModBtn").on("click", function(){
					$("#pickAcademy").val($(this).parent().parent().attr("data-no"));
					modalPopup("5-2");
				});
				// 교육 삭제버튼 동작
				$(".academyDelBtn").on("click", function(){
					$("#pickAcademy").val($(this).parent().parent().attr("data-no"));
					modalPopup("5-3");
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

//자격증 그리기
function redrawCertificate() {
	$.ajax({
		type : "post",			  
		url : "redrawCertificateAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<div class=\"card\"><table class=\"card-body table table-sm table-borderless bg-light m-0\"><colgroup><col width=\"40%\"></col><col width=\"*\"></col></colgroup><tbody>";
				for(var i = 0; i < res.getCertificate.length; i++) {
					html += "<tr class=\"border border-top-0 border-left-0 border-right-0\" data-no=\"" + res.getCertificate[i].cert_no + "\"><td><h6>";
					html += res.getCertificate[i].cert_date;
					html += "</h6><span class=\"text-primary\">";
					if(res.getCertificate[i].cert_pass == true) {
						html += "합격";
					} else if(res.getCertificate[i].cert_pass == false) {
						html += "불합격";
					}
					if (res.certificateModDelBtn != undefined) {
						html += res.certificateModDelBtn; 
					}
					html += "</td><td><h6>";
					html += res.getCertificate[i].cert_name;
					html += "</h6><div class=\"text-secondary\">";
					html += res.getCertificate[i].cert_organization;
					html += "</div></td></tr>";
				}
				html += "<tr class=\"border border-top-0 border-left-0 border-right-0\"><td colspan=\"2\"><div class=\"text-secondary\">*기타 - 1종보통운전면허, 워드프로세서1급, 전산회계1급, OCA(만료), CCNP(만료)</div></td></tr></tbody></table></div>";
				$("#certificateList").html(html);
				
				// 자격증 추가버튼 동작
				$(".certificateAddBtn").on("click", function(){
					modalPopup("6-1");
				});
				// 자격증 삭제버튼 동작
				$(".certificateModBtn").on("click", function(){
					$("#pickCertificate").val($(this).parent().parent().parent().attr("data-no"));
					modalPopup("6-2");
				});
				// 자격증 삭제버튼 동작
				$(".certificateDelBtn").on("click", function(){
					$("#pickCertificate").val($(this).parent().parent().parent().attr("data-no"));
					modalPopup("6-3");
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

//교육 추가
function academyAdd() {
	$("#actionForm").attr("action", "academyAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "academyAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawAcademy();
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


//자격증 추가
function certificateAdd() {
	$("#actionForm").attr("action", "certificateAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "certificateAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCertificate();
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

//교육 수정전 조회 ajax
function academyOneView() {
	$("#academyNo").val($("#pickAcademy").val());
	$("#actionForm").attr("action", "academyOneViewAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "academyOneViewAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#nameInput").val(res.getAcademy[0].academy);
				$("#startInput").val(res.getAcademy[0].startdate);
				$("#endInput").val(res.getAcademy[0].enddate);
				if(res.getAcademy[0].status == true) {
					$("#status").val("1");
				} else if(res.getAcademy[0].status == false) {
					$("#status").val("0");
				} else {
					$("#status").val("-1");
				}
				$("#curriculumInput").val(res.getAcademy[0].course);
				$("#contentInput").val(res.getAcademy[0].content);
				$("#certificateInput").val(res.getAcademy[0].upload_path);
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

// 자격증 수정전 조회 ajax
function certificateOneView() {
	$("#certificateNo").val($("#pickCertificate").val());
	$("#actionForm").attr("action", "certificateOneViewAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "certificateOneViewAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#nameInput").val(res.getCertificate[0].cert_name);
				$("#certAutorityInput").val(res.getCertificate[0].cert_organization);
				if(res.getCertificate[0].cert_pass == true) {
					$("#status").val("1");
				} else if(res.getCertificate[0].cert_pass == false) {
					$("#status").val("0");
				} else {
					$("#status").val("-1");
				}
				$("#dateInput").val(res.getCertificate[0].cert_date);
				$("#certificateInput").val(res.getCertificate[0].upload_path);
				
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

//학원 수정
function academyMod() {
	$("#academyNo").val($("#pickAcademy").val());
	$("#actionForm").attr("action", "academyModAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "academyModAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawAcademy();
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

//자격증 수정
function certificateMod() {
	$("#certificateNo").val($("#pickCertificate").val());
	$("#actionForm").attr("action", "certificateModAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "certificateModAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCertificate();
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

//학원 삭제
function academyDel() {
	$("#academyNo").val($("#pickAcademy").val());
	$("#actionForm").attr("action", "academyDelAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "academyDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawAcademy();
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

//자격증 삭제
function certificateDel() {
	$("#certificateNo").val($("#pickCertificate").val());
	$("#actionForm").attr("action", "certificateDelAjax");
	var params = $("#actionForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "certificateDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawCertificate();
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