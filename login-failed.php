<?php 
	header('HTTP/1.1 401 Unauthorized');
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="refresh" content="3;url=login.php">
	<title>Login Failed (Unauthorized)</title>
</head>

<body>
	<h2 style="text-align:center;">Login Gagal</h2>
	<p style="text-align:center;">Silahkan periksa username dan password anda<br/>
	Anda akan kembali ke halaman <a href='login.php'>login</a>...</p>
</body>
</html>
