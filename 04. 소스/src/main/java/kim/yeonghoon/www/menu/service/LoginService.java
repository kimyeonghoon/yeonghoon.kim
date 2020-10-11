package kim.yeonghoon.www.menu.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kim.yeonghoon.www.menu.dao.ILoginDao;

@Service
public class LoginService implements ILoginService {
	/** 
	 * 의존성 주입
	 */
	@Autowired
	ILoginDao iLoginDao;

	
	/** 
	 * 유저가 존재하는지 확인
	 */
	@Override
	public int getUserCheck(HashMap<String, String> params) throws Throwable {
		return iLoginDao.getUserCheck(params);
	}
	
	
	/** 
	 * 유저 정보 조회
	 */
	@Override
	public HashMap<String, String> getUserInfo(HashMap<String, String> params) throws Throwable {
		return iLoginDao.getUserInfo(params);
	}
}
