<?php

require_once ($_SERVER['DOCUMENT_ROOT']."/lib/database/database.php");

class LogedUserInfo  extends Database {
    /*
     * Simple conection with de database
     */

	private $dbh=null;
	private $active_user_id=null;
	
    function __construct() {
		parent::__construct();
		$this->dbh = $this->getConnection();
    }


    function logeduserinfo_getLoged() {
		$params = isset($_GET) ? $_GET : $_POST;
		$user_id = $params['_user_id'];	
		$sql = "select * from users where user_id='$user_id'";			
		//echo $sql; exit();
		$stmt = $this->dbh->prepare($sql);		
        $stmt->execute();
		$total = $stmt->rowCount();
		$arr_hasil= array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$hasil = new stdClass();
			$hasil->id = $row['id']; 
			$hasil->user_id = $row['user_id']; 
			$hasil->username = $row['username']; 
			//$hasil->password = $row['password']; 
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
			$arr_hasil[]=$hasil;
		}
		
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

	  
    function logeduserinfo_save() {
		$params = isset($_GET) ? $_GET : $_POST;
		//print_r($params);
		$pgid = $params['pgid'];
		$pstate=strtolower($params['state']);
		$puser_id = $params['_user_id'];
		$pusername = $params['_username'];
		//$ppassword = $params['_password'];
		$pnama = $params['_nama'];
		$pemail = $params['_email'];
		//$plevel_id = $params['_level_id'];
		//$plevel_name = $params['_level_name'];
		$pwallpaper = $params['_wallpaper'];
		$ptheme = $params['_theme'];
		$pwpstretch = $params['_wpstretch'];
		//$pactive = $params['_active'];
		$pparam01 = $params['_param01'];
		$pparam07 = $params['_param07'];
		$pparam08 = $params['_param08'];
		$pparam09 = $params['_param09'];
		$pparam10 = $params['_param10'];
		
		/* cek apakah user sudah ada di server ? */
		
		if ($pstate == "edit") {	
 
			$sql = " update users set 
					nama=:nama,  
					email=:email,  
					wallPaper=:wallpaper,  
					theme=:theme,  
					wpStretch=:wpstretch,  
					param01=:param01,   
					param07=:param07,  
					param08=:param08,  
					param09=:param09,  
					param10=:param10  
					 where 	user_id=:user_id ";		
					 
		} 

		$stmt = $this->dbh->prepare($sql);
		
		$stmt->bindParam(":user_id", $puser_id, PDO::PARAM_STR);
		$stmt->bindParam(":nama", $pnama, PDO::PARAM_STR);
		$stmt->bindParam(":email", $pemail, PDO::PARAM_STR);
		//$stmt->bindParam(":level_id", $plevel_id, PDO::PARAM_STR);
		//$stmt->bindParam(":level_name", $plevel_name, PDO::PARAM_STR);
		$stmt->bindParam(":wallpaper", $pwallpaper, PDO::PARAM_STR);
		$stmt->bindParam(":theme", $ptheme, PDO::PARAM_STR);
		$stmt->bindParam(":wpstretch", $pwpstretch, PDO::PARAM_STR);
		$stmt->bindParam(":param01", $pparam01, PDO::PARAM_STR);
		$stmt->bindParam(":param07", $pparam07, PDO::PARAM_STR);
		$stmt->bindParam(":param08", $pparam08, PDO::PARAM_STR);
		$stmt->bindParam(":param09", $pparam09, PDO::PARAM_STR);
		$stmt->bindParam(":param10", $pparam10, PDO::PARAM_STR);
		
		if ($stmt->execute()) {
			$result = '{"success" : true, "msg":"Berhasil mengupdate data user"}';
		} else {
			$result = '{"success" : false,"msg":"'.implode('<br>',$stmt->errorInfo()).'"}';
		}
		
		echo $result;	
		
		
    }

    function logeduserinfo_savePassword() {
		$params = isset($_GET) ? $_GET : $_POST;
		//print_r($params);
		$pgid = $params['pgid'];
		$pstate=strtolower($params['state']);
		$puser_id = $params['_user_id'];
		$ppassword = $params['_password'];
		/* cek apakah user sudah ada di server ? */
		
		if ($pstate == "edit") {	
			$sql = " update users set 
					password=md5('$ppassword')  
					 where 	user_id=:user_id ";		
		} 

		$stmt = $this->dbh->prepare($sql);
		$stmt->bindParam(":user_id", $puser_id, PDO::PARAM_STR);
		
		if ($stmt->execute()) {
			$result = '{"success" : true, "msg":"Berhasil mengupdate password user"}';
		} else {
			$result = '{"success" : false,"msg":"'.implode('<br>',$stmt->errorInfo()).'"}';
		}
		
		echo $result;	
		
		
    }

	
}

?>