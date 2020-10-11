package kim.yeonghoon.www.menu.service;

import java.util.HashMap;

public interface ILoginService {
	/** 
	 * 유저가 존재하는지 확인
	 */
	public int getUserCheck(HashMap<String, String> params) throws Throwable;
	
	
	/** 
	 * 유저 정보 조회
	 */
	public HashMap<String, String> getUserInfo(HashMap<String, String> params) throws Throwable;
}
