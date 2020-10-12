package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

public interface IJoinService {
	/**
	 * join - join Request
	 */
	// 기지국 조회
	public List<HashMap<String, String>> getBTS() throws Throwable;

	
	/**
	 * addUserAjax - 유저 추가 ajax
	 */
	// 이메일 중복 체크
	public int getDuplicationCheck(HashMap<String, String> params) throws Throwable;
	// 유저 추가
	public void addUser(HashMap<String, String> params) throws Throwable;
}
