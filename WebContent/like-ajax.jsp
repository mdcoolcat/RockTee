<%@ page contentType="application/json" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<% 
	response.setContentType("application/json"); 
	JSONObject json = (JSONObject) request.getAttribute("likeJson");
	if (json == null)
		System.out.println("null json obj");
	System.out.println(json);
	json.write(response.getWriter());
%>