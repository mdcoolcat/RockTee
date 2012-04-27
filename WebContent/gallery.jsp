<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>RockTee - Gallery</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="styles/prettyPhoto.css" type="text/css" />
<script type="text/javascript" src="scripts/jquery-1.4.1.min.js"></script>
<script type="text/javascript" src="scripts/jquery-ui-1.8.12.custom.min.js"></script>
<script type="text/javascript" src="scripts/jquery-prettyPhoto.js"></script>
<script type="text/javascript" src="scripts/user-ajax.js"></script>
<script type="text/javascript" src="scripts/ajax.js"></script>
<script type="text/javascript" src="scripts/jquery.toaster.min.js"></script>
<script type="text/javascript" src="scripts/navtabs.js"></script>
<script type="text/javascript" src="scripts/choose.js"></script>
<script>

</script>
	<style>
			label, input { display:block; }
			input.text { margin-bottom:12px; width:95%; padding: .4em; }
			fieldset { padding:0; border:0; margin-top:25px; background-color: white;}
			div#users-contain { width: 350px; margin: 20px 0; }
			div#users-contain table { margin: 1em 0; border-collapse: collapse; width: 100%; }
			div#users-contain table td, div#users-contain table th { border: 1px solid #eee; padding: .6em 10px; text-align: left; }
			.ui-dialog .ui-state-error { padding: .3em; }
			.validateTips { border: 1px solid transparent; padding: 0.3em; }
			
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
<div class="wrapper col3">
	  <div id="container" class="clear">
    <div id="tabcontainer">
      <ul id="tabnav">
        <li><a href="#tabs-1">Men's Tee Template</a></li>
        <li><a href="#tabs-2">Women's Tee Template</a></li>
        <li><a href="#tabs-3">Children's Tee Template</a></li>
      </ul>
      <!-- ########### -->
      <div id="tabs-1" class="gallery clear">
        <ul>
	        <c:forEach var="item" items="${menTemps }">
	        	<%-- <li><a href="design.do?style=${item.id }&path=${item.srcPath}" id="style-${item.id }" ><img src="${item.srcPath }" height="150" alt="" /></a></li> --%>
	        	<li class="temp-list"><!-- <a href="#" > -->
	        	<img src="${item.srcPath }" height="150" alt="" onclick="chooseTemp(this.id, this.src)" id="style-${item.id }"/>
	        	</li>
	        </c:forEach>
        </ul>
      </div>
      <!-- ########### -->
      <div id="tabs-2" class="gallery clear">
        <ul>
	        <c:forEach var="item" items="${womenTemps }">
	        	<%-- <li><a href="design.do?style=${item.id }&path=${item.srcPath}" id="style-${item.id }" ><img src="${item.srcPath }" height="150" alt="" /></a></li> --%>
	        	<li class="temp-list"><!-- <a href="#" > -->
	        	<img src="${item.srcPath }" height="150" alt="" onclick="chooseTemp(this.id, this.src)" id="style-${item.id }"/>
	        	</li>
	        </c:forEach>
        </ul>
      </div>
      <!-- ########### -->
      <div id="tabs-3" class="gallery clear">
        <ul>
	        <c:forEach var="item" items="${childTemps }">
	        	<li class="temp-list"><!-- <a href="#" > -->
	        	<img src="${item.srcPath }" height="150" alt="" onclick="chooseTemp(this.id, this.src)" id="style-${item.id }"/>
	        	</li>
	        </c:forEach>
        </ul>
      </div>
      <!-- ########### -->
      
    </div>
    <div>
    <p></p>
        <p></p>

    <p></p>

    </div>
  </div>
</div>
<!-- ####################################################################################################### -->

<div class="wrapper">
  <div id="footer" class="clear">
    <div class="footbox">
      <h2>About Us</h2>
      <p>This is a T-shirt designing website providing you with the widest space of imagination and creativity. </p>
      <p>Design your favorite T-shirt by graffiti, uploading pictures from your favorite picture library, or even searching & adding whatever you want on the Internet.</p>
    </div>
    <div class="footbox">
      <h2>Our Skillset</h2>
      <ul>
        <li><a href="#">Lorem ipsum dolor sit</a></li>
        <li><a href="#">Amet consectetur</a></li>
        <li><a href="#">Praesent vel sem id</a></li>
        <li><a href="#">Curabitur hendrerit est</a></li>
        <li><a href="#">Aliquam eget erat nec sapien</a></li>
        <li><a href="#">Cras id augue nunc</a></li>
        <li><a href="#">In nec justo non</a></li>
        <li><a href="#">Vivamus mollis enim ut</a></li>
        <li class="last"><a href="#">Sed a nulla urna</a></li>
      </ul>
    </div>
    <div class="footbox">
      <h2>Blog Links</h2>
      <ul>
        <li><a href="#">Lorem ipsum dolor sit</a></li>
        <li><a href="#">Amet consectetur</a></li>
        <li><a href="#">Praesent vel sem id</a></li>
        <li><a href="#">Curabitur hendrerit est</a></li>
        <li><a href="#">Aliquam eget erat nec sapien</a></li>
        <li><a href="#">Cras id augue nunc</a></li>
        <li><a href="#">In nec justo non</a></li>
        <li><a href="#">Vivamus mollis enim ut</a></li>
        <li class="last"><a href="#">Sed a nulla urna</a></li>
      </ul>
    </div>
    <div class="footbox last">
      <h2>Keep in Touch</h2>
      <ul>
        <li><a href="#">Check out our Facebook page</a></li>
        <li><a href="#">Get the latest Tweets</a></li>
        <li><a href="#">Grab our latest Deviants</a></li>
        <li><a href="#">View our LinkedIn profile</a></li>
      </ul>
      <h2>Contact Us</h2>
      <ul>
        <li><strong class="title">Tel:</strong><br />
          xxxxx xxxxxxxxxx</li>
        <li><strong class="title">Email:</strong><br />
          <a href="#">contact@mydomain.com</a></li>
      </ul>
    </div>
  </div>
</div>

<!-- ####################################################################################################### -->
<div class="wrapper">
  <div id="copyright" class="clear">
    <p class="fl_left">Copyright &copy; 2012 - All Rights Reserved - <a href="#">RockTee</a></p>
    <p class="fl_right">Designed by Coco&Danielle</a></p>
  </div>
</div>
</body>
</html>