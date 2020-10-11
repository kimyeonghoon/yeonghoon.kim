package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProfileDao implements IProfileDao {
	
	@Autowired
	SqlSession sqlSession;

	/**
	 * [briefHistory] briefHistoryAjax - 약력 조회 후 profile에 그리는 ajax
	 * [briefHistory] bgetBriefHistoryAjax - 약력 수정 팝업 뜰 때 약력을 조회하여 폼에 값을 넣어주는 ajax
	 */
	@Override
	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("profile.getBriefHistory", params);
	}
	
	
	/**
	 * [briefHistory] briefHistoryModifyAjax - 약력 수정  ajax
	 */
	@Override
	public int updateBriefHistory(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.updateBriefHistory", params);
	}

	
	/**
	 * [education] redrawEducationAjax - 학력 조회 후 profile에 그리는 ajax
	 * [education] educationOneViewAjax - 선택한 학력 조회 ajax(수정용)
	 */
	@Override
	public List<HashMap<String, String>> getEducation(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("profile.getEducation", params);
	}
	
	
	/**
	 * [education] educationAddAjax - 학력 추가 ajax
	 */
	@Override
	public int educationAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.educationAdd", params);
	}
	
	
	/**
	 * [education] educationModAjax - 학력 수정 ajax
	 */
	@Override
	public int educationMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.educationMod", params);
	}
	
	
	/**
	 * [education] educationDelAjax - 학력 삭제 ajax
	 */
	@Override
	public int educationDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.educationDel", params);
	}
	
	
	/**
	 * [career] redrawCareerAjax - 경력 조회 후 profile에 그리는 ajax
	 * [career] companyOneViewAjax - 선택한 회사 수정 전 데이터 조회하는 ajax
	 * [career] companyListAjax - 경력 추가 팝업 실행될 때 회사 리스트 조회하는 ajax
	 * [career] careerOneViewAjax - 수정할 경력 팝업 실행될 때 해당 조회 후 폼에 넣어주는 ajax
	 */
	// 회사 리스트 조회
	@Override
	public List<HashMap<String, String>> companyList(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("profile.companyList", params);
	}
	
	// 경력 리스트 조회
	@Override
	public List<HashMap<String, String>> careerList(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("profile.careerList", params);
	}
	
	
	/**
	 * [career] companyAddAjax - 회사 추가 ajax
	 */
	@Override
	public int companyAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.companyAdd", params);
	}
	
	
	/**
	 * [career] companyModAjax - 회사 수정 ajax
	 */
	@Override
	public int companyMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.companyMod", params);
	}
	
	
	/**
	 * [career] companyDelAjax - 회사 삭제 ajax
	 */
	@Override
	public int companyDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.companyDel", params);
	}
	
	
	/**
	 * [career] careerAddAjax - 경력 추가 ajax
	 */
	@Override
	public int careerAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.careerAdd", params);
	}
	
	
	/**
	 * [career] careerModAjax - 경력 수정 ajax
	 */
	@Override
	public int careerMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.careerMod", params);
	}
	
	
	/**
	 * [career] careerDelAjax - 경력 삭제 ajax
	 */
	@Override
	public int careerDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.careerDel", params);
	}
	
	
	/**
	 * [tech] redrawTechAjax - 보유기술 조회 후 profile에 그리는 ajax
	 * [tech] techCategoryListAjax - 보유기술 추가 팝업 뜰 때 기술 카테고리 조회 후 form에 값 넣어주는 ajax
	 */
	// 기술 카테고리 개수 추출
	@Override
	public int getTechCategoryCnt() throws Throwable {
		return sqlSession.selectOne("profile.getTechCategoryCnt");
	}
	
	// 기술 카테고리 조회
	@Override
	public List<HashMap<String, String>> getTechCategory() throws Throwable {
		return sqlSession.selectList("profile.getTechCategory");
	}
	
	// 카테고리에 있는 기술 조회
	@Override
	public List<String> getTech(int i) throws Throwable {
		return sqlSession.selectList("profile.getTech",i);
	}

	
	/**
	 * [tech] techAddAjax - 보유기술 추가  ajax
	 */
	@Override
	public int techAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.techAdd", params);
	}

	
	/**
	 * [tech] techCategoryListAjax - 보유기술 삭제 팝업에서 카테고리 선택 시 기술리스트 동적으로 조회하는 ajax
	 */
	@Override
	public List<HashMap<String, String>> techList(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("profile.techList", params);
	}

	
	/**
	 * [tech] techDelAjax - 보유기술 삭제  ajax
	 */
	@Override
	public int techDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.techDel", params);
	}


	/**
	 * [academy] redrawAcademyAjax - 교육 조회 후 profile에 그리는 ajax
	 * [academy] academyOneViewAjax - 교육 수정 팝업 뜰 때 선택한 교육 조회 후 form에 값 넣어주는 ajax
	 */
	@Override
	public List<HashMap<String, String>> getAcademy(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("profile.getAcademy", params);
	}

	
	/**
	 * [academy] academyAddAjax - 교육  추가 ajax
	 */
	@Override
	public int academyAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.academyAdd", params);
	}
	
	
	/**
	 * [academy] academyModAjax - 교육 수정 ajax
	 */
	@Override
	public int academyMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.academyMod", params);
	}
	
	
	/**
	 * [academy] academyDelAjax - 교육 삭제 ajax
	 */
	@Override
	public int academyDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.academyDel", params);
	}
	
	
	/**
	 * [certificate] redrawCertificateAjax - 자격증 조회 후 profile에 그리는 ajax
	 * [certificate] certificateOneViewAjax - 자격증 수정 팝업 뜰 때 선택한 자격증 조회 후 form에 값 넣어주는 ajax
	 */
	@Override
	public List<HashMap<String, String>> getCertificate(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("profile.getCertificate", params);
	}


	/**
	 * [certificate] certificateAddAjax - 자격증  추가 ajax
	 */
	@Override
	public int certificateAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.certificateAdd", params);
	}


	/**
	 * [certificate] certificateModAjax - 자격증  수정 ajax
	 */
	@Override
	public int certificateMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.certificateMod", params);
	}

	
	/**
	 * [certificate] certificateDelAjax - 자격증  삭제 ajax
	 */
	@Override
	public int certificateDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.certificateDel", params);
	}
}
