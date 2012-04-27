package databean;

import java.io.Serializable;

import org.genericdao.PrimaryKey;

@PrimaryKey("id")
public class Design implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3475582061969622229L;

	private int id;
	
	private int ownerId = -1;
	private int styleId;
	private int vote = 0;
	private String caption = null;
	private String path;
	
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	}
	public int getStyleId() {
		return styleId;
	}
	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}
	public int getVote() {
		return vote;
	}
	public void setVote(int vote) {
		this.vote = vote;
	}
	public String getCaption() {
		return caption;
	}
	public void setCaption(String caption) {
		this.caption = caption;
	}
	
	@Override
	public String toString() {
    	return "Design("+path+") "+vote;
    }
}
