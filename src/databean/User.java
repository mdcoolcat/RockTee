package databean;

import java.util.ArrayList;
import java.util.List;

import org.genericdao.PrimaryKey;

@PrimaryKey("id")

public class User {
	private int id;
	
	private String username;
	private String email;
	private String password;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String toString() {
		return this.id + " " + this.username + " " + this.email;
	}
}
