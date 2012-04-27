package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.Model;
import model.UserDAO;
import net.sf.json.JSONObject;

import org.genericdao.MatchArg;
import org.genericdao.RollbackException;

import databean.User;

public class LoginAction extends Action {
//
//	private FormBeanFactory<RegisterForm> formBeanFactory = FormBeanFactory
//			.getInstance(RegisterForm.class);

	private UserDAO userDAO;

	public LoginAction(Model model) {
		userDAO = model.getUserDAO();
	}

	@Override
	public String getName() {
		return "login.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		HttpSession session = request.getSession();

		// If user is already logged in, redirect to todolist.do
		if (session.getAttribute("user") != null) {
			return "index.jsp";
		}

		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		JSONObject json = new JSONObject();
		request.setAttribute("loginJson", json);
		try {

			User[] users = userDAO.match(MatchArg.equalsIgnoreCase("email", email));
			if (users.length == 0) {
				json.put("email", "Email not found");
				return "login-ajax.jsp";
			}

			// Check the password
			if (!users[0].getPassword().equals(password)) {
				json.put("password", "Incorrect password");
				return "login-ajax.jsp";
			}

			// Attach (this copy of) the user bean to the session
			session.setAttribute("user", users[0]);
			json.put("ok", users[0].getUsername());
			//extract designs from database...
			
			return "login-ajax.jsp";

		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		}
	}
}
