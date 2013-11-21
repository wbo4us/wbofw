<?php 
	ob_start(); session_start();
	require_once ($_SERVER['DOCUMENT_ROOT']."/lib/database/os-config.php");
	require('config.php');
	$errmsg_arr = array();
	$errflag = false; 
?>

<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6 ielt8"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7 ielt8"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> 
<html lang="en"> <!--<![endif]-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title></title>
</head>
<body>
<!-- Content -->
<div id="containercontent">
	<div id="contentatas">
		<div class="wrapfull">
			<?php

				function clean($str) {
					$str = @trim($str);
					if(get_magic_quotes_gpc()) {
						$str = stripslashes($str);
					}
					return mysql_real_escape_string($str);
				}
				
				$username = $_POST['username'];
				$password = $_POST['password'];
				//Input Validations
				if($username == '') {
					$errmsg_arr[] = 'Login ID missing';
					$errflag = true;
				}
				if($password == '') {
					$errmsg_arr[] = 'Password missing';
					$errflag = true;
				}
				if($errflag) {
					$_SESSION['ERRMSG_ARR'] = $errmsg_arr;
					session_write_close();
					header ("location: index.php");
					exit();
	            }
					// query untuk mendapatkan record dari username
					$query = mysql_query("select password from users where user_id='$username'"); 
					$data = mysql_fetch_assoc($query);
					$user_Id = $username ;
					
					$ip_address = $_SERVER['REMOTE_ADDR'];
					$user_agent = $_SERVER['HTTP_USER_AGENT'];
					//$nowtime = date("Y-m-d H:i:s");
					
					$session_id = md5(uniqid(rand(), true));
					//$_SESSION['level'] = $data['session'];
					//$_SESSION['level'] = $session_id;
					//$_SESSION['username'] = $data['username'];
					
					$expire=time()+60*60*24; // 24 jam 
					setcookie("wbofw-key", $session_id, $expire);
					setcookie("wbofw-uid", $user_Id, $expire);

					// cek kesesuaian password
					if (md5($password) == $data['password']){
						/* insert ke session */
						//$sql = "insert into sessions (session_id,user_id,ip_address,user_agent,time_login) values ('$session_id','$user_Id','$ip_address','$user_agent', ".date("Y-m-d H:i:s").")";
						$sql = "insert into sessions (session_id,user_id,ip_address,user_agent,time_login, time_updated, time_logout) values ('$session_id','$user_Id','$ip_address','$user_agent', NOW(), NOW(), ADDTIME(NOW(),'"._SESSION_TIMEOUT."'))";
						echo $sql; 
						$query_session = mysql_query($sql);
						//echo "<h1>Selamat Datang</h1>";
						session_write_close();
						header("location: wbofw.php");
						exit();
					} else {
						echo "<h1>Login gagal</h1>";
						echo "<a href='logout.php'>Logout</a> ";
						header("location: login-failed.php");
					}
?>	
		</div>
	</div>
</div>
</body>
</html>
