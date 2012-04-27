/**
 * user login and register ajax control
 * @author dmei
 */
nameLabel = 'Username';
emailLabel = 'Email';
pwdLabel = 'Password';
cfmLabel = 'Confirm Password';

isProfile = false;

function passwordBlur() {
	var input = document.getElementById('loginPassword');
	var cur = input.value;
	if (cur == '') {
		input.type = 'text';
		input.value = 'Password...';
	} else if (cur == 'Length of loginPassword must be between 6 and 20.') {
		input.type = 'text';
	}
	else {
		input.type = 'password';
		input.value = cur;
	}
}

function passwordFocus() {
	var input = document.getElementById('loginPassword');
	var cur = input.value;
	
	input.type = 'password';
	
	if (cur == 'Password...' || cur == 'Length of loginPassword must be between 6 and 20.'
		|| cur == 'Incorrect password') {
		input.value = '';
	} else 
		input.value = cur;
	
//	this.type='password'; this.value=(this.value=='Password...')? '' : this.value ;
}

function emailFocus() {
	var input = document.getElementById('loginEmail');
	var cur = input.value;
	
	if (cur == 'Email...' || cur == 'Length of loginEmail must be between 6 and 80.' 
		|| cur == 'Invalid email address. eg. ui@jquery.com' || cur == 'Email not found') {
		input.value = '';
	} else 
		input.value = cur;
//	this.value=(this.value=='Email...')? '' : this.value 
}
function updateTips(field, txt ) {
//	alert("updateTips..."+field+" "+txt);
	var tips = $("label[for='"+field+"']");
	
	if (tips != null && tips.text() != '') {
		request = createRequest();
//		alert("tips label found! "+tips.text());
		tips.text( txt ).addClass( "ui-state-highlight" );
		$("input[id='"+field+"']").focus();
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	} else {
		request = createRequest();
		//no tips label
//		var o = "input[id='"+field+"']";
//		alert("get input id..."+field);
		tips = document.getElementById(field);  
//		alert(tips.id+" "+tips.type);
//		alert("found input: "+tips.val()+" "+txt+"\n"+txt.indexOf('eg')+"\n"+field.indexOf(assword));
		tips.value = txt;
		
		if (field.indexOf('Password') >= 0) {
			tips.type = 'text';
		}
		
		//flash
//		function normal (times) {
//			tips.css("background-color","rgb(21, 21, 21)"); 
//			if (times < 0)
//				return;
//			
//			times = times - 1;
//			setTimeout('error('+times+')',150);
//		}
//		
//		function error (times) {
//			tips.css("background-color","#FFFFFF"); 
//			times = times - 1;
//			setTimeout('normal('+times+')',1000);
//		}
//		
//		error(3);
		
	}
}

function checkLength( input, field, min, max ) {
	if ( input.val().length > max || input.val().length < min ) {
		input.addClass( "ui-state-error" );
		updateTips(field, "Length of " + field + " must be between " +
			min + " and " + max + "." );
		return false;
	} else {
		return true;
	}
}

function checkRegexp( input, regexp, field, txt ) {
	if ( !( regexp.test( input.val() ) ) ) {
		input.addClass( "ui-state-error" );
		updateTips( field, txt );
		return false;
	} else {
		return true;
	}
}

function checkIdentical(p1, p2) {
	if (p1.val() != p2.val()) {
		p1.addClass( "ui-state-error" );
		updateTips("regConfirmPassword", "Two passwords do not match! Case sensitive!" );
		return false;
	} else
		return true;
} 

//This method receives the response from the server, and updates the DOM with the search results.
function updatePage() {
	if (request.readyState != 4) return;
	
	if (request.status != 200) {
		alert("Error, request status is "+request.status);
		return;
	}
	//redirect to .jsp if page returned
	if (request.getResponseHeader('content-type').indexOf("text/html") >= 0)
		window.location = request.responseText;
	
	//We clean the last search results from the HTML DOM.
	//cleanSearchResults();
	
	var result = request.responseText;
	if (result != null) {
		var data = JSON.parse(result);
		if (data.ok != null && data.ok != "undefined") {
//			window.location = "profile.jsp";
        	var t = $.toaster({showTime:2000, centerX:true, centerY:true});
        	t.toast("Welcome back! " + data.ok);
			request = createRequest();
			$('#login_form').html("<h3>Welcome! " + data.ok + "</h3>");
			$('#account-ul').html(
	"<li><a href=\"profile.do\">View Your Design</a></li><li><a href=\"favorite.do\">View Your Favorite</a></li><li><a href=\"logout.do\">Log Out</a></li>"
			);
			$('#upload-tip').html(
					"<form class=\"search_form\" action=\"upload.do\" method=\"POST\" enctype=\"multipart/form-data\"><input id=\"images\" name=\"path\" type=\"file\" accept=\"image/*\"style=\"font-size: 16px; width: 200px; padding: 6px 5px 6px 5px; margin-top: 5px; color: #aaa; border: 2px solid #ccc; -moz-border-radius: 4px; -webkit-border-radius: 4px;\" /><input id=\"upload_img\" class=\"gsc-search-button ui-widget\" style=\"float:right;margin-right: 150px;\"name=\"action\" type=\"submit\" value=\"Upload\" /></form>"
					);
			if (isProfile)
				window.location = "profile.do";
			else
				return;
		} else if (data.email != null && data.email != "undefined") {
//			document.getElementById("loginEmail").value = data.email;
			updateTips("loginEmail", data.email);
			request = createRequest();
		} else if (data.password != null && data.password != "undefined") {
			updateTips("loginPassword", data.password);
//			var pwd = document.getElementById("loginPassword");
//			pwd.type='text';
//			pwd.value = data.password;
			request = createRequest();
		} else if (data.error != null && data.error != "undefined") {
			//for register existing email
			updateTips("regEmail", data.error);
			request = createRequest();
		}
	} 
}

