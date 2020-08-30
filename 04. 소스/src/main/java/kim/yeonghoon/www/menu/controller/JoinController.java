package kim.yeonghoon.www.menu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kim.yeonghoon.www.menu.service.IJoinService;

@Controller
public class JoinController {
	
	@Autowired
	public IJoinService iJoinService;
	
	@RequestMapping(value = "/join")
	public ModelAndView join(ModelAndView mav) {
		mav.setViewName("join");
		return mav;
	}
}
