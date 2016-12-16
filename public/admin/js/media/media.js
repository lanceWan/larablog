$(function () {
	$('.grid').masonry({
		itemSelector: '.grid-item',
		// use element for option
		columnWidth: '.grid-sizer',
		percentPosition: true
    });
});