package kim.yeonghoon.www.menu.controller;

import java.util.HashMap;
import java.util.List;

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

		try {
			List<HashMap<String,String>> list = iJoinService.getBTS();
			mav.addObject("list", list);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		
		mav.setViewName("join");
		return mav;
	}
}
