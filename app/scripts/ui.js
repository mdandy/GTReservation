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
 * PAGE LOAD FUNCTIONS
 */

$('#home_page').live('pageshow', function() {
		$.ajax({
    		type: "GET",
            url: "api/user/active",
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
            		console.log(data);
            		if (data[0].privilege == "0") {
						$(".admin").css("visibility", "visible");
					}
            },
            error: function(data, textStatus, jqXHR) {
                    console.log("Data= " + data);
                    console.log("Error code= " + textStatus);
            }
    	});
});

$('#create_reservations').live('pageshow', function() {
		todaysDate();
		getResData();
});

$('#view_reservations').live('pageshow', function() {
		todaysDateAdmin();
		getResData();
});

$('#my_reservations').live('pageshow', function() {
		$(".status").empty();
		initPhpDate();
		getMyReservations();
});

$('#search_reservations').live('pageshow', function() {
		$(".status").empty();
});



/**
 * UI LIB
 */

/**
 * Load reservation detail.
 * @param {string} reservationID The reservation ID
 */
function loadReservationDetail(currTime, currCourt, currDate, reservation_id)
{
	var template = "";
	if (currCourt >= 0 && currCourt <= 4)
			template += "<img class='image' src='images/racquetball.png' title='sample'/>";
		else if (currCourt == 5)
			template += "<img class='image' src='images/squashball.png' title='sample'/>";
		else
			template += "<img class='image' src='images/buzz.gif' title='sample'/>";
	template+= 	"<div class='description'>";
	template+= "<h3><span class='label'>Court: </span><span class='reservation_court' id = 'myCourt'>" + currCourt + "</span></h3>";
	template+= "<h3><span class='label'>Date: </span><span class='date' id = 'myDate'>" + currDate + "</span></h3>";
	template+= "<h3><span class='label'>Time: </span><span class='time' id = 'myTime'>" + currTime + "</span></h3>";
	template+= "<input type='hidden' id = 'myResID' value='" + reservation_id + "'/>";
	template+= "</div>";
	$("#reservation_detail .page_content #profile").html(template);	
}

function dialog(court, time){
	temp = phpDate; // avoid clearing phpDate
	displayTime = Date.parse(temp).clearTime().addHours(time+6).toString("ddd MMM d yyyy hh:mm tt");
		  // NOTE: The selector can be whatever you like, so long as it is an HTML element.
		  //       If you prefer, it can be a member of the current page, or an anonymous div
		  //       like shown.
		  $('<div>').simpledialog2({
		    mode: 'button',
		    headerText: 'Confirm',
		    headerClose: false,
		    buttonPrompt: 'Reserve Court ' + court + ' at ' + displayTime,
		    buttons : {
		      'OK': {
		        click: function () { 
		          $('#buttonoutput').text('OK');
		          createNewReservation(court, time);
		          getResData(); // regenerate table
		        }
		      },
		      'Cancel': {
		        click: function () { 
		          $('#buttonoutput').text('Cancel');
		          
		        },
		        icon: "delete",
		        theme: "c"
		      }
		    }
		  });
}

function refreshMyReservationList()
{
	nextPage('my_reservations', 'getMyReservations');
}

function dialogCancel(reservation_id, courtCancel, dateCancel, timeCancel, callback){
		if (dateCancel === undefined)
			dateCancel = document.getElementById('myDate').innerHTML;
		
		if (timeCancel === undefined)
			timeCancel = document.getElementById('myTime').innerHTML;
			
		if (courtCancel === undefined)
			courtCancel = document.getElementById('myCourt').innerHTML;
			
		if (callback === undefined)
			callback = "refreshMyReservationList";
		  
		  // NOTE: The selector can be whatever you like, so long as it is an HTML element.
		  //       If you prefer, it can be a member of the current page, or an anonymous div
		  //       like shown.
		  $('<div>').simpledialog2({
		    mode: 'button',
		    headerText: 'Confirm',
		    headerClose: false,
		    buttonPrompt: 'Cancel Reservation on court ' + courtCancel + ' at ' + timeCancel + ' on ' + dateCancel,
		    buttons : {
		      'OK': {
		        click: function () { 
		          $('#buttonoutput').text('OK');
		          cancelReservation(reservation_id);
		          getResDataAdmin();
				  eval(callback+"()");
		        }
		      },
		      'Cancel': {
		        click: function () { 
		          $('#buttonoutput').text('Cancel');
		          
		        },
		        icon: "delete",
		        theme: "c"
		      }
		    }
		  });
}

