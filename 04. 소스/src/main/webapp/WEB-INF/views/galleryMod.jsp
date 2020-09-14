<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>yeonghoon.kim :: 갤러리</title>
<!-- 헤더 영역 -->
<c:import url="/header"></c:import>
<!-- 공통 js -->
<script src="resources/js/common.js"></script>
<!-- ckeditor Form -->
<script src="resources/ckeditor/ckeditor.js"></script>
<!-- galleryMod js -->
<script src="resources/js/galleryMod.js"></script>
<!-- jQuery Form -->
<script src="resources/jquery/jquery.form.js"></script>
<script type="text/javascript">
var thumbnail_address = 'aaa';
	$(document).ready(function() {
		loginStatusMenu(${sMember_no});
		$(document).ready(function() {
			// CKEDITOR 붙이기
			CKEDITOR.replace("contentDetail", {
				language : "ko",
				enterMode : "2",
				resize_enabled : false,
				width : "100%",
				height : "450px"
			});
			
			// 수정 버튼 클릭 이벤트
			$("#modBtn").on("click", function() {
				$("#contentDetail").val(CKEDITOR.instances['contentDetail'].getData());
				$()
				galleryMod();
			});
			// 취소 버튼 클릭 이벤트
			$("#cancelBtn").on("click", function() {
				location.href="board";
			});
		});
	});
	
</script>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area">
	<form action="#" method="post" id="actionForm" enctype="multipart/form-data">
		<input type="hidden" id="userNo" name="userNo" value="${member_no}">
		<input type="hidden" id="boardNo" name="boardNo" value="${boardNo}">
		<input type="hidden" name="prevThumbnail" id="prevThumbnail" value="${thumbnail_path}" />
		<table class="table table-sm table-borderless border">
			<colgroup>
				<col width="25%"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<td class="font-weight-bold">작성자</td>
					<td>${member_name}</td>
				</tr>
				<tr>
					<td class="font-weight-bold">제목</td>
					<td><input type="text" name="contentName" class="form-control" value="${content_name}"></td>
				</tr>
				<tr class="table-secondary">
					<td class="p-3" colspan="2">
						<textarea id="contentDetail" name="contentDetail">${content_detail}</textarea>					
					</td>
				</tr>
				<tr class="table-secondary">
					<td class="p-3" colspan="2">
						썸네일로 사용할 이미지 주소 입력 : <input type="text" id="thumbnail" name="thumbnail" value="${thumbnail_path}" /><br/>					
						<span class="text-danger">(*업로드된 이미지 우클릭 해서 주소 확인)</span>
					</td>
				</tr>
			</tbody>
		</table>
		<div id="modBtn" class="btn btn-secondary" style="display: inline-block;">수정</div>
		<div id="cancelBtn" class="btn btn-secondary float-right" style="display: inline-block;">취소</div>
	</form>
</div>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>