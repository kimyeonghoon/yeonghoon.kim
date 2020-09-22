package kim.yeonghoon.www.common.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

@Aspect
public class CommonAOP {
	// menu.controller 아래에 있는 모든 컨트롤러의 메소드 접근 시 로그인 체크
	// 단, Logout, Profile, Join, gallery, galleryDetail, board, boardDetail은 로그인 하지 않아도 볼 수 있도록 함
	@Pointcut("execution(* kim.yeonghoon.www.menu.controller.*Controller.*(..))"
			+ "&&!execution(* kim.yeonghoon.www.menu.controller.ProfileController.*(..))"
			+ "&&!execution(* kim.yeonghoon.www.menu.controller.LogoutController.*(..))"
			+ "&&!execution(* kim.yeonghoon.www.menu.controller.JoinController.*(..))"
			+ "&&!execution(* kim.yeonghoon.www.menu.controller.GalleryController.gallery(..))"
			+ "&&!execution(* kim.yeonghoon.www.menu.controller.GalleryController.galleryDetail(..))"
			+ "&&!execution(* kim.yeonghoon.www.menu.controller.BoardController.board(..))"
			+ "&&!execution(* kim.yeonghoon.www.menu.controller.BoardController.boardDetail(..))"
			+ "&&!execution(* kim.yeonghoon.www..*Ajax*(..))")
	
	public void loginCheckAOP() {}
	
	@Around("loginCheckAOP()")
	public ModelAndView loginCheckAOP(ProceedingJoinPoint joinPoint) throws Throwable {
		ModelAndView mav = new ModelAndView();
		
		//Request 객체 취득
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		//Session 취득
		HttpSession session = request.getSession();
		
		// 세션 번호가 비어있지 않으면 기존 이벤트 진행. 아니면 로그인 페이지로 이동
		if(session.getAttribute("sMember_no") != null) {
			System.out.println("AOP!!!!");
			mav = (ModelAndView)joinPoint.proceed();
		} else {
			mav.setViewName("login");
		}
		return mav;
	}
}
