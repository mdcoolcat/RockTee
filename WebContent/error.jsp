<!--
 file: error.jsp
 author: Dan Mei (dmei@andrew.cmu.edu)
 course: 15-637
 Last-modify: 3/18/2012
-->

<%@page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
    <head>
        <title>RockTee - Error Page</title>
    </head>
    
	<body>
	
		<h2>RockTee Error</h2>
		<c:forEach var="error" items="${errors}">
			<h3 style="color:red; "> ${error} </h3>
		</c:forEach>
<%

		if (session.getAttribute("user") == null) {
%>
			Click <a href="profile.jsp">here</a> to login.
<%
		} else {
%>
			Click <a href="index.do">here</a> to return to home page.
<%
		}
%>	
	
	</body>
</html>