/**
 * login submit form
 */
function loginRequest(flag) {
	isProfile = flag=='true';
	//check input
	var email = $( 'input[id=loginEmail]' ),
		password = $( 'input[id=loginPassword]'),
		allFields = $( [] ).add( email ).add( password );
	

	//validate
	var bValid = true;
	allFields.removeClass( "ui-state-error" );
	$("label[for='loginEmail']").text(emailLabel);
	$("label[for='loginPassword']").text(pwdLabel);
	
	bValid = bValid && checkLength( email, "loginEmail", 6, 80 );
	bValid = bValid && checkLength( password, "loginPassword", 6, 20 );
	bValid = bValid && checkRegexp( email, 
			/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, 
			"loginEmail",
			"Invalid email address. eg. ui@jquery.com" );
	if (!bValid)
		return;
		//We send the request to the server if the request object is ready.
	if (request.readyState != 0) {
		alert("not ready...");
		return;
	}

	var rqParams = "email="+escape(email.val())+"&password="+escape(escape(password.val()));
	var url="login.do";
	//We set the callback page to updatePage.
	request.onreadystatechange = updatePage;
	
	//We open a POST request.
	request.open("POST",url,true);
	
	//Because the request is POST we must set its content-type
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(rqParams);
}

/**
 * register submit form
 */
function regRequest(flag) {
	isProfile = flag=='true';
	//check input
	var email = $( 'input[id=regEmail]' ),
	name = $( 'input[id=regUsername]' ),
	password = $( 'input[id=regPassword]'),
	confirmPassword = $( 'input[id=regConfirmPassword]');
	allFields = $( [] ).add( name ).add( email ).add( password ).add( confirmPassword );

	//clear tips
	allFields.removeClass( "ui-state-error" );
	$("label[for='regEmail']").text(emailLabel);
	$("label[for='regUsername']").text(nameLabel);
	$("label[for='regPassword']").text(pwdLabel);
	$("label[for='regConfirmPassword']").text(cfmLabel);
	
	
	//validate
	var bValid = true;
	bValid = bValid && checkLength( email, "regEmail", 6, 80 );
	bValid = bValid && checkLength( name, "regUsername", 3, 16 );
	bValid = bValid && checkLength( password, "regPassword", 6, 20 );
	bValid = bValid && checkLength( confirmPassword, "regConfirmPassword", 6, 20 );
	bValid = bValid && checkRegexp( email, 
			/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, 
			"regEmail",
			"Invalid email address. eg. ui@jquery.com" );
	bValid = bValid && checkIdentical(confirmPassword, password);
	
	if (!bValid)
		return;

	//We send the request to the server if the request object is ready.
	if (request.readyState != 0) {
		alert("not ready...");
		return;
	}
	
	var rqParams = "email="+escape(email.val())+"&username="+escape(name.val())+"&password="+escape(escape(password.val()));
	//	var rqParams = "email="+escape(document.getElementById("loginEmail").value)+
//	"&password="+escape(document.getElementById("loginPassword").value);
	var url="register.do";
	//We set the callback page to updatePage.
	request.onreadystatechange = updatePage;
	
	//We open a POST request.
	request.open("POST",url,true);
	
	//Because the request is POST we must set its content-type
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(rqParams);
}


/**
 * like or favorite
 */
function like() {
	$('.like').click(function() {
		var id = $(this).parent().parent().find('img').attr('id'); 
		if (id != null) {
			$.ajax({
				url: "like.do",
		        data: {
		        	'id': id.substring(7, id.length)
		        },
		        dataType: "application/JSON",
		        success: function(response){
		        	var data = jQuery.parseJSON(response);
//		        	alert(data.ok);
//		        	alert(data.ok==null);
//		        	alert(data.error + " " + data.error.indexOf("Want")<0);
//		        	if (data.error != null && 
//		        			(data.error.indexOf("Want") < 0 || data.error.indexOf("Sorry") < 0) ) {
		        	if (data.ok != null) {
		        		var t = $.toaster({
			        				showTime:2000, 
			        				centerX:true, 
			        				centerY:true
			        			}
			        	);
			        	t.toast(data.ok);
		        	} else {
		        		alert(data.error);	//create dialog...ok cancel...
		        	}
		        },
		        error: function(e) {
		        	alert("error! " + e);
		        }
			});
		}
	});
}
