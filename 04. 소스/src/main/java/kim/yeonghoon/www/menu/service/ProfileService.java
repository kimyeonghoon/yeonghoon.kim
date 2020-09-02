package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

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

	@Override
	public List<HashMap<String, String>> getTechCategory() throws Throwable {
		return iProfileDao.getTechCategory();
	}

	@Override
	public int getTechCategoryCnt() throws Throwable {
		return iProfileDao.getTechCategoryCnt();
	}

	@Override
	public List<String> getTech(int i) throws Throwable {
		return iProfileDao.getTech(i);
	}

	@Override
	public int techAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.techAdd(params);
	}
	
}
