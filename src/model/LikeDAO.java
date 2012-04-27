package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;

import databean.LikeEntry;

public class LikeDAO extends GenericDAO<LikeEntry> {
	public LikeDAO(String tableName, ConnectionPool connectionPool) throws DAOException {
		super(LikeEntry.class, tableName, connectionPool);
	}
}
