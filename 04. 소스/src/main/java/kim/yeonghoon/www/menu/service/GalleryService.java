package kim.yeonghoon.www.menu.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kim.yeonghoon.www.menu.dao.IGalleryDao;

@Service
public class GalleryService implements IGalleryService {

	@Autowired
	IGalleryDao iGalleryDao;
	
	@Override
	public List<HashMap<String, String>> getGalleryList(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.getGalleryList(params);
	}

	@Override
	public int getGalleryListCnt(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.getGalleryListCnt(params);
	}

	@Override
	public HashMap<String, String> getGalleryContent(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.getGalleryContent(params);
	}

	@Override
	public void galleryContentHit(HashMap<String, String> params) throws Throwable {
		iGalleryDao.galleryContentHit(params);
	}

	@Override
	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.getComment(params);
	}

	@Override
	public int commentAdd(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.commentAdd(params);
	}

	@Override
	public int commentDel(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.commentDel(params);
	}

	@Override
	public int commentMod(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.commentMod(params);
	}

	@Override
	public int galleryAdd(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.galleryAdd(params);
	}

	@Override
	public int getGalleryContentNo() throws Throwable {
		return iGalleryDao.getGalleryContentNo();
	}

	@Override
	public int contentDel(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.contentDel(params);
	}

	@Override
	public int galleryMod(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.galleryMod(params);
	}

	@Override
	public int contentFileNew(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.contentFileNew(params);
	}

	@Override
	public int contentFileCheck(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.contentFileCheck(params);
	}

	@Override
	public int addThumbnail(HashMap<String, String> params) throws Throwable {
		return iGalleryDao.addThumbnail(params);
	}
}
