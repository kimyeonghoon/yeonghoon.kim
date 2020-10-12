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
<script src="resources/js/galleryAddAndMod.js"></script>
<!-- jQuery Form -->
<script src="resources/jquery/jquery.form.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	// nav에 표시될 내용을 위해 사용(로그인, 비로그인 상태에 따라 표시되는 것이 다름)
	loginStatusMenu(${sMember_no});
	
	// ckeditor 추가
	ckeditorAdd(2);
	
	// 버튼 이벤트 할당
	buttonEvent(2);
	
	// nav메뉴에서 현재 위치 표시(게시판)
	$("#gallery").attr("class", "nav-link active");
});
	
</script>
<!-- galleryAddAndMod css -->
<link rel="stylesheet" type="text/css" href="resources/css/galleryAddAndMod.css" />
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<!-- 본문 영역 -->
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area">
	<form action="#" method="post" id="actionForm" enctype="multipart/form-data">
		<input type="hidden" id="userNo" name="userNo" value="${member_no}">
		<input type="hidden" id="boardNo" name="boardNo" value="${boardNo}">
		<input type="hidden" id="authNo" name="authNo" value="${param.aNo}">
		<input type="hidden" name="prevThumbnail" id="prevThumbnail" value="${thumbnail_path}" />
		<table class="table table-sm table-borderless border">
			<colgroup>
				<col width="25%"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
					<td class="font-weight-bold cursor-defualt">작성자</td>
					<td class="cursor-defualt">${member_name}</td>
				</tr>
				<tr>
					<td class="font-weight-bold cursor-defualt">제목</td>
					<td class="cursor-defualt"><input type="text" name="contentName" class="form-control" value="${content_name}"></td>
				</tr>
				<tr class="table-secondary">
					<td class="p-3" colspan="2">
						<textarea id="contentDetail" name="contentDetail">${content_detail}</textarea>					
					</td>
				</tr>
				<tr class="table-secondary">
					<td class="p-3 cursor-defualt" colspan="2">
						썸네일로 사용할 이미지 주소 입력 : <input type="text" id="thumbnail" name="thumbnail" placeholder="${thumbAddress}" /><br/>					
						<span class="text-danger">(*업로드된 이미지 우클릭 해서 파일명 확인)</span>
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