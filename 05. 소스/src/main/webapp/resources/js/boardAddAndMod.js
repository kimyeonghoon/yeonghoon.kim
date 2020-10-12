/**
 * boardAdd/boardDel 페이지에서 사용하는 function을 모아둔 js 파일
 */


/**
 * 글 작성 후 등록 버튼 클릭 시 동작하는 Ajax
 * 
 */
function boardAdd() {
	$("#actionForm").attr("action", "boardAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "boardAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			// 성공하면 작성글 확인할 수 있는 페이지로 이동.
			if(res.result == "success") {
				$("#bNo").val(res.boardNo);
				$("#prevPage").submit();
			} else if(res.result == "fail") {
				alert("error");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}



/**
 *	 등록, 파일업로드 버튼, 취소 버튼 이벤트 할당
 * 
 */
function buttonEvent(no) {
	// 등록(1)/수정(2) 버튼 클릭 이벤트
	if(no == 1) {
		$("#addBtn").on("click", function() {
			$("#contentDetail").val(CKEDITOR.instances['contentDetail'].getData());
			boardAdd();
		});
	} else if(no == 2) {
		$("#modBtn").on("click", function() {
			$("#contentDetail").val(CKEDITOR.instances['contentDetail'].getData());
			boardMod();
		});
	} else {
		return false;
	}
	
	// 파일 업로드 버튼 클릭 이벤트
	$("#fileUpload").on("click", function() {
		fileUpload();
	});
	// 취소 버튼 클릭 이벤트
	$("#cancelBtn").on("click", function() {
		history.back();
	});
}


/**
 * 글 작성 후 수정 버튼 클릭 시 동작하는 Ajax
 * 
 */
function boardMod() {
	$("#actionForm").attr("action", "boardModAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "boardModAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			// 성공하면 작성글 확인할 수 있는 페이지로 이동.
			if(res.result == "success") {
				$("#prevPage").submit();
			} else if(res.result == "fail") {
				alert("error");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}


/**
 * 첨부 파일 선택 후 파일 업로드 버튼 클릭 Ajax
 * 
 * fileName - 업로드된 파일명, originalName - 업로드 전 원래 파일명
 * 
 */
function fileUpload() {
	// 만약 첨부파일 항목의 값이 둘 다 비어 있다면 바로 빠져나감
	if($("#file1").val() == '' && $("#file2").val() == '') {
		alert("첨부할 파일을 선택해주세요");
		return false;
	}
	$("#actionForm").attr("action", "fileUploadAjax");
	var fileForm = $("#actionForm");
	fileForm.ajaxForm({ 
		success: function(res){
			if(res.result =="success"){
				// 업로드가 정상적으로 이루어진 경우 업로드된 파일의 정보를 값으로 취득
				$("#attach1").val(res.fileName[0]);
				$("#attachOriginal1").val(res.originalName[0]);
				$("#attach2").val(res.fileName[1]);
				$("#attachOriginal2").val(res.originalName[1]);
				
				// 첨부파일이 정상적으로 업로드되었다면 화면에 표시
				var html = "";
				for(var i = 0; i < res.fileName.length; i++) {
					if(res.fileName[i] != undefined) {
						html += "<div>업로드된 첨부파일 " + i + " - <a href=\"" + res.fileName[i] + "\" target=\"_blank\">" + res.originalName[i] + "</a></div>";
					} else {
						html += "<div>업로드된 첨부파일 " + i + " - 없음</div>";
					}
				}

				// 업로드 후 file1, file2의 값 null 처리(다음 업로드 위해)
				$("#file1").val(null);
				$("#file2").val(null);
				
				$("#uploadedFile").html(html);
				
				alert("업로드가 완료되었습니다.");
				
			} else {
				alert("저장 실패");
			} 
		},
		error: function(){
			alert("에러발생!!"); 
		}
	});
	fileForm.submit();
}