<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN"
	dir="ltr">
<head profile="http://gmpg.org/xfn/11">
	<title>RockTee - Home</title>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<meta http-equiv="imagetoolbar" content="no" />
	<link rel="stylesheet" href="styles/layout.css" type="text/css" />
	<link rel="stylesheet" href="styles/toaster.css" type="text/css" />
	<script type="text/javascript" src="scripts/jquery-1.4.1.min.js"></script>
	<script
		src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
	<script type="text/javascript"
		src="scripts/jquery.waterwheelCarousel.js"></script>
	<script type="text/javascript"
		src="scripts/jquery.waterwheelCarousel.setup.js"></script>
	<script type="text/javascript" src="scripts/user-ajax.js"></script>
	<script type="text/javascript" src="scripts/ajax.js"></script>
	<script type="text/javascript" src="scripts/popup.js"></script>
	<script type="text/javascript" src="scripts/jquery.toaster.min.js"></script>

	<style>
			label, input { display:block;}
			label {color: white;}
			input.text { margin-bottom:12px; width:95%; padding: .4em; }
			fieldset { padding:0; border:0; margin-top:25px; background-color: black;}
			div#users-contain { width: 350px; margin: 20px 0; }
			div#users-contain table { margin: 1em 0; border-collapse: collapse; width: 100%; }
			div#users-contain table td, div#users-contain table th { border: 1px solid #eee; padding: .6em 10px; text-align: left; }
			.ui-dialog .ui-state-error { padding: .3em; }
			.validateTips { border: 1px solid transparent; padding: 0.3em; ; color: white;}
			
	</style>
</head>
<body id="top">
	<div class="wrapper col1">
		<div id="header">
			<div class="fl_left">
				<h1>
					<a href="#">RockTee!</a>
				</h1>
				<h3>Everyone Can Be A Designer!</h3>
			</div>
			<div class="fl_right">
				<a href="#"></a>
			</div>
			<br class="clear" />
		</div>
	</div>
	<!-- ####################################################################################################### -->
	
	<div class="wrapper col2">
		<div id="topbar">
			<div id="topnav">
				<ul>
					<li class="active"><a href="index.do">Home</a></li>
					<li><a href="collections.do">View Collections</a></li>
					<li><a href="#">Account</a>
						<c:choose>
							<c:when test="${empty user }">
								<ul id="account-ul" >
									<li><a href="profile.jsp">Log In</a></li>
								</ul>
							</c:when>
							<c:otherwise>
								<ul>
									<li><a href="profile.do">View Your Design</a></li>
									<li><a href="favorite.do">View Your Favorite</a></li>
									<li><a href="logout.do">Log Out</a></li>
								</ul>
							</c:otherwise>
						</c:choose>
					</li>
					
					<li class="active last"><a href="showStyles.do">Start Design</a></li>
				</ul>
			</div>
			<div id="login_form">
				<c:choose>
					<c:when test="${empty user }">
						<form >
							<fieldset>
								<legend>Log In</legend>
								<input type="text" value="Email..." name="email" id="loginEmail" tabindex="1" 
									onfocus="emailFocus();"
									onblur="this.value=(this.value=='')? 'Email...' : this.value" autocomplete="on" />
								<input type="text" value="Password..." name="password" id="loginPassword" tabindex="2"
									onfocus="passwordFocus()"
									onblur="passwordBlur()"/>
								<input type="button" name="action" id="go" value="Login" tabindex="3" onclick="loginRequest('false')"/>
								<a class="create-user" href="#"><strong>Register</strong></a>
							</fieldset>
						</form>
					</c:when>
				<c:otherwise>
					<h3>Welcome! ${user.username }</h3>
				</c:otherwise>
				</c:choose>
			</div>
			<br class="clear" />
		</div>
	</div>
	<!-- ####################################################################################################### -->
	<div class="wrapper col3">
	
	<div class="demo">

		<div id="dialog-form" ">
			<p class="validateTips">All form fields are required.</p>
		
			<form id="registerForm" ">
			<fieldset>
				<label for="emailLabel">Email</label>
				<input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all" autocomplete="on"/>
				<label for="name">Username</label>
				<input type="text" name="username" id="username" class="text ui-widget-content ui-corner-all" autocomplete="on"/>
				<label for="password">Password</label>
				<input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all" />
				<label for="confirmPassword">Confirm Password</label>
				<input type="password" name="confirmPassword" id="confirmPassword" value="" class="text ui-widget-content ui-corner-all" />
			</fieldset>
			</form>
		</div>
	</div> <!-- End demo -->
			
		<div id="waterwheelCarousel">
        	<c:forEach var="item" items="${stars }">
        		<img src="${item.path }" alt="" width="400"/>
			</c:forEach>
		</div>
	</div>
	<!-- ####################################################################################################### -->
	<div class="wrapper col4">
		<div id="featured_intro">
			<div class="fl_left">
				<h2>Star Design</h2>
			</div>
			<div class="fl_right">
				<h2>About RockTee!</h2>
				<p>This is a T-shirt designing website providing you with the
					widest space of imagination and creativity. Design your favorite
					T-shirt by graffiti, uploading pictures from your favorite picture
					library, or even searching & adding whatever you want on the
					Internet.</p>
				<p>
					Dress your mind!
					<p>Make your own style in RockTee!</p>
					<p class="readmore">
						<a href="showStyles.do">Start Design &raquo;</a>
					</p>
			</div>
			<br class="clear" />
		</div>
	</div>
<!-- ####################################################################################################### -->
<div class="wrapper col6">
  <div id="copyright">
    <p class="fl_left">Copyright &copy; 2011 - All Rights Reserved - <a href="#">Domain Name</a></p>
    <p class="fl_right">Template by <a href="http://www.os-templates.com/" title="Free Website Templates">OS Templates</a></p>
    <br class="clear" />
  </div>
</div>
</body>
</html>
