/**
 *file: RegisterAction.java
 *author: Dan Mei (dmei@andrew.cmu.edu)
 *course: 15-637
 *Last-modify: 3/18/2012
 */

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

public class RegisterAction extends Action {
//	private FormBeanFactory<RegisterForm> formBeanFactory = FormBeanFactory
//			.getInstance(RegisterForm.class);

	private UserDAO userDAO;

	public RegisterAction(Model model) {
		userDAO = model.getUserDAO();
	}

	@Override
	public String getName() {
		return "register.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		HttpSession session = request.getSession();

		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		// If user is already logged in, redirect to todolist.do
		if (session.getAttribute("user") != null) {
			System.out.println("user login");
			return "index.jsp";
		}

		String name = request.getParameter("username");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		System.out.println("name: "+name + " email: " + email + " password:" + password);
		JSONObject json = new JSONObject();
		try {
			User user = new User();

			User[] users = userDAO.match(MatchArg.equalsIgnoreCase("email",
					email));
			if (users.length > 0) {
				System.out.println("email exist!!");
				json.put("error", "This email already registered");
			} else {
				user.setUsername(name);
				user.setEmail(email);
				user.setPassword(password);

				userDAO.createAutoIncrement(user);
				session.setAttribute("user", user);
				json.put("ok", "register successfully");
				json.put("username", name);
			}
			request.setAttribute("regJson", json);
			return "register-ajax.jsp";
		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		}

		// List<String> errors = new ArrayList<String>();
		// request.setAttribute("errors", errors);
		//
		// try {
		// RegisterForm form = formBeanFactory.create(request);
		// request.setAttribute("registerForm", form);
		//
		// Map<String, String> errorList = new HashMap<String, String>();
		// request.setAttribute("errorList", errorList);
		//
		//
		// // If no params were passed, return with no errors so that the form
		// // will be
		// // presented (we assume for the first time).
		// if (!form.isPresent()) {
		// System.out.println("form is not present");
		// return "index.jsp";
		// }
		//
		// String action = null;
		// if (form.getAction() != null) {
		// action = form.getAction();
		// if (action.equals("Create an account")) {
		// User user = new User();
		//
		// User[] users = userDAO.match(MatchArg.equalsIgnoreCase("email",
		// form.getEmail()));
		// System.out.println("email: "+form.getEmail());
		// if (users.length > 0) {
		// System.out.println("email exist!!");
		// errorList.put("email", "This email already registered");
		// return "index.jsp";
		// } else {
		// user.setUsername(form.getUsername());
		// user.setEmail(form.getEmail());
		// user.setPassword(form.getPassword());
		//
		// userDAO.createAutoIncrement(user);
		// session.setAttribute("user", user);
		//
		// return "index.jsp";
		// }
		// }
		// }
		//
		// } catch (RollbackException e) {
		// errors.add(e.getMessage());
		// return "error.jsp";
		// } catch (FormBeanException e) {
		// errors.add(e.getMessage());
		// return "error.jsp";
		// }

	}
}
