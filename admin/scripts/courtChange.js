function changeCourt()
{
	var court = document.getElementById('court').innerHTML;
	if(court == "Racquetball Court")
	{
		document.getElementById('court').innerHTML = "Squash Court";
	}
	else
		document.getElementById('court').innerHTML = "Racquetball Court";
}