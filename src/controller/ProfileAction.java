package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.DesignDAO;
import model.Model;
import model.UserDAO;

import org.genericdao.MatchArg;
import org.genericdao.RollbackException;

import databean.Design;
import databean.User;

public class ProfileAction extends Action {

	private DesignDAO dDAO;
	
	public ProfileAction(Model model) {
		dDAO = model.getDesignDAO();
	}
	
	@Override
	public String getName() {
		return "profile.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return "profile.jsp";
		}
		
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		try {
			Design[] d = dDAO.match(MatchArg.equals("ownerId", user.getId()));
			request.setAttribute("designList", d);
			System.out.println(d.length);
			for (Design i : d)
				System.out.println(i);
		} catch (RollbackException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			errors.add(e.getMessage());
			return "error.jsp";
		}
		
		return "profile.jsp";
	}

}
