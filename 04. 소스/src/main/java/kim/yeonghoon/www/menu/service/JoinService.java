package kim.yeonghoon.www.menu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kim.yeonghoon.www.menu.dao.IJoinDao;

@Service
public class JoinService implements IJoinService {
	
	@Autowired
	public IJoinDao iJoinDao;
	

}
