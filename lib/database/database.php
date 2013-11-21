<?php
//ob_start();
error_reporting(E_ALL);
require_once ($_SERVER['DOCUMENT_ROOT']."/lib/os.php");
$sessi_user_habis = false;

class Database {
    /*
     * Simple conection with de database
     */

	private $conn=null;
	private $os=null; 
	
    function __construct() {
		
		$this->os = new os();
		$session = $this->os->session_exist();
		if ($session==true) {
			$this->conn = $this->os->connectDB();
			/* update session time_updated, time_logout */
			$sessid = $_COOKIE['wbofw-key'];
			//echo 'session= '.$sessid; exit;
			$sql = "update sessions set time_updated=NOW(), time_logout=ADDTIME(NOW(),'"._SESSION_TIMEOUT."') where session_id='$sessid' ";
			//echo $sql; exit;
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();	
		} else {
			//printf("<script>location.href='access-denied.php'</script>");			
			//echo "<script>location.href='access-denied.php'</script>";	
			//ob_start();		
			header("location:access-denied.php");
			//echo'{"success" : false, "msg": "Sesi anda sudah habis, silahkan Login Ulang"}';
			//$GLOBALS['sessi_user_habis'] = true;
			//ob_end_flush();
			//echo '<META HTTP-EQUIV="Refresh" Content="0; URL=access-denied.php">'; 
			exit();		
			//die ('Session tidak aktif');
		}
    }
	
    function getConnection() {
		return $this->conn;
    }

    function getUserLogin() {
		return $this->os->getUserLogin();
    }	

    function getUserParams() {
		return $this->os->getUserParams();
    }

	/**
	 * ToDo...
	 * Fungsi mengambil parameter yang dikirim melalui HTTP (GET/POST)
	 * dan hasilnya dalam array name => value
	 * Digunakan dalam entri atau update query (query -> oci_bind_by_name)
	 * return Array of name => value
	 * 
	 * ex. $usedParam = getParams(array('tahun','kecamatan','desa','nama','lokasi'));
	 * */
	function getParams($ar) {
		if(!is_array($ar)) {
			return '';
		}		
	}
	/*
	
    function getUserParam($param) {
		return $this->os->getUserLogin();
    }
	
	*/
}

