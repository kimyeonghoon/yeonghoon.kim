/**
 * board 상세보기 페이지에서 사용하는 function을 모아둔 js 파일
 */


/**
 * 게시글 내용을 그릴 때 사용하는 function
 * 
 * getBoardContent - reg_time(등록시간), member_name(작성자명), content_name(제목), path1(첨부파일1 주소), path2(첨부파일2 주소)
 * 					 origianl_name1(첨부파일1 원래이름), origianl_name2(첨부파일2 원래이름), content_detail(내용)
 * 
 * @param params 현재 게시글의 번호를 서버로 보냄
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
				html += "<tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">작성일</td><td>";
				html += res.getBoardContent.reg_time
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">작성자</td><td>";
				html += res.getBoardContent.member_name;
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">제목</td><td>";
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
 * getBoardContent - reg_time(등록시간), member_name(작성자명), content_name(제목), path1(첨부파일1 주소), path2(첨부파일2 주소)
 * 					 origianl_name1(첨부파일1 원래이름), origianl_name2(첨부파일2 원래이름), content_detail(내용)
 * 
 * @param params 현재 게시글의 번호를 보냄
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
						html += "<tr class=\"table-secondary\" data-no=\"";
					} else {
						html += "<tr data-no=\"";
					}
					html += res.getComment[i].comment_no + "\"><td class=\"font-weight-bold text-center\"><div>";
					html += res.getComment[i].member_name;
					html += "</div>";
					// 코멘트를 단 사람이 현재 로그인 사람과 동일할 경우 수정/삭제 버튼 나타남
					if(res.getComment[i].member_no == $("#userNo").val()) {
						html += "<span class=\"commentModBtn\">&#x1F6E0;</span> / <span class=\"commentDelBtn\">&#x1F5D1;</span>";
					}
					html += "</td><td>"; 
					// DB에 저장된 코멘트 줄바꿈 처리(textarea 줄바꿈 부분을 br태그로 치환)
					html += res.getComment[i].comment_content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
					html += "<div class=\"text-right text-secondary\">";
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
				commentButtonEvent();
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
 * @param params 현재 게시글의 번호와 코멘트의 번호를 보냄
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
 * 코멘트 등록, 수정, 삭제 버튼 이벤트 할당하는 function
 * 코멘트 수정, 삭제의 경우 팝업창이 뜸
 * 
 */
function commentButtonEvent() {
	// 코멘트 등록
	$("#commentAdd").on("click", function(){
		commentAdd();
	});
	
	// 코멘트 수정
	$(".commentModBtn").on("click", function() {
		$("#commentNo").val($(this).parent().parent().attr("data-no"));
		$("[name='popupCheck']").val("4");
		modalPopup(4);
	});
	// 코멘트 삭제
	$(".commentDelBtn").on("click", function() {
		$("#commentNo").val($(this).parent().parent().attr("data-no"));
		$("[name='popupCheck']").val("3");
		modalPopup(3);
	});
}


/**
 * 팝업창 내 버튼 이벤트 할당하는 function
 * 본문 수정/삭제, 코멘트 수정/삭제
 * 
 */
function popupButtonEvent(no) {
	switch (no) {
	// 본문 삭제 팝업
	case 1 : $("#delContentBtn").on("click", function() {
				 $("#contentForm").attr("action", "contentDelAjax");
				 contentDel();
			 });
			 break;
	// 본문 수정 팝업
	case 2 : $("#modContentBtn").on("click", function() {
				 $("#contentForm").attr("action", "boardMod");
				 $("#contentForm").submit();
				 $("#notifyModal").modal("hide");
			 });
			 break;
	// 코멘트 삭제 팝업
	case 3 : $("#modCommentBtn").on("click", function() {
				 $("#contentForm").attr("action", "commentModAjax");
			 	 commentMod();
			 });
			 $("#delCommentBtn").on("click", function() {
				 $("#contentForm").attr("action", "commentDelAjax");
				 commentDel();
			 });
			 break;
	// 코멘트 수정 팝업
	case 4 : $("#modCommentBtn").on("click", function() {
			 	 $("#contentForm").attr("action", "commentModAjax");
				 commentMod();
			 });
			 $("#delCommentBtn").on("click", function() {
				 $("#contentForm").attr("action", "commentDelAjax");
				 commentDel();
			 });
			 break;
	}
}


/**
 * 팝업창을 띄워주는 function
 * 글 수정/삭제, 코멘트 수정/삭제를 할 수 있음
 * 
 */
function modalPopup(no) {
	// 기존 모달 삭제
	$("#notifyModal").remove();
	// 모달 생성
	var html = "";
	html += "<div class=\"modal fade\" id=\"notifyModal\">";
	html += "<div class=\"modal-dialog p-3 \">";
	html += "<div class=\"modal-content\">";
	html += "<div class=\"modal-header\">";
	// 댓글 수정을 제외한 나머지 팝업은 알림으로 지정
	if($("[name='popupCheck']").val() == "4") {
		html += "<h4 class=\"modal-title\">댓글 수정</h4>";
	} else {
		html += "<h4 class=\"modal-title\">알림</h4>";
	}
	html += "</div>";
	html += "<div class=\"modal-body\">";
	html += "<form id=\"contentForm\" action=\"#\" method=\"post\"><input type=hidden id=\"aNo\" name=\"aNo\" /><input type=hidden id=\"coNo\" name=\"coNo\" /><input type=hidden id=\"uNo\" name=\"uNo\" /><input type=hidden id=\"bNo\" name=\"bNo\" />";
	// 팝업 본문 내용(게시글 수정/삭제, 코멘트 수정/삭제) 생성
	switch (no) {
		case 1 : html += "게시물을 삭제하시겠습니까?";
				    break;
		case 2 : html += "게시물을 수정하시겠습니까?";
				 	break;
		case 3 : html += "댓글을 삭제하시겠습니까?";
					break;
		case 4 : html += "<textarea id=\"modCommentTextarea\" name=\"comment\" rows=\"3\" style=\"width: 100%\"></textarea>";
					break;
	}
	html += "</form></div>";
	html += "<div class=\"modal-footer\">";
	// 팝업 수정/삭제 버튼 생성
	switch (no) {
	case 1 : html += "<button id=\"delContentBtn\" type=\"button\" class=\"btn btn-danger\">삭제</button>";
			    break;
	case 2 : html += "<button id=\"modContentBtn\" type=\"button\" class=\"btn btn-danger\">수정</button>";
			 	break;
	case 3 : html += "<button id=\"delCommentBtn\" type=\"button\" class=\"btn btn-danger\">삭제</button></form>";
				break;
	case 4 : html += "<button id=\"modCommentBtn\" type=\"button\" class=\"btn btn-danger\">수정</button></form>";
				break;
	}
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">닫기</button>";
	html += "</div></div></div></div>";
	$("#contentsArea").prepend(html);
	$("#notifyModal").modal("show");
	// 팝업창 내 폼에 값 부여(보드 번호, 유저 번호, 작성자 번호, 코멘트 번호)
	$("#bNo").val($("#boardNo").val());
	$("#uNo").val($("#userNo").val());
	$("#aNo").val($("#authNo").val());
	$("#coNo").val($("#commentNo").val());
	// 팝업창 내 버튼 클릭 이벤트 할당
	popupButtonEvent(no);
	// 만약 코멘트 수정 버튼을 눌렀을 경우 해당 코멘트의 내용 조회
	if(no == 4) {
		commentOne();
	}
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
			if(res.result == "success") {
				redrawComment();
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
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawComment();
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
			if(res.result == "success") {
				$("#notifyModal").modal("hide");
				redrawComment();
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