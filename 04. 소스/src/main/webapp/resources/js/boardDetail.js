/**
 * board 상세보기 페이지에서 사용하는 function을 모아둔 js 파일
 */


/**
 * 게시글 내용을 그릴 때 사용하는 function
 * 
 * getBoardContent - reg_time(등록시간), member_name(작성자명), content_name(제목), path1(첨부파일1 주소), path2(첨부파일2 주소)
 * 					 origianl_name1(첨부파일1 원래이름), origianl_name2(첨부파일2 원래이름), content_detail(내용)
 * 
 */
function redrawContent() {
	$("#actionForm").attr("action", "getBoardContentAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getBoardContentAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				// 게시글 내용을 그림
				var html = "";
				html += "<tr class=\"table-secondary\"><td class=\"font-weight-bold text-center cursor-defualt\">작성일</td><td class=\"cursor-defualt\">";
				html += res.getBoardContent.reg_time
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center cursor-defualt\">작성자</td><td class=\"cursor-defualt\">";
				html += res.getBoardContent.member_name;
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center cursor-defualt\">제목</td><td class=\"cursor-defualt\">";
				html += res.getBoardContent.content_name;
				// 첨부파일1이 존재할 경우 첨부파일1을 그림
				if(res.getBoardContent.path1 != undefined) {
					html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">첨부파일#1</td><td>";
					html += "<a href=\"" + res.getBoardContent.path1 + "\" target=\"_blank\">" + res.getBoardContent.origianl_name1 + "</a>";
				}
				// 첨부파일2가 존재할 경우 첨부파일2를 그림
				if(res.getBoardContent.path2 != undefined) {
					html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">첨부파일#2</td><td>";
					html += "<a href=\"" + res.getBoardContent.path2 + "\" target=\"_blank\">" + res.getBoardContent.origianl_name2 + "</a>";
				}
				html += "</td></tr><tr><td class=\"p-3\" colspan=\"2\"><div class=\"row\"><div class=\"col-sm-1\"></div><div class=\"col-sm-10 pt-5 pb-5\" >";
				html += res.getBoardContent.content_detail;
				html += "</div><div class=\"col-sm-1\"></div></div></td></tr>";
				// 변수에 담긴 내용을 가지고 html 게시글 부분 재생성
				$("#boardDetail").prepend(html);
			} else if(res.result == "fail") {
				// 게시글을 불러오지 못할 경우 이전 페이지인 board로 이동
				alert("게시물을 불러올 수 없습니다");
				location.href = "board";
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
	$("#actionForm").attr("action", "getCommentAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getCommentAjax", 
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
					html += "<div class=\"text-right text-secondary cursor-defualt\">";
					html += res.getComment[i].reg_time;
					html += "</div>";
					}
				html += "</td></tr><tr><td colspan=\"2\" class=\"bg-secondary\"><div>";
				// 유저가 로그인한 상태면 댓글을 등록할 수 있지만, 로그인하지 않은 상태라면 로그인하라고 안내
				if($("#userNo").val() != '') {
					html += "<textarea name=\"comment\" rows=\"3\" style=\"width: 100%\"></textarea>";
					html += "<div id=\"commentAdd\" class=\"btn btn-danger float-right\">댓글 등록</div>";
				} else {
					html += "<textarea disabled rows=\"3\" style=\"width: 100%\">로그인 후 댓글 쓰기가 가능합니다.</textarea>";
				}
				html += "</div></td></tr>";
				// 변수에 담긴 내용을 가지고 html 코멘트 부분 재생성
				$("#boardComment").html(html);
				// 코멘트 버튼 이벤트 할당(등록, 수정, 삭제)
				commentButtonEvent(1);
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
 * getComment - comment_content(코멘트 내용)
 * 
 */
function commentOne() {
	$("#actionForm").attr("action", "getCommentAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getCommentAjax", 
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
		url : "contentDelAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			// 본문 삭제 성공한다면 게시판 첫 페이지로 이동
			if(res.result == "success") {
				location.href = "board";
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
	$("#actionForm").attr("action", "commentAddAjax");
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "commentAddAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			// 댓글 추가 결과 반환 시 동작
			commentResult(res);
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}


/**
 * 댓글 수정 Ajax
 * 
 */
function commentMod() {
	var params = $("#contentForm").serialize();
	$.ajax({
		type : "post",			  
		url : "commentModAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			// 댓글 수정 결과 반환 시 동작
			commentResult(res);
			$("#notifyModal").modal("hide");
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}


/**
 * 댓글 삭제 Ajax
 * 
 */
function commentDel() {
	$("#delForm").attr("action", "commentDelAjax");
	var params = $("#contentForm").serialize();
	$.ajax({
		type : "post",			  
		url : "commentDelAjax", 
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
