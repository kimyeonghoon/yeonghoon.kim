package kim.yeonghoon.www.menu.controller;

import java.awt.Dialog.ModalExclusionType;
import java.util.HashMap;
import java.util.Map;

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
	public ModelAndView login(ModelAndView mav) {
		mav.setViewName("login");
		return mav;
	}
	
	@RequestMapping(value = "/loginUserAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String loginUserAjax(@RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		try {
			// 로그인하려는 이메일이 있는지 확인
			int emailCheck = iLoginService.getEmailExistCheck(params);
			
			if(emailCheck > 0) {
				// 디비에 저장된 패스워드와 클라이언트에서 온 패스워드 비교
				String encryptPass = iLoginService.getEncryptPassword(params);
				boolean pwdMatch = pwEncoder.matches(params.get("passwordInput"), encryptPass); 

				if(pwdMatch) {
					modelMap.put("result", "success");
					
				} else {
					modelMap.put("result", "fail");
				}
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}

		return mapper.writeValueAsString(modelMap);
	}
	
	
	
}
