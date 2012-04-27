/**
 *file: UploadAction.java
 *author: Dan Mei (dmei@andrew.cmu.edu)
 *course: 15-637
 *Last-modify: 3/18/2012
 */

package controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.DesignDAO;
import model.Model;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databean.Design;
import databean.UploadPhotoForm;
import databean.User;

public class UploadAction extends Action {
	private FormBeanFactory<UploadPhotoForm> formBeanFactory = FormBeanFactory
			.getInstance(UploadPhotoForm.class);
	private DesignDAO dDAO;

	public UploadAction(Model model) {
		dDAO = model.getDesignDAO();
	}

	@Override
	public String getName() {
		return "upload.do";
	}

	@Override
	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);

		User user = (User) request.getSession(false).getAttribute("user");
		if (user == null) {
			errors.add("You are not login!!");
			return "error.jsp";
		}

//		int id = user.getId(); // may exception
		// user = userDAO.read(id);
		// if (id == 0) {
		// errors.add("no such user");
		// return "error.jsp";
		// }
		// request.setAttribute("user", user);
		// UploadPhotoForm form = formBeanFactory.create(request);
		// request.setAttribute("uploadForm", form);

		// If no params were passed, return with no errors so that the form
		// will be
		// presented (we assume for the first time).
		/*
		 * if (!form.isPresent()) { return "profile.jsp"; }
		 */

		// Any validation errors?
		/*
		 * errors.addAll(form.getValidationErrors()); if (errors.size() > 0) {
		 * System.out.println("errors: \n" + errors); return "profile.jsp"; }
		 */
		// if (form.getAction() != null && form.getAction().equals("Upload")) {
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		if (!isMultipart) {
			errors.add("You are not trying to upload");
			return "error.jsp";
		}

//		String err;
//		if ((err = processUpload(request, user, errors)) != null)
//			return err;
//		else {
//			request.setAttribute("user", user);
//			return "profile.jsp";
//		}

		return processUpload(request, user, errors);
		// }

	}

	// return the page/action that should do next if errs, null if succeeds
	private String processUpload(HttpServletRequest request, User user,
			List<String> errors) {
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		List<FileItem> items;
		try {
			items = upload.parseRequest(request);
			Iterator<FileItem> it = items.iterator();
			if (!it.hasNext()) {
				errors.add("No image chosen");
				return "design.jsp";
			}
			while (it.hasNext()) {
				FileItem item = it.next();

				if (!item.isFormField()) {// eg. the button
					if (item.getSize() == 0) {

						errors.add("Zero length image");
						return "design.jsp";
					}
					// write to directory
					String path = request.getServletContext().getRealPath(
							"/images/tees/")
							+ "/" + item.getName();
					System.out.println(path);
					InputStream uploadedStream = item.getInputStream();
					OutputStream writePhotoStream = new FileOutputStream(path);

					int ch;
					while ((ch = uploadedStream.read()) != -1) {
						System.out.print(ch);
						writePhotoStream.write(ch);
					}
					System.out.println();
					uploadedStream.close();
					writePhotoStream.close();
					System.out.println("write photo ok: " + path + " "
							+ item.getContentType() + " " + item.getSize());
					path = path.substring(path.indexOf("images"));
					System.out.println(path);
					
					Design d = new Design();
					d.setPath(path);
					d.setOwnerId(user.getId());
					dDAO.createAutoIncrement(d);
					
					return "profile.do";
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (IOException e) {
			e.printStackTrace();
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (RollbackException e) {
			e.printStackTrace();
			errors.add(e.getMessage());
			return "error.jsp";
		} 
		return "design.jsp";
	}
}