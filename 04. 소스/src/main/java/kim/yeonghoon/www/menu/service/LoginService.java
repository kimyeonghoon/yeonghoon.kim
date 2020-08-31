package kim.yeonghoon.www.menu.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kim.yeonghoon.www.menu.dao.ILoginDao;

@Service
public class LoginService implements ILoginService {

	@Autowired
	ILoginDao iLoginDao;

	@Override
	public int getEmailExistCheck(HashMap<String, String> params) throws Throwable {
		return iLoginDao.getEmailExistCheck(params);
	}

	@Override
	public String getEncryptPassword(HashMap<String, String> params) throws Throwable {
		return iLoginDao.getEncryptPassword(params);
	}

	
}
