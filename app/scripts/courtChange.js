function changeCourt()
{
	var court = document.getElementById('court').innerHTML;
	if(court == "Racquetball Court")
	{
		document.getElementById('court').innerHTML = "Squash Court";
		getResData();
	}
	else
	{
		document.getElementById('court').innerHTML = "Racquetball Court";
		getResData();
	}
}

function changeCourtAdmin()
{
	var court = $("#view_reservations .page_content #container #menu #court").html();
	if(court == "Racquetball Court")
	{
		$("#view_reservations .page_content #container #menu #court").html("Squash Court");
		getResDataAdmin();
	}
	else
	{
		$("#view_reservations .page_content #container #menu #court").html("Racquetball Court");
		getResDataAdmin();
	}
}