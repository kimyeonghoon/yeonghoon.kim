<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- jQuery 3.5.1 -->
<script src="resources/jquery/jquery-3.5.1.slim.min.js"></script>
<!-- popper.js 1.16.1 -->
<script src="resources/jquery/popper.min.js"></script>
<!-- Bootstrap JS 4.5.2 -->
<script src="resources/bootstrap/js/bootstrap.min.js"></script>
<!-- Bootstrap CSS 4.5.2 -->
<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
<style type="text/css">
	.contents_area {
		height: 500px;
	}
</style>
</head>
<body>
	<div class="container">
		<nav class="navbar bg-dark navbar-dark navbar-expand-md sticky-top">
			<!-- 메인 -->
			<a href="main" class="navbar-brand font-weight-bold">
				yeonghoon.kim
			</a>
			<!-- 네비바 토글 버튼 -->
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMenu">
				<span class="navbar-toggler-icon"></span>
			</button>
			<!-- 메뉴 -->
			<div class="collapse navbar-collapse font-weight-bold" id="navMenu">
				<!-- 좌측메뉴 -->
				<ul class="navbar-nav">
					<li class="nav-item">
						<a href="profile.html" class="nav-link">프로필</a>
					</li>
					<!-- 2단 메뉴(드롭다운) -->
					<li class="nav-item dropdown">
						<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">포트폴리오</a>
						<div class="dropdown-menu">
							<a href="portpolio1.html" class="dropdown-item">[학원프로젝트] VanillaERP</a>
							<a href="portpolio2.html" class="dropdown-item">[개인프로젝트] yeonghoon.kim</a>
						</div>
					<li class="nav-item">
						<a href="board.html" class="nav-link">게시판</a>
					</li>
					<li class="nav-item">
						<a href="gallary.html" class="nav-link">갤러리</a>
					</li>
				</ul>
				<!-- 우측 매뉴 -->
				<ul class="navbar-nav ml-auto font-weight-bold">
					<li class="nav-item">
						<a href="login.html" class="nav-link text-warning">로그인</a>
					</li>
					<li class="nav-item">
						<a href="join.html" class="nav-link text-danger">회원가입</a>
					</li>
				</ul>
			</div>
		</nav>