package databean;

import org.genericdao.PrimaryKey;

@PrimaryKey("id")
public class LikeEntry {

	private int id;
	private int userId = -1;
	private int designId = -1;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getDesignId() {
		return designId;
	}
	public void setDesignId(int designId) {
		this.designId = designId;
	}
	
	public String toString() {
		return userId+"->"+designId;
	
}
			
}
