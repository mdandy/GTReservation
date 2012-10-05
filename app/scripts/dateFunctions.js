var today;
var currDate;
var phpDate;

function todaysDate() {
	currDate = Date.today().toString("ddd MMM d yyyy");	
	phpDate = Date.today().setTimeToNow().toString("yyyy-MM-dd HH:mm:ss");
	document.getElementById('dateRes').innerHTML = currDate;
	today = currDate; // this is only called once so set todays date
	$('#prevDate').addClass('ui-disabled'); // disable prev button
	getResData();
	return currDate;
}

function initPhpDate() {
	phpDate = Date.today().setTimeToNow().toString("yyyy-MM-dd HH:mm:ss");
	return phpDate;
}
// Will return the previous date of the date the user was currently looking at
function prevDate(){
	$('#nextDate').removeClass('ui-disabled');
	if (Date.parse(currDate).isAfter(Date.today())) { // only allow if the prevDate is post today
		currDate = document.getElementById('dateRes').innerHTML;
		currDate = Date.parse(currDate.toString("ddd MMM d yyyy")).add(-1).days().toString("ddd MMM d yyyy");
		phpDate = Date.parse(phpDate.toString("yyyy-MM-dd HH:mm:ss")).add(-1).days().toString("yyyy-MM-dd HH:mm:ss");
		document.getElementById('dateRes').innerHTML = currDate;
	}
	if (!Date.parse(currDate).isAfter(Date.today())) { // check if updated date is today or earlier
		$('#prevDate').addClass('ui-disabled');
	}
	getResData();
}

function nextDate(){
	$('#prevDate').removeClass('ui-disabled');
	if (Date.parse(currDate).isBefore(Date.today().add(2).days())) {
		currDate = document.getElementById('dateRes').innerHTML;
		currDate = Date.parse(currDate.toString("ddd MMM d yyyy")).add(1).days().toString("ddd MMM d yyyy");
		phpDate = Date.parse(phpDate.toString("yyyy-MM-dd HH:mm:ss")).add(1).days().toString("yyyy-MM-dd HH:mm:ss");
		document.getElementById('dateRes').innerHTML = currDate;
	} 
	if (!Date.parse(currDate).isBefore(Date.today().add(2).days())) {
		$('#nextDate').addClass('ui-disabled');
	}
	getResData();
}