function generateTable(data) {

	var day = Date.parse(document.getElementById('dateRes').innerHTML).getDay();
	var count;
	var hour = 0;
	var rcount = 0;
	var numRes = 0;
	if (data != null) {
		numRes = data.reservation.length;
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
	if(document.getElementById("court").innerHTML == "Squash Court"){
		template += "<div class='grid_cell_header ui-block-b' style='cursor:auto'>Court 5</div>";
	}
	else{

	template += "<div class='grid_cell_header ui-block-b' style='cursor:auto'>Court 1</div>";
	template += "<div class='grid_cell_header ui-block-c' style='cursor:auto'>Court 2</div>";
	template += "<div class='grid_cell_header ui-block-d' style='cursor:auto'>Court 3</div>";
	template += "<div class='grid_cell_header ui-block-e' style='cursor:auto'>Court 4</div>";
	}
	template += "</div>";
	template += "</div>";
	for (i = 0; i <= count; i++) {
		template += "<div class='ui-grid-d'>";
		if(document.getElementById("court").innerHTML == "Squash Court"){
			if(i>=hour){
				template += "<div class='grid_cell ui-block-a'>" + times[i] + "</div>";
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours() == (i+6) && Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-b' style='cursor:auto'>X</div>";
					rcount++;
				}
				else{
					template += "<div class='grid_cell ui-block-b' style='cursor:pointer' onclick='dialog(" + 5 + ',' 
					+ i + ")" + "'></div>";
				}
			}
			else{
				template += "<div class='grid_cell ui-block-a g'>" + times[i] + "</div>";
				template += "<div class='grid_cell ui-block-b g'></div>";
			}
		}
		else{
			if(i>=hour) {
				template += "<div class='grid_cell ui-block-a'>" + times[i] + "</div>";
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours() == (i+6) 
						&& data.reservation[rcount].court_number == 1 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-b' style='cursor:auto'>X</div>";
					rcount++;
				}
				else{
						template += "<div class='grid_cell ui-block-b' style='cursor:pointer' onclick='dialog(" + 1 + ',' 
						+ i + ")" + "'></div>";
				}
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
						&& data.reservation[rcount].court_number == 2 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-c' style='cursor:auto'>X</div>";
					rcount++;
				}
				else{
					template += "<div class='grid_cell ui-block-c' style='cursor:pointer' onclick='dialog(" + 2 + ',' 
					+ i + ")" + "'></div>";
				}
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
						&& data.reservation[rcount].court_number == 3 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-d' style='cursor:auto'>X</div>";
					rcount++;
				}
				else{
					template += "<div class='grid_cell ui-block-d' style='cursor:pointer' onclick='dialog(" + 3 + ',' 
					+ i + ")" + "'></div>";
				}
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
						&& data.reservation[rcount].court_number == 4 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-e' style='cursor:auto'>X</div>";
					rcount++;
				}
				else{
					template += "<div class='grid_cell ui-block-e' style='cursor:pointer' onclick='dialog(" + 4 + ',' 
					+ i + ")" + "'></div>";
				}
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
						&& data.reservation[rcount].court_number == 5 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					rcount++;
				}			
			}
			else {
				template += "<div class='grid_cell ui-block-a g'>" + times[i] + "</div>";
				template += "<div class='grid_cell ui-block-b g'></div>";
				template += "<div class='grid_cell ui-block-c g'></div>";
				template += "<div class='grid_cell ui-block-d g'></div>";
				template += "<div class='grid_cell ui-block-e g'></div>";
			}
		}
		template += "</div>";
	}
	$("#create_reservations .page_content #container #grid_header").html(template);
}

