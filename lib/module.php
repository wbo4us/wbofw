<?php
require_once ($_SERVER['DOCUMENT_ROOT']."/lib/database/database.php");

class module extends Database {
    /*
     * Simple conection with de database
     */

	private $dbh=null;
	private $active_user_id=null;
	
    function __construct() {
		parent::__construct();
		$this->dbh = $this->getConnection();
		/*
		$os = new os();
		$os->checkSession();
        try {
            $this->dbh = $os->connectDB();
        } catch (PDOException $e) {
            $result = array('success' => false, 'error' => '0', 'msg' => $e->getMessage());
            die(json_encode($result));
        }
		*/
    }


    function checkOtoritas() {

		$params = isset($_GET) ? $_GET : $_POST;
		$module=$params['mod'];
		if ($module != 'lib') {
			$action=$params['option']."_".$params['action'];
			$user_id = $this->getUserLogin();
			$sql = 	"select gm.module_id from group_has_modules gm where gm.group_id in (select gu.group_id from group_has_users gu where gu.user_id='$user_id')
			and gm.module_id='$module' 
			UNION 
			select um.module_id from user_has_modules um where um.user_id='$user_id'
			and um.module_id='$module' ";
			//echo $sql; exit();	
			$stmt = $this->dbh->prepare($sql);
			$stmt->execute();
			if ($stmt->rowCount() > 0) {
				$result = '{"success" : true, "msg":"boleh akses"}';
			} else {
				$result = '{"success" : false, "msg":"Anda tidak berwenang melakukan aksi ini"}';
			}
			echo $result;		
		}
    }
	
    function isAdmin() {
		$res = 'false';
		$user_id = $this->getUserLogin();
		if ($user_id=='admin') {$res = 'true'; }
		echo '{"success" : '.$res.',"msg":"Ini adalah cek admin"}';
    }
	
    function get_user_modules() {	
		$params = isset($_GET) ? $_GET : $_POST;
		//echo 'betul'; 
		$idtree=$params['idtree'];
		$user_id = $params['_user_id'];
		$arr_hasil= array();
		$sql_where_in_module_id = "select module_id from user_has_modules where user_id='$user_id'
			UNION DISTINCT
			select module_id from group_has_modules where group_id in (select group_id from group_has_users where user_id='$user_id')
			";
			
		/* check jika ada module tanpa menu */
		$sql_module = "select * from modules where module_id in ($sql_where_in_module_id) and menu='Root' and active=1 and onmenu=1 order by name";	
		//echo $sql_module;
		$stmt = $this->dbh->prepare($sql_module);
		$stmt->execute();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$hasil = new stdclass();
			$hasil->id = $row['module_id'];
			$hasil->text = $row['name'];
			$hasil->module = $row['module'];
			$hasil->qtip = $row['description'];
			$hasil->leaf = true;
			$arr_hasil[]=$hasil;
		}	
		
			
		$sql_menu = "select distinct menu from modules where module_id in ($sql_where_in_module_id) and active=1 and onmenu=1 and menu <> 'Root' ";	
		//echo $sql_menu;
		$stmt = $this->dbh->prepare($sql_menu);
		//echo 'betul'; 
		if (!$stmt) {
			print_r($this->dbh->errorInfo());
		}
        $stmt->execute();
		$armenu= array();
		$armenuall = array();
		while ($rowmenu = $stmt->fetch(PDO::FETCH_ASSOC)) {
			//echo "<br>".$arr_path[0];
			$arr_path=explode('/',$rowmenu['menu']);	
			$armenu[]=$arr_path[0];
			$armenuall[]=$rowmenu['menu'];
		}
		//print_r($armenu); 
		$armenu = array_unique($armenu);
		//sorting menu
		sort($armenu);
		
		$i = 0;
		foreach ($armenu as $path) {
			if ($path != 'Root') {
				$hasil = new stdclass();
				$hasil->id = $idtree.'.'.$i;
				$hasil->text = $path;
				$hasil->expanded = false;
				
				if($hasil->text === 'Laporan') {
					$hasil->icon = '/image/laporan3.png';
				} elseif($hasil->text === 'Kirim SMS') {
					$hasil->icon = '/image/mail-open.png';
				} elseif($hasil->text === 'SMS') {
					$hasil->icon = '/image/mobile-phone.png';
				} elseif($hasil->text === 'Monitoring Entri Data') {
					$hasil->icon = '/image/monitoring.png';
				} elseif($hasil->text === 'Utility') {
					$hasil->icon = '/image/utility.png';
				} elseif($hasil->text === 'Masterdata') {
					$hasil->icon = '/image/masterdata2.png';
				} elseif($hasil->text === 'Pendataan') {
					$hasil->icon = '/image/pendataan.png';
				}  elseif($hasil->text === 'Intervensi Program') {
					$hasil->icon = '/image/intervensi2.png';
				} else {
					$hasil->icon = '/image/folder.png';
				}
				
				$hasil->leaf = false;
				$i++;
				$arr_hasil2= array();
				foreach ($armenuall as $value) {
					$arr_path=explode('/',$value);	
					if ($arr_path[0] == $path) {
						if ($arr_path[1]) {
							$hasil2 = new stdclass();
							$hasil2->id = $idtree.'.'.$i;
							$hasil2->text = $arr_path[1];
							//$hasil2->iconCls = 'icon-folder-app';
							$hasil2->icon = '/image/folder.png'; //$row['iconcls'];
							$hasil2->expanded = false;
							$hasil2->leaf = false;
							$i++;
							$sql_module = "select * from modules where module_id in ($sql_where_in_module_id)  and active=1 and onmenu=1 and menu='".$path.'/'.$arr_path[1].'/'."' ";	
							//echo $sql_module;
							$stmt = $this->dbh->prepare($sql_module);
							$stmt->execute();
							$arr_hasil3= array();
							while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
								$hasil3 = new stdclass();
								$hasil3->id = $row['module_id'];
								$hasil3->text = $row['name'];
								$hasil3->qtip = $row['description'];
								$hasil3->module = $row['module'];
								$hasil3->onview = $row['onview'];
								//$hasil3->iconCls = $row['iconcls'];
								$hasil3->icon = '/modules/'.$row['module'].'/icon.png'; //$row['iconcls'];
								$hasil3->leaf = true;
								$arr_hasil3[]=$hasil3;
							}	
							if (count($arr_hasil3) > 0) {
								$hasil2->children = $arr_hasil3;
							}					
							$arr_hasil2[] = $hasil2;
						} else {
							$sql_module = "select * from modules where module_id in ($sql_where_in_module_id)  and onmenu=1 and menu='".$path.'/'."' ";	
							//echo $sql_module;
							$stmt = $this->dbh->prepare($sql_module);
							$stmt->execute();
							$arr_hasil2= array();
							while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
								$hasil2 = new stdclass();
								$hasil2->id = $row['module_id'];
								$hasil2->text = $row['name'];
								$hasil2->module = $row['module'];
								$hasil2->qtip = $row['description'];
								$hasil2->onview = $row['onview'];
								//$hasil2->iconCls = $row['iconcls'];
								$hasil2->icon = '/modules/'.$row['module'].'/icon.png'; //$row['iconcls'];
								$hasil2->leaf = true;
								$arr_hasil2[]=$hasil2;
							}					
						}
					}
				}
				if (count($arr_hasil2) > 0) {
					$hasil->children = $arr_hasil2;
				}
				$arr_hasil[]=$hasil;
			}
		}


		$data = json_encode($arr_hasil);
		
		echo $data;
    }

    
}

?>