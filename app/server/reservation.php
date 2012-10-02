<?php

require_once("dal.php");

/**
 * Normalize date to YYYY-MM-DD HH:MM:SS format.
 * @param $date The date to be normalized
 * @return THe normalized date or NULL if an error occurs
 */
function __normalize_date($date)
{
	$date = date_create($date);
	if (!$date)
		return NULL;
	return date_format($date, "Y-m-d H:i:s");
}

/**
 * Create a reservation for CRC court. The interval of reservation is one hour and
 * the user can only reserve up to 48 hours in advance.
 * @param $user_id The user ID
 * @param $court_number The court number to be reserved
 * @param $start_time The reservation time in YYYY-MM-DD HH:MM:SS UTC format
 * @return The reservation has been made
 */
function create_reservation($user_id, $court_number, $start_time)
{
	$start_time = __normalize_date($start_time);
	if ($start_time == NULL)
		return NULL;
		
	DAL::connect();
	$reservation_id = DAL::insert_reservation($user_id, $court_number, $start_time);
	DAL::disconnect();
	
	$result = array(
		"reservation" => array(
			array (
				"user_id" => $user_id,
				"reservation_id" => $reservation_id,
				"court_number" => $court_number,
				"time" => $start_time
			)
		)
	);
	return json_encode($result);
}

/**
 * Cancel court reservation by reservation ID.
 * @param $reservation_id The court reservation ID to be canceled
 * @return TRUE on sucess or FALSE otherwise
 */
function cancel_reservation_by_id($reservation_id)
{
	DAL::connect();
	$isSuccessful = DAL::delete_reservation_by_id($reservation_id);
	DAL::disconnect();
	
	if ($isSuccessful)
		return "TRUE";
	return "FALSE";
}

/**
 * Cancel court reservation by reservation time.
 * @param $court_number The court number to be reserved
 * @param $start_time The reservation time in YYYY-MM-DD HH:MM:SS UTC format
 * @param $interval [Optional] The time interval (in an increment of one hour). THe default value is one hour.
 * @return TRUE on sucess or FALSE otherwise
 */
function cancel_reservations_by_time($court_number, $start_time, $interval = 1)
{
	$start_time = __normalize_date($start_time);
	if ($start_time == NULL)
		return "FALSE";
	
	DAL::connect();
	$isSuccessful = DAL::delete_reservation_by_time($start_time, $interval);
	DAL::disconnect();
	
	if ($isSuccessful)
		return "TRUE";
	return "FALSE";
}

/**
 * Retrieve all reservations that have been made.
 * @param $court_number The court number to be reserved or -1 to retrieve all court reservations
 * @param $start_time The reservation starting time in YYYY-MM-DD HH:MM:SS UTC format
 * @return The reservation information in JSON format
 */
function get_all_reservations($court_number, $start_time)
{
	$start_time = __normalize_date($start_time);
	if ($start_time == NULL)
		return NULL;
		
	DAL::connect();
	$data = DAL::get_reservations($court_number,$start_time);
	DAL::disconnect();
	
	$reservations = array();
	for ($i = 0; $i < count($data); $i++)
	{
		$entry = $data[$i];
		$temp = array(
			"user_id" => $entry["user_id"],
			"reservation_id" => $entry["reserve_id"],
			"court_number" => $entry["court_id"],
			"time" => $entry["reserve_time"]
		);
		array_push($reservations, $temp);
	}
	
	$result = array(
		"reservation" => $reservations
	);
	return json_encode($result);
}

/**
 * Retrieve all reservations that have been made by a particular user.
 * @param $user_id The user ID
 * @return The reservation information in JSON format
 */
function get_reservations_by_user_id($user_id)
{
	$result = array("reservation_id" => "-1");
	
	DAL::connect();
	$data = DAL::get_reservations_by_user_id($user_id);
	DAL::disconnect();
	
	$reservations = array();
	for ($i = 0; $i < count($data); $i++)
	{
		$entry = $data[$i];
		$temp = array(
			"user_id" => $entry["user_id"],
			"reservation_id" => $entry["reserve_id"],
			"court_number" => $entry["court_id"],
			"time" => $entry["reserve_time"]
		);
		array_push($reservations, $temp);
	}
	
	$result = array(
		"reservation" => $reservations
	);
	return json_encode($result);
}

/**
 * Retrieve all reservations that have been made at a particular time frame.
 * @param $court_number The court number to be reserved or -1 to retrieve all court reservations
 * @param $start_time The reservation starting time in YYYY-MM-DD HH:MM:SS UTC format
 * @param $interval [Optional] The time interval (in an increment of one hour)
 * @return The reservation information in JSON format
 */
function get_reservations_by_time($court_number, $start_time, $interval=0)
{
	$start_time = __normalize_date($start_time);
	if ($start_time == NULL)
		return NULL;
		
	DAL::connect();
	$data = DAL::get_reservations($court_number,$start_time,$interval);
	DAL::disconnect();
		
	$reservations = array();
	for ($i = 0; $i < count($data); $i++)
	{
		$entry = $data[$i];
		$temp = array(
			"user_id" => $entry["user_id"],
			"reservation_id" => $entry["reserve_id"],
			"court_number" => $entry["court_id"],
			"time" => $entry["reserve_time"]
		);
		array_push($reservations, $temp);
	}
	
	$result = array(
		"reservation" => $reservations
	);
	return json_encode($result);
}

?>