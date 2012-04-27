function searchLib() {
	if ($('#libsearch').val() != null) {
		$.ajax({
			url: "searchImg.do",
	        data: {
	        	'keyword': $('#libsearch').val()
	        },
//	        dataType: "application/JSON",
	        success: function(response){
	        	var list = $('#result-list');
        		list.html('');
	        	response = $.parseJSON(response);
	        	if (response.error ==null) {
		        	$.each(response, function() {
				       	list.html(list.html() + '<img height="88px" draggable="true" src="'+this.path+'" />');
		        	});
	        	} else {
	        		list.html('<p><strong>' + response.error + '</strong></p>');
	        	}
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            alert("XMLHttpRequest="+XMLHttpRequest.responseText+"\ntextStatus="+textStatus+"\nerrorThrown="+errorThrown);
	        }
		});
	}
}
