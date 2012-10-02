<?php

require_once("dal.php");

function add_user($user_id)
{
	DAL::connect();
	$isExist = DAL::is_user_exist($user_id);
	if (!$isExist) {
		// Get user information
		$xml = file_get_contents("http://m2.cip.gatech.edu/proxy/iam-dev01.iam.gatech.edu/directory/people?uid=$user_id");	
		$profile = new SimpleXMLElement($xml);
		$name = $profile->people->person[0]->displayName;;
		$email = $profile->people->person[0]->mail;
		
		$isSuccessful  = DAL::insert_user($user_id, $name, $email);
		return $isSuccessful;
	}
	DAL::disconnect();
	
	return true;
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
	return $isSuccessful;
}

function get_active_user()
{
	global $_USER;
	return $_USER['uid'];
}

?>