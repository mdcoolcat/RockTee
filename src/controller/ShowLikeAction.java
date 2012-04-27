package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.DesignDAO;
import model.LikeDAO;
import model.Model;

import org.genericdao.MatchArg;
import org.genericdao.RollbackException;

import databean.Design;
import databean.LikeEntry;
import databean.User;

public class ShowLikeAction extends Action {

	private LikeDAO lDAO;
	private DesignDAO dDAO;
	
	public ShowLikeAction(Model model) {
		lDAO = model.getLikeDAO();
		dDAO = model.getDesignDAO();
	}
	
	@Override
	public String getName() {
		return "favorite.do";
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
			LikeEntry[] es = lDAO.match(MatchArg.equals("userId", user.getId()));
			List<Design> d = new ArrayList<Design>();
			if (es.length > 0) {
				for (LikeEntry e : es) {
					Design[] tmp = dDAO.match(MatchArg.equals("id", e.getDesignId()));
					if (tmp.length != 1) {
						System.out.println("error");
						errors.add("tshirt no longer available");
						return "error.jsp";
					} else 
						d.add(tmp[0]);
				}
				
				System.out.println(d.size());
				for (Design i : d)
					System.out.println(i);
			}
			request.setAttribute("designList", d);
			
		} catch (RollbackException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			errors.add(e.getMessage());
			return "error.jsp";
		}
		
		return "profile.jsp";
	}


}
