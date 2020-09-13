// 게시판을 다시 그리는 function
function reloadList() { 
	var params = $("#actionForm").serialize();
	$.ajax({
		type : "post",			  
		url : "getGalleryListAjax", 	  
		dataType : "json",  	 
		data : params,    		  
		success : function(res) { 
			if(res.result == "success") {
				redrawList(res.galleryList);
				redrawPaging(res.pagingMap);
			} else {
				alert("에러 발생");
			}
		},
		error : function(reqsuest, status, error) {  
			console.log("text : " + reqsuest.responseTxt);
			console.log("error : " + error);
		}
	});
}


// 게시글 그리기
function redrawList(galleryList) {
	var html = "";
	if(galleryList.length > 0) {
		for(var i = 0; i < galleryList.length; i++) {
			html += "<div class=\"col-md-4 mb-5\" data-bNo=\"" + galleryList[i].content_no + "\"data-authNo=\"" + galleryList[i].auth_no + "\">";
			html += "<div class=\"card shadow-sm\">";
			html += "<div class=\"card-img-top d-flex\">";
			html += "<img style=\"width:100%\" class=\"justify-content-center\" src=\"";
			html += galleryList[i].thumbnail_path + "\" />";
			html += "</div><div class=\"card-body bg-dark text-light\">";
			html += galleryList[i].content_name;
			html += "</div><div class=\"card-footer font-weight-bold\"><span class=\"mr-2\">";
			html += galleryList[i].member_name;
			html += "</span>&nbsp;<span class=\"mr-2\">";
			html += galleryList[i].reg_time;
			html += "</span>&nbsp;<span>";
			html += galleryList[i].hit
			html += "</span></div></div></div>";
		}
	} else {
		alert("갤러리를 불러올 수 없습니다.");
	}
	
	$("#galleryList").html(html);
	
	$("#galleryList > div").on("click", function() {
		alert("이미지 클릭");
		if($(this).attr("data-bNo") != null) {
			$("#boardNo").val($(this).attr("data-bNo"));
			$("#authNo").val($(this).attr("data-authNo"));
			$("#actionForm").attr("action", "boardDetail");
			$("#actionForm").submit();
		} else {
			return false;
		}
	});
}

//총 글 갯수 그리기
function redrawListCnt() {
	$.ajax({
		type : "post",			  
		url : "getGalleryListCntAjax", 
		dataType : "json",
		success : function(res) {
			var html = "";
			if(res.result == "success") {
				html += " - " + res.getGalleryListCnt + "개";
			} else if(res.result == "fail") {

			}
			$("#galleryListCnt").prepend(html);
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}

// 페이징 그리기
function redrawPaging(pagingMap) {
	var html = "";
	
	html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"1\"><<</div></li>";
	
	if($("#page").val() == 1) {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"1\"><</div></li>";
	} else {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + ($("#page").val() * 1 - 1) + "\"><</div></li>";
	}
	
	for(var i = pagingMap.startPageCount ; i <= pagingMap.endPageCount ; i++) {
		if(i == $("#page").val()) {
			html += "<li class=\"page-item active\"><div class=\"page-link\" data-no=\"" + i + "\"><b>" + i + "</b></div>";
		} else {
			html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + i + "\">" + i + "</div>";
		}
	}
	
	if($("#page").val() == pagingMap.maxPageCount) {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + pagingMap.maxPageCount + "\">></div></li>";
	} else {
		html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + ($("#page").val() * 1 + 1) + "\">></div></li>";
	}
	html += "<li class=\"page-item\"><div class=\"page-link\" data-no=\"" + pagingMap.maxPageCount + "\">>></div></li>";

	console.log("pagingMap.startPageCount : " + pagingMap.startPageCount);
	console.log("pagingMap.endPageCount : " + pagingMap.endPageCount);
	console.log("pagingMap.maxPageCount : " + pagingMap.maxPageCount);
	$("#paging").html(html);
}
