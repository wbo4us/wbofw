<?php
$mysql_hostname = _DB_HOST;  //alamat server
$mysql_user = _DB_USER;       //username untuk koneksi ke database
$mysql_password = _DB_PASSWORD;   //password koneksi ke database, klo tidak ada bisa dikosongkan
$mysql_database = _DB_NAME;   //nama database yang akan diakses/digunakan

mysql_connect($mysql_hostname, $mysql_user, $mysql_password) or die("Koneksi ke database gagal!");
mysql_select_db($mysql_database) or die("Database tidak ditemukan!");
?>
