<?php

/**
 * Create a reservation for CRC court. The interval of reservation is one hour and
 * the user can only reserve up to 48 hours in advance.
 * @param $user_id The user ID
 * @param $court_number The court number to be reserved
 * @param $start_time The reservation time in YYYY-MM-DD HH:MM:SS UTC format
 * @return The court reservation ID
 */
function create_reservation($user_id, $court_number, $start_time)
{
	$reservation_id = -1;
	return $reservation_id;
}

/**
 * Cancel court reservation by reservation ID.
 * @param $reservation_id The court reservation ID to be canceled
 * @return TRUE on sucess or FALSE otherwise
 */
function cancel_reservation_by_id($reservation_id)
{
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
	$result = array("reservation_id" => "-1");
	echo json_encode($result);
}

/**
 * Retrieve all reservations that have been made by a particular user.
 * @param $user_id The user ID
 * @return The reservation information in JSON format
 */
function get_reservations_by_user_id($user_id)
{
	$result = array("reservation_id" => "-1");
	return json_encode($result);
}

/**
 * Retrieve all reservations that have been made at a particular time frame.
 * @param $court_number The court number to be reserved or -1 to retrieve all court reservations
 * @param $start_time The reservation starting time in YYYY-MM-DD HH:MM:SS UTC format
 * @param $interval The time interval (in an increment of one hour)
 * @return The reservation information in JSON format
 */
function get_reservations_by_time($court_number, $start_time, $interval)
{
	$result = array("reservation_id" => "-1");
	return json_encode($result);
}

?>