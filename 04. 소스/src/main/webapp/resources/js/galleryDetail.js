/**
 * gallery 상세보기 페이지에서 사용하는 function을 모아둔 js 파일
 */


/**
 * 게시글 내용을 그릴 때 사용하는 function
 * 
 * getGalleryContent - reg_time(등록시간), member_name(작성자명), content_name(제목), content_detail(내용)
 * 
 */
function redrawContent() {
	$("#actionForm").attr("action", "getGalleryContentAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getGalleryContentAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 게시글 내용을 그림
				var html = "";
				html += "<tr class=\"table-secondary\"><td class=\"font-weight-bold text-center cursor-defualt\">작성일</td><td class=\"cursor-defualt\">";
				html += res.getGalleryContent.reg_time
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center cursor-defualt\">작성자</td><td class=\"cursor-defualt\">";
				html += res.getGalleryContent.member_name;
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center cursor-defualt\">제목</td><td class=\"cursor-defualt\">";
				html += res.getGalleryContent.content_name;
				html += "</td></tr><tr><td class=\"p-3\" colspan=\"2\"><div class=\"row\"><div class=\"col-sm-1\"></div><div class=\"col-sm-10 pt-5 pb-5\" >";
				html += res.getGalleryContent.content_detail;
				html += "</div><div class=\"col-sm-1\"></div></div></td></tr>";
				// 변수에 담긴 내용을 가지고 html 게시글 부분 재생성
				$("#galleryDetail").prepend(html);
			} else if(res.result == "fail") {
				// 게시글을 불러오지 못할 경우 이전 페이지인 gallery로 이동
				alert("게시물을 불러올 수 없습니다");
				location.href = "gallery";
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}


/**
 * 코멘트 내용을 그릴 때 사용하는 function
 * 
 */
function redrawComment() {
	// 코멘트 수정할 때 조회하는 부분이 있어 단순 조회(여러 건)의 경우 코멘트 번호의 값을 null처리
	$("#commentNo").val(null);
	$("#actionForm").attr("action", "getGalleryCommentAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getGalleryCommentAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 코멘트 내용을 그림
				var html = "";
				for(var i = 0; i < res.getComment.length; i++) {
					// 홀수 번째, 짝수 번째 코멘트 배경 다르게 함
					if(i % 2 == 0) {
						html += "<tr class=\"table-secondary cursor-defualt\" data-no=\"";
					} else {
						html += "<tr class=\"cursor-defualt\" data-no=\"";
					}
					html += res.getComment[i].comment_no + "\"><td class=\"font-weight-bold text-center\"><div>";
					html += res.getComment[i].member_name;
					html += "</div>";
					// 코멘트를 단 사람이 현재 로그인 사람과 동일할 경우 수정/삭제 버튼 나타남
					if(res.getComment[i].member_no == $("#userNo").val()) {
						html += "<span class=\"commentModBtn cursor-pointer\">&#x1F6E0;</span> / <span class=\"commentDelBtn cursor-pointer\">&#x1F5D1;</span>";
					}
					html += "</td><td class=\"cursor-defualt\">"; 
					// DB에 저장된 코멘트 줄바꿈 처리(textarea 줄바꿈 부분을 br태그로 치환)
					html += res.getComment[i].comment_content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
					html += "<div class=\"text-right text-secondary\">";
					html += res.getComment[i].reg_time;
					html += "</div>";
				}
				html += "</td></tr><tr><td colspan=\"2\" class=\"bg-secondary\"><div>";
				// 유저가 로그인한 상태면 댓글을 등록할 수 있지만, 로그인하지 않은 상태라면 로그인하라고 안내
				if($("#userNo").val() != '') {
					html += "<textarea id=\"commentInput\" name=\"comment\" rows=\"3\" style=\"width: 100%\"></textarea>";
					html += "<div id=\"commentAdd\" class=\"btn btn-danger float-right\">댓글 등록</div>";
				} else {
					html += "<textarea disabled rows=\"3\" style=\"width: 100%\">로그인 후 댓글 쓰기가 가능합니다.</textarea>";
				}
				html += "</div></td></tr>";
				// 변수에 담긴 내용을 가지고 html 코멘트 부분 재생성
				$("#galleryComment").html(html);
				// 코멘트 버튼 이벤트 할당(등록, 수정, 삭제)
				commentButtonEvent(2);
			} else if(res.result == "fail") {
				alert("코멘트를 불러올 수 없습니다.");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}


/**
 * 코멘트 수정할 때 기존 코멘트 내용을 불러오는 function
 * 
 * getGalleryComment - comment_content(코멘트 내용)
 * 
 */
function commentOne() {
	$("#actionForm").attr("action", "getCommentAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getGalleryCommentAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 수정을 원하는 코멘트 내용을 불러옴
				$("#modCommentTextarea").val(res.getComment[0].comment_content);
			} else if(res.result == "fail") {
				alert("댓글을 불러올 수 없습니다.");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}


/**
 * 본문 삭제 Ajax
 * 
 */
function contentDel() {
	var params = $("#contentForm").serialize();
	$.ajax({
		type : "post",			  
		url : "galleryContentDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				location.href = "gallery";
			} else if(res.result == "fail") {
				alert("error");
			} else if(res.result == "abnormal") {
				alert("로그인해주세요.")
				location.href = "login";
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}


/**
 * 댓글 추가 Ajax
 * 
 */
function commentAdd() {
	if($("#commentInput").val() == "" || $("#commentInput").val() == null) {
		alert("내용을 입력해주세요.");
	} else {
		$("#actionForm").attr("action", "galleryCommentAddAjax");
		var params = $("#actionForm").serialize();
		$.ajax({
			type : "post",			  
			url : "galleryCommentAddAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				// 댓글 삭제 결과 반환 시 동작
				commentResult(res);
			},
			error : function(request, status, error) {
				console.log("text : " + request.responseTxt);
				console.log("error : " + error);
			}			
		});
	}
}


/**
 * 댓글 수정 Ajax
 * 
 */
function commentMod() {
	if($("#modCommentTextarea").val() == "" || $("#modCommentTextarea").val() == null) {
		alert("내용을 입력해주세요.");
	} else {
		var params = $("#contentForm").serialize();
		$.ajax({
			type : "post",			  
			url : "galleryCommentModAjax", 
			dataType : "json",
			data : params,
			success : function(res) {
				// 댓글 삭제 결과 반환 시 동작
				commentResult(res);
				$("#notifyModal").modal("hide");
			},
			error : function(request, status, error) {
				console.log("text : " + request.responseTxt);
				console.log("error : " + error);
			}			
		});
	}
}


/**
 * 댓글 삭제 Ajax
 * 
 */
function commentDel() {
	$("#delForm").attr("action", "galleryCommentDelAjax");
	var params = $("#contentForm").serialize();
	$.ajax({
		type : "post",			  
		url : "galleryCommentDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			// 댓글 삭제 결과 반환 시 동작
			commentResult(res);
			$("#notifyModal").modal("hide");
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}