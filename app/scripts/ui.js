function loadPage(page, isReversed)
{
	if (isReversed === undefined)
		isReversed = false;
		
	$.mobile.changePage("#" + page, {
		transition: "slide",
		reverse: isReversed,
	});
}