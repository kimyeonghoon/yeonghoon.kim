package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;

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
}
