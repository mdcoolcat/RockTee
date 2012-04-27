/**
 *file: LogoutAction.java
 *author: Dan Mei (dmei@andrew.cmu.edu)
 *course: 15-637
 *Last-modify: 3/16/2012
 */

package controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.Model;



/*
 * Logs out by setting the "user" session attribute to null.
 * (Actions don't be much simpler than this.)
 */
public class LogoutAction extends Action {

	public LogoutAction(Model model) { }

	public String getName() { return "logout.do"; }

	public String perform(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        session.setAttribute("user",null);

        return "index.do";
    }
}
