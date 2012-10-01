/**
 * Go to the next page.
 * @param {string} page The page to be loaded
 * @param {string} func [Optional] Any function name to be executed after the page is loaded
 * @param {string} arg [Optional] Any function argument to be passed
 */
function nextPage(page, func, arg)
{
	$.mobile.changePage("#" + page, {
		transition: "slide",
		reverse: false,
	});
	
	if(func)
	{
		if (arg === undefined)
			arg = "";
		eval(func + "('" + arg + "')");
	}
}

/**
 * Go to the previous page.
 * @param {string} page The page to be loaded
 * @param {string} func [Optional] Any function name to be executed after the page is loaded
 * @param {string} arg [Optional] Any function argument to be passed
 */
function prevPage(page, func, arg)
{	
	$.mobile.changePage("#" + page, {
		transition: "slide",
		reverse: true,
	});
	
	if(func)
	{
		if (arg === undefined)
			arg = "";
		eval(func + "('" + arg + "')");
	}
}

/**
 * Load reservation detail.
 * @param {string} reservationID The reservation ID
 */
function loadReservationDetail(reservationID)
{
	$("#reservation_detail.page_content").html("<p>Load Reservation Detail: " + reservationID + "</p>");	
}

function generateTable(time, isReserved, isAvailable, reservation_id) {
	//Date.parse(Date.today()).getDay();
	var day = Date.parse(document.getElementById('dateRes').innerHTML).getDay();
	var count;
	if (day > 5) { // It is a Saturday or Sunday
		count = 14;
	}
	else {
		count = 16;
	}
	var template = "";
	var i;
	var times = new Array();
	//TODO: Change to stop at 8 pm on Saturday-Sunday
	times[0] = "6:00 AM";
	times[1] = "7:00 AM";
	times[2] = "8:00 AM";
	times[3] = "9:00 AM";
	times[4] = "10:00 AM";
	times[5] = "11:00 AM";
	times[6] = "12:00 PM";
	times[7] = "1:00 PM";
	times[8] = "2:00 PM";
	times[9] = "3:00 PM";
	times[10] = "4:00 PM";
	times[11] = "5:00 PM";
	times[12] = "6:00 PM";
	times[13] = "7:00 PM";
	times[14] = "8:00 PM";
	times[15] = "9:00 PM";
	times[16] = "10:00 PM";
	template += "<div id='grid_header'>";
	template += "<div class='ui-grid-d'>";
	template += "<div class='grid_cell_header ui-block-a'></div>";
	template += "<div class='grid_cell_header ui-block-b'>Court 1</div>";
	template += "<div class='grid_cell_header ui-block-c'>Court 2</div>";
	template += "<div class='grid_cell_header ui-block-d'>Court 3</div>";
	template += "<div class='grid_cell_header ui-block-e'>Court 4</div>";
	template += "</div>";
	template += "</div>";
	for (i = 0; i <= count; i++) {
		template += "<div class='ui-grid-d'>";
		template += "<div class='grid_cell ui-block-a'>" + times[i] + "</div>";
		template += "<div class='grid_cell ui-block-b'></div>";
		template += "<div class='grid_cell ui-block-c'></div>";
		template += "<div class='grid_cell ui-block-d'></div>";
		template += "<div class='grid_cell ui-block-e'></div>";
		template += "</div>";
	}
	$("#create_reservations .page_content #container #grid_header").html(template);
}