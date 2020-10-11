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

	
	/**
	 * join - join Request
	 */
	@Override
	// 기지국 조회
	public List<HashMap<String, String>> getBTS() throws Throwable {
		return sqlSession.selectList("join.getBTS");
	}

	
	/**
	 * addUserAjax - 유저 추가 ajax
	 */
	@Override
	// 이메일 중복 체크
	public int getDuplicationCheck(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("join.getDuplicationCheck", params);
	}

	@Override
	// 유저 추가
	public void addUser(HashMap<String, String> params) throws Throwable {
		sqlSession.insert("join.addUser", params);
	}
}