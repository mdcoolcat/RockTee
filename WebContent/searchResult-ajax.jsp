<%@ page contentType="application/json" %>
<%@ page import="net.sf.json.JSONArray" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="databean.Image" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% 
	PrintWriter writer = response.getWriter();
	response.setContentType("text/plain");
	
	Image[] r = (Image[]) request.getAttribute("searchJson");
	if (r != null) { 
		JSONArray jsonArray = JSONArray.fromObject(r);
	
		writer.println(jsonArray);
	} else {
		JSONObject err = new JSONObject();
		err.put("error", "No result found.");
		writer.println(err);
	}
	writer.flush();
	writer.close();
%>
<%-- 
<c:forEach var="entry" items="${json}">
		{
			"name":"${entry.name}",
			"path":"${entry.path}"
		}
</c:forEach> --%>

