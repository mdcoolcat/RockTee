function doodle(){
//	Detect mousedown
	var cvs = document.getElementById('restrictedUsers');
	var context = cvs.getContext("2d");
	var mouseDown = false;
	brushColor = "rgb(0, 0, 0)";

	cvs.addEventListener("mousedown", function (evt) {
		if(document.getElementById('doodle_mode').checked){
			//alert("mouse down doodle.js");

			mouseDown = true;
			context.beginPath();
		}
	}, false);

//	Detect mouseup
	cvs.addEventListener("mouseup", function (evt) {
		mouseDown = false;
		var colors = context.getImageData(evt.layerX, evt.layerY, 1, 1).data;
		brushColor = "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
	}, false);

//	Draw, if mouse button is pressed
	cvs.addEventListener("mousemove", function (evt) {
		if (mouseDown) {
			context.strokeStyle = brushColor;
			context.lineWidth = 20;
			context.lineJoin = "round";
			context.lineTo(evt.layerX+1, evt.layerY+1);
			context.stroke();
		}
	}, false);

}


