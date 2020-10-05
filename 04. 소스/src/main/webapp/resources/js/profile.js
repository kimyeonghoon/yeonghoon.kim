/**
 * profile 페이지 로딩 시 실행, 팝업창, 팝업창의 버튼 동작
 */


/**
 * profile 초기화(버튼 동작 및 ajax 조회 후 값 그리기)
 */
function init_profile() {
	// 교육 추가 버튼 동작
	$("#educationAddBtn").on("click", function(){
		modalPopup("2-1");
	});
	// 회사 추가 버튼 동작
	$("#companyAddBtn").on("click", function(){
		modalPopup("3-1");
	});
	// 경력 추가 버튼 동작
	$("#careerAddBtn").on("click", function(){
		modalPopup("3-4");
	});
	// 보유기술 추가 버튼 동작
	$("#skillAddBtn").on("click", function(){
		modalPopup("4-1");
	});
	// 보유기술 삭제 버튼 동작
	$("#skillDelBtn").on("click", function(){
		modalPopup("4-3");
	});
	// 교육 추가 버튼 동작
	$("#academyAddBtn").on("click", function(){
		modalPopup("5-1");
	});
	// 자격증 등록 버튼 동작
	$("#certificationAddBtn").on("click", function(){
		modalPopup("6-1");
	});
	
	// ajax로 DB 조회 후 값 그리기
	redrawBriefHistory();
	redrawTech();
	redrawEducation();
	redrawCareer();
	redrawAcademy();
	redrawCertificate();
}


/**
 * 팝업창 생성
 */
