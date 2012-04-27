google.load("search", "1", {
	"nocss" : true
});

// function will bind event to all images
function bind_event() {
	$("a.gs-image").bind(
			"click",
			function(e) {
				$("#imageContainer").html(
						'<img src="' + $(this).attr('href')
						+ '" alt="Loading Image..." />');

//				$("a.gs-image img").removeClass();
//				$("a.gs-image img").addClass("gs-image");
//				$(this).find("img").removeClass();
//				$(this).find("img").addClass("selectImage");
//				$(this).draggable({
//					containment : '.draw_area',
//					cursor : 'pointer',
//					helper : 'clone',
//				});
				$('#debug').text($(this).attr('class'));

				if ($(".gs-imageResult").length <= 0) {
					$("#gsearchErr").css("display", "block");
				} else {
					$("#gsearchErr").css("display", "none");
				}

				return false;
			});

	$("div.gsc-cursor")
	.prepend(
	"<div class='clear' style='margin-top:10px;clear:both;'></div>");

	$(".gsc-trailing-more-results").css("display", "none");

}

// these class encapsulates a left and right search control
// both controls are driven by a shared search form
function OnLoad() {

	// create a tabbed mode search control
	var tabbed = new google.search.SearchControl();

	//restrict results: search only moderated

	// Set the Search Control to get the most number of results
	tabbed.setResultSetSize(google.search.Search.LARGE_RESULTSET);
	var imgSearch = new google.search.ImageSearch();
	// Restrict to extra large images only
	imgSearch.setRestriction(google.search.ImageSearch.RESTRICT_IMAGESIZE,
			google.search.ImageSearch.IMAGESIZE_MEDIUM);
	imgSearch.setRestriction(google.search.RESTRICT_SAFESEARCH,
			google.search.SAFESEARCH_STRICT);
	// create image searchers.
	tabbed.addSearcher(imgSearch);

	// proprofscc: On search completeion
	tabbed.setSearchCompleteCallback(this, bind_event);

	// draw in tabbed layout mode
	var drawOptions = new google.search.DrawOptions();
	drawOptions.setDrawMode(google.search.SearchControl.DRAW_MODE_TABBED);

	// Draw the tabbed view in the content div
	tabbed.draw(document.getElementById("imgSearchControl"), drawOptions);

	// Search!
	tabbed.execute("");
}

google.setOnLoadCallback(OnLoad);