package kim.yeonghoon.www.common.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kim.yeonghoon.www.common.dao.ITestDao;

@Service
public class TestService implements ITestService {

	@Autowired
	public ITestDao iTestDao; 
	
	@Override
	public List<HashMap<String, String>> getTime() throws Throwable {
		return iTestDao.getTime();
	}

}
