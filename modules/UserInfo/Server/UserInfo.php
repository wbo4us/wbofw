<?php

require_once ($_SERVER['DOCUMENT_ROOT']."/lib/database/database.php");

class UserInfo  extends Database {
    /*
     * Simple conection with de database
     */

	private $dbh=null;
	private $active_user_id=null;
	
    function __construct() {
		parent::__construct();
		$this->dbh = $this->getConnection();
    }


    function userinfo_getDataUser() {
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
			$hasil->password = $row['password']; 
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
			$hasil->isadmin = $row['isadmin']; 
			$arr_hasil[]=$hasil;
		}
		
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

	  
    function userinfo_save() {
		$params = isset($_GET) ? $_GET : $_POST;
		//print_r($params);
		$pgid = $params['pgid'];
		$pstate=strtolower($params['state']);
		$puser_id = $params['_user_id'];
		$pusername = $params['_username'];
		$ppassword = $params['_password'];
		$pnama = $params['_nama'];
		$pemail = $params['_email'];
		$plevel_id = $params['_level_id'];
		$plevel_name = $params['_level_name'];
		$pwallpaper = $params['_wallpaper'];
		$ptheme = $params['_theme'];
		$pwpstretch = $params['_wpstretch'];
		$pactive = $params['_active'];
		$pisadmin = $params['_isadmin'];
		$pparam01 = $params['_param01'];
		$pparam02 = $params['_param02'];
		$pparam03 = $params['_param03'];
		$pparam04 = $params['_param04'];
		$pparam05 = $params['_param05'];
		$pparam06 = $params['_param06'];
		$pparam07 = $params['_param07'];
		$pparam08 = $params['_param08'];
		$pparam09 = $params['_param09'];
		$pparam10 = $params['_param10'];
		
		/* cek apakah user sudah ada di server ? */
		
		if ($pstate == "edit") {	
 
			$sql = " update users set 
					nama=:nama,  
					email=:email,  
					level_id=:level_id,  
					level_name=:level_name,  
					wallPaper=:wallpaper,  
					theme=:theme,  
					wpStretch=:wpstretch,  
					active=:active,  
					isadmin=:isadmin,  
					param01=:param01,  
					param02=:param02,  
					param03=:param03,  
					param04=:param04,  
					param05=:param05,  
					param06=:param06,  
					param07=:param07,  
					param08=:param08,  
					param09=:param09,  
					param10=:param10  
					 where 	user_id=:user_id ";		
					 
		} else if ($pstate == "add"){
			
			$sql = "INSERT INTO users (user_id, username, password, nama, email, level_id, level_name, wallPaper, theme, wpStretch, active, 
					param01, param02, param03, param04, param05, param06, param07, param08, param09, param10, isadmin)
					 VALUES ( 
					:user_id, :username, md5( :password ), :nama, :email, 
					:level_id, :level_name, :wallpaper, :theme, :wpstretch, 
					:active, :param01, :param02, :param03, :param04, 
					:param05, :param06, :param07, :param08, :param09, 
					:param10, :isadmin ) ";
				
			/*
			$sql = "INSERT INTO users ( user_id, username, password, nama, email, level_id, level_name, wallPaper, theme, wpStretch, active, param01, param02, param03, param04, param05, param06, param07, param08, param09, param10)
			 VALUES (
			'$puser_id', '$pusername', md5('$ppassword'), '$pnama', '$pemail', 
			'$plevel_id', '$plevel_name', '$pwallpaper', '$ptheme', '$pwpstretch', 
			'$pactive', '$pparam01', '$pparam02', '$pparam03', '$pparam04', 
			'$pparam05', '$pparam06', '$pparam07', '$pparam08', '$pparam09', 
			'$pparam10') ";		
			*/		 
		}
		//echo $sql; exit();
		$stmt = $this->dbh->prepare($sql);
		
		if ($pstate == "add") {
			$stmt->bindParam(":username", $pusername, PDO::PARAM_STR);
			$stmt->bindParam(":password", $ppassword, PDO::PARAM_STR);
			//echo $sql; exit();
		}
		$stmt->bindParam(":user_id", $puser_id, PDO::PARAM_STR);
		$stmt->bindParam(":nama", $pnama, PDO::PARAM_STR);
		$stmt->bindParam(":email", $pemail, PDO::PARAM_STR);
		$stmt->bindParam(":level_id", $plevel_id, PDO::PARAM_STR);
		$stmt->bindParam(":level_name", $plevel_name, PDO::PARAM_STR);
		$stmt->bindParam(":wallpaper", $pwallpaper, PDO::PARAM_STR);
		$stmt->bindParam(":theme", $ptheme, PDO::PARAM_STR);
		$stmt->bindParam(":wpstretch", $pwpstretch, PDO::PARAM_STR);
		$stmt->bindParam(":active", $pactive, PDO::PARAM_STR);
		$stmt->bindParam(":param01", $pparam01, PDO::PARAM_STR);
		$stmt->bindParam(":param02", $pparam02, PDO::PARAM_STR);
		$stmt->bindParam(":param03", $pparam03, PDO::PARAM_STR);
		$stmt->bindParam(":param04", $pparam04, PDO::PARAM_STR);
		$stmt->bindParam(":param05", $pparam05, PDO::PARAM_STR);
		$stmt->bindParam(":param06", $pparam06, PDO::PARAM_STR);
		$stmt->bindParam(":param07", $pparam07, PDO::PARAM_STR);
		$stmt->bindParam(":param08", $pparam08, PDO::PARAM_STR);
		$stmt->bindParam(":param09", $pparam09, PDO::PARAM_STR);
		$stmt->bindParam(":param10", $pparam10, PDO::PARAM_STR);
		$stmt->bindParam(":isadmin", $pisadmin, PDO::PARAM_STR);
		
		if ($stmt->execute()) {
			if ($pstate == "add") {
				$sql_ug = "INSERT INTO group_has_users ( group_id, user_id) VALUES ('$pgid', '$puser_id') ";
				//echo $sql_ug;
				$stmt2 = $this->dbh->prepare($sql_ug);
				if ($stmt2->execute()) {
					/*
						Khusus SIMNANGKIS
						param01-> tahun periode aktif
						param02-> Propinsi
						param03-> Kabupaten
						param04-> Kecamatan
						param05-> Desa
						param06-> Dusun
						param02-> 'Belum dipakai' -> tidak perlu
						param08-> Responden -> tidak perlu
						param09-> Pendata -> tidak perlu
						param10-> Pemeriksa -> tidak perlu
					*/
					
					$result = '{"success" : true,"msg":"Berhasil menyimpan data user"}';
				} else {
					$result = '{"success" : false,"msg":"'.implode('<br>',$stmt2->errorInfo()).'"}';
				}				
			} else {
				$result = '{"success" : true, "msg":"Berhasil mengupdate data user"}';
			}		
		} else {
			$result = '{"success" : false,"msg":"'.implode('<br>',$stmt->errorInfo()).'"}';
		}
		
		echo $result;	
		
		
    }
	
}

?>