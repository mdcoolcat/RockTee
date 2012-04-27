package controller;

import javax.servlet.http.HttpServletRequest;

import model.DesignDAO;
import model.Model;

public class SaveAction extends Action {

	private DesignDAO dDAO;
	
	public SaveAction(Model model) {
		dDAO = model.getDesignDAO();
	}
	@Override
	public String getName() {
		return "save.do";
	}

	@Override
	//return json
	public String perform(HttpServletRequest request) {
		String data = request.getParameter("data");
		System.out.println(data);
		return "main.jsp";
	}

}
