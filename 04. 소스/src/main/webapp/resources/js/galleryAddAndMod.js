/**
 * galleryAdd/galleryDel 페이지에서 사용하는 function을 모아둔 js 파일
 */


/**
 * 글 작성 후 등록 버튼 클릭 시 동작하는 Ajax
 * 
 */
function galleryAdd() {
	$("#actionForm").attr("action", "galleryAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "galleryAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 성공하면 작성글 확인할 수 있는 페이지로 이동.
				$("#boardNo").val(res.boardNo);
				$("#actionForm").attr("action", "galleryDetail");
				$("#actionForm").submit();
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
			galleryAdd();
		});
	} else if(no == 2) {
		$("#modBtn").on("click", function() {
			$("#contentDetail").val(CKEDITOR.instances['contentDetail'].getData());
			galleryMod();
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
function galleryMod() {
	$("#actionForm").attr("action", "galleryModAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "galleryModAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 성공하면 작성글 확인할 수 있는 페이지로 이동.
				$("#actionForm").attr("action", "galleryDetail");
				$("#actionForm").submit();
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