<?php
  require_once("DAL.php");

  DAL::connect();

  $array1 = array(1, "Jonathan", "jedwards173@gmail.com");
  $array2 = array(2, "Michael", "mdandy3@gatech.edu");

  insert_user($array);

  get_users();

  delete_users(1);

  insert_reservation(2, 1, "09/30/12");
?>
