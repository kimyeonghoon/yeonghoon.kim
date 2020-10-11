package kim.yeonghoon.www.menu.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kim.yeonghoon.www.menu.service.IProfileService;

@Controller
public class ProfileController {
	/** 
	 * 의존성 주입
	 */
	@Autowired
	IProfileService iProfileService;
	
	
	/**
	 * [profile] profile - profile Request
	 */
	@RequestMapping({ "/", "/profile" })
	public ModelAndView profile(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) throws Throwable {
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// 만약 관리자가 로그인 했다면 등록/수정/삭제 버튼 관련 값을 view로 보냄
		if(currentUser.equals("1")) {
			mav.addObject("educationAddBtn", "<span id='educationAddBtn' class='btn btn-light float-right'>추가</span>");
			mav.addObject("companyAddBtn", "<span class='btn btn-light float-right' id='companyAddBtn'>회사추가</span>");
			mav.addObject("careerAddBtn", "<span class='btn btn-light ml-3 float-right' id='careerAddBtn'>경력추가</span>");
			mav.addObject("skillAddBtn", "<span class='btn btn-light float-right' id='skillAddBtn'>항목 추가</span>");
			mav.addObject("skillDelBtn", "<span class='btn btn-light ml-3 float-right' id='skillDelBtn'>항목 삭제</span>");
			mav.addObject("academyAddBtn", "<span class='btn btn-light float-right' id='academyAddBtn'>추가</span>");
			mav.addObject("certificationAddBtn", "<span class='btn btn-light float-right' id='certificationAddBtn'>추가</span>");
		}
		mav.setViewName("profile");
		return mav;
	}
	
	
	/**
	 * [briefHistory] briefHistoryAjax - 약력 조회 후 profile에 그리는 ajax
	 */
	@RequestMapping(value = "/briefHistoryAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String briefHistoryAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// 만약 관리자가 로그인 했다면 약력 수정 버튼 관련 값을 view로 보냄, 아닐 경우 관리자 번호만 view로 넘김
		if(currentUser.equals("1")) {
			modelMap.put("modBtn", "<div id='briefHistoryModifyBtn' class='btn btn-secondary'>약력수정</div>");
			params.put("member_no", currentUser);
		} else {
			params.put("member_no", "1");
		}
		try {
			// 약력 조회
			HashMap<String,String> briefHistory = iProfileService.getBriefHistory(params);
			modelMap.put("briefHistory", briefHistory);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
		
	
	/**
	 * [briefHistory] bgetBriefHistoryAjax - 약력 수정 팝업 뜰 때 약력을 조회하여 폼에 값을 넣어주는 ajax
	 */
	@RequestMapping(value = "/getBriefHistoryAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getBriefHistoryAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// DB 작업에 필요한 hashmap 생성
		HashMap<String,String> params = new HashMap<String,String>();
		// 세션 번호 취득 후 map에 넣어줌
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 약력 조회
			HashMap<String,String> list = iProfileService.getBriefHistory(params);
			modelMap.put("list", list);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [briefHistory] briefHistoryModifyAjax - 약력 수정  ajax
	 */
	@RequestMapping(value = "/briefHistoryModifyAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String briefHistoryModifyAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득 후 map에 넣어줌
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		// 날짜타입이 공백으로 들어왔을 경우 null 처리
		if(params.get("yearInput").equals("")) {
			params.put("yearInput", null); 
		}
		try {
			// 약력 수정
			int updateBriefHistory = iProfileService.updateBriefHistory(params);
			if(updateBriefHistory > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}


	/**
	 * [education] redrawEducationAjax - 학력 조회 후 profile에 그리는 ajax
	 */
	@RequestMapping(value = "/redrawEducationAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String redrawEducationAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// 만약 관리자가 로그인 했다면 학력 수정/삭제 버튼 관련 값을 view로 보냄
		if(currentUser.equals("1")) {
			modelMap.put("educationModDelBtn",
					"<span class='educationModBtn'>&#x1F6E0;</span>&nbsp;<span class='educationDelBtn'>&#x1F5D1;</span>");
		}
		// 관리자 번호 hashmap에 담음
		params.put("member_no", "1");
		try {
			// 학력 조회
			List<HashMap<String,String>> getEducation = iProfileService.getEducation(params);
			modelMap.put("getEducation", getEducation);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [education] educationAddAjax - 학력 추가 ajax
	 */
	@RequestMapping(value = "/educationAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String educationAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 공백값이 서버로 들어올 경우 null 처리(입학, 기타사항, 학과)
		if(params.get("graduatedInput") == "") {
			params.put("graduatedInput", null);
		}
		if(params.get("etcInput") == "") {
			params.put("etcInput", null);
		}
		if(params.get("departmentInput") == "") {
			params.put("departmentInput", null);
		}
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 교육 추가
			int educationAddCnt = iProfileService.educationAdd(params);
			if(educationAddCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	

	/**
	 * [education] educationOneViewAjax - 선택한 학력 조회 ajax(수정용)
	 */
	@RequestMapping(value = "/educationOneViewAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String educationOneViewAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 학력 조회
			List<HashMap<String,String>> getEducation = iProfileService.getEducation(params);
			modelMap.put("getEducation", getEducation);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [education] educationModAjax - 학력 수정 ajax
	 */
	@RequestMapping(value = "/educationModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String educationModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 공백이 서버로 들어올 경우 null 처리
		if(params.get("graduatedInput") == "") {
			params.put("graduatedInput", null);
		}
		if(params.get("etcInput") == "") {
			params.put("etcInput", null);
		}
		if(params.get("departmentInput") == "") {
			params.put("departmentInput", null);
		}
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 학력 수정
			int educationModCnt = iProfileService.educationMod(params);
			if(educationModCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [education] educationDelAjax - 학력 삭제 ajax
	 */
	@RequestMapping(value = "/educationDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String educationDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 공백이 서버로 들어올 경우 null 처리
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 학력 삭제
			int educationDelCnt = iProfileService.educationDel(params);
			if(educationDelCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] redrawCareerAjax - 경력 조회 후 profile에 그리는 ajax
	 */
	@RequestMapping(value = "/redrawCareerAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String redrawCareerAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", "1");
		// 관리자로 접속했을 경우 회사 수정/삭제 버튼 view로 넘김
		if(currentUser.equals("1")) {
			modelMap.put("companyModDelBtn",
					"&nbsp;<span id='companyModBtn' class='companyModBtn' >&#x1F6E0;</span>&nbsp;<span class='companyDelBtn' id='companyDelBtn'>&#x1F5D1;</span>");
			modelMap.put("careerModDelBtn",
					"&nbsp;<span class='careerModBtn' id='careerModBtn'>&#x1F6E0;</span><span id='careerDelBtn' class='careerDelBtn'>&#x1F5D1;</span>");
		}
		try {
			// 회사 리스트 조회
			List<HashMap<String,String>> companyList = iProfileService.companyList(params);
			// 경력 리스트 조회
			List<HashMap<String,String>> careerList = iProfileService.careerList(params);
			modelMap.put("companyList", companyList);
			modelMap.put("careerList", careerList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] companyAddAjax - 회사 추가 ajax
	 */
	@RequestMapping(value = "/companyAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String companyAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 공백으로 서버로 들어올 경우 null 처리(증명서류ㅡ 입사년월)
		if(params.get("certificateInput") == "") {
			params.put("certificateInput", null);
		}
		if(params.get("leaveInput") == "") {
			params.put("leaveInput", null);
		}
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 회사 추가
			int companyAddCnt = iProfileService.companyAdd(params);
			if(companyAddCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] companyOneViewAjax - 선택한 회사 수정 전 데이터 조회하는 ajax
	 */
	@RequestMapping(value = "/companyOneViewAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String companyOneViewAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 회사 리스트 조회
			List<HashMap<String,String>> companyList = iProfileService.companyList(params);
			modelMap.put("companyList", companyList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] companyModAjax - 회사 수정 ajax
	 */
	@RequestMapping(value = "/companyModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String companyModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 회사 수정
			int companyModCnt = iProfileService.companyMod(params);
			if(companyModCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] companyDelAjax - 회사 삭제 ajax
	 */
	@RequestMapping(value = "/companyDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String companyDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 회사 삭제
			int companyDelCnt = iProfileService.companyDel(params);
			if(companyDelCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	
	/**
	 * [career] companyListAjax - 경력 추가 팝업 실행될 때 회사 리스트 조회하는 ajax
	 */
	@RequestMapping(value = "/companyListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String companyListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 회사 리스트 조회
			List<HashMap<String,String>> companyList = iProfileService.companyList(params);
			modelMap.put("companyList", companyList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] careerAddAjax - 경력 추가 ajax
	 */
	@RequestMapping(value = "/careerAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String careerAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 경력 추가
			int careerAddCnt = iProfileService.careerAdd(params);
			if(careerAddCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] careerOneViewAjax - 수정할 경력 팝업 실행될 때 해당 조회 후 폼에 넣어주는 ajax
	 */
	@RequestMapping(value = "/careerOneViewAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String careerOneViewAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 공백이 서버로 들어올 경우 null 처리
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 경력 조회
			List<HashMap<String,String>> careerList = iProfileService.careerList(params);
			modelMap.put("careerList", careerList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] careerModAjax - 경력 수정 ajax
	 */
	@RequestMapping(value = "/careerModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String careerModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 경력 수정
			int careerModCnt = iProfileService.careerMod(params);
			if(careerModCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [career] careerDelAjax - 경력 삭제 ajax
	 */
	@RequestMapping(value = "/careerDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String careerDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			// 경력 삭제
			int careerDelCnt = iProfileService.careerDel(params);
			if(careerDelCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [tech] redrawTechAjax - 보유기술 조회 후 profile에 그리는 ajax
	 */
	@RequestMapping(value = "/redrawTechAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String redrawTechAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 기술 카테고리 개수 추출
			int getTechCategoryCnt = iProfileService.getTechCategoryCnt();
			// 기술 카테고리 조회
			List<HashMap<String,String>> getTechCategory = iProfileService.getTechCategory();
			// 기술 리스트 뽑기
			for(int i = 1; i <= getTechCategoryCnt; i++) {
				// 배열 선언 및 초기화
				List<String> getTech = new ArrayList<String>();
				if(getTech.size() > 0) {
					getTech.clear();
				}
				// 카테고리에 있는 기술 조회
				getTech = iProfileService.getTech(i);
				// 조회한 기술을 modelMap에 담음
				String techName = "tech" + (i - 1);
				modelMap.put(techName, getTech);
			}
			// 기술 카테고리 및 기술 카테고리 갯수 modelMap에 담음
			modelMap.put("getTechCategory", getTechCategory);
			modelMap.put("getTechCategoryCnt", getTechCategoryCnt);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [tech] techCategoryListAjax - 보유기술 추가 팝업 뜰 때 기술 카테고리 조회 후 form에 값 넣어주는 ajax
	 */
	@RequestMapping(value = "/techCategoryListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String techCategoryListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			// 기술 카테고리 조회
			List<HashMap<String,String>> getTechCategory = iProfileService.getTechCategory();
			modelMap.put("techCategoryList", getTechCategory);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [tech] techAddAjax - 보유기술 추가  ajax
	 */
	@RequestMapping(value = "/techAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String techAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 기술 추가
			int techAdd = iProfileService.techAdd(params);
			if(techAdd > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	

	
	/**
	 * [tech] techCategoryListAjax - 보유기술 삭제 팝업에서 카테고리 선택 시 기술리스트 동적으로 조회하는 ajax
	 */
	@RequestMapping(value = "/techListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String techListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		try {
			// 기술 리스트 조회
			List<HashMap<String,String>> techList = iProfileService.techList(params);
			modelMap.put("techList", techList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
		

	/**
	 * [tech] techAddAjax - 보유기술 삭제  ajax
	 */
	@RequestMapping(value = "/techDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String techDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 기술 삭제
			int techDel = iProfileService.techDel(params);
			if(techDel > 0) {
				modelMap.put("techDel", techDel);
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [academy] redrawAcademyAjax - 교육 조회 후 profile에 그리는 ajax
	 */
	@RequestMapping(value = "/redrawAcademyAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String redrawAcademyAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		// 관리자로 접속했을 경우  교육 수정/삭제 버튼 view 전달 
		if(currentUser.equals("1")) {
			modelMap.put("academyModDelBtn",
					"&nbsp;<span id='academyModBtn' class='academyModBtn'>&#x1F6E0;</span>&nbsp;<span id='academyDelBtn' class='academyDelBtn'>&#x1F5D1;</span>");
		}
		params.put("member_no", "1");
		try {
			// 교육 조회
			List<HashMap<String,String>> getAcademy = iProfileService.getAcademy(params);
			modelMap.put("getAcademy", getAcademy);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [academy] academyAddAjax - 교육  추가 ajax
	 */
	@RequestMapping(value = "/academyAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String academyAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			
			int academyAddCnt = iProfileService.academyAdd(params);
			
			if(academyAddCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [academy] academyOneViewAjax - 교육 수정 팝업 뜰 때 선택한 교육 조회 후 form에 값 넣어주는 ajax
	 */
	@RequestMapping(value = "/academyOneViewAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String academyOneViewAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 교육 조회
			List<HashMap<String,String>> getAcademy = iProfileService.getAcademy(params);
			modelMap.put("getAcademy", getAcademy);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [academy] academyModAjax - 교육 수정 ajax
	 */
	@RequestMapping(value = "/academyModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String academyModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 교육 수정
			int academyModCnt = iProfileService.academyMod(params);
			if(academyModCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	/**
	 * [academy] academyDelAjax - 교육 삭제 ajax
	 */
	@RequestMapping(value = "/academyDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String academyDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		// 세션 번호 취득
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			// 교육 삭제
			int academyDelCnt = iProfileService.academyDel(params);
			if(academyDelCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	
	@RequestMapping(value = "/redrawCertificateAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String redrawCertificateAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		if(currentUser.equals("1")) {
			modelMap.put("certificateModDelBtn",
					"&nbsp;<span id=\"certificateModBtn\" class=\"certificateModBtn\">&#x1F6E0;</span>&nbsp;<span id=\"certificateDelBtn\" class=\"certificateDelBtn\">&#x1F5D1;</span>");
			params.put("member_no", currentUser);
		} else {
			params.put("member_no", "1");
		}
		
		try {
			List<HashMap<String,String>> getCertificate = iProfileService.getCertificate(params);
			
			modelMap.put("getCertificate", getCertificate);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	

	
	@RequestMapping(value = "/certificateAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String certificateAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			
			int certificateAddCnt = iProfileService.certificateAdd(params);
			
			if(certificateAddCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	

	
	@RequestMapping(value = "/certificateOneViewAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String certificateOneViewAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			
			List<HashMap<String,String>> getCertificate = iProfileService.getCertificate(params);
			
			modelMap.put("getCertificate", getCertificate);
			modelMap.put("result", "success");
			
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	

	
	@RequestMapping(value = "/certificateModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String certificateModlAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			
			int certificateModCnt = iProfileService.certificateMod(params);

			if(certificateModCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	

	
	@RequestMapping(value = "/certificateDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String certificateDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		try {
			
			int certificateDelCnt = iProfileService.certificateDel(params);

			if(certificateDelCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	
}
