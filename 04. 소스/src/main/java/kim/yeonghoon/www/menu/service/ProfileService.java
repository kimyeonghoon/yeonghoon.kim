package kim.yeonghoon.www.menu.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kim.yeonghoon.www.menu.dao.IProfileDao;

@Service
public class ProfileService implements IProfileService {

	@Autowired
	IProfileDao iProfileDao;

	@Override
	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable {
		return iProfileDao.getBriefHistory(params);
	}

	@Override
	public int updateBriefHistory(HashMap<String, String> params) throws Throwable {
		return iProfileDao.updateBriefHistory(params);
	}
	
}
