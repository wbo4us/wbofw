<?php

require_once ($_SERVER['DOCUMENT_ROOT']."/lib/database/os-config.php");

class os {

    function __construct() {	
    }

	function session_exist(){
		/* check session */
		
		if(isset($_COOKIE['wbofw-key'])){
			/** check session ke database */
			$sessid = $_COOKIE['wbofw-key'];
			$sql = "select * from sessions where session_id='$sessid' and NOW() < time_logout and logout_status is null";
			$dbh = $this->connectDB();
			$stmt = $dbh->prepare($sql);
			$stmt->execute();
			$total = $stmt->rowCount();
			if ($total > 0) {
				return true;		
			} else {
				return false;
			}
		} else {
			return false;
		}
		
		//die('session tidak aktif');
	}
	
	function checkSession(){
		if($this->session_exist()){
			return $_COOKIE['wbofw-key'];		
		} else {
			die ('session tidak aktif');
		}
	}
	
    function connectDB($driver=_DB_DRIVER, $server=_DB_HOST, $user=_DB_USER, $password=_DB_PASSWORD, $dbname=_DB_NAME) {
		// Koneksi DB harusnya di Class tersendiri
		/*
        $server   = _DB_HOST;
        $driver   = _DB_DRIVER;
        $user     = _DB_USER;
        $password = _DB_PASSWORD;
        $dbname   = _DB_NAME;
		*/
        $dsn = "$driver:dbname=$dbname;host=$server";

        try {
            $dbh = new PDO($dsn, $user, $password);
			return $dbh;
        } catch (PDOException $e) {
            $result = array('success' => false, 'error' => '0', 'msg' => $e->getMessage());
            die(json_encode($result));
        }
    }

    function getSessionId() {	
		return $_COOKIE['wbofw-key'];
    }	
	
    function getUserLogin() {
		$sessid = $this->getSessionId();
		$sql = "select user_id from sessions where session_id='$sessid'";
		//echo $sql; exit();
		$dbh = $this->connectDB();
		$user_id = current($dbh->query($sql)->fetch());
		return $user_id;
    }
    
	function isAllowed($module_id, $action_id) {
		$user_id = $this->getUserLogin();
		$sql = "select ga.module_id, ga.action_id from group_has_actions ga where ga.group_id in (select gu.group_id from group_has_users gu where gu.user_id='$user_id')
			and ga.module_id='$module_id' and ga.action_id='$action_id' 
			UNION 
			select ua.module_id, ua.action_id from user_has_actions ua where ua.user_id='$user_id' 
			and ua.module_id='$module_id' and ua.action_id='$action_id' ";
		//echo $sql; exit;
		$dbh = $this->connectDB();
		$stmt = $dbh->prepare($sql);
		$stmt->execute();
		if ($stmt->rowCount() > 0) {
			$result = true;
		} else {
			$result = false;
		}
		return $result;		
					
	}

	function getModuleId($module) {
		$sql = "select module_id from modules where lower(module_id)='".strtolower($module)."' or lower(module)='".strtolower($module)."'";
		//echo $sql; exit();
		$dbh = $this->connectDB();
		$stmt = $dbh->prepare($sql);
		$stmt->execute();
		if ($stmt->rowCount() > 0) {
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$mod = $row['module_id'];
			}
			$result = $mod;
		} else {
			$result = '';
		}
		return $result;		
					
	}

	function getAction($module, $action_id) {
		$sql = "select * from actions where lower(module_id)='".strtolower($module)."' and lower(action_id)='".strtolower($action_id)."'";
		//echo $sql; exit();
		$dbh = $this->connectDB();
		$stmt = $dbh->prepare($sql);
		$stmt->execute();
		if ($stmt->rowCount() > 0) {
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			
				$mod = $row;
			}
			//print_r($mod); exit();
			$result = $mod;
		} else {
			$result = null;
		}
		return $result;		
					
	}

	
	function logActivity($mod, $method, $data_log) {
		$user_id = $this->getUserLogin();
		$session_id = $this->getSessionId();
		$sql = "INSERT INTO log_activity (session_id, user_id, username, date, module, action, status, data)
				 values (:session_id, 
				:user_id, :username, now(), :module, :action, 
				'', :data) ";
		//echo $sql; exit();
		$dbh = $this->connectDB();
		$stmt = $dbh->prepare($sql);
		

		$stmt->bindParam(":session_id", $session_id, PDO::PARAM_STR);
		$stmt->bindParam(":user_id", $user_id, PDO::PARAM_STR);
		$stmt->bindParam(":username", $user_id, PDO::PARAM_STR);
		$stmt->bindParam(":module", $mod, PDO::PARAM_STR);
		$stmt->bindParam(":action", $method, PDO::PARAM_STR);
		$stmt->bindParam(":data", $data_log, PDO::PARAM_STR);
		$stmt->execute();
				
	}
	
    function getUserParams() {
		$dbh = $this->connectDB();
		$params = isset($_GET) ? $_GET : $_POST;
		$user_id = $this->getUserLogin();
		$sql = "select * from users where user_id='$user_id'";			
		//echo $sql; exit();
		$stmt = $dbh->prepare($sql);		
        $stmt->execute();
		//$arr_hasil= array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$hasil = new stdClass();
			$hasil->user_id = $row['user_id']; 
			$hasil->username = $row['username']; 
			$hasil->nama = $row['nama']; 
			$hasil->email = $row['email']; 
			$hasil->level_id = $row['level_id']; 
			$hasil->level_name = $row['level_name']; 
			$hasil->wallpaper = $row['wallPaper']; 
			$hasil->theme = $row['theme']; 
			$hasil->wpstretch = $row['wpStretch']; 
			$hasil->active = $row['active']; 
			$hasil->param01 = $row['param01']; 
			$hasil->param02 = $row['param02']; 
			$hasil->param03 = $row['param03']; 
			$hasil->param04 = $row['param04']; 
			$hasil->param05 = $row['param05']; 
			$hasil->param06 = $row['param06']; 
			$hasil->param07 = $row['param07']; 
			$hasil->param08 = $row['param08']; 
			$hasil->param09 = $row['param09']; 
			$hasil->param10 = $row['param10']; 
			//$arr_hasil[]=$hasil;
		}
		$data = json_encode($hasil);
		return $data;
    }	
	
}

?>