$(document).ready(function() {
	//canvas
//	$("#wPaint").wPaint({
////		drawDown: function(e, element){ $("#canvasDown").val(element.settings.mode +": " + e.pageX + ',' + e.pageY); },
////		drawMove: function(e, element){ $("#canvasMove").val(element.settings.mode +": " + e.pageX + ',' + e.pageY); },
////		drawUp: function(e, element){ $("#canvasUp").val(element.settings.mode +": " + e.pageX + ',' + e.pageY); }
//	});

	//search text
	var lib_default = 'search our library';
	var google_default = 'search google';
	var upload_default = 'upload from your computer';
	$('#libsearch').attr('value', lib_default).focus(function() {
		if ($(this).val() == lib_default)
			$(this).attr('value', '');
	}).blur(function() {
		if ($(this).val() == '')
			$(this).attr('value', lib_default);
		
	});
	$('#gsearch').attr('value', google_default).focus(function() {
		if ($(this).val() == google_default)
			$(this).attr('value', '');
	}).blur(function() {
		if ($(this).val() == '')
			$(this).attr('value', google_default);
		
	});
	//enable submit buttons
	$('input[type="file"]').change(function() {
		$(this).next().removeAttr('disabled');
	}).next().attr('disabled', 'disabled');
    //$("#text").focus( alert("click here"));
    
});
