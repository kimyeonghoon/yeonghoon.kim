package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kim.yeonghoon.www.menu.dao.IJoinDao;

@Service
public class JoinService implements IJoinService {
	/**
	 * 의존성 주입
	 */
	@Autowired
	public IJoinDao iJoinDao;

	
	/**
	 * join - join Request
	 */
	@Override
	// 기지국 조회
	public List<HashMap<String, String>> getBTS() throws Throwable {
		return iJoinDao.getBTS();
	}

	
	/**
	 * addUserAjax - 유저 추가 ajax
	 */
	@Override
	// 이메일 중복 체크
	public int getDuplicationCheck(HashMap<String, String> params) throws Throwable {
		return iJoinDao.getDuplicationCheck(params);
	}

	@Transactional
	@Override
	// 유저 추가
	public void addUser(HashMap<String, String> params) throws Throwable {
		iJoinDao.addUser(params);
	}


}
