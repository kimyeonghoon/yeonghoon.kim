<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>yeonghoon.kim :: 게시판</title>
<!-- 헤더 영역 -->
<c:import url="/header"></c:import>
<!-- 공통 js -->
<script src="resources/js/common.js"></script>
<!-- boardDetail js -->
<script src="resources/js/boardDetail.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		loginStatusMenu(${sMember_no});
		redrawContent();
		// 게시물 삭제 버튼 클릭 이벤트
		$("#deleteBtn").on("click", function() {
			$("[name='popupCheck']").val("1");
			modalPopup();
		});
		// 게시물 수정 버튼 클릭 이벤트
		$("#modifyBtn").on("click", function() {
			$("[name='popupCheck']").val("2");
			modalPopup();
		});
		// 댓글 삭제 버튼 클릭 이벤트
		$(".commentBtn > a").on("click", function() {
			if(($(this).attr("data-replyBtn")) == "d") {
				$("[name='popupCheck']").val("3");
				modalPopup();
			} else if(($(this).attr("data-replyBtn")) == "m") {
				$("[name='popupCheck']").val("4");
				modalPopup();
			} else {
				return false;
			}
		});
		
		// 목록 버튼 클릭 이벤트
		$("#listBtn").on("click", function() {
			location.href="board.html";
		});
	});
	// 팝업창 생성
	function modalPopup() {
		// 기존 모달 삭제
		$("#notifyModal").remove();
		var html = "";
		html += "<div class=\"modal fade\" id=\"notifyModal\">";
		html += "<div class=\"modal-dialog modal-sm p-3 \">";
		html += "<div class=\"modal-content\">";
		html += "<div class=\"modal-header\">";
		html += "<h4 class=\"modal-title\">알림</h4>";
		html += "</div>";
		html += "<div class=\"modal-body\">";
		if($("[name='popupCheck']").val() == "1") {
			html += "게시물을 삭제하시겠습니까?"
		} else if($("[name='popupCheck']").val() == "2") {
			html += "게시물을 수정하시겠습니까?"
		} else if($("[name='popupCheck']").val() == "3") {
			html += "댓글을 삭제하시겠습니까?"
		} else if($("[name='popupCheck']").val() == "4") {
			html += "댓글을 수정하시겠습니까?"
		}
		html += "</div>";
		html += "<div class=\"modal-footer\">";
		if($("[name='popupCheck']").val() == "1") {
			html += "<button type=\"button\" class=\"btn btn-danger\">삭제</button>";
		} else if($("[name='popupCheck']").val() == "2") {
			html += "<button type=\"button\" class=\"btn btn-danger\">수정</button>";
		} else if($("[name='popupCheck']").val() == "3") {
			html += "<button type=\"button\" class=\"btn btn-danger\">삭제</button>";
		} else if($("[name='popupCheck']").val() == "4") {
			html += "<button type=\"button\" class=\"btn btn-danger\">수정</button>";
		}
		html += "<button type=\"button\" class=\"btn btn-dark\" data-dismiss=\"modal\">닫기</button>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		$("#contentsArea").prepend(html);
		$("#notifyModal").modal("show");
	}
</script>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<form id="actionForm" action="#" method="post">
	<input type="hidden" name="popupCheck" />
	<input type=hidden id="userNo" name="userNo" value="${param.userNo}" />
	<input type=hidden id="boardNo" name="boardNo" value="${param.boardNo}" />
	<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area" id="contentsArea">
		<table class="table table-sm table-borderless border">
			<colgroup>
				<col width="20%"></col>
				<col width="*"></col>
			</colgroup>
			<tbody id="boardDetail">
				<tr>
					<td class="font-weight-bold text-center">
						<div>김영훈</div>
						<div class="commentBtn"><a data-replyBtn="m" href="#">&#x1F6E0;</a> / <a data-replyBtn="d" href="#">&#x1F5D1;</a></div>
					</td>
					<td>
						<div class="text-right text-secondary">2020-08-18 17:48</div>
						댓글 내용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
					</td>
				</tr>
				<tr>
					<td class="font-weight-bold text-center">
						<div>김영훈</div>
						<div class="commentBtn"><a data-replyBtn="m" href="#">&#x1F6E0;</a> / <a data-replyBtn="d" href="#">&#x1F5D1;</a></div>
					</td>
					<td>
						<div class="text-right text-secondary">2020-08-18 17:48</div>
						댓글 내용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
					</td>
				</tr>
				<tr>
					<td class="font-weight-bold text-center">
						<div>김영훈</div>
						<div class="commentBtn"><a data-replyBtn="m" href="#">&#x1F6E0;</a> / <a data-replyBtn="d" href="#">&#x1F5D1;</a></div>
					</td>
					<td>
						<div class="text-right text-secondary">2020-08-18 17:48</div>
						댓글 내용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
					</td>
				</tr>
				<tr>
					<td class="font-weight-bold text-center">
						<div>김영훈</div>
						<div class="commentBtn"><a data-replyBtn="m" href="#">&#x1F6E0;</a> / <a data-replyBtn="d" href="#">&#x1F5D1;</a></div>
					</td>
					<td>
						<div class="text-right text-secondary">2020-08-18 17:48</div>
						댓글 내용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div>
							<textarea rows="3" style="width: 100%"></textarea>
							<div class="btn btn-secondary float-right">댓글 등록</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="btn btn-secondary mr-2" style="display: inline-block;" id="modifyBtn">수정</div>
		<div class="btn btn-secondary" style="display: inline-block;" id="deleteBtn">삭제</div>
		<div class="btn btn-secondary float-right" style="display: inline-block;" id="listBtn">목록</div>
	</div>
</form>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>