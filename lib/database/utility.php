<?php 
//ob_start();//session_start();
//echo 'start os';
require_once ($_SERVER['DOCUMENT_ROOT']."/lib/os.php");
class Utility {
    /*
     * Simple conection with de database
     * */
	private $conn=null;
	private $os=null;
    function __construct() {
		$this->os = new os();
		$session = $this->os->session_exist();
		if ($session==true) {
			$this->conn = $this->os->connectDB();
			$sessid = $_COOKIE['wbofw-key'];
			//echo 'session= '.$sessid; exit;
			$sql = "update sessions set time_updated=NOW(), time_logout=ADDTIME(NOW(),'"._SESSION_TIMEOUT."') where session_id='$sessid' ";
			//echo $sql; exit;
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();	
		} else {
			//printf("<script>location.href='access-denied.php'</script>");			
			header("location:access-denied.php");
			//echo '<META HTTP-EQUIV="Refresh" Content="0; URL=access-denied.php">'; 
			exit();		
			//die ('Session tidak aktif');
		}
		
    }
	
	private function array_to_scv($array, $header_row = true, $col_sep = ",", $row_sep = "\n", $qut = '"') {
		if (!is_array($array)) return false;
		//Header row.
		if ($header_row) {
			foreach ($array[0] as $key => $val)	{
				//Escaping quotes.
				$key = str_replace($qut, "$qut$qut", $key);
				$output .= "$col_sep$qut$key$qut";
			}
			$output = substr($output, 1)."\n";
		}
		
		
		//Data rows.
		foreach ($array as $key => $val) {
			$tmp = '';
			foreach ($val as $cell_key => $cell_val) {
				//Escaping quotes.
				$thisvalue = $cell_val;
				if (is_numeric($thisvalue)) {
					$thisvalue = str_replace($qut, "$qut$qut", $thisvalue);
					$tmp .= "$col_sep"."="."$qut$thisvalue$qut";
				} else {
					$thisvalue = str_replace($qut, "$qut$qut", $thisvalue);
					$tmp .= "$col_sep$qut$thisvalue$qut";
				}
				
			}
			$output .= substr($tmp, 1).$row_sep;
		}
		return $output;
	}
	
	function export2csv($filename, $array, $header_row = true, $col_sep = ",", $row_sep = "\n", $qut = '"'){
		// header("Content-type: text/csv");
		// header("Content-Disposition: attachment; filename=$filename");
		// header("Pragma: no-cache");
		// header("Expires: 0");
		$output = $this->array_to_scv($array, $header_row, $col_sep , $row_sep,$qut);
		$filename = "/export/tmp/$filename";
		file_put_contents($_SERVER['DOCUMENT_ROOT'] . "$filename", $output);
		echo '{"success" : true, "filename":"'. $filename.'"}';
	}
	
}