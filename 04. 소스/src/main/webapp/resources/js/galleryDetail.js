// 게시글 그리기
function redrawContent() {
	$("#actionForm").attr("action", "getGalleryContentAjax");
	var params = $("#actionForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "getGalleryContentAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				html += "<tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">작성일</td><td>";
				html += res.getGalleryContent.reg_time
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">작성자</td><td>";
				html += res.getGalleryContent.member_name;
				html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">제목</td><td>";
				html += res.getGalleryContent.content_name;
				if(res.getGalleryContent.path1 != undefined) {
					html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">첨부파일#1</td><td>";
					html += "<a href=\"" + res.getGalleryContent.path1 + "\" target=\"_blank\">" + res.getGalleryContent.origianl_name1 + "</a>";
				}
				if(res.getGalleryContent.path2 != undefined) {
					html += "</td></tr><tr class=\"table-secondary\"><td class=\"font-weight-bold text-center\">첨부파일#2</td><td>";
					html += "<a href=\"" + res.getGalleryContent.path2 + "\" target=\"_blank\">" + res.getGalleryContent.origianl_name2 + "</a>";
				}
				html += "</td></tr><tr><td class=\"p-3\" colspan=\"2\"><div class=\"row\"><div class=\"col-sm-1\"></div><div class=\"col-sm-10 pt-5 pb-5\" >";
				html += res.getGalleryContent.content_detail;
				html += "</div><div class=\"col-sm-1\"></div></div></td></tr>";
				
				$("#galleryDetail").prepend(html);
				
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
//코멘트 그리기
function redrawComment() {
	$("#commentNo").val(null);
	$("#actionForm").attr("action", "getGalleryCommentAjax");
	var params = $("#actionForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "getGalleryCommentAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				
				var html = "";
				for(var i = 0; i < res.getComment.length; i++) {
					if(i % 2 == 0) {
						html += "<tr class=\"table-secondary\" data-no=\"";
					} else {
						html += "<tr data-no=\"";
					}
					html += res.getComment[i].comment_no + "\"><td class=\"font-weight-bold text-center\"><div>";
					html += res.getComment[i].member_name;
					html += "</div>";
					if(res.getComment[i].member_no == $("#userNo").val()) {
						html += "<span class=\"commentModBtn\">&#x1F6E0;</span> / <span class=\"commentDelBtn\">&#x1F5D1;</span>";
					}
					html += "</td><td>"; 
					html += res.getComment[i].comment_content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
					html += "<div class=\"text-right text-secondary\">";
					html += res.getComment[i].reg_time;
					html += "</div>";
				}
				html += "</td></tr><tr><td colspan=\"2\" class=\"bg-secondary\"><div>";
				if($("#userNo").val() != '') {
					html += "<textarea name=\"comment\" rows=\"3\" style=\"width: 100%\"></textarea>";
					html += "<div id=\"commentAdd\" class=\"btn btn-danger float-right\">댓글 등록</div>";
				} else {
					html += "<textarea disabled rows=\"3\" style=\"width: 100%\">로그인 후 댓글 쓰기가 가능합니다.</textarea>";
				}
				html += "</div></td></tr>";
				
				$("#galleryComment").html(html);
				
				$("#commentAdd").on("click", function(){
					commentAdd();
				});
				
				$(".commentModBtn").on("click", function() {
					$("#commentNo").val($(this).parent().parent().attr("data-no"));
					$("[name='popupCheck']").val("4");
					modalPopup();
				});

				$(".commentDelBtn").on("click", function() {
					$("#commentNo").val($(this).parent().parent().attr("data-no"));
					$("[name='popupCheck']").val("3");
					modalPopup();
				});
				
				
				
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

// 코멘트 조회(수정용)
function commentOne() {
	$("#actionForm").attr("action", "getCommentAjax");
	var params = $("#actionForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "getGalleryCommentAjax", 
		dataType : "json",
		data : params,
		success : function(res) {
			if(res.result == "success") {
				$("#modCommentTextarea").val(res.getComment[0].comment_content);
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

// 팝업창 생성
function modalPopup() {
	// 기존 모달 삭제
	$("#notifyModal").remove();
	var html = "";
	html += "<div class=\"modal fade\" id=\"notifyModal\">";
	html += "<div class=\"modal-dialog p-3 \">";
	html += "<div class=\"modal-content\">";
	html += "<div class=\"modal-header\">";
	if($("[name='popupCheck']").val() == "4") {
		html += "<h4 class=\"modal-title\">댓글 수정</h4>";
	} else {
		html += "<h4 class=\"modal-title\">알림</h4>";
	}
	html += "</div>";
	html += "<div class=\"modal-body\">";
	html += "<form id=\"contentForm\" action=\"#\" method=\"post\"><input type=hidden id=\"coNo\" name=\"coNo\" /><input type=hidden id=\"uNo\" name=\"uNo\" /><input type=hidden id=\"bNo\" name=\"bNo\" />";
	if($("[name='popupCheck']").val() == "1") {
		html += "게시물을 삭제하시겠습니까?";
	} else if($("[name='popupCheck']").val() == "2") {
		html += "게시물을 수정하시겠습니까?";
	} else if($("[name='popupCheck']").val() == "3") {
		html += "댓글을 삭제하시겠습니까?";
	} else if($("[name='popupCheck']").val() == "4") {
		html += "<textarea id=\"modCommentTextarea\" name=\"comment\" rows=\"3\" style=\"width: 100%\"></textarea>";
	}
	html += "</form></div>";
	html += "<div class=\"modal-footer\">";
	if($("[name='popupCheck']").val() == "1") {
		html += "<button id=\"delContentBtn\" type=\"button\" class=\"btn btn-danger\">삭제</button>";
	} else if($("[name='popupCheck']").val() == "2") {
		html += "<button id=\"modContentBtn\" type=\"button\" class=\"btn btn-danger\">수정</button>";
	} else if($("[name='popupCheck']").val() == "3") {
		html += "<button id=\"delCommentBtn\" type=\"button\" class=\"btn btn-danger\">삭제</button></form>";
	} else if($("[name='popupCheck']").val() == "4") {
		html += "<button id=\"modCommentBtn\" type=\"button\" class=\"btn btn-danger\">수정</button></form>";
	}
	html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">닫기</button>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	$("#contentsArea").prepend(html);
	$("#notifyModal").modal("show");

	if($("[name='popupCheck']").val() == "4") {
		commentOne();
	}
	
	if($("[name='popupCheck']").val() == "1") {
		$("#uNo").val($("#userNo").val());
		$("#bNo").val($("#boardNo").val());
		
		$("#delContentBtn").on("click", function() {
			$("#contentForm").attr("action", "galleryContentDelAjax");
			contentDel();
		});
	}
	
	if($("[name='popupCheck']").val() == "2") {
		$("#uNo").val($("#userNo").val());
		$("#bNo").val($("#boardNo").val());
		
		$("#modContentBtn").on("click", function() {
			$("#contentForm").attr("action", "galleryMod");
			$("#contentForm").submit();
			$("#notifyModal").modal("hide");
		});
	}
	
	if($("[name='popupCheck']").val() == "3" || $("[name='popupCheck']").val() == "4") {
		$("#coNo").val($("#commentNo").val());
		$("#uNo").val($("#userNo").val());
		$("#bNo").val($("#boardNo").val());
		
		$("#modCommentBtn").on("click", function() {
			$("#contentForm").attr("action", "commentModAjax");
			commentMod();

		});
		$("#delCommentBtn").on("click", function() {
			$("#contentForm").attr("action", "commentDelAjax");
			commentDel();
		});
	}
	
}

//코멘트 추가
function commentAdd() {
	$("#actionForm").attr("action", "galleryCommentAddAjax");
	var params = $("#actionForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "galleryCommentAddAjax", 
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

//코멘트 삭제
function commentDel() {
	$("#delForm").attr("action", "galleryCommentDelAjax");
	var params = $("#contentForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "galleryCommentDelAjax", 
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

//코멘트 수정
function commentMod() {
	var params = $("#contentForm").serialize();
	console.log(params);
	$.ajax({
		type : "post",			  
		url : "galleryCommentModAjax", 
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

// 글 삭제
function contentDel() {
	var params = $("#contentForm").serialize();
	console.log(params);
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