// 게시글 그리기
function redrawList() {
	$.ajax({
		type : "post",			  
		url : "getBoardListAjax", 
		dataType : "json",
		success : function(res) {
			if(res.result == "success") {
				var html = "";
				for(var i = 0; i < res.boardList.length; i++) {
					html += "<tr data-bNo=\"" + res.boardList[i].content_no + "\"data-authNo=\"" + res.boardList[i].auth_no + "\">";
					html += "<td class=\"d-none d-xl-table-cell\">" + res.boardList[i].content_no + "</td>";
					html += "<td class=\"text-left\">" + res.boardList[i].content_name;
					if(res.boardList[i].commentCnt != undefined) {
						html += " [<b>" + res.boardList[i].commentCnt + "</b>]";
					}
					html += "</td>";
					html += "<td class=\"d-none d-xl-table-cell\">" + res.boardList[i].member_name + "</td>";
					html += "<td>" + res.boardList[i].reg_time + "</td>";
					html += "<td class=\"d-none d-xl-table-cell\">" + res.boardList[i].hit + "</td>";
					html += "</tr>";
				}
				$("#boardList").html(html);
				
				$("#boardList > tr").on("click", function() {
					if($(this).attr("data-bNo") != null) {
						$("#boardNo").val($(this).attr("data-bNo"));
						$("#authNo").val($(this).attr("data-authNo"));
						$("#actionForm").attr("action", "boardDetail");
						$("#actionForm").submit();
					} else {
						return false;
					}
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

//총 글 갯수 그리기
function redrawListCnt() {
	$.ajax({
		type : "post",			  
		url : "getBoardListCntAjax", 
		dataType : "json",
		success : function(res) {
			var html = "";
			if(res.result == "success") {
				html += " - " + res.getBoardListCnt + "개";
			} else if(res.result == "fail") {
				html += "게시글이 존재하지 않습니다.";
			}
			$("#boardListCnt").prepend(html);
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}