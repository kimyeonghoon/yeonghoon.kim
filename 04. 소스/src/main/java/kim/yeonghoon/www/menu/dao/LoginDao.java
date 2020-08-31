package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LoginDao implements ILoginDao {

	@Autowired
	SqlSession sqlSession;
	
	@Override
	public int getEmailExistCheck(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("login.getEmailExistCheck", params);
	}

	@Override
	public String getEncryptPassword(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("login.getEncryptPassword", params);
	}


}
