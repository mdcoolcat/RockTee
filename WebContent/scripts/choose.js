function chooseTemp(id, src) {
	$.ajax({
		type: "POST",
		url: "design.do",
        data: {
        	'style': id.substring(6, id.length),
        	'path': src.substring(src.indexOf('images'), src.length)
        },
//        dataType: "application/JSON",
        success: function(response){
        	window.location = "design.jsp";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("XMLHttpRequest="+XMLHttpRequest.responseText+"\ntextStatus="+textStatus+"\nerrorThrown="+errorThrown);
        }
	});
}