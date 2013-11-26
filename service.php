/*
﻿desc: bla bla bla
﻿author: wbo4us@gmail.com
﻿*/
﻿
﻿<?php
	require_once ($_SERVER['DOCUMENT_ROOT']."/lib/os.php");
	
	$paramsApp = isset($_GET) ? $_GET : $_POST;
	$Module = $paramsApp["Module"];
	$option = $paramsApp["option"];
	$action = $paramsApp["action"];
	
	//echo $Module; exit('ok bro');
	
	if ($Module == 'lib') {
		$lower = strtolower($option);
		$path = "./lib/$option.php";
		//echo $path;
		$initClass = "$" . $lower . "= new $option;";
		$Function = "$" . "$lower->$action();";
		require_once($path);

		if (class_exists($option)) {
			eval($initClass);
			if (method_exists(($lower), $action)) {
				eval($Function);
			} else {
				die('{"success" : false,msg:"The method does not exist."}');
			}
		} else {
			die('{"success" : true,msg:"Module Library FW tidak ada"}');
		}		
	} 
	else if ($Module == 'DataModule') { 
		$lower = strtolower($Module);
		$path = "./modules/$Module/Server/$Module.php";
		$initClass = "$" . $lower . "= new $Module;";
		$Function = "$" . "$lower->$option" . "_$action();";
		require_once($path);

		if (class_exists($Module)) {
			eval($initClass);
			$method = $option . "_$action";
			if (method_exists(($lower), $method)) {
				eval($Function);
			} else {
				die('{"success" : false,msg:"The method '.$method.' does not exist."}');
			}
		} else {
			die('{"success" : true,msg:"Module Library FW tidak ada"}');
		}
	} 
	else {
		//echo "yes"; exit;
		$os = new os();
		$lower = strtolower($Module);
		$mod = $os->getModuleId($lower);
		$path = "./modules/$Module/Server/$Module.php";
		//echo $path;
		$initClass = "$" . $lower . "= new $Module;";
		$Function = "$" . "$lower->$option" . "_$action();";
		//echo "Module:$Module"; exit;
		require_once($path);
		if (class_exists($Module)) {
			eval($initClass);
			$variable = $lower;
			$method = $option . "_$action";
			if (method_exists(($lower), $method)) {
				// cek otoritas
				$skipped = false;
				if ($option=="PUBLIC") { $skipped = true; }
				
				$act = $os->getAction($mod, $method);
				
				if ((count($act) > 0) || $skipped) {
					if ( $os->isAllowed($mod, $method) || $skipped) {
						eval($Function);
						//Simpan ke log aktivitas
						if (!$skipped) {
							if ($act['log'] == true) {
								$data_log = "";	
								$params = isset($_GET) ? $_GET : $_POST;
								$data_log = json_encode($params);
								$os->logActivity($mod, $method, $data_log);
							}
						}
						//////////////
					} else {
						die('{"success" : false, "msg":"Anda tidak diperbolehkan melakukan akses '.$act['description'].'"}');
					}
				} else {
					die('{"success" : false,"msg":"Aksi '.$method.' di module '.$mod.' belum terdaftar di server"}');
				}
			} else {
				die('{"success" : false,"msg":"The method does not exist."}');
			}
		} else {
			die('{"success" : false, "msg":"Module tidak ada"}');
		}
	}
	
	// if($GLOBALS['sessi_user_habis'] === true) {
		// die('{"success" : false, "msg":"Sessi anda sudah habis, silahkan login ulang"}');
	// }
?>
