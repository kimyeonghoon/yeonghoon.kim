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

	@Override
	public List<HashMap<String, String>> techList(HashMap<String, String> params) throws Throwable {
		return iProfileDao.techList(params);
	}

	@Override
	public int techDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.techDel(params);
	}

	@Override
	public List<HashMap<String, String>> getEducation(HashMap<String, String> params) throws Throwable {
		return iProfileDao.getEducation(params);
	}

	@Override
	public int educationAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.educationAdd(params);
	}

	@Override
	public int educationDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.educationDel(params);
	}

	@Override
	public int educationMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.educationMod(params);
	}

	@Override
	public int companyAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.companyAdd(params);
	}

	@Override
	public List<HashMap<String, String>> companyList(HashMap<String, String> params) throws Throwable {
		return iProfileDao.companyList(params);
	}

	@Override
	public int companyMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.companyMod(params);
	}

	@Override
	public int companyDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.companyDel(params);
	}

	@Override
	public int careerAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.careerAdd(params);
	}

	@Override
	public List<HashMap<String, String>> careerList(HashMap<String, String> params) throws Throwable {
		return iProfileDao.careerList(params);
	}

	@Override
	public int careerMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.careerMod(params);
	}

	@Override
	public int careerDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.careerDel(params);
	}

	@Override
	public List<HashMap<String, String>> getAcademy(HashMap<String, String> params) throws Throwable {
		return iProfileDao.getAcademy(params);
	}

	@Override
	public List<HashMap<String, String>> getCertificate(HashMap<String, String> params) throws Throwable {
		return iProfileDao.getCertificate(params);
	}

	@Override
	public int academyAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.academyAdd(params);
	}

	@Override
	public int certificateAdd(HashMap<String, String> params) throws Throwable {
		return iProfileDao.certificateAdd(params);
	}

	@Override
	public int academyMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.academyMod(params);
	}

	@Override
	public int certificateMod(HashMap<String, String> params) throws Throwable {
		return iProfileDao.certificateMod(params);
	}

	@Override
	public int certificateDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.certificateDel(params);
	}

	@Override
	public int academyDel(HashMap<String, String> params) throws Throwable {
		return iProfileDao.academyDel(params);
	}

}
