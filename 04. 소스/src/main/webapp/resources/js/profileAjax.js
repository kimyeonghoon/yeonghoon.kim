/**
 * profile Ajax 동작하는 기능 모아둔 js(redraw 제외)
 */


/**
 * [약력] 기존 약력 조회 후 팝업창에 해당 값 넣어줌
 */
function getBriefHistory() {
	$.ajax({
		type : "post",			  
		url : "getBriefHistoryAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				// 이름
				$("#nameInput").val(res.list.nameInput);
				// 생년
				$("#yearInput").val(res.list.yearInput);
				// 성별(0 - 남자, 1 - 여자)
				if(res.list.gender) {
					$("#gender").val("0");
				} else {
					$("#gender").val("1");
				}
				// 주소
				$("#addressInput").val(res.list.addressInput);
				// 학력
				$("#educationInput").val(res.list.educationInput);
				// 경력
				$("#careerInput").val(res.list.careerInput);
				// 자격증
				$("#certificateInput").val(res.list.certificateInput);
				// 프로필 사진
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


/**
 * [약력] 약력 수정
 */
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
				// 정상적으로 수행될 경우 팝업창 닫고, 약력을 다시 그림
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


/**
 * [학력] 학력 추가
 */
function educationAdd() {
	// 유효성 체크 후 문제가 없을 경우 ajax 동작
	if($("#nameInput").val() == null || $("#nameInput").val() == '') {
		alert("학교명을 입력해주세요");
	} else if ($("#status").val() == null || $("#status").val() == '' || $("#status").val() == "0") {
		alert("상태를 선택해주세요.");
	} else if ($("#admissionInput").val() == null || $("#admissionInput").val() == '') {
		alert("입학년월을 입력해주세요.");
	} else {
		// name 속성에 status를 넣었음에도 불구하고 name값이 안들어가서 서버에 값 전달하기전에 강제로 할당
		$("#status").attr("name", "status");
		$("#actionForm").attr("action", "educationAddAjax");
		var params = $("#actionForm").serialize();
		// 서버로 값 전달
		$.ajax({
			type : "post",			  
			url : "educationAddAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				if(res.result == "success") {
					// 성공하면 팝업이 닫히고, 학력을 새로 그림
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


/**
 * [학력] 기존 학력 조회 후 팝업창에 해당 값 넣어줌
 */
function educationOneView() {
	// 팝업 외부에 임시로 학력 번호 저장한 것을 팝업창 내의 form으로 값 전달
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


/**
 * [학력] 학력 수정
 */
function educationMod() {
	// 유효성 체크 후 문제가 없을 경우 ajax 동작
	if($("#nameInput").val() == null || $("#nameInput").val() == '') {
		alert("학교명을 입력해주세요");
	} else if ($("#status").val() == null || $("#status").val() == '' || $("#status").val() == "0") {
		alert("상태를 선택해주세요.");
	} else if ($("#admissionInput").val() == null || $("#admissionInput").val() == '') {
		alert("입학년월을 입력해주세요.");
	} else {
		// name 속성에 status를 넣었음에도 불구하고 name값이 안들어가서 서버에 값 전달하기전에 강제로 할당
		$("#status").attr("name", "status");
		$("#actionForm").attr("action", "educationModAjax");
		var params = $("#actionForm").serialize();
		// 서버로 값 전달
		$.ajax({
			type : "post",			  
			url : "educationModAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				if(res.result == "success") {
					// 성공하면 팝업이 닫히고, 학력을 새로 그림
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


/**
 * [학력] 학력 삭제
 */
function educationDel() {
	// 팝업 외부에 임시로 학력 번호 저장한 것을 팝업창 내의 form으로 값 전달
	$("#educationNo").val($("#pickEdu").val());
	$("#actionForm").attr("action", "educationDelAjax");
	var params = $("#actionForm").serialize();
	// 서버로 값 전달
	$.ajax({
		type : "post",			  
		url : "educationDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 성공하면 팝업이 닫히고, 학력을 새로 그림
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


/**
 * [경력] 회사 추가
 */
function companyAdd() {
	// 유효성 체크 후 문제가 없을 경우 ajax 동작
	if($("#nameInput").val() == null || $("#nameInput").val() == '') {
		alert("회사명을 입력해주세요");
	} else if ($("#joinInput").val() == null || $("#joinInput").val() == '') {
		alert("입사년월을 입력해주세요.");
	} else if ($("#leaveInput").val() == null || $("#leaveInput").val() == '') {
		alert("퇴사년월을 입력해주세요.");
	} else {
		$("#actionForm").attr("action", "companyAddAjax");
		var params = $("#actionForm").serialize();
		// 서버로 값 전달
		$.ajax({
			type : "post",			  
			url : "companyAddAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				if(res.result == "success") {
					// 회사 추가가 정상적으로 진행되면 팝업창 닫고, 회사를 다시 그림
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
}


/**
 * [경력] 기존 회사 조회 후 팝업창에 해당 값 넣어줌
 */
function companyOneView() {
	// 팝업 외부에 임시로 회사 번호 저장한 것을 팝업창 내의 form으로 값 전달
	$("#companyNo").val($("#pickCompany").val());
	$("#actionForm").attr("action", "companyOneViewAjax");
	var params = $("#actionForm").serialize();
	// 서버로 값 전달
	$.ajax({
		type : "post",			  
		url : "companyOneViewAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 팝업창에 조회한 값 할당
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


/**
 * [경력] 회사 수정
 */
function companyMod() {
	// 유효성 체크 후 문제가 없을 경우 ajax 동작
	if($("#nameInput").val() == null || $("#nameInput").val() == '') {
		alert("회사명을 입력해주세요");
	} else if ($("#joinInput").val() == null || $("#joinInput").val() == '') {
		alert("입사년월을 입력해주세요.");
	} else if ($("#leaveInput").val() == null || $("#leaveInput").val() == '') {
		alert("퇴사년월을 입력해주세요.");
	} else {
		$("#actionForm").attr("action", "companyModAjax");
		var params = $("#actionForm").serialize();
		// 서버로 값 전달
		$.ajax({
			type : "post",			  
			url : "companyModAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				if(res.result == "success") {
					// 회사 수정이 정상적으로 진행되면 팝업창 닫고, 회사를 다시 그림
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
}


/**
 * [경력] 회사 삭제
 */
function companyDel() {
	// 팝업 외부에 임시로 회사 번호 저장한 것을 팝업창 내의 form으로 값 전달
	$("#companyNo").val($("#pickCompany").val());
	$("#actionForm").attr("action", "companyDelAjax");
	var params = $("#actionForm").serialize();
	// 서버로 값 전달
	$.ajax({
		type : "post",			  
		url : "companyDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 회사 삭제가 정상적으로 진행되면 팝업창 닫고, 회사를 다시 그림
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


/**
 * [경력] 회사 리스트 조회 후 팝업창의 회사명 <option>에 해당 값 넣어줌
 */
function companyList(id) {
	$.ajax({
		type : "post",			  
		url : "companyListAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				// 경력 추가의 경우 아래 내용 실행(경력 수정의 경우 아래 내용 필요 없음)
				if(id != "3-5") {
					html += "<option value=\"0\">회사 선택</option>";
					// 회사 리스트를 그림
					for(var i = 0; i < res.companyList.length; i++) {
						html += "<option value=\"" + res.companyList[i].company_no +"\">" + res.companyList[i].company_name + "</option>";
					}
				}
				// html 변수에 담긴 내용을 그림
				$("#companyName").html(html);
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
 * [경력] 경력 추가
 */
function careerAdd() {
	// 유효성 체크 후 문제가 없을 경우 ajax 동작
	if($("#companyName").val() == null || $("#companyName").val() == '' || $("#companyName").val() == '0') {
		alert("회사를 선택해주세요");
	} else if ($("#departmentInput").val() == null || $("#departmentInput").val() == '') {
		alert("근무부서를 입력해주세요.");
	} else if ($("#taskInput").val() == null || $("#taskInput").val() == '') {
		alert("주요업무를 입력해주세요.");
	} else if ($("#careerInput").val() == null || $("#careerInput").val() == '') {
		alert("경력을 기술해주세요.");
	} else {
		$("#actionForm").attr("action", "careerAddAjax");
		var params = $("#actionForm").serialize();
		// 서버로 값 전달
		$.ajax({
			type : "post",			  
			url : "careerAddAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				// 경력 추가가 정상적으로 진행되면 팝업창 닫고, 회사를 다시 그림
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
}


/**
 * [경력] 기존 경력 조회 후 팝업창에 해당 값 넣어줌
 */
function careerOneView() {
	// 팝업 외부에 임시로 회사 번호 저장한 것을 팝업창 내의 form으로 값 전달
	$("#careerNo").val($("#pickCareer").val());
	$("#actionForm").attr("action", "careerOneViewAjax");
	var params = $("#actionForm").serialize();
	// 서버로 값 전달
	$.ajax({
		type : "post",			  
		url : "careerOneViewAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 팝업창에 조회한 값 할당
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


/**
 * [경력] 경력 수정
 */
function careerMod() {
	// 유효성 체크 후 문제가 없을 경우 ajax 동작
	if ($("#departmentInput").val() == null || $("#departmentInput").val() == '') {
		alert("근무부서를 입력해주세요.");
	} else if ($("#taskInput").val() == null || $("#taskInput").val() == '') {
		alert("주요업무를 입력해주세요.");
	} else if ($("#careerInput").val() == null || $("#careerInput").val() == '') {
		alert("경력을 기술해주세요.");
	} else {
		$("#actionForm").attr("action", "careerModAjax");
		var params = $("#actionForm").serialize();
		// 서버로 값 전달
		$.ajax({
			type : "post",			  
			url : "careerModAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				if(res.result == "success") {
					// 경력 수정이 정상적으로 진행되면 팝업창 닫고, 회사를 다시 그림
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
}


/**
 * [경력] 경력 삭제
 */
function careerDel() {
	// 팝업 외부에 임시로 회사 번호 저장한 것을 팝업창 내의 form으로 값 전달
	$("#careerNo").val($("#pickCareer").val());
	$("#actionForm").attr("action", "careerDelAjax");
	var params = $("#actionForm").serialize();
	// 서버로 값 전달
	$.ajax({
		type : "post",			  
		url : "careerDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 경력 삭제가 정상적으로 진행되면 팝업창 닫고, 회사를 다시 그림
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


/**
 * 스킬 삭제
 */
function techDel() {
	// 유효성 검사(0, 공백이 값이 아니라면 함수 종료)
	if($("#categoryName").val() == 0 || $("#categoryName").val() == '' || $("#categoryName").val() == null) {
		return false;
	}   
	// 유효성 검사(스킬명이 비어있거나, 카테고리명이 비어있다면 함수 종료)
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
				// 스킬 추가가 정상적으로 진행되면 팝업창 닫고, 스킬을 다시 그림
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


//기술 카테고리의 내용 조회
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










//교육 추가
function academyAdd() {
	$("#status").attr("name", "status");
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
	$("#status").attr("name", "status");
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
	$("#status").attr("name", "status");
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
	$("#status").attr("name", "status");
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

// 파일 업로드
function fileUpload() {
	if($(".fileUpload").val() == '' || $(".fileUpload").val() == null) {
		alert("업로드할 파일을 선택해주세요.");
		return false;
	}
	
	$("#status").removeAttr("name");
	$("#actionForm").attr("action", "fileUploadAjax");
	var fileForm = $("#actionForm");
	fileForm.ajaxForm({ 
		success: function(res){
			if(res.result =="success"){
				$("#imageAddress").val(res.fileName[0]);
				alert("업로드가 완료되었습니다.");
			} else {
				alert("저장실패");
			} 
		},
		error: function(){
			alert("에러발생!!"); 
		}
	});
	fileForm.submit();
}


//기술 카테고리의 내용 조회
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





/**
 * 스킬 추가
 */
function techAdd() {
	// 유효성 검사(0, 공백이 값이 아니라면 함수 종료)
	if($("#categoryName").val() == 0 || $("#categoryName").val() == '' || $("#categoryName").val() == null) {
		return false;
	}   
	// 유효성 검사(스킬명이 비어있거나, 카테고리명이 비어있다면 함수 종료)
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
				// 스킬 추가가 정상적으로 진행되면 팝업창 닫고, 스킬을 다시 그림
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


