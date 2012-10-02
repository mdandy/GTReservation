<?php

require_once("dal.php");

function add_user($user_id, $name, $email="")
{
	DAL::connect();
	$isSuccessful  = DAL::insert_user($user_id, $name, $email);
	DAL::disconnect();
	
	if ($isSuccessful)
		return "TRUE";
	return "FALSE";
}

function get_user($user_id)
{
	DAL::connect();
	$data  = DAL::get_users($user_id);
	DAL::disconnect();
	return $data;
}

function delete_user($user_id)
{
	DAL::connect();
	$isSuccessful  = DAL::delete_users($user_id);
	DAL::disconnect();
	
	if ($isSuccessful)
		return "TRUE";
	return "FALSE";
}

function get_active_user()
{
	global $_USER;
	return $_USER['uid'];
}

?>