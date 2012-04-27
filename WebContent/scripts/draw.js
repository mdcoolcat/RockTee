
function doFirst() {
//	pic.addEventListener("dragstart", dragStart, false);
//	pic.addEventListener("dragend", dragEnd, false);
	cvs = document.getElementById('box');
	cvs.addEventListener("dragenter", dragEnter, false);
	cvs.addEventListener("dragleave", dragLeave, false);
	
	tshirt = document.getElementById("tshirt");
	tshirt.addEventListener("dragenter", dragEnter, false);
	tshirt.addEventListener("dragleave", dragLeave, false);
	canvas = tshirt.getContext("2d");
	
//	cvs.addEventListener("dragover", dragOver, false);
	//cvs.addEventListener("drop", dropped, false);
}

//search_result
function dragStart(e) {
	e.dataTransfer.setData("Text", e.target.id);
}

function dragEnd(e) {
	e.preventDefault();
}

//canvas
function allowDrop(e) {
	e.preventDefault();
}
function drop(e) {
	e.preventDefault();
	var data = e.dataTransfer.getData("Text");
	e.target.appendChild(document.getElementById(data));
	cvs.style.background = "white";
	cvs.style.border = "ridge #ff99cc";
	//real canvas
	tshirt.style.background = "white";
	tshirt.style.border = "ridge #ff99cc";
	var pic = document.getElementById("mypic");
	canvas.drawImage(pic, 0, 0);
}

function dragEnter(e) {
	e.preventDefault();
	cvs.style.background = "#F0F0F0";
	cvs.style.border = "dotted #ff99cc";
	tshirt.style.background = "#F0F0F0";
	tshirt.style.border = "dotted #ff99cc";
}

function dragLeave(e) {
	e.preventDefault();
	cvs.style.background = "white";
	cvs.style.border = "ridge #ff99cc";
	tshirt.style.background = "white";
	tshirt.style.border = "ridge #ff99cc";
}

//animation
function dragItem(e) {
	canvas.clearRect(0, 0, 450, 300);
	//var data = e.target;
	var x = e.clientX;
	var y = e.clientY;
	//var pic = "/Users/danmei/Pictures/profile/77405618596881674.jpg";
	//canvas.drawImage(pic, x, y);
	canvas.fillRect(x, y, 100, 100);
}

window.addEventListener("load", doFirst, false);