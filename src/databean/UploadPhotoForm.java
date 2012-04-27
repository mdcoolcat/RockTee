/**
 * @file UploadPhotoForm.java
 * @author Dan Mei
 * @course 15-637
 * @date 3/18/2012
 */

package databean;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.mybeans.form.FormBean;

public class UploadPhotoForm extends FormBean {
	private String action;
	private String path;
	
	public static int FILE_MAX_LENGTH = 1024 * 1024;
	
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = trimAndConvert(path,"<>\"");
	}
	
	public List<String> getValidationErrors() {
		List<String> errors = new ArrayList<String>();
		
		if (path == null || path.length() == 0) {
			errors.add("No file chosen");
		}
		
		
		return errors;
	}
}
