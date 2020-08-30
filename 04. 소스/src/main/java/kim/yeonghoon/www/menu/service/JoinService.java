package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kim.yeonghoon.www.menu.dao.IJoinDao;

@Service
public class JoinService implements IJoinService {
	
	@Autowired
	public IJoinDao iJoinDao;

	@Override
	public List<HashMap<String, String>> getBTS() throws Throwable {
		return iJoinDao.getBTS();
	}

	@Override
	public int getDuplicationCheck(HashMap<String, String> params) throws Throwable {
		return iJoinDao.getDuplicationCheck(params);
	}

	@Override
	public void addUser(HashMap<String, String> params) throws Throwable {
		iJoinDao.addUser(params);
	}


}
