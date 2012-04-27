package databean;

import java.io.Serializable;

import org.genericdao.PrimaryKey;

@PrimaryKey("id")
public class Style implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1017874068017790526L;

	private int id;
	
	private int category;	//0: men, 1: women, 2: children, 3: general
	private String srcPath;
	


	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	

	public String getSrcPath() {
		return srcPath;
	}
	public void setSrcPath(String srcPath) {
		this.srcPath = srcPath;
	}
	
	
}
