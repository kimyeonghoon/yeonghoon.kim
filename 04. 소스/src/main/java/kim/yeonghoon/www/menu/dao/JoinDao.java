package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JoinDao implements IJoinDao {
	
	@Autowired
	public SqlSession sqlSession;

	@Override
	public List<HashMap<String, String>> getBTS() throws Throwable {
		return sqlSession.selectList("join.getBTS");
	}

	@Override
	public int getDuplicationCheck(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("join.getDuplicationCheck", params);
	}

	@Override
	public void addUser(HashMap<String, String> params) throws Throwable {
		sqlSession.insert("join.addUser", params);
	}

}
