package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kim.yeonghoon.www.menu.dao.IProfileDao;

@Service
public class ProfileService implements IProfileService {
	/** 
	 * 의존성 주입
	 */
	@Autowired
	IProfileDao iProfileDao;

	/**
	 * [briefHistory] briefHistoryAjax - 약력 조회 후 profile에 그리는 ajax
	 * [briefHistory] bgetBriefHistoryAjax - 약력 수정 팝업 뜰 때 약력을 조회하여 폼에 값을 넣어주는 ajax
	 */
	@Override
	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable {
		return iProfileDao.getBriefHistory(params);
	}
	
	
	/**
	 * [briefHistory] briefHistoryModifyAjax - 약력 수정  ajax
	 */
	@Transactional
	@Override
	public int updateBriefHistory(HashMap<String, String> params) throws Throwable {
		return iProfileDao.updateBriefHistory(params);
	}

	
	/**
	 * [education] redrawEducationAjax - 학력 조회 후 profile에 그리는 ajax
	 * [education] educationOneViewAjax - 선택한 학력 조회 ajax(수정용)
	 */
	@Override
	public List<HashMap<String, String>> getEducation(HashMap<String, String> params) throws Throwable {
		return iProfileDao.getEducation(params);
	}
	
	
	/**
	 * [education] educationAddAjax - 학력 추가 ajax
	 */
	@Transactional
	@Override
	public int educationAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.educationAdd(params);
	}
	
	
	/**
	 * [education] educationModAjax - 학력 수정 ajax
	 */
	@Transactional
	@Override
	public int educationMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.educationMod(params);
	}
	
	
	/**
	 * [education] educationDelAjax - 학력 삭제 ajax
	 */
	@Transactional
	@Override
	public int educationDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.educationDel(params);
	}
	
	
	/**
	 * [career] redrawCareerAjax - 경력 조회 후 profile에 그리는 ajax
	 * [career] companyOneViewAjax - 선택한 회사 수정 전 데이터 조회하는 ajax
	 * [career] companyListAjax - 경력 추가 팝업 실행될 때 회사 리스트 조회하는 ajax
	 * [career] careerOneViewAjax - 수정할 경력 팝업 실행될 때 해당 조회 후 폼에 넣어주는 ajax
	 */
	@Override
	// 회사 리스트 조회
	public List<HashMap<String, String>> companyList(HashMap<String, String> params) throws Throwable {
		return iProfileDao.companyList(params);
	}
	
	@Override
	// 경력 리스트 조회
	public List<HashMap<String, String>> careerList(HashMap<String, String> params) throws Throwable {
		return iProfileDao.careerList(params);
	}
	
	
	/**
	 * [career] companyAddAjax - 회사 추가 ajax
	 */
	@Transactional
	@Override
	public int companyAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.companyAdd(params);
	}
	
	
	/**
	 * [career] companyModAjax - 회사 수정 ajax
	 */
	@Transactional
	@Override
	public int companyMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.companyMod(params);
	}
	
	
	/**
	 * [career] companyDelAjax - 회사 삭제 ajax
	 */
	@Transactional
	@Override
	public int companyDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.companyDel(params);
	}
	
	
	/**
	 * [career] careerAddAjax - 경력 추가 ajax
	 */
	@Transactional
	@Override
	public int careerAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.careerAdd(params);
	}
	
	
	/**
	 * [career] careerModAjax - 경력 수정 ajax
	 */
	@Transactional
	@Override
	public int careerMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.careerMod(params);
	}
	
	
	/**
	 * [career] careerDelAjax - 경력 삭제 ajax
	 */
	@Transactional
	@Override
	public int careerDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.careerDel(params);
	}

	
	/**
	 * [tech] redrawTechAjax - 보유기술 조회 후 profile에 그리는 ajax
	 * [tech] techCategoryListAjax - 보유기술 추가 팝업 뜰 때 기술 카테고리 조회 후 form에 값 넣어주는 ajax
	 */
	@Override
	// 기술 카테고리 개수 추출
	public int getTechCategoryCnt() throws Throwable {
		return iProfileDao.getTechCategoryCnt();
	}
	
	@Override
	// 기술 카테고리 조회
	public List<HashMap<String, String>> getTechCategory() throws Throwable {
		return iProfileDao.getTechCategory();
	}

	@Override
	// 카테고리에 있는 기술 조회
	public List<String> getTech(int i) throws Throwable {
		return iProfileDao.getTech(i);
	}

	
	/**
	 * [tech] techAddAjax - 보유기술 추가  ajax
	 */
	@Transactional
	@Override
	public int techAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.techAdd(params);
	}
	
	
	/**
	 * [tech] techCategoryListAjax - 보유기술 삭제 팝업에서 카테고리 선택 시 기술리스트 동적으로 조회하는 ajax
	 */
	@Transactional
	@Override
	public List<HashMap<String, String>> techList(HashMap<String, String> params) throws Throwable {
		return iProfileDao.techList(params);
	}
	
	
	/**
	 * [tech] techDelAjax - 보유기술 삭제  ajax
	 */
	@Transactional
	@Override
	public int techDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.techDel(params);
	}

	
	/**
	 * [academy] redrawAcademyAjax - 교육 조회 후 profile에 그리는 ajax
	 * [academy] academyOneViewAjax - 교육 수정 팝업 뜰 때 선택한 교육 조회 후 form에 값 넣어주는 ajax
	 */
	@Override
	public List<HashMap<String, String>> getAcademy(HashMap<String, String> params) throws Throwable {
		return iProfileDao.getAcademy(params);
	}
	
	
	/**
	 * [academy] academyAddAjax - 교육  추가 ajax
	 */
	@Transactional
	@Override
	public int academyAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.academyAdd(params);
	}
	
	
	/**
	 * [academy] academyModAjax - 교육 수정 ajax
	 */
	@Transactional
	@Override
	public int academyMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.academyMod(params);
	}
	
	
	/**
	 * [academy] academyDelAjax - 교육 삭제 ajax
	 */
	@Transactional
	@Override
	public int academyDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.academyDel(params);
	}
	
	
	/**
	 * [certificate] redrawCertificateAjax - 자격증 조회 후 profile에 그리는 ajax
	 * [certificate] certificateOneViewAjax - 자격증 수정 팝업 뜰 때 선택한 자격증 조회 후 form에 값 넣어주는 ajax
	 */
	@Override
	public List<HashMap<String, String>> getCertificate(HashMap<String, String> params) throws Throwable {
		return iProfileDao.getCertificate(params);
	}


	/**
	 * [certificate] certificateAddAjax - 자격증  추가 ajax
	 */
	@Transactional
	@Override
	public int certificateAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.certificateAdd(params);
	}

	
	/**
	 * [certificate] certificateModAjax - 자격증  수정 ajax
	 */
	@Transactional
	@Override
	public int certificateMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.certificateMod(params);
	}

	
	/**
	 * [certificate] certificateDelAjax - 자격증  삭제 ajax
	 */
	@Transactional
	@Override
	public int certificateDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.certificateDel(params);
	}
}
