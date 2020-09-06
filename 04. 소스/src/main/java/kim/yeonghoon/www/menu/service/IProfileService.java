package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

public interface IProfileService {

	public HashMap<String, String> getBriefHistory(HashMap<String, String> params) throws Throwable;

	public int updateBriefHistory(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> getTechCategory() throws Throwable;

	public int getTechCategoryCnt() throws Throwable;

	public List<String> getTech(int i) throws Throwable;

	public int techAdd(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> techList(HashMap<String, String> params) throws Throwable;

	public int techDel(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> getEducation(HashMap<String, String> params) throws Throwable;

	public int educationAdd(HashMap<String, String> params) throws Throwable;

	public int educationDel(HashMap<String, String> params) throws Throwable;

	public int educationMod(HashMap<String, String> params) throws Throwable;

	public int companyAdd(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> companyList(HashMap<String, String> params) throws Throwable;

	public int companyMod(HashMap<String, String> params) throws Throwable;

	public int companyDel(HashMap<String, String> params) throws Throwable;

	public int careerAdd(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> careerList(HashMap<String, String> params) throws Throwable;

	public int careerMod(HashMap<String, String> params) throws Throwable;

	public int careerDel(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> getAcademy(HashMap<String, String> params) throws Throwable;

	public List<HashMap<String, String>> getCertificate(HashMap<String, String> params) throws Throwable;

}
