package kim.yeonghoon.www.menu.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kim.yeonghoon.www.menu.service.IGalleryService;

@Controller
public class GalleryController {
	
	@Autowired
	IGalleryService iGalleryService;
	
	@RequestMapping(value = "/gallery")
	public ModelAndView gallery(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		if(currentUser.equals("1")) {
			mav.addObject("addBtn", "<div id='addBtn' class='btn btn-secondary d-inline-block float-right'>등록</div>");
		}
		
		mav.setViewName("gallery");
		return mav;
	}
	
	@RequestMapping(value = "galleryAdd")
	public ModelAndView galleryAdd(ModelAndView mav, HttpSession session) {
	
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		String currentUserName = String.valueOf(session.getAttribute("sMember_name"));
		
		if(!currentUser.equals("1")) {
			mav.setViewName("redirect:/gallery");
		} else {
			mav.addObject("member_no", currentUser);
			mav.addObject("member_name", currentUserName);
			mav.setViewName("galleryAdd");
		}
		return mav;
	}
	
	@RequestMapping(value = "/galleryMod")
	public ModelAndView galleryMod(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		params.put("boardNo", params.get("bNo"));
		
		if(!currentUser.equals("1")) {
			mav.setViewName("redirect:/gallery");
		} else {
			
			try {
				HashMap<String, String> contentMap = iGalleryService.getGalleryContent(params);
				mav.addAllObjects(contentMap);
				
				System.out.println(contentMap);
				mav.setViewName("galleryMod");
				
			} catch (Throwable e) {
				e.printStackTrace();
				mav.setViewName("redirect:/gallery");
			}

		}
		return mav;
	}
	
