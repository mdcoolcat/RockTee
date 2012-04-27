package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

public class DesignAction extends Action {

	@Override
	public String getName() {
		return "design.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		int styleId = Integer.parseInt(request.getParameter("style"));
		String path = request.getParameter("path");
		System.out.println(styleId+" "+path);
		request.getSession().setAttribute("curStyle", path);
		return "design.jsp";
	}

}
