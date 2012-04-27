package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;

import databean.User;

public class UserDAO extends GenericDAO<User> {

	public UserDAO(String tableName, ConnectionPool connectionPool) throws DAOException {
		super(User.class, tableName, connectionPool);
	}
}
