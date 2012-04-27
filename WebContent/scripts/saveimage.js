function saveimage(src){
//	alert("!!");
	var cs = new CanvasSaver('http://greenethumb.com/canvas/lib/saveme.php');
	var canvas = document.getElementById('restrictedUsers');
	var canvas_copy = document.createElement('canvas');
	canvas_copy.height = 600;
	canvas_copy.width = 560;
	background = new Image();
	background.src = src;

//	alert(src);
	ctx2 = canvas_copy.getContext('2d');
	ctx2.clearRect(0, 0, 560, 600); // clear second canvas
	ctx2.drawImage(background,0, 0, 560, 600); // draw bk image on second canvas
	ctx2.drawImage(canvas, 150, 100); // paint first canvas onto second canvas

//	cs.generateButton('Save a new version!', canvas_copy, 'myimage');

	cs.savePNG(canvas_copy, 'myimage');
}
