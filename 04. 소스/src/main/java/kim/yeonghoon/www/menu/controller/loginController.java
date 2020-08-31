package kim.yeonghoon.www.menu.controller;

import java.util.HashMap;
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

import kim.yeonghoon.www.menu.service.ILoginService;

@Controller
public class loginController {

	@Autowired
	ILoginService iLoginService;
	
	@Autowired
	BCryptPasswordEncoder pwEncoder;
	
	@RequestMapping(value = "/login")
	public ModelAndView login(ModelAndView mav, HttpSession session) {
		if(session.getAttribute("sMember_no") != null) {
			mav.setViewName("redirect:main");
		} else {
			mav.setViewName("login");
		}
		return mav;
	}
	
	@RequestMapping(value = "/loginUserAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String loginUserAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		boolean passMatch = false;
		
		try {
			// 유저가 디비에 존재하는지 확인
			int userCheck = iLoginService.getUserCheck(params);
			
			if(userCheck > 0) {
				// 유저 정보 조회
				HashMap<String,String> userInfo = iLoginService.getUserInfo(params);
				// 유저가 조회될 경우 디비에 암호화되어 저장된 패스워드와 유저가 입력한 패스워드가 맞는지 확인
				if(!userInfo.isEmpty()) {
					passMatch = pwEncoder.matches(params.get("passwordInput"), userInfo.get("member_password"));
				}
				// 패스워드가 맞을 경우 세션 부여
				if(passMatch) {
					session.setAttribute("sMember_no", userInfo.get("member_no"));
					session.setAttribute("sMember_email", userInfo.get("member_email"));
					session.setAttribute("sMember_name", userInfo.get("member_name"));
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				modelMap.put("result", "fail");
			}
			
		} catch (Throwable e) {
			e.printStackTrace();
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	
	
	
}
