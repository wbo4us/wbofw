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
require_once($_SERVER['DOCUMENT_ROOT']."/lib/database/class.oracle.php");

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
	

    function PUBLIC_listPeriode() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_PERIODE ";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_periode = $row['ID_PERIODE']; 
				$hasil->keterangan = $row['KETERANGAN']; 
				$hasil->is_current = $row['IS_CURRENT']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }
	

	
    function PUBLIC_listIKK() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_MISKIN ";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_miskin = $row['ID_MISKIN']; 
				$hasil->miskin = $row['MISKIN']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listIndikator() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "select * from tr_indikator where id_periode=2012 and is_active=1 order by no_baris";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_indikator = $row['ID_INDIKATOR']; 
				$hasil->id_periode = $row['ID_PERIODE']; 
				$hasil->nama_field = $row['NAMA_FIELD']; 
				$hasil->no_baris = $row['NO_BARIS']; 
				$hasil->indikator = $row['INDIKATOR']; 
				$hasil->pilihan = $row['PILIHAN']; 
				$hasil->pilihan_display = $row['PILIHAN_DISPLAY']; 
				$hasil->bobot_indikator = $row['BOBOT_INDIKATOR']; 
				$hasil->pilihan_miskin = $row['PILIHAN_MISKIN']; 
				$hasil->nama_store = $row['NAMA_STORE']; 
				$hasil->level_muatan = $row['LEVEL_MUATAN']; 
				$hasil->is_active = $row['IS_ACTIVE']; 
				$hasil->is_used = $row['IS_USED']; 
				$hasil->is_indikator = $row['IS_INDIKATOR']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listKelamin() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_KELAMIN";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_kelamin = $row['ID_KELAMIN']; 
				$hasil->kelamin = $row['KELAMIN']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listHubKeluarga() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_HUB_KELUARGA";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_hub_keluarga = $row['ID_HUB_KELUARGA']; 
				$hasil->hub_keluarga = $row['HUB_KELUARGA']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }	
	
    function PUBLIC_listPendidikan() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_PENDIDIKAN";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_pendidikan = $row['ID_PENDIDIKAN']; 
				$hasil->pendidikan = $row['PENDIDIKAN']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }	
	
    function PUBLIC_listStatusPendidikan() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_STATUS_PENDIDIKAN";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_status_pendidikan = $row['ID_STATUS_PENDIDIKAN']; 
				$hasil->status_pendidikan = $row['STATUS_PENDIDIKAN']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }	
	
    function PUBLIC_listAgama() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_AGAMA";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_agama = $row['ID_AGAMA']; 
				$hasil->agama = $row['AGAMA']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }	
	
    function PUBLIC_listNikah() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_NIKAH";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_nikah = $row['ID_NIKAH']; 
				$hasil->status_nikah = $row['STATUS_NIKAH']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }	

    function PUBLIC_listDifabel() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_DIFABLE";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_difable = $row['ID_DIFABLE']; 
				$hasil->difable = $row['DIFABLE']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }	

    function PUBLIC_listGolDarah() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_GOL_DARAH";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_gol_darah = $row['ID_GOL_DARAH']; 
				$hasil->gol_darah = $row['GOL_DARAH']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }	

    function PUBLIC_listPekerjaan() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_PEKERJAAN_NANGKIS";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_pekerjaan = $row['ID_PEKERJAAN']; 
				$hasil->pekerjaan = $row['PEKERJAAN']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listJenisBantuan() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_JENIS_BANTUAN ORDER BY tingkat";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_jenis_bantuan = $row['ID_JENIS_BANTUAN']; 
				$hasil->jenis_bantuan = $row['JENIS_BANTUAN']; 
				$hasil->tingkat = $row['TINGKAT']; 
				$tingkat_desc = 'N/A';
				switch($hasil->tingkat){
					case 0:
						$tingkat_desc  = "Nasional";
						break;
					case 1:
						$tingkat_desc  = "Propinsi";
						break;
					case 2:
						$tingkat_desc  = "Kabupaten";
						break;					
					case 3:
						$tingkat_desc  = "Kecamatan";
						break;					
					case 4:
						$tingkat_desc  = "Desa";
						break;					
					case 9:
						$tingkat_desc  = "Lain-lain";
						break;					
				}
				$hasil->tingkat_desc = $tingkat_desc; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listHubRT() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_HUB_RUMAH_TANGGA";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_hub_rumah_tangga = $row['ID_HUB_RUMAH_TANGGA']; 
				$hasil->hub_rumah_tangga = $row['HUB_RUMAH_TANGGA']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listKepemilikanKartu() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_KEPEMILIKAN_KARTU";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_kepemilikan_kartu = $row['ID_KEPEMILIKAN_KARTU']; 
				$hasil->kepemilikan_kartu = $row['KEPEMILIKAN_KARTU']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listStatusPekerjaan() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_STATUS_DALAM_PEKERJAAN";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_status_dalam_pekerjaan = $row['ID_STATUS_DALAM_PEKERJAAN']; 
				$hasil->status_dalam_pekerjaan = $row['STATUS_DALAM_PEKERJAAN']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listLapanganUsaha() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_LAPANGAN_USAHA";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_lapangan_usaha = $row['ID_LAPANGAN_USAHA']; 
				$hasil->lapangan_usaha = $row['LAPANGAN_USAHA']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listPartisipasiSekolah() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_PARTISIPASI_SEKOLAH";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_partisipasi_sekolah = $row['ID_PARTISIPASI_SEKOLAH']; 
				$hasil->partisipasi_sekolah = $row['PARTISIPASI_SEKOLAH']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }

    function PUBLIC_listPenyakitKronis() {
		$params = isset($_GET) ? $_GET : $_POST;
		$sql = "SELECT * FROM TR_PENYAKIT_KRONIS";
		$arr_hasil= array();
		$total = $this->db->getRowsCount($sql);
		if ($total > 0){
			$ok = $this->db->Select($sql);
			while ($row = $this->db->FetchArray($ok)) {
				$hasil = new stdClass();
				$hasil->id_penyakit_kronis = $row['ID_PENYAKIT_KRONIS']; 
				$hasil->penyakit_kronis = $row['PENYAKIT_KRONIS']; 
				$arr_hasil[]=$hasil;			
			}
		}
		$data = json_encode($arr_hasil);
		
		$result = '{"success" : true, "total":'.$total.', "result":' . $data . '}';
		
		echo $result;
    }
	
}

?>