function generateTableAdmin(data) {

	var currTime;
	var currCourt;
	var currDate;
	var currID;
	var day = Date.parse(document.getElementById('dateRes').innerHTML).getDay();
	var count;
	var hour = 0;
	var rcount = 0;
	var numRes = 0;
	if (data != null) {
		numRes = data.reservation.length;
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
	if($("#view_reservations .page_content #container #menu #court").html() == "Squash Court"){
		template += "<div class='grid_cell_header ui-block-b' style='cursor:auto'>Court 5</div>";
	}
	else{

	template += "<div class='grid_cell_header ui-block-b' style='cursor:auto'>Court 1</div>";
	template += "<div class='grid_cell_header ui-block-c' style='cursor:auto'>Court 2</div>";
	template += "<div class='grid_cell_header ui-block-d' style='cursor:auto'>Court 3</div>";
	template += "<div class='grid_cell_header ui-block-e' style='cursor:auto'>Court 4</div>";
	}
	template += "</div>";
	template += "</div>";
	for (i = 0; i <= count; i++) {
		template += "<div class='ui-grid-d'>";
		if(rcount<data.reservation.length)
		{
			currTime = Date.parse(data.reservation[rcount].time).toString('hh:mm tt');
			currCourt = data.reservation[rcount].court_number;
			currDate = Date.parse(data.reservation[rcount].time).toString("ddd MMM d yyyy");
			currID = data.reservation[rcount].reservation_id;
		}
		if($("#view_reservations .page_content #container #menu #court").html() == "Squash Court"){
			if(i>=hour){
				template += "<div class='grid_cell ui-block-a'>" + times[i] + "</div>";
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours() == (i+6) && Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-b' style='cursor:pointer' onclick=\"dialogCancel('" + currID + "','" + currCourt + "','" + currDate + "','" + currTime + "','search_reservation')\">X</div>";
					rcount++;
				}
				else{
					template += "<div class='grid_cell ui-block-b'></div>";
				}
			}
			else{
				template += "<div class='grid_cell ui-block-a g'>" + times[i] + "</div>";
				template += "<div class='grid_cell ui-block-b g'></div>";
			}
		}
		else{
			if(i>=hour) {
				template += "<div class='grid_cell ui-block-a'>" + times[i] + "</div>";
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours() == (i+6) 
						&& data.reservation[rcount].court_number == 1 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-b' style='cursor:pointer' onclick=\"dialogCancel('" + currID + "','" + currCourt + "','" + currDate + "','" + currTime + "','search_reservation')\">X</div>";
					rcount++;
				}
				else{
						template += "<div class='grid_cell ui-block-b'></div>";
				}
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
						&& data.reservation[rcount].court_number == 2 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-c' style='cursor:pointer' onclick=\"dialogCancel('" + currID + "','" + currCourt + "','" + currDate + "','" + currTime + "','search_reservation')\">X</div>";
					rcount++;
				}
				else{
					template += "<div class='grid_cell ui-block-c'></div>";
				}
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
						&& data.reservation[rcount].court_number == 3 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-d' style='cursor:pointer' onclick=\"dialogCancel('" + currID + "','" + currCourt + "','" + currDate + "','" + currTime + "','search_reservation')\">X</div>";
					rcount++;
				}
				else{
					template += "<div class='grid_cell ui-block-d'></div>";
				}
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
						&& data.reservation[rcount].court_number == 4 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					template += "<div class='grid_cell ui-block-e' style='cursor:pointer' onclick=\"dialogCancel('" + currID + "','" + currCourt + "','" + currDate + "','" + currTime + "','search_reservation')\">X</div>";
					rcount++;
				}
				else{
					template += "<div class='grid_cell ui-block-e'></div>";
				}
				if(rcount < numRes && Date.parse(data.reservation[rcount].time).getHours()==(i+6) 
						&& data.reservation[rcount].court_number == 5 && 
						Date.parse(data.reservation[rcount].time).getDay() == day){
					rcount++;
				}			
			}
			else {
				template += "<div class='grid_cell ui-block-a g'>" + times[i] + "</div>";
				template += "<div class='grid_cell ui-block-b g'></div>";
				template += "<div class='grid_cell ui-block-c g'></div>";
				template += "<div class='grid_cell ui-block-d g'></div>";
				template += "<div class='grid_cell ui-block-e g'></div>";
			}
		}
		template += "</div>";
	}
	$("#view_reservations .page_content #container #grid_header").html(template);
}

