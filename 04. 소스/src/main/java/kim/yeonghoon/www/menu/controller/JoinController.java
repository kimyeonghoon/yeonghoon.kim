package kim.yeonghoon.www.menu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kim.yeonghoon.www.menu.service.IJoinService;

@Controller
public class JoinController {
	
	@Autowired
	public IJoinService iJoinService;
	
	@Autowired
	BCryptPasswordEncoder pwEncoder;
	
	@RequestMapping(value = "/join")
	public ModelAndView join(ModelAndView mav, HttpSession session) {
		
		if(session.getAttribute("sMember_no") != null) {
			mav.setViewName("redirect:main");
		} else {
			try {
				// 기지국 번호 조회
				List<HashMap<String,String>> list = iJoinService.getBTS();
				mav.addObject("list", list);
				mav.addObject("result", "telFirstNo");
			} catch (Throwable e) {
				e.printStackTrace();
				mav.addObject("result", "x");
			}
			mav.setViewName("join");
		}
		return mav;
	}
	
	
	@RequestMapping(value = "/addUserAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String addUserAjax(@RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		// 전화번호 합치기
		String telephone = params.get("telFirstNo") + params.get("telNo");
		params.put("telephone", telephone);

		// 패스워드 암호화
		params.put("passwordInput", pwEncoder.encode(params.get("passwordInput")));
		
		try {
			// 이메일 중복 체크
			int emailCheck = iJoinService.getDuplicationCheck(params);
			
			if(emailCheck > 0) {
				modelMap.put("result", "duplication");
			} else {
				iJoinService.addUser(params);
				modelMap.put("result", "success");
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}

		return mapper.writeValueAsString(modelMap);
	}
}




