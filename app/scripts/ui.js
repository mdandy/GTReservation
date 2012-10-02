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
function loadReservationDetail(currTime, currCourt, currDate)
{
	var template = "";
	template+= "<h3><span class='reservation_court'>" + 'Court ' + currCourt + "</span></h3>";
	template+= "<h3><span class='label'>Date: </span><span class='date'>" + currDate + "</span></h3>";
	template+= "<h3><span class='label'>Time: </span><span class='time'>" + currTime + "</span></h3>";
	$("#reservation_detail .page_content #profile .description").html(template);	
}

function generateTable(data) {

	var day = Date.parse(document.getElementById('dateRes').innerHTML).getDay();
	var count;
	var hour = 0;
	var rcount = 0;
	if (data != null) {
		var numRes = data.reservation.length;
	}
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
	template += "<div class='grid_cell_header ui-block-b' style='cursor:auto'>Court 1</div>";
	template += "<div class='grid_cell_header ui-block-c' style='cursor:auto'>Court 2</div>";
	template += "<div class='grid_cell_header ui-block-d' style='cursor:auto'>Court 3</div>";
	template += "<div class='grid_cell_header ui-block-e' style='cursor:auto'>Court 4</div>";
	template += "</div>";
	template += "</div>";
	for (i = 0; i <= count; i++) {
		template += "<div class='ui-grid-d'>";
		if(i>=hour) {
			template += "<div class='grid_cell ui-block-a'>" + times[i] + "</div>";
			if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours() == (i+6) 
					&& data.reservation[rcount].court_number == 1 && 
					Date.parse(data.reservation[rcount].time).getDay() == day){
				template += "<div class='grid_cell ui-block-b' style='cursor:auto'>X</div>";
				rcount++;
			}
			else{
					template += "<div class='grid_cell ui-block-b' onclick='createNewReservation(" + 1 + ',' 
					+ i + ")" + "'></div>";
			}
			if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
					&& data.reservation[rcount].court_number == 2 && 
					Date.parse(data.reservation[rcount].time).getDay() == day){
				template += "<div class='grid_cell ui-block-c' style='cursor:auto'>X</div>";
				rcount++;
			}
			else{
					template += "<div class='grid_cell ui-block-c'></div>";
			}
			if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
					&& data.reservation[rcount].court_number == 3 && 
					Date.parse(data.reservation[rcount].time).getDay() == day){
				template += "<div class='grid_cell ui-block-d' style='cursor:auto'>X</div>";
				rcount++;
			}
			else{
					template += "<div class='grid_cell ui-block-d'></div>";
			}
			if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
					&& data.reservation[rcount].court_number == 4 && 
					Date.parse(data.reservation[rcount].time).getDay() == day){
				template += "<div class='grid_cell ui-block-e' style='cursor:auto'>X</div>";
				rcount++;
			}
			else{
					template += "<div class='grid_cell ui-block-e'></div>";
			}			
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
	var court_number = -1;
    $.ajax({
    		type: "GET",
            url: "api/reservation/" + court_number + "?start_time=" + Date.parse(phpDate).clearTime(),
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
            		generateTable(data);
            		console.log(data);
                   // $('#grid_body').tmpl(data).appendTo("#menuicons");
            },
            error: function(data, textStatus, jqXHR) {
            		generateTable(data);
                    console.log("Data= " + data);
                    console.log("Error code= " + textStatus);
            }
    });
};

function getMyReservations() {// Handler for .ready() called.
    $.ajax({
    		type: "GET",
            url: "api/reservation/active",
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
	var currentDay = "not equal";
	var currTime;
	var currCourt;
	var currDate;
	var template = "";	
	//template += "<ul data-role='listview' id = 'list' data-theme='g'>";
	for (i = 0; i < data.reservation.length; i++) {
		currTime = Date.parse(data.reservation[i].time).toString('hh:mm tt');
		currCourt = data.reservation[i].court_number;
		currDate = Date.parse(data.reservation[i].time).toString("ddd MMM d yyyy");
		if (currentDay != Date.parse(data.reservation[i].time).getDay()) {
			template += "<li data-role=list-divider>" + Date.parse(data.reservation[i].time).toString("ddd MMM d yyyy") + "</li>";
			currentDay = Date.parse(data.reservation[i].time).getDay();
		}
		template += "<li>";
//		template += "<a onclick=\"nextPage('reservation_detail', 'loadReservationDetail', 'currTime')\">";
		template += "<a onclick=\"nextPage('reservation_detail'); loadReservationDetail(" 
			 + "'" + currTime + "'" + ',' + currCourt + ',' + "'" + currDate + "'" + ")\">";
		template += "<img class='image' src='images/buzz.gif' title='sample'/>";
		template += "<h3><span class='court'>" + 'Court ' + data.reservation[i].court_number  + "</span></h3>";
		template += "<h3><span class='time'>" + Date.parse(data.reservation[i].time).toString('hh:mm tt') + "</span></h3>";
		template += "</a>";
		template += "</li>";
	}
	//template += "</ul>"; // close list
	
	$("#my_reservations .page_content #myResList").html(template);
	$("#myResList").listview("refresh");
}

function createNewReservation(court, time) {
	time = Date.parse(phpDate).clearTime().addHours(time+6).toString('yyyy-MM-dd HH:mm:ss');
	var query = {court_number:court, start_time:time};
    $.ajax({
    	type: "POST",
    	url: "api/reservation",
    	data: query,
    	dataType: "text",
    	success: function(data, textStatus, jqXHR) {
    		console.log(data);
    	},
    	error: function(data, textStatus, jqXHR) {
    		console.log("Data= " + data);
    		console.log("Error code= " + textStatus);
    	}
});
}