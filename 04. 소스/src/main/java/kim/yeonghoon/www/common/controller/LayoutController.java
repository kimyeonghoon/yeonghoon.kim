package kim.yeonghoon.www.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LayoutController {
	
	// 헤더 부분(공통적으로 사용하는 jQuery, bootstrap 로드)
	@RequestMapping (value = "/header")
	public ModelAndView header(ModelAndView mav) {
		mav.setViewName("common/header");
		return mav;
	}

	// 네비 부분(네비바 로드)
	@RequestMapping (value = "/nav")
	public ModelAndView nav(ModelAndView mav) {
		mav.setViewName("common/nav");
		return mav;
	}
	
	// 푸터 부분(하단 이메일, 깃허브 주소 로드)
	@RequestMapping (value = "/footer")
	public ModelAndView footer(ModelAndView mav) {
		mav.setViewName("common/footer");
		return mav;
	}
	
}
