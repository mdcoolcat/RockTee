package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.ImageDAO;
import model.Model;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.genericdao.MatchArg;
import org.genericdao.RollbackException;


import databean.Image;

public class SearchImgAction extends Action {
	private ImageDAO imgDAO;
	
	public SearchImgAction(Model model) {
		imgDAO = model.getImgDAO();
	}
	
	@Override
	public String getName() {
		return "searchImg.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		
		String keyword = request.getParameter("keyword");
		System.out.println("search..."+keyword);
		try {
			Image[] r;
			if (keyword != "") {
				r = imgDAO.match(MatchArg.containsIgnoreCase("name", keyword));
			} else {
				//get all images
				r = imgDAO.match();
			}
			for (Image i : r)
				System.out.println(i);
			if (r.length > 0)
				request.setAttribute("searchJson", r);
				
		} catch (RollbackException e) {
			e.printStackTrace();
			errors.add(e.getMessage());
			return "error.jsp";
		}
		return "searchResult-ajax.jsp";
	}

}
