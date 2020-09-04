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

	@Override
	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("profile.getBriefHistory", params);
	}

	@Override
	public int updateBriefHistory(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.updateBriefHistory", params);
	}

	@Override
	public List<HashMap<String, String>> getTechCategory() throws Throwable {
		return sqlSession.selectList("profile.getTechCategory");
	}

	@Override
	public int getTechCategoryCnt() throws Throwable {
		return sqlSession.selectOne("profile.getTechCategoryCnt");
	}

	@Override
	public List<String> getTech(int i) throws Throwable {
		return sqlSession.selectList("profile.getTech",i);
	}

	@Override
	public int techAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.techAdd", params);
	}

	@Override
	public List<HashMap<String, String>> techList(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("profile.techList", params);
	}

	@Override
	public int techDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.techDel", params);
	}

	@Override
	public List<HashMap<String, String>> getEducation(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("profile.getEducation", params);
	}

	@Override
	public int educationAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("profile.educationAdd", params);
	}

	@Override
	public int educationDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.educationDel", params);
	}

	@Override
	public int educationMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("profile.educationMod", params);
	}

}