function getResData() {// Handler for .ready() called.
	var day = Date.parse(document.getElementById('dateRes').innerHTML).getDay();
	var court_number = -1;
	if(document.getElementById('court').innerHTML == 'Squash Court')
		court_number = 5;
	var zeroHourDate = phpDate;
	var numHours = Date.parse(zeroHourDate).getHours();
	var d = new Date();
	
	if(day == d.getDay()) { // if today keep current hours
		zeroHourDate = Date.parse(zeroHourDate).clearTime().addHours(numHours);
	}
	else { // diff day clear hours go to 00:00
		zeroHourDate = Date.parse(zeroHourDate).clearTime();
	}
	
    $.ajax({
    		type: "GET",
            url: "api/reservation/" + court_number + "?start_time=" + zeroHourDate.toString('yyyy-MM-dd HH:mm:ss'),
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
            		generateTable(data);
            		console.log(data);
            },
            error: function(data, textStatus, jqXHR) {
                    console.log("Data= " + data);
                    console.log("Error code= " + textStatus);
            }
    });
};

function getResDataAdmin() {// Handler for .ready() called.
	var day = Date.parse(document.getElementById('dateRes').innerHTML).getDay();
	var court_number = -1;
	if($("#view_reservations .page_content #container #menu #court").html() == 'Squash Court')
		court_number = 5;
	var zeroHourDate = phpDate;
	var numHours = Date.parse(zeroHourDate).getHours();
	var d = new Date();
	
	if(day == d.getDay()) { // if today keep current hours
		zeroHourDate = Date.parse(zeroHourDate).clearTime().addHours(numHours);
	}
	else { // diff day clear hours go to 00:00
		zeroHourDate = Date.parse(zeroHourDate).clearTime();
	}
	
    $.ajax({
    		type: "GET",
            url: "api/reservation/" + court_number + "?start_time=" + zeroHourDate.toString('yyyy-MM-dd HH:mm:ss'),
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
            		generateTableAdmin(data);
            		console.log(data);
            },
            error: function(data, textStatus, jqXHR) {
                    console.log("Data= " + data);
                    console.log("Error code= " + textStatus);
            }
    });
};

function getMyReservations() {// Handler for .ready() called.
	start_time = initPhpDate();
	court_number = -1;
    $.ajax({
    		type: "GET",
            url: "api/reservation/active",
            data: {court_number:1, start_time:phpDate},
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
            		console.log(data);
					var target = $("#my_reservations .page_content #myResList");
            		generateMyReservations(data, target, false);
            },
            error: function(data, textStatus, jqXHR) {
                    console.log("Data= " + data);
                    console.log("Error code= " + textStatus);
            }
    });
};

