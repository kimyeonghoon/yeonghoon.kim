package kim.yeonghoon.www.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LayoutController {

	@RequestMapping (value = "/header")
	public ModelAndView header(ModelAndView mav) {
		mav.setViewName("common/header");
		return mav;
	}

	@RequestMapping (value = "/footer")
	public ModelAndView footer(ModelAndView mav) {
		mav.setViewName("common/footer");
		return mav;
	}
	
}
