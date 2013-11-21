<?php
	/*check session dulu , jika masih aktif maka redirect saja */
	require_once ($_SERVER['DOCUMENT_ROOT']."/lib/os.php");
	$os = new os();
	$session = $os->session_exist();
	if ($session) {
		header("location: wbofw.php");
		exit();
	}
	
?>



<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="ie6 ielt8"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="ie7 ielt8"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="ie8"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> 
<html lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<title>Halaman Login - <?php echo _TITLE; ?></title>
<link rel="stylesheet" type="text/css" href="resources/login/css/login.css" />

		
</head>
<body>


		
<div class="container">
<h1><?php echo _TITLE; ?></h1>
	<section id="content">
		<form autocomplete="off" method="POST" action="login-exec.php">
			<h2>Silahkan Login</h2>
			<div>
				<input type="text" placeholder="Username" required="" id="username" name="username" autofocus />
			</div>
			<div>
				<input type="password" placeholder="Password" required="" id="password" name="password" />
			</div>
			<div>
				<input type="submit" value="Masuk" />
			</div>
            <div>Silahkan login dengan user admin, password admin01</div>
		</form><!-- form -->
		<div class="button">
            
			<a href="#">Copyright &copy; wboFW</a>
		</div><!-- button -->
	</section><!-- content -->
</div><!-- container -->
</body>
</html>