	@RequestMapping(value = "galleryAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryAddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		params.put("boardNo", "2");
		
		try {
			int getGalleryContentNo = iGalleryService.getGalleryContentNo();
			params.put("autoIncrement", Integer.toString(getGalleryContentNo));
			int galleryAddCnt = iGalleryService.galleryAdd(params);
			modelMap.put("galleryAddCnt", galleryAddCnt);
			modelMap.put("result", "success");
			
			if(params.get("thumbnail") != null && params.get("thumbnail") != "") {
				String webRoot = "C:\\\\Devel\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\www\\"; 
				String uploadPath = "C:\\\\Devel\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\www\\resources\\upload\\";
				String uploadFileName = params.get("thumbnail");
				String fileInput = webRoot + uploadFileName;
				String fileName = uploadFileName.replace("resources/upload/", "");
				String fileExt = fileName.substring(fileName.length()-3, fileName.length());
				
				
				BufferedImage sourceImage = ImageIO.read(new File(fileInput));
				BufferedImage thumnailImage = Scalr.resize(sourceImage, 200, 200);
				String thumnailImgName = "s_" + fileName;
				File newFile = new File(uploadPath + thumnailImgName);
				ImageIO.write(thumnailImage, fileExt, newFile);
				
				params.put("thumbnailPath", "resources/upload/" + thumnailImgName);
				iGalleryService.addThumbnail(params);
			}
			
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}


	@RequestMapping(value = "/galleryDetail")
	public ModelAndView galleryDetail(@RequestParam HashMap<String,String> params, ModelAndView mav, HttpSession session) {
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		System.out.println(params.get("authNo"));
		System.out.println(currentUser);
		System.out.println(currentUser.equals(params.get("authNo")));
		
		if(currentUser.equals(params.get("authNo"))) {
			mav.addObject("modBtn", "<div class='btn btn-secondary  float-right mr-2' style='display: inline-block;' id='modifyBtn'>수정</div>");
			mav.addObject("delBtn", "<div class='btn btn-secondary  float-right' style='display: inline-block;' id='deleteBtn'>삭제</div>");
		}

		mav.setViewName("galleryDetail");
		
		return mav;
	}
	
	@RequestMapping(value = "getGalleryListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getGalleryListAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		
		System.out.println(params.get("page"));
		
		// 페이지값을 못받아올 경우 1페이지로 지정(최초 접속)
		if(params.get("page") == null) {
			params.put("page", "1");
		}
		
		try {
			// [paging - 1] 현재 페이지 취득
			int currentPage = Integer.parseInt(params.get("page"));
			
			// [paging - 2] 총 게시물 수를 구함
			int getGalleryListCnt = iGalleryService.getGalleryListCnt(params);
			
			// [paging - 3] 페이지당 게시글 수 지정(6개) : (취득한 현재 페이지 - 1) * 6
			int viewCount = 6;
			params.put("limitCnt", Integer.toString(viewCount));
			params.put("limitStart", Integer.toString(((currentPage - 1) * 6)));
			
			// [paging - 4] 페이징 개수 지정(5개)
			int pageCount = 5;

			/*
			 	[paging - 5] 총 페이지 계산
			 	1) 총게시물 수 % 페이지당 게시글의 결과가 0일 아닐 경우 : 총 게시물 수 / 페이지당 게시글 수 
			 	2) 총게시물 수 % 페이지당 게시글의 결과가 0일 경우 : 총게시물 수 / 페이지당 게시글 수  + 1
			 */ 
			int maxPageCount = 0;
			if(getGalleryListCnt % viewCount > 0) {
				maxPageCount = (getGalleryListCnt / viewCount) + 1;
			} else {
				maxPageCount = getGalleryListCnt / viewCount;
			}
			/*
			 	[paging - 6] 현재 페이지 기준 시작 페이지 번호 계산
			 	1) 현재 페이지 % 페이징 개수의 결과가 0이 아닐 경우 : (현재 페이지 / 페이징 개수) + 1 
			 	2) 현재 페이지 % 페이징 개수의 결과가 0일 경우 : 현재 페이지 - 페이징 개수 + 1
			 */
			int startPageCount = 0;
			if(currentPage % pageCount != 0) {
				startPageCount = (currentPage / pageCount) * pageCount + 1;
			} else {
				startPageCount = currentPage - pageCount + 1;
			}
			
			/*
			 	[paging - 7] 현재 페이지 기준 종료 페이지 번호 계산
			 	시작 페이지 + 페이징 개수 - 1(단, 최대 페이지보다 클 경우  종료페이지는 최대페이지로...)
			 */
			int endPageCount = startPageCount + pageCount - 1;
			
			if(endPageCount >= maxPageCount) {
				endPageCount = maxPageCount;
			}
			
			
			HashMap<String,Integer> paging = new HashMap<String,Integer>();
			paging.put("startPageCount", startPageCount);
			paging.put("endPageCount", endPageCount);
			paging.put("maxPageCount", maxPageCount);
			paging.put("currentPage", currentPage);
			modelMap.put("pagingMap", paging);

			List<HashMap<String,String>> galleryList = iGalleryService.getGalleryList(params);
			modelMap.put("galleryList", galleryList);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	@RequestMapping(value = "getGalleryListCntAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getGalleryListCntAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		params.put("member_no", currentUser);
		
		try {
			int getGalleryListCnt = iGalleryService.getGalleryListCnt(params);
			modelMap.put("getGalleryListCnt", getGalleryListCnt);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "getGalleryContentAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getGalleryContentAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		try {
			HashMap<String,String> getGalleryContent = iGalleryService.getGalleryContent(params);
			iGalleryService.galleryContentHit(params);
			
			modelMap.put("getGalleryContent", getGalleryContent);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "getGalleryCommentAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String getGalleryCommentAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		try {
			List<HashMap<String,String>> getComment = iGalleryService.getComment(params);
			modelMap.put("getComment", getComment);
			modelMap.put("result", "success");
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}

	@RequestMapping(value = "galleryCommentAddAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryComentddAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		try {
			if(currentUser.equals(params.get("userNo"))) {
				int commentAdd = iGalleryService.commentAdd(params);
				if(commentAdd > 0) {
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				session.invalidate();
				params.put("userNo", null);
				modelMap.put("result", "abnormal");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "galleryCommentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryCommentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		System.out.println(params);
		
		try {
			if(currentUser.equals(params.get("uNo"))) {
				int commentDel = iGalleryService.commentDel(params);
				if(commentDel > 0) {
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				session.invalidate();
				modelMap.put("result", "abnormal");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "galleryCommentModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryCommentModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		System.out.println(params);
		
		try {
			if(currentUser.equals(params.get("uNo"))) {
				int commentMod = iGalleryService.commentMod(params);
				if(commentMod > 0) {
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				session.invalidate();
				modelMap.put("result", "abnormal");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "galleryContentDelAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryContentDelAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		String currentUser = String.valueOf(session.getAttribute("sMember_no"));
		
		try {
			if(currentUser.equals(params.get("uNo"))) {
				int contentDel = iGalleryService.contentDel(params);
				if(contentDel > 0) {
					modelMap.put("result", "success");
				} else {
					modelMap.put("result", "fail");
				}
			} else {
				session.invalidate();
				modelMap.put("result", "abnormal");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		System.out.println(mapper.writeValueAsString(modelMap));
		return mapper.writeValueAsString(modelMap);
	}
	
	@RequestMapping(value = "galleryModAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody
	public String galleryModAjax(@RequestParam HashMap<String,String> params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> modelMap = new HashMap<String, Object>();
		
		
		try {
			// 썸네일 변경 X
			if (params.get("prevThumbnail") == params.get("thumbnail")) {
				params.put("fileStatus", "notModified"); 
		
			// 썸네일 등록/수정
			} else {
				String webRoot = "C:\\\\Devel\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\www\\"; 
				String uploadPath = "C:\\\\Devel\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\www\\resources\\upload\\";
				String uploadFileName = params.get("thumbnail");
				String fileInput = webRoot + uploadFileName;
				String fileName = uploadFileName.replace("resources/upload/", "");
				String fileExt = fileName.substring(fileName.length()-3, fileName.length());
				
				BufferedImage sourceImage = ImageIO.read(new File(fileInput));
				BufferedImage thumnailImage = Scalr.resize(sourceImage, 200, 200);
				String thumnailImgName = "s_" + fileName;
				File newFile = new File(uploadPath + thumnailImgName);
				ImageIO.write(thumnailImage, fileExt, newFile);

				// 썸네일 등록
				if(params.get("prevThumbnail") != null && params.get("prevThumbnail") != "") {
					params.put("fileStatus", "modFile");
				// 썸네일 수정
				} else {
					params.put("fileStatus", "newFile");
				}
				
				params.put("thumbnailPath", "resources/upload/" + thumnailImgName);
			}
			
			int galleryModCnt = iGalleryService.galleryMod(params);
			
			if(galleryModCnt > 0) {
				modelMap.put("result", "success");
			} else {
				modelMap.put("result", "error");
			}
			
		} catch (Throwable e) {
			e.printStackTrace();
			modelMap.put("result", "fail");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
}