function modalPopup(id) {
	// 배열에 팝업 허용 값 추가
	var arrPopupList = new Array("1-1","1-2","2-1","2-2","2-3","3-1","3-2","3-3","3-4","3-5","3-6","4-1","4-2","4-3","5-1","5-2","5-3","6-1","6-2","6-3");
	var popupCheck = true;
	
	// 넘어온 값과 위의 팝업을 띄울 값을 비교(넘어온 값이 배열에 있다면 popupCheck를 false로 변경)
	for(var i = 0; i < arrPopupList.length; i++) {
		if(id == arrPopupList[i]) {
			popupCheck = false;
		}
	}
	
	// 넘어온 값이 비어있거나 배열에 포함되지 않은 값이라면 function 중단
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
	// 팝업창 헤더 영역
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
	html += "<form action=\"#\" method=\"post\" id=\"actionForm\" enctype=\"multipart/form-data\">"
	html += "<div class=\"modal-body\">";
	// 팝업창 본문 영역
	switch (id) {
		//약력 수정
		case "1-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"1-2\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">이름</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">생년</span></div><input type=\"number\" class=\"form-control\" id=\"yearInput\" name=\"yearInput\" maxlength=\"4\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">주소</span></div><input type=\"text\" class=\"form-control\" id=\"addressInput\" name=\"addressInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학력</span></div><input type=\"text\" class=\"form-control\" id=\"educationInput\" name=\"educationInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력</span></div><input type=\"text\" class=\"form-control\" id=\"careerInput\" name=\"careerInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격</span></div><input type=\"text\" class=\"form-control\" id=\"certificateInput\" name=\"certificateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">사진</span></div><input type=\"file\" accept=\"image/*\" class=\"form-control fileUpload\" id=\"imageInput\" name=\"imageInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
				  break;
		// 학력 추가
		case "2-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"2-1\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학교명</span></div><input type=\"text\" class=\"form-control\" name=\"nameInput\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학과명</span></div><input type=\"text\" class=\"form-control\" name=\"departmentInput\" id=\"departmentInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" name=\"status\" id=\"status\"><option value=\"0\">상태 선택</option><option value=\"1\">졸업</option><option value=\"2\">수료</option><option value=\"3\">재적</option><option value=\"4\">퇴학</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입학년월</span></div><input type=\"text\" class=\"form-control\" name=\"admissionInput\" id=\"admissionInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">졸업년월</span></div><input type=\"text\" class=\"form-control\" name=\"graduatedInput\" id=\"graduatedInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">기타사항</span></div><input type=\"text\" class=\"form-control\" name=\"etcInput\" id=\"etcInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control fileUpload\" name=\"certificateInput\" id=\"certificateInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
				  break;
		// 학력 수정
		case "2-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"2-2\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><input type=\"hidden\" id=\"educationNo\" name=\"educationNo\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학교명</span></div><input type=\"text\" class=\"form-control\" name=\"nameInput\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학과명</span></div><input type=\"text\" class=\"form-control\" name=\"departmentInput\" id=\"departmentInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" name=\"status\" id=\"status\"><option value=\"0\">상태 선택</option><option value=\"1\">졸업</option><option value=\"2\">수료</option><option value=\"3\">재적</option><option value=\"4\">퇴학</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입학년월</span></div><input type=\"text\" class=\"form-control\" name=\"admissionInput\" id=\"admissionInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">졸업년월</span></div><input type=\"text\" class=\"form-control\" name=\"graduatedInput\" id=\"graduatedInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">기타사항</span></div><input type=\"text\" class=\"form-control\" name=\"etcInput\" id=\"etcInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control fileUpload\" name=\"certificateInput\" id=\"certificateInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
					break;
		// 학력 삭제
		case "2-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"2-3\" /><input type=\"hidden\" id=\"educationNo\" name=\"educationNo\" />학력을 삭제하시겠습니까?";
					break;
		// 회사 추가
		case "3-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"3-1\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><input type=\"text\" class=\"form-control\" name=\"nameInput\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입사년월</span></div><input type=\"text\" class=\"form-control\" name=\"joinInput\" id=\"joinInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">퇴사년월</span></div><input type=\"text\" class=\"form-control\" name=\"leaveInput\" id=\"leaveInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control fileUpload\" name=\"certificateInput\" id=\"certificateInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
					break;
		// 회사 수정
		case "3-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"3-2\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><input type=\"hidden\" id=\"companyNo\" name=\"companyNo\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><input type=\"text\" class=\"form-control\" name=\"nameInput\" id=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">입사년월</span></div><input type=\"text\" class=\"form-control\" name=\"joinInput\" id=\"joinInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">퇴사년월</span></div><input type=\"text\" class=\"form-control\" name=\"leaveInput\" id=\"leaveInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control fileUpload\" name=\"certificateInput\" id=\"certificateInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
					break;
		// 회사 삭제
		case "3-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"3-3\" /><input type=\"hidden\" id=\"companyNo\" name=\"companyNo\" />회사를 삭제하시겠습니까?";
					break;
		// 경력 추가
		case "3-4": html += "<input type=\"hidden\" id=\"addSelect\" value=\"3-4\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">회사명</span></div><select class=\"form-control\" name=\"companyName\" id=\"companyName\"><option value=\"0\">회사 선택</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">근무부서</span></div><input type=\"text\" class=\"form-control\" name=\"departmentInput\" id=\"departmentInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">주요업무</span></div><input type=\"text\" class=\"form-control\" name=\"taskInput\" id=\"taskInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력기술</span></div><textarea class=\"form-control\" name=\"careerInput\" id=\"careerInput\"></textarea></div>";
					break;
		// 경력 수정
		case "3-5": html += "<input type=\"hidden\" id=\"modSelect\" value=\"3-5\" /><input type=\"hidden\" id=\"careerNo\" name=\"careerNo\" /><div class=\"input-group\"><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">근무부서</span></div><input type=\"text\" class=\"form-control\" name=\"departmentInput\" id=\"departmentInput\"></div><div class=\"input-group-prepend\"><span class=\"input-group-text\">주요업무</span></div><input type=\"text\" class=\"form-control\" name=\"taskInput\" id=\"taskInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">경력기술</span></div><textarea class=\"form-control\" name=\"careerInput\" id=\"careerInput\"></textarea></div>";
					break;
		// 경력 삭제
		case "3-6": html += "<input type=\"hidden\" id=\"delSelect\" value=\"3-6\" /><input type=\"hidden\" id=\"careerNo\" name=\"careerNo\" />경력을 삭제하시겠습니까?";
					break;
		// 스킬 추가
		case "4-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"4-1\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">카테고리</span></div><select class=\"form-control\" name=\"categoryName\"id=\"categoryName\"><option value=\"0\">카테고리 선택</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">스킬명</span></div><input type=\"text\" class=\"form-control\" name=\"skillNameInput\" id=\"skillNameInput\"></div>";
					break;
		// 스킬 삭제
		case "4-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"4-3\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">카테고리</span></div><select class=\"form-control\" name=\"categoryName\" id=\"categoryName\" onchange=\"techList()\"><option value=\"0\">카테고리 선택</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">스킬명</span></div><select class=\"form-control\" id=\"skillName\" name=\"skillName\" disabled=\"disabled\"><option value=\"0\">스킬 선택</option></select></div>";
					break;
		// 교육 추가
		case "5-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"5-1\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학원명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">시작년월</span></div><input type=\"text\" class=\"form-control\" id=\"startInput\" name=\"startInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">종료년월</span></div><input type=\"text\" class=\"form-control\" id=\"endInput\" name=\"endInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" id=\"status\" name=\"status\"><option value=\"-1\">상태 선택</option><option value=\"1\">수료</option><option value=\"0\">미수료</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육과정</span></div><input type=\"text\" class=\"form-control\" id=\"curriculumInput\" name=\"curriculumInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육내용</span></div><textarea class=\"form-control\" name=\"contentInput\" id=\"contentInput\"></textarea></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control fileUpload\" id=\"certificateInput\" name=\"certificateInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
					break;
		// 교육 수정
		case "5-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"5-2\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><input type=\"hidden\" id=\"academyNo\" name=\"academyNo\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">학원명</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">시작년월</span></div><input type=\"text\" class=\"form-control\" id=\"startInput\" name=\"startInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">종료년월</span></div><input type=\"text\" class=\"form-control\" id=\"endInput\" name=\"endInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">상태</span></div><select class=\"form-control\" id=\"status\" name=\"status\"><option value=\"-1\">상태 선택</option><option value=\"1\">수료</option><option value=\"0\">미수료</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육과정</span></div><input type=\"text\" class=\"form-control\" name=\"curriculumInput\" id=\"curriculumInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">교육내용</span></div><textarea class=\"form-control\" id=\"contentInput\" name=\"contentInput\"></textarea></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control fileUpload\" id=\"certificateInput\" name=\"certificateInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
					break;
		// 교육 삭제
		case "5-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"5-3\" /><input type=\"hidden\" id=\"academyNo\" name=\"academyNo\" />교육을 삭제하시겠습니까?";
					break;
		// 자격증 추가
		case "6-1": html += "<input type=\"hidden\" id=\"addSelect\" value=\"6-1\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격증</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급기관</span></div><input type=\"text\" class=\"form-control\" id=\"certAutorityInput\" name=\"certAutorityInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">합격여부</span></div><select class=\"form-control\" id=\"status\" name=\"status\"><option value=\"-1\">합격여부</option><option value=\"1\">합격</option><option value=\"0\">불합격</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급일자</span></div><input type=\"text\" class=\"form-control\" id=\"dateInput\" name=\"dateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control fileUpload\" id=\"certificateInput\" name=\"certificateInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
					break;
		// 자격증 수정
		case "6-2": html += "<input type=\"hidden\" id=\"modSelect\" value=\"6-2\" /><input type=\"hidden\" id=\"imageAddress\" name=\"imageAddress\" /><input type=\"hidden\" id=\"certificateNo\" name=\"certificateNo\" /><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">자격증</span></div><input type=\"text\" class=\"form-control\" id=\"nameInput\" name=\"nameInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급기관</span></div><input type=\"text\" class=\"form-control\" id=\"certAutorityInput\" name=\"certAutorityInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">합격여부</span></div><select class=\"form-control\" id=\"status\" name=\"status\"><option value=\"-1\">합격여부</option><option value=\"1\">합격</option><option value=\"0\">불합격</option></select></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">발급일자</span></div><input type=\"text\" class=\"form-control\" id=\"dateInput\" name=\"dateInput\"></div><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">증명서류</span></div><input type=\"file\" class=\"form-control fileUpload\" id=\"certificateInput\" name=\"certificateInput\"><div id=\"uploadBtn\" class=\"btn bg-primary text-light\">업로드</div></div>";
					break;
		// 자격증 삭제
		case "6-3": html += "<input type=\"hidden\" id=\"delSelect\" value=\"6-3\" /><input type=\"hidden\" id=\"certificateNo\" name=\"certificateNo\" />자격증을 삭제하시겠습니까?";
					break;
		// 에러 발생
		case "x": html += "에러가 발생하였습니다.";
					break;
	}
	html += "</div>";
	html += "</form>";
	html += "<div class=\"modal-footer\">";
	// 팝업창 푸터 영역
	switch (id) {
		// 등록 버튼
		case "2-1": case "3-1": case "3-4": case "4-1": case "5-1":	case "6-1": 
					html += "<button type=\"button\" class=\"btn btn-danger\" id=\"addBtn\" onclick=\"addSelect('" + id + "');\">등록</button>";
					break;
		// 수정 버튼
		case "1-2": case "2-2":	case "3-2":	case "3-5":	case "5-2":	case "6-2":
					html += "<button type=\"button\" class=\"btn btn-danger\" id=\"modBtn\" onclick=\"modSelect('" + id + "');\" >수정</button>"; 
					break;
		// 삭제 버튼
		case "2-3":	case "3-3":	case "3-6":	case "4-3":	case "5-3":	case "6-3": 
					html += "<button type=\"button\" class=\"btn btn-danger\" id=\"delBtn\" onclick=\"delSelect('" + id + "');\">삭제</button>";
					break;
	}
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">닫기</button>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	// 변수에 담긴 내용을 가지고 html 게시글 부분 재생성
	$("#contentsArea").prepend(html);
	// 팝업창 띄움
	$("#notifyModal").modal("show");
	// datepicker 설정
	$("#admissionInput, #graduatedInput, #joinInput, #leaveInput, #startInput, #endInput, #dateInput").datepicker({
		dateFormat: 'yy-mm-dd', changeMonth: true, changeYear: true, yearRange: '2000:2020',
		monthNames: ["1","2","3","4","5","6","7","8","9","10","11","12"],
		monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
		dayNamesMin: ["일","월","화","수","목","금","토"] 
	});
	// datepicker 호출 시 제일 상단으로 띄우게 하기 위해 z-index 조정
	$(".hasDatepicker").css("z-index", 1300);
	// 교육 수정 팝업이 뜰 때 선택한 데이터 조회
	if(id == "2-2") {
		educationOneView();
	}
	// 회사 수정 팝업이 뜰 때 선택한 데이터 조회
	if(id == "3-2") {
		companyOneView();
	}
	// 경력 추가 팝업이 뜰 때 회사 리스트 조회
	if(id == "3-4") {
		companyList();
	}
	// 경력 수정 시 회사 및 기존 경력 조회
	if(id == "3-5") {
		companyList(id);
		careerOneView();
	}
	// 기술 카테고리 조회
	if(id == "4-1" || id == "4-3") {
		techCategoryList();
	}
	// 교육 수정 시 선택한 데이터 조회
	if(id == "5-2") {
		academyOneView();
	}
	// 자격증 수정 시 선택한 데이터 조회
	if(id == "6-2") {
		certificateOneView();
	}
	// 증명 서류 및 사진 업로드 기능 버튼 동작
	$("#uploadBtn").on("click", function() {
		fileUpload();
	});
}


/**
 * 팝업창 등록버튼 동작
 */
function addSelect(id) {
	// 이미지 주소가 비어있는 값일 경우 서버로 전송X
	if($("#imageAddress").val() == null || $("#imageAddress").val() == '') {
		$("#imageAddress").removeAttr("name");
	}
	switch (id) {
	case "2-1": educationAdd();
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


/**
 * 팝업창 수정버튼 동작
 */
function modSelect(id) {
	// 이미지 주소가 비어있는 값일 경우 서버로 전송X
	if($("#imageAddress").val() == null || $("#imageAddress").val() == '') {
		$("#imageAddress").removeAttr("name");
	}
	switch (id) {
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


/**
 * 팝업창 삭제버튼 동작
 */
function delSelect(id) {
	switch (id) {
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