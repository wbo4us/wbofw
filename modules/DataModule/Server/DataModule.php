<?php

/*	User Information
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

//error_reporting(E_ALL);
error_reporting(NULL);

require_once($_SERVER['DOCUMENT_ROOT']."/lib/database/database.php");
require_once($_SERVER['DOCUMENT_ROOT'].'/lib/database/app.db.config.php');

class DataModule extends Database {
     /*
     * Simple conection with de database
     */

	private $db=null;
	
    function __construct() {
		parent::__construct();
		$this->db = new DBORA();
		$this->db->Connect(SBD_DB_DB , SBD_DB_USER, SBD_DB_PWD);
		$this->db->SetAutoCommit(true);		
    }

    /**
     * Destructor closes the statement and connection
     */
    function __destruct() {
		$this->db->Bye();
    } 
	
}

?>
