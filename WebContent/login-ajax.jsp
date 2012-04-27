<%@ page contentType="application/json" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<% 
	response.setContentType("application/json"); 
	JSONObject json = (JSONObject) request.getAttribute("loginJson");
	if (json == null)
		System.out.println("null json obj");
	json.write(response.getWriter());
	//response.getWriter().write(json.toString());
%>
