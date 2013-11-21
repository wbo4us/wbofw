<?php
	require_once($_SERVER['DOCUMENT_ROOT']."/lib/database/os-config.php");
	require_once('config.php');
	$sessid = $_COOKIE['wbofw-key'];
	$query = mysql_query("update sessions set time_logout=NOW(), logout_status='logout' where session_id='$sessid' "); 
	//unset($_COOKIE["sgis-key"]); 
	setcookie("wbofw-key", "", time()-3600);
	setcookie("wbofw-uid", "", time()-3600);	
?>

<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6 ielt8"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7 ielt8"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> 
<html lang="en"> <!--<![endif]-->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="refresh" content="1;url=login.php">
<title>Logout Sistem</title>
</head>
<body>
	<div id="container">
		<h2 style="text-align:center;">Terimakasih sudah logout</h2>
		<p style="text-align:center;"><a href='login.php'>Kembali ke Halaman Login</a></p>
	</div>
</body>
</html>
