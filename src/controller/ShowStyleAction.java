package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.Model;
import model.StyleDAO;

import org.genericdao.MatchArg;
import org.genericdao.RollbackException;

import databean.Style;

public class ShowStyleAction extends Action {

	private StyleDAO styleDAO;
	public ShowStyleAction(Model model) {
		styleDAO = model.getStyleDAO();
	}
	
	@Override
	public String getName() {
		return "showStyles.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		HttpSession session = request.getSession();
		
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		
		Style[] men, women, children;
		try {
			men = styleDAO.match(MatchArg.or(
					MatchArg.equals("category", 0),
					MatchArg.equals("category", 3)
					));
			session.setAttribute("menTemps", men);
			
			women = styleDAO.match(MatchArg.or(
					MatchArg.equals("category", 1),
					MatchArg.equals("category", 3)
					));
			session.setAttribute("womenTemps", women);
			
			children = styleDAO.match(MatchArg.or(
					MatchArg.equals("category", 2),
					MatchArg.equals("category", 3)
					));
			session.setAttribute("childTemps", children);
		} catch (RollbackException e) {
			e.printStackTrace();
			errors.add(e.getMessage());
			return "error.jsp";
		}
		return "gallery.jsp";
	}

}
