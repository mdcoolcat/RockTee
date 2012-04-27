package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.DesignDAO;
import model.Model;

import org.genericdao.RollbackException;

import databean.Design;

public class IndexAction extends Action {

	private DesignDAO dDAO;
	
	public IndexAction(Model model) {
		dDAO = model.getDesignDAO();
	}
	
	@Override
	public String getName() {
		return "index.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		try {
//			Design[] latest = dDAO.getLatest();
//			session.setAttribute("latest", latest);
//			for (Design d : latest)
//				System.out.println(d);
			Design[] stars = dDAO.getTopPopular();
			request.setAttribute("stars", stars);
			
		} catch (RollbackException e) {
			e.printStackTrace();
			List<String> errors = new ArrayList<String>();
			request.setAttribute("errors", errors);
			errors.add(e.getMessage());
			return "error.jsp";
		}
		return "index.jsp";
	}
}
