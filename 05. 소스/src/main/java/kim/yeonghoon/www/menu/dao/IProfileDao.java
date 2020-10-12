package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;
import java.util.List;

public interface IProfileDao {
	/**
	 * [briefHistory] briefHistoryAjax - 약력 조회 후 profile에 그리는 ajax
	 * [briefHistory] bgetBriefHistoryAjax - 약력 수정 팝업 뜰 때 약력을 조회하여 폼에 값을 넣어주는 ajax
	 */	
	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable;

	
	/**
	 * [briefHistory] briefHistoryModifyAjax - 약력 수정  ajax
	 */
	public int updateBriefHistory(HashMap<String, String> params) throws Throwable;

	
	/**
	 * [education] redrawEducationAjax - 학력 조회 후 profile에 그리는 ajax
	 * [education] educationOneViewAjax - 선택한 학력 조회 ajax(수정용)
	 */
	public List<HashMap<String, String>> getEducation(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [education] educationAddAjax - 학력 추가 ajax
	 */
	public int educationAdd(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [education] educationModAjax - 학력 수정 ajax
	 */
	public int educationMod(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [education] educationDelAjax - 학력 삭제 ajax
	 */
	public int educationDel(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [career] redrawCareerAjax - 경력 조회 후 profile에 그리는 ajax
	 * [career] companyOneViewAjax - 선택한 회사 수정 전 데이터 조회하는 ajax
	 * [career] companyListAjax - 경력 추가 팝업 실행될 때 회사 리스트 조회하는 ajax
	 * [career] careerOneViewAjax - 수정할 경력 팝업 실행될 때 해당 조회 후 폼에 넣어주는 ajax
	 */
	// 회사 리스트 조회
	public List<HashMap<String, String>> companyList(HashMap<String, String> params) throws Throwable;
	// 경력 리스트 조회
	public List<HashMap<String, String>> careerList(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [career] companyAddAjax - 회사 추가 ajax
	 */
	public int companyAdd(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [career] companyModAjax - 회사 수정 ajax
	 */
	public int companyMod(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [career] companyDelAjax - 회사 삭제 ajax
	 */
	public int companyDel(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [career] careerAddAjax - 경력 추가 ajax
	 */
	public int careerAdd(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [career] careerModAjax - 경력 수정 ajax
	 */
	public int careerMod(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [career] careerDelAjax - 경력 삭제 ajax
	 */
	public int careerDel(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [tech] redrawTechAjax - 보유기술 조회 후 profile에 그리는 ajax
	 * [tech] techCategoryListAjax - 보유기술 추가 팝업 뜰 때 기술 카테고리 조회 후 form에 값 넣어주는 ajax
	 */
	// 기술 카테고리 개수 추출
	public int getTechCategoryCnt() throws Throwable;
	// 기술 카테고리 조회
	public List<HashMap<String, String>> getTechCategory() throws Throwable;
	// 카테고리에 있는 기술 조회
	public List<String> getTech(int i) throws Throwable;

	
	/**
	 * [tech] techAddAjax - 보유기술 추가  ajax
	 */
	public int techAdd(HashMap<String, String> params) throws Throwable;

	
	/**
	 * [tech] techCategoryListAjax - 보유기술 삭제 팝업에서 카테고리 선택 시 기술리스트 동적으로 조회하는 ajax
	 */
	public List<HashMap<String, String>> techList(HashMap<String, String> params) throws Throwable;

	
	/**
	 * [tech] techDelAjax - 보유기술 삭제  ajax
	 */
	public int techDel(HashMap<String, String> params) throws Throwable;


	/**
	 * [academy] redrawAcademyAjax - 교육 조회 후 profile에 그리는 ajax
	 * [academy] academyOneViewAjax - 교육 수정 팝업 뜰 때 선택한 교육 조회 후 form에 값 넣어주는 ajax
	 */
	public List<HashMap<String, String>> getAcademy(HashMap<String, String> params) throws Throwable;


	/**
	 * [academy] academyAddAjax - 교육  추가 ajax
	 */
	public int academyAdd(HashMap<String, String> params) throws Throwable;


	/**
	 * [academy] academyModAjax - 교육 수정 ajax
	 */
	public int academyMod(HashMap<String, String> params) throws Throwable;


	/**
	 * [academy] academyDelAjax - 교육 삭제 ajax
	 */
	public int academyDel(HashMap<String, String> params) throws Throwable;
	
	
	/**
	 * [certificate] redrawCertificateAjax - 자격증 조회 후 profile에 그리는 ajax
	 * [certificate] certificateOneViewAjax - 자격증 수정 팝업 뜰 때 선택한 자격증 조회 후 form에 값 넣어주는 ajax
	 */
	public List<HashMap<String, String>> getCertificate(HashMap<String, String> params) throws Throwable;
	

	/**
	 * [certificate] certificateAddAjax - 자격증  추가 ajax
	 */
	public int certificateAdd(HashMap<String, String> params) throws Throwable;


	/**
	 * [certificate] certificateModAjax - 자격증  수정 ajax
	 */
	public int certificateMod(HashMap<String, String> params) throws Throwable;

	
	/**
	 * [certificate] certificateDelAjax - 자격증  삭제 ajax
	 */
	public int certificateDel(HashMap<String, String> params) throws Throwable;
}
