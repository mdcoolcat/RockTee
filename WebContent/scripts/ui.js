$(document).ready(function() {

	$('.mypic').draggable({
		helper: function(){
			var selected = $('#dragSource input:checked').parents('li');
			if (selected.length === 0) {
				selected = $(this);
			}
			var container = $('<div/>').attr('id', 'draggingContainer');
			container.append(selected.clone());
			return container; 
		}
	});

	$('#dropTarget').droppable({		
		tolerance: 'pointer',
		drop: function(event, ui){
			$(this).append(ui.helper.children());
			$("#dropTarget .mypic").addClass('item');
			$(".item").removeClass("ui-draggable mypic");

			$('.item').resizable().parent().draggable({
				containment: 'parent',
				 cursor: "move",
			});
		}
	});

	$('#selectAll').click(function(){
		$('#dragSource input').attr('checked', 'checked');
		return false;
	});

	$('#selectNone').click(function(){
		$('#dragSource input').removeAttr('checked');
		return false;
	});

	$('#selectInvert').click(function(){
		$('#dragSource input').each(function(){
			var $this = $(this);
			if ($this.attr('checked')) {
				$this.removeAttr('checked');
			}
			else {
				$this.attr('checked', 'checked');
			}
		});
		return false;
	});
});