
var permissionForm = new function () {

	var me = this;

	var mouseX, mouseY;
	var userNodes, currentlyDraggedNode;



	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}

		userNodes = cssQuery('[draggable=true]');

		for (var i=0; i<userNodes.length; i++) {
			EventHelpers.addEvent(userNodes[i], 'dragstart', userDragStartEvent);
			EventHelpers.addEvent(userNodes[i], 'dragend', userDragEndEvent);
		}

		userListNodes = cssQuery('#userList');
		for (var i=0; i<userListNodes.length; i++) {
			var userListNode = userListNodes[i];
			EventHelpers.addEvent(userListNode, 'dragover', userDragOverListEvent);
			EventHelpers.addEvent(userListNode, 'dragleave', userDragLeaveListEvent);
		}	

		userListNodes = cssQuery('#restrictedUsers');
		for (var i=0; i<userListNodes.length; i++) {
			var userListNode = userListNodes[i];
			EventHelpers.addEvent(userListNode, 'drop', userDropListEvent);	
		}	

		userListNodes = cssQuery('#powerUsers');
		for (var i=0; i<userListNodes.length; i++) {
			var userListNode = userListNodes[i];
			EventHelpers.addEvent(userListNode, 'drop', userDustbinEvent);	
		}	

	};

	function userDragStartEvent(e) {

		e.dataTransfer.effectAllowed="copy";
		e.dataTransfer.setData('Text', "draggedUser: "+ this.innerHTML);
		currentlyDraggedNode = this;
		currentlyDraggedNode.className = 'draggedUser';
	}

	function imageDragStartEvent(e) {
		e.dataTransfer.setData('Text', "draggedImage: " + this.innerHTML);
		currentlyDraggedNode = this;				
		currentlyDraggedNode.className = 'draggedImage';
	}


	function userDragEndEvent(e) {	
		currentlyDraggedNode.className = '';
	}


	function userDragLeaveListEvent(e){
		//setHelpVisibility(this, false);
	}

	function userDropListEvent(e) {
		/*
		 * To ensure that what we are dropping here is from this page
		 */
	      e.dataTransfer.dropEffect = "copy";

		var data = e.dataTransfer.getData('Text');
		if (data.indexOf("draggedUser: ") != 0 || currentlyDraggedNode.className != "draggedUser") {
			alert("Only users within this page are draggable.");
		}
		else{
			//currentlyDraggedNode.parentNode.appendChild(currentlyDraggedNode.prototype);
			new_node = currentlyDraggedNode.cloneNode(true);
			EventHelpers.addEvent(new_node, 'dragstart', imageDragStartEvent);
			EventHelpers.addEvent(new_node, 'dragend', userDragEndEvent);
			new_node.className = '';
//			alert(new_node.src);
			this.appendChild(new_node);
			var img3 = new Image();
			img3.src = new_node.src;
			addRect(100, 70, 60, 65,img3);			
			//setHelpVisibility(this, false);
			userDragEndEvent(e);
		}
	}


	function userDustbinEvent(e) {
		/*
		 * To ensure that what we are dropping here is from this page
		 */
		var data = e.dataTransfer.getData('Text');
		if (data.indexOf("draggedImage: ") != 0) {
			alert("Only images within this page are draggable.");
		}
		else{
			currentlyDraggedNode.parentNode.removeChild(currentlyDraggedNode);
			//setHelpVisibility(this, false);
			userDragEndEvent(e);
		}
	}

	function userDragOverListEvent(e) {	
	      e.dataTransfer.dropEffect = "copy";

		//setHelpVisibility(this, true);
		EventHelpers.preventDefault(e);
	}

	function setHelpVisibility(node, isVisible) {
		var helpNodeId = node.id + "Help";
		var helpNode = document.getElementById(helpNodeId);

		if (isVisible) {
			helpNode.className =  'showHelp';
		} else {
			helpNode.className =  '';
		}
	}


}
//
//DragDropHelpers.fixVisualCues=true;
//EventHelpers.addPageLoadEvent('permissionForm.init');
//



