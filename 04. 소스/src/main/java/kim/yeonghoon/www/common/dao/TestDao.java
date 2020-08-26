package kim.yeonghoon.www.common.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TestDao implements ITestDao {

	@Autowired
	SqlSession sqlSession;

	@Override
	public List<HashMap<String, String>> getTime() throws Throwable {
		return sqlSession.selectList("test.getTime");
	}
	
}
