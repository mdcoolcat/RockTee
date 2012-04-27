package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;

import databean.Style;

public class StyleDAO extends GenericDAO<Style> {
	public StyleDAO(String tableName, ConnectionPool connectionPool) throws DAOException {
		super(Style.class, tableName, connectionPool);
	}

}
