<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

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
			<ul class="navbar-nav ml-auto font-weight-bold" id="loginStatus">
			</ul>
		</div>
	</nav>