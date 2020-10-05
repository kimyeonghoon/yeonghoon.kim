/**
 * 프로필 redraw function 모아둔 js
 * 
 * 
 */


/**
 * 약력 그리기
 */
function redrawBriefHistory() {
	$.ajax({
		type : "post",			  
		url : "briefHistoryAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<div class=\"d-flex justify-content-center\">";
				// 수정권한이 있는 경우 수정버튼 생성
				if(res.modBtn != undefined) {
					html += res.modBtn;
				}
				// 프로필 사진
				html += "<img src=\"" + res.briefHistory.imageAddress + "\" style=\"width: 150px; height: 180px;\">";
				// 이름, 생년
				html += "</div><p class=\"text-center font-weight-bold pt-3\">";
				html += res.briefHistory.nameInput + "(" + res.briefHistory.yearInput + "년생, 34세)</p>";
				html += "<table class=\"table table-borderless table-sm d-flex justify-content-center\">";
				html += "<colgroup><col width=\"25%\"><col width=\"*\"></colgroup>";
				html += "<tbody><tr><td class=\"font-weight-bold\">주소</td>";
				// 주소
				html += "<td>" + res.briefHistory.addressInput + "</td></tr><tr><td class=\"font-weight-bold\">학력</td>";
				// 학력
				html += "<td>" + res.briefHistory.educationInput + "</td></tr><tr><td class=\"font-weight-bold\">경력</td>";
				// 경력
				html += "<td>" + res.briefHistory.careerInput + "</td></tr><tr><td class=\"font-weight-bold\">자격증</td>";
				// 자격증
				html += "<td>" + res.briefHistory.certificateInput + "</td></tr></tbody></table>";
				// html 변수에 담긴 내용을 화면에 그리기
				$("#briefHistory").html(html);
				// 약력 수정버튼 클릭 이벤트 할당(팝업 생성 후 기존에 저장된 약력을 불러옴)
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


/**
 * 학력 그리기
 */
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
				// 학교 그리기
				for(var i in res.getEducation) {
					html += "<tr data-no=" + res.getEducation[i].education_no + " class=\"border border-top-0 border-left-0 border-right-0\"><td><h6>";
					html += res.getEducation[i].startdate;
					html += " ~ ";
					// 졸업년월이 등록되었을 때만 실행
					if(res.getEducation[i].enddate != undefined) {
						html += res.getEducation[i].enddate;
					}
					html += "</h6><span class=\"text-primary\">";
					// DB 조회 후 상태코드를 한글로 변환
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
					// 증명 서류가 등록되었을 때만 실행됨(이미지 부분)
					if(res.getEducation[i].imageAddress != undefined) {
						var temp = res.getEducation[i].imageAddress;
						html += "&nbsp<span class=\"imgPopover\" data-toggle=\"popover\" data-trigger=\"hover\" data-original-title=\"\" title=\"\" data-content=\"<img src='" + res.getEducation[i].imageAddress + "' width='100%' />\">📇</span>";
					}
					// 증명 서류가 등록되었을 때만 실행됨(수정삭제버튼 부분)
					if(res.educationModDelBtn != undefined) {
						html += "&nbsp" + res.educationModDelBtn + "";
					}
					html += "</td><td><h6>";
					html += res.getEducation[i].name + " ";
					// 학과명이 존재한다면 학교명 옆에 해당 내용 기입해줌
					if(res.getEducation[i].department != undefined) {
						html += res.getEducation[i].department;
					}
					html += "</H6><span class=\"text-secondary\">";
					// 기타사항이 DB에 존재할 경우 실행됨
					if(res.getEducation[i].etc != null) {
						html += res.getEducation[i].etc;
					}
					html += "</span></td></tr>";
				}
				html += "</tbody></table></div>";
				$("#educationList").html(html);
				// 증명서류 팝오버 기능 활성화
				$(".imgPopover").popover({
					html: true
				});
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


/**
 * 경력 그리기
 */
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
				// 회사 그리기
				for(var i = 0; i < res.companyList.length; i++) {
					html += "<tr data-no=\"" + res.companyList[i].company_no + "\" class=\"border border-top-0 border-left-0 border-right-0\"><td><H6>";
					// 회사명
					html += res.companyList[i].company_name;
					html += "</h6><h6>";
					// 입사일
					html += res.companyList[i].startdate;
					html += " ~ ";
					// 퇴사일
					html += res.companyList[i].enddate;
					html += "</h6><span class=\"text-primary\">";
					// 퇴사일 - 입사일 계산(1년 이상 경력의 경우 n년 m개월로 표시, 1년 이하는 개월만 표시) 
					if(res.companyList[i].cha >= 12) {
						var year = Math.round(res.companyList[i].cha / 12);
						var month = res.companyList[i].cha % 12;
						html += year + "년 " + month + "개월";
					} else {
						html += res.companyList[i].cha + "개월";
					}
					html += "</span>";
					// 증명 서류(이미지)가 있을 경우 동작
					if(res.companyList[i].imageAddress != undefined) {
						var temp = res.companyList[i].imageAddress;
						html += "&nbsp<span class=\"imgPopover\" data-toggle=\"popover\" data-trigger=\"hover\" data-original-title=\"\" title=\"\" data-content=\"<img src='" + res.companyList[i].imageAddress + "' width='100%' />\">📇</span>";
					}
					// 회사 수정/삭제 버튼 생성(권한 체크 후 권한이 없을 경우 생성 안함)
					if(res.companyModDelBtn != undefined) {
						html += res.companyModDelBtn;
					}
					html += "</td><td>";
					// 경력사항 그리기
					for(var j = 0; j < res.careerList.length; j++) {
						if(res.companyList[i].company_no == res.careerList[j].company_no) {
							html += "<h6 data-no=\"" + res.careerList[j].career_no + "\">";
							// 부서명
							html += res.careerList[j].career_department;
							// 경력 수정/삭제 버튼 생성(권한 체크 후 권한이 없을 경우 생성 안함)
							if(res.careerModDelBtn != undefined) {
								html += res.careerModDelBtn;
							}
							html += "</h6><h6 class=\"text-primary\">";
							// 주요 업무
							html += "주요업무 : " + res.careerList[j].career_responsibility;
							html += "</h6><p class=\"text-secondary\">";
							// 경력기술
							var description = res.careerList[j].career_description.replace(/(?:\r\n|\r|\n)/g, '<br/>');
							html += description;
							html += "</p>";
						}
					}
					html += "</td></tr>";
				}
				html +=	"</td></tr>";
				html += "</tbody></table></div>";
				// html 변수에 담긴 내용 그림
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
				// 팝오버 이미지 활성화
				$(".imgPopover").popover({
					html: true
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


/**
 * 보유기술 그리기
 */
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
				// 보유기술 카테고리
				for(var i in res.getTechCategory) {
					html += "<tr class=\"border border-top-0 border-left-0 border-right-0\"><td>";
					html += "<h6>";
					html += res.getTechCategory[i].tech_category_name;
					html += "</h6></td>";
					html += "<td class=\"text-secondary\">";
					// 언어(0)
					if(i == 0) {
						for(var j in res.tech0) {
							html += res.tech0[j] + "<br/>";
						}
					// 프레임워크(1)
					} else if(i == 1) {
						for(var j in res.tech1) {
							html += res.tech1[j] + "<br/>";
						}
					// 라이브러리(2)
					} else if(i == 2){
						for(var j in res.tech2) {
							html += res.tech2[j] + "<br/>";
						}
					// 데이터베이스(3)
					} else if(i == 3){
						for(var j in res.tech3) {
							html += res.tech3[j] + "<br/>";
						}
					// 서버(4)
					} else if(i == 4){
						for(var j in res.tech4) {
							html += res.tech4[j] + "<br/>";
						}
					// 형상관리(5)
					} else if(i == 5){
						for(var j in res.tech5) {
							html += res.tech5[j] + "<br/>";
						}
					// API(6)
					} else if(i == 6){
						for(var j in res.tech6) {
							html += res.tech6[j] + "<br/>";
						}
					// 그외 사용도구(7)
					} else if(i == 7){
						for(var j in res.tech7) {
							html += res.tech7[j] + "<br/>";
						}
					}
					html += "</td></tr>";
				}
				html += "</tbody></table></div>";
				// html 변수에 담긴 내용 그리기
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


/**
 * 교육 그리기
 */
function redrawAcademy() {
	$.ajax({
		type : "post",			  
		url : "redrawAcademyAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				// 서버에서 넘어온 json 변수에 담아지는지 테스트
				var academy = res.getAcademy;
				html += "<div class=\"card\"><table class=\"card-body table table-sm table-borderless bg-light m-0\"><colgroup><col width=\"40%\"></col><col width=\"*\"></col></colgroup><tbody>";
				for (var i = 0; i < res.getAcademy.length; i++) {
					html += "<tr class=\"border border-top-0 border-left-0 border-right-0\" data-no=\"" + academy[i].academy_no + "\"><td><h6>";
					// 교육기간
					html += academy[i].startdate + " ~ " + academy[i].enddate;
					html += "</h6><span class=\"text-primary\">";
					// 수료여부 체크
					if(academy[i].status == true) {
						html += "수료";
					} else {
						html += "미수료";
					}
					html += "</span>";
					// 증명 서류가 있을 경우 그림
					if(academy[i].imageAddress != undefined) {
						var temp = academy[i].imageAddress;
						html += "&nbsp<span class=\"imgPopover\" data-toggle=\"popover\" data-trigger=\"hover\" data-original-title=\"\" title=\"\" data-content=\"<img src='" + academy[i].imageAddress + "' width='100%' />\">📇</span>";
					}
					// 교육 수정/삭제 버튼 생성(권한 체크 후 권한이 없을 경우 생성 안함)
					if(res.academyModDelBtn != undefined) {
						html += res.academyModDelBtn;
					}
					html +=	"</td><td><h6>";
					// 교육기관명
					html += academy[i].academy;
					html += "</h6><p class=\"text-primary\">교육과정 : ";
					// 교육과정
					html += academy[i].course;
					html += "</p><div class=\"text-secondary\">";
					// 교육내용
					html += academy[i].content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
					html += "</div></td></tr>";
				}
				html += "</tbody></table></div>";
				// html 변수에 담긴 내용 그리기
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
				$(".imgPopover").popover({
					html: true
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


/**
 * 자격증 그리기
 */
function redrawCertificate() {
	$.ajax({
		type : "post",			  
		url : "redrawCertificateAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<div class=\"card\"><table class=\"card-body table table-sm table-borderless bg-light m-0\"><colgroup><col width=\"40%\"></col><col width=\"*\"></col></colgroup><tbody>";
				// 자격증 그리기
				for(var i = 0; i < res.getCertificate.length; i++) {
					html += "<tr class=\"border border-top-0 border-left-0 border-right-0\" data-no=\"" + res.getCertificate[i].cert_no + "\"><td><h6>";
					// 합격년월
					html += res.getCertificate[i].cert_date;
					html += "</h6><span class=\"text-primary\">";
					// 합격여부
					if(res.getCertificate[i].cert_pass == true) {
						html += "합격";
					} else if(res.getCertificate[i].cert_pass == false) {
						html += "불합격";
					}
					// 자격증 이미지가 존재하는지 체크
					if(res.getCertificate[i].imageAddress != undefined) {
						var temp = res.getCertificate[i].imageAddress;
						html += "&nbsp<span class=\"imgPopover\" data-toggle=\"popover\" data-trigger=\"hover\" data-original-title=\"\" title=\"\" data-content=\"<img src='" + res.getCertificate[i].imageAddress + "' width='100%' />\">📇</span>";
					}
					// 자격증 수정/삭제 버튼 생성(권한 체크 후 권한이 없을 경우 생성 안함)
					if (res.certificateModDelBtn != undefined) {
						html += res.certificateModDelBtn; 
					}
					html += "</td><td><h6>";
					// 자격증명
					html += res.getCertificate[i].cert_name;
					html += "</h6><div class=\"text-secondary\">";
					// 자격증 기관
					html += res.getCertificate[i].cert_organization;
					html += "</div></td></tr>";
				}
				html += "<tr class=\"border border-top-0 border-left-0 border-right-0\"><td colspan=\"2\"><div class=\"text-secondary\">*기타 - 1종보통운전면허, 워드프로세서1급, 전산회계1급, OCA(만료), CCNP(만료)</div></td></tr></tbody></table></div>";
				// html 변수에 담긴 내용 그림
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
				$(".imgPopover").popover({
					html: true
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