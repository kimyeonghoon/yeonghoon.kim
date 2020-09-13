package kim.yeonghoon.www.menu.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GalleryDao implements IGalleryDao {
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<HashMap<String, String>> getGalleryList(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("gallery.getGalleryList", params);
	}

	@Override
	public int getGalleryListCnt(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("gallery.getGalleryListCnt", params);
	}

	@Override
	public HashMap<String, String> getGalleryContent(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("gallery.getGalleryContent", params);
	}

	@Override
	public void galleryContentHit(HashMap<String, String> params) throws Throwable {
		sqlSession.update("gallery.GalleryContentHit",params);
	}

	@Override
	public List<HashMap<String, String>> getComment(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList("gallery.getComment", params);
	}

	@Override
	public int commentAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("gallery.commentAdd", params);
	}

	@Override
	public int commentDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("gallery.commentDel",params);
	}

	@Override
	public int commentMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("gallery.commentMod",params);
	}

	@Override
	public int galleryAdd(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("gallery.galleryAdd", params);
	}

	@Override
	public int getGalleryContentNo() throws Throwable {
		return sqlSession.selectOne("gallery.getGalleryContentNo");
	}

	@Override
	public int contentDel(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("gallery.contentDel", params);
	}

	@Override
	public int galleryMod(HashMap<String, String> params) throws Throwable {
		return sqlSession.update("gallery.GalleryMod", params);
	}

	@Override
	public int contentFileNew(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("gallery.contentFileNew", params);
	}

	@Override
	public int contentFileCheck(HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne("gallery.contentFileCheck", params);
	}

	@Override
	public int addThumbnail(HashMap<String, String> params) throws Throwable {
		return sqlSession.insert("gallery.addThumbnail", params);
	}
	
}
