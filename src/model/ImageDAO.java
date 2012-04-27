package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;

import databean.Image;

public class ImageDAO extends GenericDAO<Image> {

	public ImageDAO(String tableName, ConnectionPool connectionPool) throws DAOException {
		super(Image.class, tableName, connectionPool);
	}
}
