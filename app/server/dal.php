<?php

require_once("dbconfig.php");

class DAL {
  private static $dbh;

  /*
   * Connection function
   */
  public static function connect() {
    if (!self::$dbh) {
      try {
		$host = HOST;
	   	$db_name = DB_NAME;
		$username = USERNAME;
		$password = PASSWORD;
		
        // Establish the connection
        self::$dbh = new PDO("mysql:host=".$host.";dbname=".$db_name, $username, $password);
        self::$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      }
      catch(PDOException $e) {
        // echo ("Error: " . $e->getMessage());
        return false;
      }
    }
    return (self::$dbh != NULL);
  }

  /*
   * isConnected function
   */
  public static function isConnected() {
    if (self::$dbh == NULL)
      return false;
    return true;
  }

  /*
   * disconnect function
   */
  public static function disconnect() {
    self::$dbh = NULL;
  }

  /*
   * Inserts user 
   */
  public static function insert_user($user_id, $name, $email="") {
    try {
	  $data = array($user_id, $name, $email);
      $sql = "INSERT INTO Users (user_id, name, email) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE user_id=?, name=?, email=?";

	  $query = self::$dbh->prepare($sql);
	  $isSuccessful = $query->execute(array_merge($data, $data));
	  return $isSuccessful;
    }
    catch(PDOException $e) {
      //echo ("Error: " . $e->getMessage());
    }
    return false;
  }

  /*
   * Retrieves all of the users in the Users table.
   */
  public static function get_users($user_id = "") {
    try {
      $sql = "SELECT * FROM Users";
	  if (!empty($user_id))
	  	$sql .= " WHERE user_id=:user_id";
	
      $query = self::$dbh->prepare($sql);
	  if (!empty($user_id))
	  	$query->bindParam(":user_id", $user_id, PDO::PARAM_STR, 255);
	  
      $query->execute();
	  return $query->fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $e) {
      //echo ("Error: " . $e->getMessage());
    }
    return NULL;
  }

  /*
   * Deletes a user when specifying the user_id.
   */
  public static function delete_users($user_id) {
    try {
      $sql = "DELETE FROM Users WHERE user_id=:user_id";
      $query = self::$dbh->prepare($sql);
	  $query->bindParam(":user_id", $user_id, PDO::PARAM_STR, 255);
      $isSuccessful = $query->execute();
      return $isSuccessful;
    }
    catch(PDOEXception $e) {
      //echo ("Error: " . $e->getMessage());
    }
    return false;
  }

  /*
   * Inserts a reservation using the user_id, court_id, and the reserve_time.
   * @return reservation id;
   */
  public static function insert_reservation($user_id, $court_id, $reserve_time) {
    try {
	  if ($court_id < 1 || $court_id > 5)
	  	return;	
	
      // Building the SQL statement
      $sql = "INSERT INTO Reservations(user_id, court_id, reserve_time) VALUES (:user_id, :court_id, :reserve_time)";
	  $query = self::$dbh->prepare($sql);
	  $query->bindParam(":user_id", $user_id, PDO::PARAM_STR, 255);
	  $query->bindParam(":court_id", $court_id, PDO::PARAM_INT);
	  $query->bindParam(":reserve_time", $reserve_time);
	  $isSuccessful = $query->execute();
	  $reservation_id = self::$dbh->lastInsertId(); 
	  
	  if ($isSuccessful) {
		  $sql = "INSERT INTO Court" . $court_id . "(reserve_time, user_id, reserve_id) VALUES (:reserve_time, :user_id, :reserve_id)";
		  $query = self::$dbh->prepare($sql);
		  $query->bindParam(":user_id", $user_id, PDO::PARAM_STR, 255);
	  	  $query->bindParam(":reserve_id", $reservation_id, PDO::PARAM_INT);
		  $query->bindParam(":reserve_time", $reserve_time);
		  $isSuccessful = $query->execute();
		  return $reservation_id;
	  }
    }
    catch(PDOException $e) {
      //echo ("Error: " . $e->getMessage());
    }
    return -1;
  }

  public static function get_reservations($court_id, $reserve_time, $interval=0) {
    try {
		if ($court_id < 1 || $court_id > 5)
	  		return;	
		
		$end_time = new DateTime($reserve_time);
		$end_time->modify("+$interval hours");
		$start_time = $reserve_time;
		$end_time = $end_time->format("Y-m-d H:i:s");
		
		$sql = "SELECT * FROM Court$court_id, Reservations WHERE Reservations.court_id=:court_id "; 
		if ($interval > 0)
			$sql .= " AND Court$court_id.reserve_time BETWEEN :start_time AND :end_time";
		else
			$sql .= " AND Court$court_id.reserve_time >= :start_time";
		
		$query = self::$dbh->prepare($sql);
		$query->bindParam(":court_id", $court_id, PDO::PARAM_INT);
		$query->bindParam(":start_time", $start_time);
		if ($interval > 0)
			$query->bindParam(":end_time", $end_time);
		
		$query->execute();
		return $query->fetchAll(PDO::FETCH_ASSOC);
	}
	catch(PDOException $e) {
		//echo ("Error: " . $e->getMessage());
	}
	return NULL;
  }
  
  public static function get_reservations_by_user_id($user_id) {
    try {
		$num_of_court = 5;
		$sql = "";
		for ($i = 1; $i <= 5; $i++) {
			$sql .= "(SELECT * FROM Reservations,Court$i WHERE Reservations.court_id=$i AND Reservations.user_id=:user_id)";
			if ($i < $num_of_court)
				$sql .= " UNION ";
		}
	
		$query = self::$dbh->prepare($sql);
		$query->bindParam(":user_id", $user_id, PDO::PARAM_STR, 255);
		$query->execute();
		return $query->fetchAll(PDO::FETCH_ASSOC);
	}
	catch(PDOException $e) {
		//echo ("Error: " . $e->getMessage());
	}
	return NULL;
  }

  public static function delete_reservation_by_id($reservation_id) {
    try {
      $sql = "DELETE FROM Reservations WHERE reserve_id=:reserve_id";
      $query = self::$dbh->prepare($sql);
	  $query->bindParam(":reserve_id", $reservation_id, PDO::PARAM_INT);
      $isSuccessful = $query->execute();
	  return $isSuccessful;
    }
    catch(PDOException $e) {
      //echo ("Error: " . $e->getMessage());
    }
    return false; 
  }
  
  public static function delete_reservation($user_id, $court_id, $reserve_time) {
    try {
      $sql = "DELETE FROM Reservations WHERE user_id=:user_id AND court_id=:court_id AND reserve_time=:reserve_time";
      $query = self::$dbh->prepare($sql);
	  $query->bindParam(":user_id", $user_id, PDO::PARAM_STR, 255);
	  $query->bindParam(":court_id", $court_id, PDO::PARAM_INT);
	  $query->bindParam(":reserve_time", $reserve_time);
      $isSuccessful = $query->execute();
	  return $isSuccessful;
    }
    catch(PDOException $e) {
      //echo ("Error: " . $e->getMessage());
    }
    return false; 
  }
}
?>
