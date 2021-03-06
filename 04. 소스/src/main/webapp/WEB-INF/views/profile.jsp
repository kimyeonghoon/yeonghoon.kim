<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>yeonghoon.kim :: 메인</title>
<!-- 헤더 영역 -->
<c:import url="/header"></c:import>
<!-- 공통 js -->
<script src="resources/js/common.js"></script>
<!-- profile js -->
<script src="resources/js/profile.js"></script>
<!-- profileRedraw js -->
<script src="resources/js/profileRedraw.js"></script>
<!-- profileAjax js -->
<script src="resources/js/profileAjax.js"></script>
<!-- jQuery UI js -->
<script src="resources/jquery/jquery-ui.js"></script>
<!-- jQuery UI CSS -->
<link rel="stylesheet" href="resources/jquery/jquery-ui.css">
<!-- jQuery Form -->
<script src="resources/jquery/jquery.form.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	loginStatusMenu('${sMember_no}');
	// 프로필 초기화
	init_profile();
	$("#profile").attr("class", "nav-link active");
	
});
</script>
<style type="text/css">
.imgPopover,
.educationModBtn,
.educationDelBtn,
.companyModBtn,
.companyDelBtn,
.careerModBtn,
.careerDelBtn,
.academyModBtn,
.academyDelBtn,
.certificateModBtn,
.certificateDelBtn
{
	cursor: pointer;
}
</style>
</head>
<body>
<!-- nav 영역 -->
<c:import url="/nav"></c:import>
<div class="p-3 border border border-top-0 border-bottom-0 border-dark contents_area" id="contentsArea">
	<div class="container">
		<!-- 약력  -->
		<div id="briefHistory">
		</div>
	</div>
	<div id="accordion">
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#education">학력</a>
				${educationAddBtn}
			</div>
			<div class="collapse show" id="education" data-parent="#accordion">
				<input type="hidden" id="pickEdu" name="pickEdu">
				<div class="card-body p-0" id="educationList">
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#career">경력</a>
				${careerAddBtn}
				${companyAddBtn}
			</div>
			<div class="collapse" id="career" data-parent="#accordion">
				<input type="hidden" id="pickCompany" name="pickCompany">
				<input type="hidden" id="pickCareer" name="pickCareer">
				<div class="card-body p-0" id="careerList">
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#skill">보유기술</a>
				${skillDelBtn}
				${skillAddBtn}
			</div>
			<div class="collapse" id="skill" data-parent="#accordion">
				<div class="card-body p-0" id="skillList">
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#academy">교육</a>
				${academyAddBtn}
			</div>
			<div class="collapse" id="academy" data-parent="#accordion">
				<input type="hidden" id="pickAcademy" name="pickAcademy">
				<div class="card-body p-0" id="academyList">
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-header font-weight-bold bg-secondary">
				<a class="card-link text-light" data-toggle="collapse" href="#certificate">자격증</a>
				${certificationAddBtn}
			</div>
			<div class="collapse" id="certificate" data-parent="#accordion">
				<input type="hidden" id="pickCertificate" name="pickCertificate">
				<div class="card-body p-0" id="certificateList">
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 푸터영역 -->
<c:import url="/footer"></c:import>
</body>
</html>