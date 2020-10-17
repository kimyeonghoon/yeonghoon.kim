<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="container">
	<nav class="navbar bg-dark navbar-dark navbar-expand-md sticky-top">
		<!-- 메인 -->
		<a href="./" class="navbar-brand font-weight-bold">
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
					<a href="profile" class="nav-link" id="profile">프로필</a>
				</li>
				<li class="nav-item">
					<a href="board" class="nav-link" id="board">게시판</a>
				</li>
				<li class="nav-item">
					<a href="gallery" class="nav-link" id="gallery">갤러리</a>
				</li>
			</ul>
			<!-- 우측 매뉴 -->
			<ul class="navbar-nav ml-auto font-weight-bold" id="loginStatus">
			</ul>
		</div>
	</nav>