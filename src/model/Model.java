/**
 * @file Model.java
 * @author Dan Mei
 * @course 15-637
 * @date 3/18/2012
 */

package model;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.RollbackException;

public class Model {
	private UserDAO userDAO;
	private StyleDAO styleDAO;
	private DesignDAO designDAO;
	private ImageDAO imgDAO;
	private LikeDAO likeDAO;
	
	public Model(ServletConfig config) throws ServletException {
		try {
			//get config paras from web.xml
			String jdbcDriver = config.getInitParameter("jdbcDriverName");
			String jdbcURL    = config.getInitParameter("jdbcURL");
			
			ConnectionPool pool = new ConnectionPool(jdbcDriver,jdbcURL);
			
			userDAO = new UserDAO("user", pool);
			styleDAO = new StyleDAO("style", pool);
			designDAO = new DesignDAO("design", pool);
			imgDAO = new ImageDAO("image", pool);
			likeDAO = new LikeDAO("likeEntry", pool);
			
		} catch (DAOException e) {
			throw new ServletException(e);
		} catch (RollbackException e) {
			e.printStackTrace();
		}
	}

	public LikeDAO getLikeDAO() {
		return likeDAO;
	}

	public ImageDAO getImgDAO() {
		return imgDAO;
	}

	public DesignDAO getDesignDAO() {
		return designDAO;
	}

	public StyleDAO getStyleDAO() {
		return styleDAO;
	}

	public UserDAO getUserDAO() {
		return userDAO;
	}
	


}
