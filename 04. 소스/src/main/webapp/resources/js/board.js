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
					html += "<tr data-bNo=" + res.boardList[i].content_no + ">";
					html += "<td class=\"d-none d-xl-table-cell\">" + res.boardList[i].content_no + "</td>";
					html += "<td class=\"text-left\">" + res.boardList[i].content_name + "</td>";
					html += "<td class=\"d-none d-xl-table-cell\">" + res.boardList[i].member_name + "</td>";
					html += "<td>" + res.boardList[i].reg_time + "</td>";
					html += "<td class=\"d-none d-xl-table-cell\">" + res.boardList[i].hit + "</td>";
					html += "</tr>";
				}
				$("#boardList").html(html);
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
			if(res.result == "success") {
				var html = "";
				html += " - " + res.getBoardListCnt + "개";
				$("#boardListCnt").prepend(html);
			} else if(res.result == "fail") {
				alert("총 게시글 수를 불러올 수 없습니다.");
			}
		},
		error : function(request, status, error) {
			console.log("text : " + request.responseTxt);
			console.log("error : " + error);
		}			
	});
}