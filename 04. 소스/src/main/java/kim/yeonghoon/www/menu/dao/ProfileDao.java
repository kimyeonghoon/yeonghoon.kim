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
}
