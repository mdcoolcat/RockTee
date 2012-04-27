<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml"
	xmlns:v="urn:schemas-microsoft-com:vml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet"
	href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/themes/base/jquery-ui.css"
	type="text/css" />

<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link href="styles/mainStyle.css" rel="stylesheet" type="text/css" />
<!--[if IE]> <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script> <![endif]
<!--doodle-->
<script type="text/javascript" src="scripts/html5-canvas-drawing-app.js"></script>
<script type="text/javascript" src="scripts/doodle.js"></script>

<!--jQuery-->
<script type="text/javascript" src="scripts/jquery-1.7.2.js"></script>
<script
	src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script type="text/javascript" src="scripts/init.js"></script>
<script type="text/javascript" src="scripts/search.js"></script>
<script type="text/javascript" src="scripts/user-ajax.js"></script>
<script type="text/javascript" src="scripts/ajax.js"></script>
<script type="text/javascript" src="scripts/jquery.toaster.min.js"></script>

<!--HTML5 -->
<script type="text/javascript" src="scripts/EventHelpers.js"></script>
<script type="text/javascript" src="scripts/DragDropHelpers.js"></script>
<script type="text/javascript" src="scripts/saveimage.js"></script>
<script type="text/javascript" src="scripts/canvassaver.js"></script>

<!--toolbox tab-->
<script type="text/javascript" src="scripts/tabbed.layout.js"></script>
<!-- toolbox google search -->
<script type="text/javascript"
	src="http://www.google.com/jsapi?key=AIzaSyA5m1Nc8ws2BbmPRwKu5gFradvD_hgq6G0"></script>
<script type="text/javascript" src="scripts/googleImageSearch.js"></script>

<title>Main</title>
</head>
<body onload="init2()">
	<script type="text/javascript" src="scripts/boxes2.js"></script>

	<!-- 	<div style="font-family: Verdana; font-size: 12px;">
		<p>Click to select. Click on selection handles to resize. Double
			click to delete a node.</p>
	</div> -->
	<script src="scripts/shapes.js"></script>

	<div id="big_wrapper">
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
						<li><a href="#">Account</a> <c:choose>
								<c:when test="${empty user }">
									<ul id="account-ul">
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
							</c:choose></li>

						<li class="active last"><a href="showStyles.do">Start
								Design</a></li>
					</ul>
				</div>
				<div id="login_form">
					<c:choose>
						<c:when test="${empty user }">
							<form>
								<fieldset>
								<legend>Log In</legend>
								<input type="text" value="Email..." name="email" id="loginEmail" tabindex="1" 
									onfocus="emailFocus();"
									onblur="this.value=(this.value=='')? 'Email...' : this.value" autocomplete="on" />
								<input type="text" value="Password..." name="password" id="loginPassword" tabindex="2"
									onfocus="passwordFocus()"
									onblur="passwordBlur()"/>
								<input type="button" name="action" id="go" value="Login" tabindex="3" onclick="loginRequest('false')"/>
								<a class="create-user" href="profile.jsp"><strong>Register</strong></a>
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
		<section id="main">
		<div>
			<button onclick="saveimage('${curStyle}');">Save Image</button>
			<p id="upload-tip">Login to upload your TEE!</p>
			<c:if test="${not empty user }"> 
			<form class="search_form" action="upload.do" method="POST" enctype="multipart/form-data">
				<input id="images" name="path" type="file" accept="image/*"
					style="font-size: 16px; width: 200px; padding: 6px 5px 6px 5px; margin-top: 5px; color: #aaa; border: 2px solid #ccc; -moz-border-radius: 4px; -webkit-border-radius: 4px;" />
				<input id="upload_img" class="gsc-search-button ui-widget" style="float:right;margin-right: 150px;"
					name="action" type="submit" value="Upload" />
			</form>
			</c:if>
		</div>
		<br />
		<div class="tshirt" id="front"
			style="background-image: url('${curStyle}');background-repeat: no-repeat;background-position: center top; background-size: 570px">
			<div id="userList">
				<canvas id="restrictedUsers" width="265" height="340"> </canvas>
			</div>
		</div>
	</div>
	<div id="restrictedUsersHelp">Drag an image from the list to
		front tshirt template.</div>
	<!-- <div class="tshirt" id="back">
			<div id="userList">
				<canvas id="restrictedUsers" width="265" height="340"> </canvas>
			</div>
		</div>
		<div id="restrictedUsersHelp">Drag an image from the list to
			back tshirt template.</div>
		-->
	</section>

	<section id="tool_box"> <header id="search_header">
	<h2>Tool Box</h2>
	</header> <nav>
	<ul>
		<li><a href="#image">Image</a></li>

		<li><a href="#text">Web Search</a></li>
		<li><a href="#doodle">Doodle</a></li>
	</ul>
	</nav> <section class="tab" id="image"> <input type="radio"
		name="mode" id="image_mode" value="Image DragnDrop Mode" />
	<!-- <form class="search_form" action="libsearch.do" method="POST">
		<input id="libsearch" type="text" name="object"
			style="font-size: 16px; width: 250px; padding: 6px 5px 6px 5px; margin-top: 5px; color: #aaa; border: 2px solid #ccc; -moz-border-radius: 4px; -webkit-border-radius: 4px;">
		<input name="action" class="gsc-search-button ui-widget" type="submit"
			value="Search" />
	</form> -->
	<input id="libsearch" type="text" name="object" onfocus="focusSearch()" disabled = "disabled"
			style="font-size: 16px; width: 250px; padding: 6px 5px 6px 5px; margin-top: 5px; color: #aaa; border: 2px solid #ccc; -moz-border-radius: 4px; -webkit-border-radius: 4px;">
		<!-- <input name="action" class="gsc-search-button ui-widget" type="submit"
			value="Search" onclick="searchLib()"/> -->
		<button class="gsc-search-button ui-widget"  onclick="searchLib()" disabled= "disabled">Search</button>

	<!--Image will be shown here-->
	<div id='imageContainer'></div>

	<section class="search_result">
	<div class=grid_wrapper>
		<!-- 			<div id="unassignedUsers" class=userList>
 -->
		<div id="unassignedUsersHelp">
			<ul>
				<li id="result-list">
				<img height="88px" draggable="true" src="images/img-lib/mermaid.png" />
					<img height="88px" draggable="true"
					src="images/img-lib/mermaid.png" /> 
					<img height="88px" draggable="true"
					src="images/img-lib/mermaid.png" /> 
				</li>
			</ul>
		</div>
	</div>

	<div class="left1"></div>
	<div class="left1"></div>

	<div class="wrapper">
		<div class="left1"></div>
		<div class="left1"></div>
		<div class="left1"></div>
	</div>
	</section> </section> <section class="tab" id="text"> Search Images - <small>powered
		by <img class="gsc-branding-img" style="vertical-align: middle"
		src="http://www.google.com/uds/css/small-logo.png" />
	</small>
	<div id="imgSearchControl" class="search-control" draggable="true">Loading...</div>
	<!-- 
		<!--Remove all floating-->
	<div class="clear"></div>
	</section> <section class="tab" id="doodle"> <input type="radio"
		name="mode" id="doodle_mode" value="Doodle Mode" />
	<div id="canvasDiv"></div>
	<script type="text/javascript">
			$(document).ready(function() {
				//doodle();
				prepareCanvas();
			});
		</script> </section> <img id="canvasImage" src="" /> </section>

	<footer id="the_footer"> Copyright RockTee 2012 </footer>
	</div>
</body>
</html>