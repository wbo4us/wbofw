<?php

require_once ($_SERVER['DOCUMENT_ROOT']."/lib/database/database.php");

class UserOtoritas extends Database {
    /*
     * Simple conection with de database
     */

	private $dbh=null;
	private $active_user_id=null;
	
    function __construct() {	
		parent::__construct();
		// Koneksi DB harusnya di Class tersendiri
		$this->dbh = $this->getConnection();
    }

 function isAllowedAction($iduser, $idgroup, $moduleid, $actionid) {

        if ($actionid == '0'){
			$sql = "
				select * from group_has_modules ga
				where ga.group_id='$idgroup' and ga.module_id='$moduleid' ";
				
			$stmt = $this->dbh->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($result) == 0) {
				$sql_user = "
					select * from user_has_modules ua
					where ua.user_id='$iduser' and ua.module_id='$moduleid' ";	
				$stmt_user = $this->dbh->prepare($sql_user);
				$stmt_user->execute();
				$result_user = $stmt_user->fetchAll(PDO::FETCH_ASSOC);	
				if (count($result_user) == 0) {
					return 0;
				} else {
					return 1;
				}
			} else {
				return 1;
			}		
		} 
			else
		{
			$sql = "
				select * from group_has_actions ga
				where ga.group_id='$idgroup' and ga.action_id='$actionid' ";			
			$stmt = $this->dbh->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($result) == 0) {
				$sql_user = "
					select * from user_has_actions ua
					where ua.user_id='$iduser' and ua.action_id='$actionid' ";	
				$stmt_user = $this->dbh->prepare($sql_user);
				$stmt_user->execute();
				$result_user = $stmt_user->fetchAll(PDO::FETCH_ASSOC);	
				if (count($result_user) == 0) {
					return 0;
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		}
    }

	function userotoritas_rowCount($psql) {
		$sql = "SELECT count(*) FROM ($psql) a";
		//echo $sql; exit;
		$stmt = $this->dbh->prepare($sql);
        $stmt->execute();
		$rows = $stmt->fetch(PDO::FETCH_NUM);
		return $rows[0];
	}
	
