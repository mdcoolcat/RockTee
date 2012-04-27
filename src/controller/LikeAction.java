package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.DesignDAO;
import model.LikeDAO;
import model.Model;
import model.UserDAO;
import net.sf.json.JSONObject;

import org.genericdao.MatchArg;
import org.genericdao.RollbackException;

import databean.Design;
import databean.LikeEntry;
import databean.User;

public class LikeAction extends Action {
	private DesignDAO dDAO;
	private LikeDAO lDAO;
	
	public LikeAction(Model model) {
		dDAO = model.getDesignDAO();
		lDAO = model.getLikeDAO();
	}
	
	@Override
	public String getName() {
		return "like.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		HttpSession session = request.getSession();

		JSONObject json = new JSONObject();
		request.setAttribute("likeJson", json);
		User user = (User) session.getAttribute("user");
		// If user is already logged in, redirect to todolist.do
		if (user == null) {
			json.put("error", "Want to vote? Login or Register!");
			return "like-ajax.jsp";
		}
		
		int id = Integer.parseInt(request.getParameter("id"));
		System.out.println(id);
		try {
			Design[] ds= dDAO.match(MatchArg.equals("id", id));
			if (ds.length < 1) {
				json.put("error", "Sorry, this design no longer exists");
				return "like-ajax.jsp";
			}
			Design d = ds[0];
			
			if (lDAO.match(MatchArg.and(
					MatchArg.equals("designId", id),
					MatchArg.equals("userId", user.getId())
					))
				.length > 0) {
				System.out.println("already vote!");
				json.put("ok", "You've already voted this design. Thank you!");
				return "like-ajax.jsp";
			}
			
			//update design's vote
			d.setVote(d.getVote() + 1);
			dDAO.update(d);
			
			//new like entry
			LikeEntry e = new LikeEntry();
			e.setDesignId(id);
			e.setUserId(user.getId());
			lDAO.createAutoIncrement(e);
			System.out.println(e);
			
			json.put("ok", "Thank you!");
			
			return "like-ajax.jsp";
		} catch (RollbackException e) {
			e.printStackTrace();
			List<String> errors = new ArrayList<String>();
			request.setAttribute("errors", errors);
			errors.add(e.getMessage());
			return "error.jsp";
		}
	}

}
