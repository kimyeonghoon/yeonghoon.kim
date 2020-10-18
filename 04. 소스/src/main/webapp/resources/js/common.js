/**
 * 	공통
 */


/**
 * 페이지 로딩 시 로그인하지 않았다면 네비바에 로그인, 회원가입 표시
 * 로그인 했다면 로그아웃 표시
 * 
 */
function loginStatusMenu(no) {
	var html = "";
	html += "<li class=\"nav-item\">";  
	if(no == null || no == '') {
		html += "<a href=\"login\" class=\"nav-link text-warning\">로그인</a>";
		html += "</li>";
		html += "<li class=\"nav-item\">";
		html += "<a href=\"join\" class=\"nav-link text-danger\">회원가입</a>";
	} else {
		html += "<li class=\"nav-item\">";
		html += "<a href=\"logout\" class=\"nav-link text-danger\">로그아웃</a>";
	}
	html += "</li>";
	$("#loginStatus").prepend(html);
}


/**
 * 검색 버튼 이벤트 할당
 * 
 */
function searchBtnEvent() {
	// 검색 버튼 동작
	$("#searchBtn").on("click", function() {
		if($("#searchGbn").val() == '0' || $("#searchGbn").val() == null) {
			alert("검색 구분을 선택해주세요.");
		} else if($("#searchTxt").val() == '' || $("#searchTxt").val() == null) {
			alert("검색어를 입력해주세요.");
		} else {
			$("#page").val("1");
			reloadList();
		}
	});
	
	// 검색창에서 엔터키 무력화
	$("[name='searchTxt']").on("keypress", function() {
		if(event.keyCode == 13) {
			$("#searchBtn").click();
			return false;
		}		
	});
}


/**
 * 페이징을 그릴 때 사용하는 function
 * 
 * pagingMap - startPageCount(첫 페이지), endPageCount(마지막 페이지), maxPageCount(페이지 총 갯수)
 * 
 */
function redrawPaging(pagingMap) {
	var html = "";
	
	// 첫 페이지는 무조건 1페이지이므로 1 고정
	html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"1\"><<</div></li>";
	
	// 이전 페이지
	if($("#page").val() == 1) {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"1\"><</div></li>";
	} else {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + ($("#page").val() * 1 - 1) + "\"><</div></li>";
	}
	
	// 페이지 넘버
	for(var i = pagingMap.startPageCount ; i <= pagingMap.endPageCount ; i++) {
		if(i == $("#page").val()) {
			html += "<li class=\"page-item active\"><div class=\"page-link\" data-no=\"" + i + "\"><b>" + i + "</b></div>";
		} else {
			html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + i + "\">" + i + "</div>";
		}
	}
	
	// 다음 페이지
	if($("#page").val() == pagingMap.maxPageCount) {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + pagingMap.maxPageCount + "\">></div></li>";
	} else {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + ($("#page").val() * 1 + 1) + "\">></div></li>";
	}
	
	// 마지막 페이지
	html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + pagingMap.maxPageCount + "\">>></div></li>";

	$("#paging").html(html);
	
	// 페이징 버튼 동작
	$(".page-link").on("click", function() {
		$("#page").val($(this).attr("data-no"));
		reloadList();
	});
}


/**
 *	 CKEDITOR 붙이기
 * 
 */
function ckeditorAdd(no) {
	// 이미지 게시판(2)
	if(no == 2) {
		CKEDITOR.replace("contentDetail", {
			toolbar: [{ name: "insert", items: ["Image"] }],
			language : "ko",
			enterMode : "2",
			resize_enabled : false,
			width : "100%",
			height : "450px"
		});
	// 그외 게시판
	} else {
		CKEDITOR.replace("contentDetail", {
			language : "ko",
			enterMode : "2",
			resize_enabled : false,
			width : "100%",
			height : "450px"
		});
	}
}


/**
 * 팝업창 내 버튼 이벤트 할당하는 function
 * 본문 수정(2)/삭제(1), 코멘트 수정(4)/삭제(3)
 * 
 */
function popupButtonEvent(no, board) {
	switch (no) {
	// 본문 삭제 팝업
	case 1 : $("#delContentBtn").on("click", function() {
				 if(board == 1) {
					 $("#contentForm").attr("action", "contentDelAjax");
				 } else if(board == 2) {
					 $("#contentForm").attr("action", "galleryContentDelAjax");
				 } else {
					 return false;
				 }
				 contentDel();
			 });
			 break;
	// 본문 수정 팝업
	case 2 : $("#modContentBtn").on("click", function() {
				 if(board == 1) {
					 $("#contentForm").attr("action", "boardMod");
				 } else if(board == 2) {
					 $("#contentForm").attr("action", "galleryMod");
				 }
				 $("#contentForm").submit();
				 $("#notifyModal").modal("hide");
			 });
			 break;
	// 코멘트 수정(4), 삭제(3) 팝업
	case 3 : case 4 : $("#modCommentBtn").on("click", function() {
							if(board == 1) {
								$("#contentForm").attr("action", "commentModAjax");
							} else if(board == 2) {
								$("#contentForm").attr("action", "galleryCommentModAjax");
							}
						 	commentMod();
						});
						$("#delCommentBtn").on("click", function() {
							if(board == 1) {
								$("#contentForm").attr("action", "commentDelAjax");
							} else if(board == 2) {
								$("#contentForm").attr("action", "galleryCommentDelAjax");
							}
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
function modalPopup(no, board) {
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
	popupButtonEvent(no, board);
	// 만약 코멘트 수정 버튼을 눌렀을 경우 해당 코멘트의 내용 조회
	if(no == 4) {
		commentOne();
	}
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
 * 댓글 관련 Ajax 성공 시 공통적으로 동작하는 부분 처리
 * 
 */
function commentResult(res) {
	if(res.result == "success") {
		redrawComment();
	} else if(res.result == "fail") {
		alert("error");
	} else if(res.result == "abnormal") {
		alert("로그인해주세요.")
		location.href = "login";
	}
}


/**
 * 코멘트 등록, 수정, 삭제 버튼 이벤트 할당하는 function
 * 코멘트 수정, 삭제의 경우 팝업창이 뜸
 * 
 */
function commentButtonEvent(no) {
	// 코멘트 등록
	$("#commentAdd").on("click", function(){
		commentAdd();
	});
	
	// 코멘트 수정
	$(".commentModBtn").on("click", function() {
		$("#commentNo").val($(this).parent().parent().attr("data-no"));
		$("[name='popupCheck']").val("4");
		modalPopup(4, no);
	});
	// 코멘트 삭제
	$(".commentDelBtn").on("click", function() {
		$("#commentNo").val($(this).parent().parent().attr("data-no"));
		$("[name='popupCheck']").val("3");
		modalPopup(3, no);
	});
}
