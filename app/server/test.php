<?php
  require_once("dal.php");

  echo ("TEST CASE<br/><br/>");
  $successful = DAL::connect();
  printBool("connect", $successful);

  $successful = DAL::insert_user("jedwards173", "Jonathan Edwards", "jedwards173@gmail.com");
  printBool("insert_user:array1", $successful);
  
  $successful = DAL::insert_user("mdandy3", "Michael Dandy", "mdandy3@gatech.edu");
  printBool("insert_user:array2", $successful);

  $result = DAL::get_users();
  print_r($result); 
  printLine();
  
  $result = DAL::get_users("mdandy3");
  print_r($result); 
  printLine();
  
  $successful = DAL::delete_users("mdandy3");
  printBool("delete_users", $successful); 
  
  $result = DAL::get_users();
  print_r($result); 
  printLine();
  
  $reservation_id = DAL::insert_reservation("jedwards173", 1, "2012-09-20 13:00:00");
  printResult("insert_reservation 1", $reservation_id);
  
  $reservation_id = DAL::insert_reservation("jedwards173", 4, "2012-09-20 06:00:00");
  printResult("insert_reservation 4", $reservation_id);
  
  $result = DAL::get_reservations(1, "2012-09-20 00:00:00");
  print_r($result); 
  printLine();
  
  $result = DAL::get_reservations(1, "2012-09-30 00:00:00");
  print_r($result); 
  printLine();
  
  $result = DAL::get_reservations(1, "2012-09-20 00:00:00", 24);
  print_r($result); 
  printLine();
  
  $result = DAL::get_reservations_by_user_id("jedwards173");
  print_r($result); 
  printLine();
  
  $successful = DAL::delete_reservation_by_id(55);
  printBool("delete_reservation_by_id", $successful); 
  
  $result = DAL::get_reservations(1, "2012-09-20 00:00:00");
  print_r($result); 
  printLine();
  
  $successful = DAL::delete_reservation("jedwards173", 4, "2012-09-20 06:00:00");
  printBool("delete_reservation", $successful); 
  
  $result = DAL::get_reservations(4, "2012-09-20 00:00:00");
  print_r($result); 
  printLine();
  
  DAL::disconnect();
  
  function printLine()
  {
	echo ("<br /><br/>");
  }
  
  function printResult($message, $result)
  {
	  echo ("$message : $result");
	  printLine();
  }
  
  function printBool($message, $bool)
  {
	echo ("$message : ");  
	if($bool)
		echo ("TRUE");
	else
		echo ("FALSE");
	printLine();
  }
	  
?>
