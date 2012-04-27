/**
 * register jQuery popup form
 */
$(function () {	    
	
		// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
		$( "#dialog:ui-dialog" ).dialog( "destroy" );
		
		var name = $( "#username" ),
			email = $( "#email" ),
			password = $( "#password" ),
			confirmPassword = $( "#confirmPassword"),
			allFields = $( [] ).add( name ).add( email ).add( password ).add( confirmPassword ),
			tips = $( ".validateTips" );

		function updateTips( t ) {
			tips
				.text( t )
				.addClass( "ui-state-highlight" );
			setTimeout(function() {
				tips.removeClass( "ui-state-highlight", 1500 );
			}, 500 );
		}

		function checkLength( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				updateTips( "Length of " + n + " must be between " +
					min + " and " + max + "." );
				return false;
			} else {
				return true;
			}
		}

		function checkRegexp( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				updateTips( n );
				return false;
			} else {
				return true;
			}
		}
		
 		function checkIdentical(p1, p2) {
			if (p1.val() != p2.val()) {
				p1.addClass( "ui-state-error" );
				updateTips( "Two passwords do not match! Case sensitive!" );
				return false;
			} else
				return true;
		} 
		
		$( "#dialog-form" ).dialog({
			autoOpen: false,
			height: 330,
			width: 350,
			modal: true,
		  
 			buttons: {
				"Create an account": function() {
					var bValid = true;
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkLength( email, "email", 6, 80 );
					bValid = bValid && checkLength( name, "username", 3, 16 );
					bValid = bValid && checkLength( password, "password", 6, 20 );
					bValid = bValid && checkLength( confirmPassword, "confirmPassword", 6, 20 );

					bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
					bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
					// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
					//bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
					bValid = bValid && checkIdentical(confirmPassword, password);
					if ( bValid ) {
 						 $.ajax({
//					        type: "POST",
					        url: "register.do",
					        data: {
					        	'username': name.val(),
					        	'email': email.val(), 
					        	'password': password.val()
					        },
					        dataType: "application/JSON",
					        success: function(response){
					        	var data = jQuery.parseJSON(response);
//					        	alert(data.error+" "+data.ok);
					        	
					        	if (data.ok != null) {
					        		//success
						        	$('#login_form').html("<h3>Welcome! " + name.val() + "</h3>");
									$('#account-ul').html(
							"<li><a href=\"profile.do\">View Your Design</a></li><li><a href=\"profile.jsp\">View Your Favorite</a></li><li><a href=\"logout.do\">Log Out</a></li>"
									);
					        		
						        	$('#dialog-form').html("<h2>Welcome! "+ name.val() +"</h2>")
						        	.append("<p>You can now save your designs, vote and add favorite to your account.</p>")
						        	.hide()
						        	.fadeIn(500, function() {
						        		$('#dialog-form').append("<img id='checkmark' src='images/check.png' />");
						        	})
						        	.delay(2000).fadeOut(1000);
						        	$(":button").hide();
						        	$(".ui-icon-closethick").hide();
						        	
					        	} else {
					        		$('#emailLabel').text(data.error);
					        		updateTips(data.error);
					        	}
					        
					      
					        },
					        error: function(e){
					        	alert('Error: ' + e);
					        }
					    });  
						
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}, 
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});

		$( ".create-user" )
			.click(function() {
				$( "#dialog-form" ).dialog( "open" );
			});
});