    function userotoritas_list() {
		$params = isset($_GET) ? $_GET : $_POST;
		//$search = $_GET['query'];
		$gid = isset($params['gid']) ? $params['gid'] : '';
		$uid = isset($params['uid']) ? $params['uid'] : '';
		
		$sql = "select  m.module_id, m.module, m.name, m.description, 
			m.menu, m.iconcls, m.icon,
			ifnull(a.action_id,'0') action_id, ifnull(a.option, 'module') `option`, ifnull(a.action,'view') action, 
			ifnull(a.description,'Otoritas untuk akses membuka module') action_desc  
			from modules m 
			left join actions a on (a.module_id=m.module_id)
			where m.active=1 ";
			
		//echo $sql; exit();
		$stmt = $this->dbh->prepare($sql);
        $stmt->execute();
		$total = $stmt->rowCount();
		$arr_hasil= array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$hasil = new stdClass();
			$hasil->selected= $this->isAllowedAction($uid, $gid, $row['module_id'], $row['action_id']);
			//$hasil->selected = 1;
			$hasil->module_id = $row['module_id']; 
			$hasil->name = $row['name']; 
			$hasil->description = $row['description']; 
			$hasil->menu = $row['menu']; 
			$hasil->module = $row['module']; 
			$hasil->iconcls = $row['iconcls']; 
			$hasil->icon = $row['icon']; 
			$hasil->action_id = $row['action_id']; 
			$hasil->option = $row['option']; 
			$hasil->action = $row['action']; 
			$hasil->action_desc = $row['action_desc']; 
			$arr_hasil[]=$hasil;
		}
		
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }
	
    function userotoritas_save() {
		$params = isset($_POST) ? $_POST : $_GET;
	
		$pdata = $params['pdata'];
		//$pdata = stripslashes($pdata);
		//$pdata = json_decode(stripslashes($pdata), true);
		
		$jsonData = file_get_contents("php://input");
		$pdata = json_decode(stripslashes($jsonData), true);
		
		//echo print_r($pdata); exit;
		$sql_val_arr = array();
		$sql_mod_arr = array();
		$modules = array();

		foreach ($pdata as $key => $data) {
			$tipe = $data['mode'];
			$id = $data['mode_id']; 				
			
			array_push($sql_val_arr, "('".$data['mode_id']."','".$data['module_id']."','".$data['action_id']."')");
			
			if (!in_array($data['module_id'],$modules)){
				array_push($modules,$data['module_id']);
				array_push($sql_mod_arr, "('".$data['mode_id']."','".$data['module_id']."')");
			}

		}
		
		$sql_mod_arr = array_unique($sql_mod_arr);
		
		$sql_val = implode(',',$sql_val_arr);
		$sql_mod = implode(',',$sql_mod_arr);
		
		if ($tipe=='group') {
			/*Olah data otoritas group*/
			$sql_del = "delete from group_has_actions where  group_id='$id'";
			$sql_del_m = "delete from group_has_modules where  group_id='$id'";
			$sql_insert="insert into group_has_actions(group_id, module_id, action_id) values $sql_val ";
			$sql_insert_m="insert into group_has_modules(group_id, module_id) values $sql_mod ";
		} else {
			$sql_del = "delete from user_has_actions where  user_id='$id'";
			$sql_del_m = "delete from user_has_modules where  user_id='$id'";
			$sql_insert="insert into user_has_actions(user_id, module_id, action_id) values $sql_val ";	
			$sql_insert_m="insert into user_has_modules(user_id, module_id) values $sql_mod ";		
		}
		
		//echo $sql_del_m; echo "\n";echo $sql_del; exit;
		
		$stmt_del = $this->dbh->prepare($sql_del);
		$stmt_del->execute();		

		$stmt_insert = $this->dbh->prepare($sql_insert);
		$stmt_insert->execute();	

		$stmt_del_m = $this->dbh->prepare($sql_del_m);
		$stmt_del_m->execute();		

		$stmt_insert_m = $this->dbh->prepare($sql_insert_m);
		$stmt_insert_m->execute();	
		
		$result = '{"success" : true,"msg":"Berhasil menyimpan data"}';
		
		echo $result;
    }

    function userotoritas_del() {

		$params = isset($_GET) ? $_GET : $_POST;
		$pid_placemark = $params['id_placemark'];	
		$sql = " delete from placemark where id_placemark=$pid_placemark  ";	
		//echo $sql; exit();
		$sql = " delete from placemark where id_placemark=:id_placemark  ";	
		//echo $sql; exit();		
		$stmt = $this->dbh->prepare($sql);
		$stmt->bindParam(":id_placemark",$pid_placemark, PDO::PARAM_STR);

		if ($stmt->execute()) {
			$result = '{"success" : true,"msg":"Berhasil menghapus data"}';
		} else {
			$result = '{"success" : false,"msg":"'.implode('<br>',$stmt->errorInfo()).'"}';
		}
        echo $result;
    }

    function userotoritas_listUserGroup() {
		
		$params = isset($_GET) ? $_GET : $_POST;
		$idTree = $params['idtree'];
		//$idTree = 'thetree';
        $sql = " select g.group_id, g.description from groups g where g.active=1";
		$stmt = $this->dbh->prepare($sql);
        $stmt->execute();
		$arr_hasil= array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

			$hasil = new stdClass();
			$hasil->id= $idTree.'.'.$row['group_id'];
			//$hasil->id= $row['group_id'];
			$hasil->text= $row['description'];
			$hasil->qtip= $row['description'];
			$hasil->leaf= false;
			
			//$hasil->icon= '';
			$sql_user = "select u.user_id, u.username, u.nama from users u where u.active=1 and u.user_id in (select distinct ug.user_id from group_has_users ug where ug.group_id='".$row['group_id']."')";
			$stmt_user = $this->dbh->prepare($sql_user);
			$stmt_user->execute();
			$arr_hasil_user = array();
			while ($row_user = $stmt_user->fetch(PDO::FETCH_ASSOC)) {
				$hasil_user = new stdClass();
				$hasil_user->id= $idTree.'.'.$row['group_id'].'.'.$row_user['user_id'];
				//$hasil_user->id= $row['group_id'].'.'.$row_user['user_id'];
				$hasil_user->text= $row_user['user_id'] . ' ['.$row_user['nama'] .']';
				$hasil_user->qtip= $row_user['nama'];
				$hasil_user->leaf= true;
				//$hasil_user->icon= '';
				//$hasil_user->children = array();
				$arr_hasil_user[]=	$hasil_user;		
			}			
			if (count($arr_hasil_user) > 0) {
				$hasil->expanded= true;
			} else {
				$hasil->expanded= false;
			}
			$hasil->children= $arr_hasil_user;
			$arr_hasil[]=$hasil;	
		}
		$data = json_encode($arr_hasil);
		
		//$result = '{"success" : true,"data":' . $data . '}';
		
        //echo $result;
		
		echo $data;
    }


    function userotoritas_generate() {
		$params = isset($_GET) ? $_GET : $_POST;
		$search = $_GET['query'];
		$start = $_GET['start'];
		$limit = $_GET['limit'];

		$pid_stat = $params['_id_stat'];
		$ptahun = $params['_tahun'];

		//$sql = "select * from stat_rekap_kec where id_stat='".$pid_stat."' and tahun=".$ptahun;
		$sql = "insert into stat_rekap_kec (id_stat, id_kec, kecamatan, tahun, jumlah) 
			select :id_stat, id_kec, kecamatan, :tahun, 0 from kecamatan ";		
		//echo $sql; exit();
		$stmt = $this->dbh->prepare($sql);
		$stmt->bindParam(":id_stat", $pid_stat, PDO::PARAM_STR);
		$stmt->bindParam(":tahun", $ptahun, PDO::PARAM_STR);
		//$total = $stmt->rowCount();
		if ($stmt->execute()) {
			$result = '{"success" : true,"msg":"Berhasil menggenerate data data"}';
		} else {
			$result = '{"success" : false,"msg":"'.implode('<br>',$stmt->errorInfo()).'"}';
		}
        echo $result;

    }
	
}

?>