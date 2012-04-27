package model;

import java.util.Arrays;
import java.util.Comparator;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.RollbackException;

import databean.Design;

public class DesignDAO extends GenericDAO<Design> {
	
	public DesignDAO(String tableName, ConnectionPool pool) throws DAOException, RollbackException {
		super(Design.class , tableName, pool);
	}
	
	//return list in descendant order, or zero-length
	public Design[] getLatest() throws RollbackException {
		int numOfDesign = getCount();
		if (numOfDesign > 0) {
			Design[] all = match();
			Design[] latest = new Design[numOfDesign];	//descendent in id

			int i, j;
			for (i = numOfDesign - 1, j = 0; j < numOfDesign; j++, i--) {
				latest[i] = all[j];
				System.out.println(all[j]);
			}
			System.out.println(numOfDesign);
			return latest;
		} else
			return new Design[0];
	}

	
	public Design[] getPopular() throws RollbackException {
		int numOfDesign = getCount();
		if (numOfDesign > 0) {
			Design[] popular = match();	//descendent in id
			Arrays.sort(popular, new DesignComparator());
			
			return popular;
		} else
			return new Design[0];
	}
	
	public Design[] getTopPopular() throws RollbackException {
		int numOfDesign = getCount();
		if (numOfDesign > 0) {
			Design[] all = match();	//descendent in id
			if (numOfDesign > 11) {
				Design[] popular = Arrays.copyOfRange(all, 0, 12);
				Arrays.sort(popular, new DesignComparator());
				return popular;
			} else {
				Arrays.sort(all, new DesignComparator());
				return all;
			}
			
		} else
			return new Design[0];
	}
	
	//more vote
	private static class DesignComparator implements Comparator<Design> {

		@Override
		public int compare(Design d0, Design d1) {
			return d1.getVote() - d0.getVote();
		}
		
	}
}
