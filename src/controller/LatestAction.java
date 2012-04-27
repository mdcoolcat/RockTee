package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.DesignDAO;
import model.Model;

import org.genericdao.RollbackException;

import databean.Design;

public class LatestAction extends Action {

private DesignDAO dDAO;
	
	public LatestAction(Model model) {
		dDAO = model.getDesignDAO();
	}
	
	@Override
	public String getName() {
		return "latest.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		HttpSession session = request.getSession();
		
		try {
			Design[] latest = dDAO.getLatest();
			request.setAttribute("popular", latest);
//			for (Design d : latest)
//				System.out.println(d);
//			Design[] popular = dDAO.getPopular();
//			session.setAttribute("popular", popular);
			
		} catch (RollbackException e) {
			e.printStackTrace();
			List<String> errors = new ArrayList<String>();
			request.setAttribute("errors", errors);
			errors.add(e.getMessage());
			return "error.jsp";
		}
		return "collections.jsp";
	}

}