function generateMyReservations(data, target, cancelDialog) {
	var i;
	var currentDay = "not equal";
	var currTime;
	var currCourt;
	var currDate;
	var currID;
	var template = "";	
	//template += "<ul data-role='listview' id = 'list' data-theme='g'>";
	for (i = 0; i < data.reservation.length; i++) {
		currTime = Date.parse(data.reservation[i].time).toString('hh:mm tt');
		if (Date.today().getOrdinalNumber() > Date.parse(data.reservation[i].time).getOrdinalNumber()) {  
			continue;
		}
		currCourt = data.reservation[i].court_number;
		currDate = Date.parse(data.reservation[i].time).toString("ddd MMM d yyyy");
		currID = data.reservation[i].reservation_id;
		if (currentDay != Date.parse(data.reservation[i].time).getDay()) {
			template += "<li data-role=list-divider>" + Date.parse(data.reservation[i].time).toString("ddd MMM d yyyy") + "</li>";
			currentDay = Date.parse(data.reservation[i].time).getDay();
		}
		template += "<li>";
		
		if (cancelDialog)
		{
			template += "<a onclick=\"dialogCancel('" + currID + "','" + currCourt + "','" + currDate + "','" + currTime + "','search_reservation')\">";	
		}
		else
		{
		template += "<a onclick=\"nextPage('reservation_detail'); loadReservationDetail(" 
			 + "'" + currTime + "'" + ',' + currCourt + ',' + "'" + currDate + "'" + ',' + currID + ")\">";
		}
			 
		if (currCourt >= 0 && currCourt <= 4)
			template += "<img class='image' src='images/racquetball.png' title='sample'/>";
		else if (currCourt == 5)
			template += "<img class='image' src='images/squashball.png' title='sample'/>";
		else
			template += "<img class='image' src='images/buzz.gif' title='sample'/>";
		
		
		template += "<h3><span class='court'>" + 'Court ' + data.reservation[i].court_number  + "</span></h3>";
		template += "<h3><span class='time'>" + Date.parse(data.reservation[i].time).toString('hh:mm tt') + "</span></h3>";
		template += "</a>";
		template += "</li>";
	}
	//template += "</ul>"; // close list
	
	//$("#my_reservations .page_content #myResList").html(template);
	//$("#myResList").listview("refresh");
	
	if (template.length > 0)
	{
		$(target).html(template);
		$(target).listview("refresh");
	}
	else
	{
		$(target).empty();
		$(".status").html("No data found.");
	}
}

function createNewReservation(court, time) {
	temp = phpDate; // avoid clearing phpDate
	time = Date.parse(temp).clearTime().addHours(time+6).toString('yyyy-MM-dd HH:mm:ss');
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

function cancelReservation(resID) {
	//court = document.getElementById('myCourt').innerHTML;
	//time = Date.parse(document.getElementById('myTime').innerHTML).toString('yyyy-MM-dd HH:mm:ss');
	
	if (resID === undefined)
		resID = document.getElementById('myResID').value;
	console.log("resID: " + resID);
	var query = {reservation_id:resID};
    $.ajax({
    	type: "DELETE",
    	url: "api/reservation?reservation_id=" + resID,
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

function init_cancel_reservation_form()
{
	// var foo = $("#cancel_reservations #from_date");
	// $(foo).scroller({ preset: 'datetime' });
}

function highlight(element)
{
	$(element).select();
}

function search_reservation()
{
	var username = $("input[name='user_id']").val();
	$.ajax({
    	type: "GET",
		url: "api/reservation/" + username,
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			console.log(data);
			var target = $("#search_reservations .page_content #reservation_list");
			generateMyReservations(data, target, true);
		},
		error: function(data, textStatus, jqXHR) {
			console.log("Data= " + data);
			console.log("Error code= " + textStatus);
		}
    });
}

function cancel_reservation_by_time()
{
	$(".status").empty();

        var from_date_raw = $("input[name='from_date']").val();
        var from_time_raw = $("input[name='from_time']").val();
        var to_date_raw = $("input[name='to_date']").val();
        var to_time_raw = $("input[name='to_time']").val();
        var comment = $("#cancel_reservations .page_content #cancel_form #comment").val();

        var from_raw = from_date_raw + " " + from_time_raw;
        var from_date = Date.parse(from_date_raw + " " + from_time_raw);
        var to_date = Date.parse(to_date_raw + " " + to_time_raw);
        if (to_date.isAfter(from_date))
        {
                var from_time = from_date.getTime();    //return milliseconds after Epoch
                var to_time = to_date.getTime();                //return milliseconds after Epoch
                var interval = (to_time - from_time) / (1000 * 60 * 60);

                $.ajax({
                type: "DELETE",
                url: "api/reservation/-1?start_time=" + from_raw  + "&interval=" + interval + "&comment=" + comment,
                dataType: "text",
                success: function(data, textStatus, jqXHR) {
                        console.log(data);
                                $(".status").html("Success: Reservations have been deleted!");
                },
                error: function(data, textStatus, jqXHR) {
                        console.log("Data= " + data);
                        console.log("Error code= " + textStatus);
                                $(".status").html("ERROR: Unable to delete reservations!");
                }
                });
        }
        else
        {
                $(".status").html("Error: FROM date cannot be grater than TO date.");
        }
}