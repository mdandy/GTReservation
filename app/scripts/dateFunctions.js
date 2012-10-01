var today;
var currDate;

function leadingZero (val) {
            var str = val.toString();
            if(str.length == 1)
            {
                str = '0' + str;
            }
 
            return str;
}

function todaysDate() {
	currDate = Date.today().toString("ddd MMM d yyyy");
	document.getElementById('dateRes').innerHTML = currDate;
	today = currDate; // this is only called once so set todays date
	$('#prevDate').addClass('ui-disabled'); // disable prev button
	return currDate;
}

function tomorrowsDate(){	
	Date.today().add(1).days().toString("ddd MMM d yyyy");
}

// Will return the previous date of the date the user was currently looking at
function prevDate(){
	$('#nextDate').removeClass('ui-disabled');
	if (Date.parse(currDate).isAfter(Date.today())) { // only allow if the prevDate is post today
		currDate = document.getElementById('dateRes').innerHTML;
		currDate = Date.parse(currDate.toString("ddd MMM d yyyy")).add(-1).days().toString("ddd MMM d yyyy");
		document.getElementById('dateRes').innerHTML = currDate;
	}
	if (!Date.parse(currDate).isAfter(Date.today())) { // check if updated date is today or earlier
		$('#prevDate').addClass('ui-disabled');
	}
}

function nextDate(){
	$('#prevDate').removeClass('ui-disabled');
	if (Date.parse(currDate).isBefore(Date.today().add(2).days())) {
		currDate = document.getElementById('dateRes').innerHTML;
		currDate = Date.parse(currDate.toString("ddd MMM d yyyy")).add(1).days().toString("ddd MMM d yyyy");
		document.getElementById('dateRes').innerHTML = currDate;
	} 
	if (!Date.parse(currDate).isBefore(Date.today().add(2).days())) {
		$('#nextDate').addClass('ui-disabled');
	}
}