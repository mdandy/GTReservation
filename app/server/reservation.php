<?php

function create_reservation()
{
	$user_id = $_POST["user_id"];
	$court_number = $_POST["court_number"];
	$start_time = $_POST["start_time"];
	
	$reservation_id = 0;
	echo ($reservation_id);
}

function cancel_reservation_by_id()
{
	$reservation_id = $_POST["reservation_id"];
	
	echo ("false");
}

function cancel_reservations_by_time()
{
	$court_number = $_POST["court_number"];
	$start_time = $_POST["start_time"];
	$interval = $_POST["interval"];
	
	echo ("false");
}

function get_all_reservations()
{
	$court_number = $_POST["court_number"];
	$start_time = $_POST["start_time"];
	
	echo ("Not implemented");
}

function get_reservations_by_user_id()
{
	$user_id = $_POST["user_id"];
	
	echo ("Not implemented");
}

function get_reservations_by_time()
{
	$court_number = $_POST["court_number"];
	$start_time = $_POST["start_time"];
	$interval = $_POST["interval"];
	
	echo ("Not implemented");
}

?>