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

function generateTable(data) {
	var day = Date.parse(document.getElementById('dateRes').innerHTML).getDay();
	var count;
	var hour = 0;
	if (day > 5) { // It is a Saturday or Sunday
		count = 14;
	}
	else {
		count = 16;
	}
	
	var template = "";
	var i;
	var times = new Array();
	var d = new Date();
	
	if(day == d.getDay())
	{
		hour = d.getHours() - 6; // account for military time
	}
	
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
		if(i>=hour) {
			template += "<div class='grid_cell ui-block-a'>" + times[i] + "</div>";
			template += "<div class='grid_cell ui-block-b'></div>";
			template += "<div class='grid_cell ui-block-c'></div>";
			template += "<div class='grid_cell ui-block-d'></div>";
			template += "<div class='grid_cell ui-block-e'></div>";
		}
		else {
			template += "<div class='grid_cell ui-block-a g'>" + times[i] + "</div>";
			template += "<div class='grid_cell ui-block-b g'></div>";
			template += "<div class='grid_cell ui-block-c g'></div>";
			template += "<div class='grid_cell ui-block-d g'></div>";
			template += "<div class='grid_cell ui-block-e g'></div>";
		}
		template += "</div>";
	}
	$("#create_reservations .page_content #container #grid_header").html(template);
}

function getResData() {// Handler for .ready() called.
	//var query = {court_number : 1, start_time : phpDate};
	var kevin = 1;
    $.ajax({
    		type: "GET",
            url: "api/reservation/" + kevin + "?start_time=" + phpDate,
            dataType: "json",
            //data: query,
            success: function(data, textStatus, jqXHR) {
            		generateTable();
            		console.log(data);
                   // $('#grid_body').tmpl(data).appendTo("#menuicons");
            },
            error: function(data, textStatus, jqXHR) {
            		generateTable();
                    console.log("Data= " + data);
                    console.log("Error code= " + textStatus);
            }
    });
};

function getMyReservations() {// Handler for .ready() called.
	var user_id = 'kjohnstone6'; // HARD CODED
    $.ajax({
    		type: "GET",
            url: "api/reservation/" + user_id,
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
            		console.log(data);
            		generateMyReservations(data);
            },
            error: function(data, textStatus, jqXHR) {
                    console.log("Data= " + data);
                    console.log("Error code= " + textStatus);
            }
    });
};

function generateMyReservations(data) {
	var i;
	var template = "";	
	//template += "<ul data-role='listview' id = 'list' data-theme='g'>";
	for (i = 0; i < data.reservation.length; i++) {
		template += "<li data-role=list-divider>" + data.reservation[i].time + "</li>";
		template += "<li>";
		template += "<a onclick=\"nextPage('reservation_detail', 'loadReservationDetail', '1000AM')\">";
		template += "<img class='image' src='images/buzz.gif' title='sample'/>";
		template += "<h3><span class='court'>" + 'Court 1' + "</span></h3>";
		template += "<h3><span class='time'>" + '10:00 AM' + "</span></h3>";
		template += "</a>";
		template += "</li>";
	}
	//template += "</ul>"; // close list
	
	$("#my_reservations .page_content #myResList").html(template);
	$("#myResList").listview("refresh");
}