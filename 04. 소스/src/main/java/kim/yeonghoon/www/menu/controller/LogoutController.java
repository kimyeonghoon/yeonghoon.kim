package kim.yeonghoon.www.menu.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class LogoutController {

	@RequestMapping(value = "/logout")
	public ModelAndView login(ModelAndView mav, HttpSession session) {
		session.invalidate();
		mav.setViewName("redirect:/");
		return mav;
	}
	
}
