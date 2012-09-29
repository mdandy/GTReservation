<?php

class DAL {
  private static $dbh;

  /*
   * Connection function
   */
  public static function connect() {
    if (!self::$dbh) {
      try {
        $host = db.cip.gatech.edu;
        $db_name = CONTRIB_maven;
        $username = maven;
        $password = xmhJuUBX;

        // Establish the connection
        self::$dbh = new PDO("mysql:host=".$host.";dbname=".$db_name, $username, $password);
        self::$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				if (self::$dbh != NULL)
          self::init();
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
   * Inserts the 
   */
  public function insert_user($data) {
    try {
      $sql = "INSERT INTO Users (user_id, name, email) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE user_id=?, name=?, email=?";

			$query = self::$dbh->prepare($sql);
			$isSuccessful = $query->execute($data);
			return $isSuccessful;
    }
    catch(PDOException $e) {
      echo ("Error: " . $e->getMessage());
    }
    return false;
  }

  /*
   * Retrieves all of the users in the Users table.
   */
  public function get_users() {
    try {
      $sql = "SELECT * FROM USERS(user_id, name, email)";

      $query = $dbh->prepare($sql);
      $isSuccessful = $query->execute();
      return $isSuccessful;
    }
    catch (PDOException $e) {
      echo ("Error: " . $e->getMessage());
    }
    return false;
  }

  /*
   * Deletes a user when specifying the user_id.
   */
  public function delete_users($user_id) {
    try {
      $sql = "DELETE FROM Users(user_id, name, email) WHERE user_id=?)";

      $query = $dbh->prepare($sql);
      $isSuccessful = $query->execute($user_id);
      return $isSuccessful;
    }
    catch(PDOEXception $e) {
      echo ("Error: " . $e->getMessage());
    }
    return false;
  }

  /*
   * Inserts a reservation using the user_id, court_id, and the reserve_time.
   */
  public function insert_reservation($user_id, $court_id, $reserve_time) {
    try {
      $reserve_id = hash(md5, $user_id);
      $data1 = array($reserve_id, $user_id, $court_id, $reserve_time);
      $data2 = array($reserve_time, true, $user_id, $reserve_id);

      // Building the SQL statement
      $sql1 = "INSERT INTO Reservations(reserve_id, user_id, court_id, reserve_time) VALUES (?, ?, ?, ?)";
      $sql2 = "INSERT INTO Court" . $court_id . "(reserve_time, reserve_status, user_id, reserve_id) VALUES (?, ?, ?, ?)";
      
      $query1 = self::$dbh->prepare($sql1);
      $query2 = self::$dbh->prepare($sql2);
      
      $isSuccessful1 = $query->execute($data1);
			$isSuccessful2 = $query->execute($data2);
      
			return ($isSuccessful1 && $isSuccessful2);
      
    }
    catch(PDOException $e) {
      echo ("Error: " . $e->getMessage());
    }
    return false;
  }

  /*
   * Update the reservations based on th.
   */
  public function update_reservation(($user_id, $court_id, $reserve_time) {
    try {
      $data = array($court_id, $reserve_time, $user_id);
     
      $sql = "UPDATE Reservations(reserve_id, user_id, court_id, reserve_time) SET court_id=?, reserve_time=? WHERE user_id=?";

			$query = self::$dbh->prepare($sql);
			$isSuccessful = $query->execute($data);
      return $isSuccessful;
    }
    catch(PDOException $e) {
      echo ("Error: " . $e->getMessage());
    }
    return false;
  }

  public function get_reservations($user_id, $court_id) {
    try
		{
			$sql = "SELECT * FROM (Court" . $court_id . " JOIN Reservations ON Court.user_id = Reservations.user_id) WHERE user_id=?";

			$query = self::$dbh->prepare($sql);
			$query->execute($user_id);
			return $query->fetchAll(PDO::FETCH_ASSOC);
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return array();
  }

  public function delete_reservations($user_id, $court_id) {
    try {
      $sql1 = "DELETE FROM Reservations WHERE user_id=?";
      $sql2 = "DELETE FROM Court" . $court_id . " WHERE user_id=?";

      $query1 = self::$dbh->prepare($sql1);
      $query2 = self::$dbh->prepare($sql2);

      $isSuccessful1 = $query->execute($user_id);
			$isSuccessful2 = $query->execute($user_id);
      
      return ($isSuccessful1 && $isSuccessful2);
    }
    catch(PDOException $e) {
      echo ("Error: " . $e->getMessage());
    }
    return false; 
  }
?>
