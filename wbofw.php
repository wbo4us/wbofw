<?php
	require_once ($_SERVER['DOCUMENT_ROOT']."/lib/os.php");
	$os = new os();
	// Cek apakah session ada
	if (!$os->session_exist()) {
		header("location: access-denied.php");
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
    <title><?php echo _TITLE; ?></title>
	
<!--link rel="stylesheet" type="text/css" href="resources/login/css/login.css" /-->
<style type="text/css">
	.opaqueLayer
	{
		display:none;
		position:absolute;
		top:0px;
		left:0px;
		opacity:0.6;
		filter:alpha(opacity=60);
		background-color: #000000;
		z-Index:1000;
	}
	

	.questionLayer
	{
		position:absolute;
		top:0px;
		left:0px;
/* 		width:100px;
		height:50px; 
		display:none; */
		z-Index:1001;
		border:2px solid black;
		background-color:#FFFFFF;
		text-align:center;
		vertical-align:middle;
		padding:10px;
	}
</style>
		
<script type="text/javascript">
	function getBrowserHeight() {
		var intH = 0;
		var intW = 0;
	   

		if(typeof window.innerWidth  == 'number' ) {
		   intH = window.innerHeight;
		   intW = window.innerWidth;
		}
		else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			intH = document.documentElement.clientHeight;
			intW = document.documentElement.clientWidth;
		}
		else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			intH = document.body.clientHeight;
			intW = document.body.clientWidth;
		}


		return { width: parseInt(intW), height: parseInt(intH) };
	}


	function setLayerPosition() {
		var shadow = document.getElementById("shadow");
		var question = document.getElementById("question");


		var bws = getBrowserHeight();
		//debugger;
		shadow.style.width = bws.width + "px";
		shadow.style.height = bws.height + "px";


		question.style.left = parseInt((bws.width - 100) / 2) + "px";
		question.style.top = parseInt((bws.height - 50) / 2) + "px";


		shadow = null;
		question = null;
	}


	function showLayer() {
		//var uid = document.getElementById("username");
		//var pwd = document.getElementById("password");
		
		//debugger;
		
		setLayerPosition();

		var shadow = document.getElementById("shadow");
		var question = document.getElementById("question");


		shadow.style.display = "block";
		question.style.display = "block";


		shadow = null;
		question = null;
	}
	

	function hideLayer() {
		var shadow = document.getElementById("shadow");
		var question = document.getElementById("question");


		shadow.style.display = "none";
		question.style.display = "none";


		shadow = null;
		question = null;
	}


	//window.onresize = setLayerPosition;
	
</script>
	
    <!--link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css"-->
	<link rel="stylesheet" type="text/css" href="http://cdn.sencha.com/ext/gpl/4.2.0/resources/css/ext-all-neptune.css">
	<link rel="stylesheet" type="text/css" href="resources/style.css">	
	<script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/4.2.0/ext-all.js"></script>
</head>
<body>
	
	<div id="shadow" class="opaqueLayer"> </div>
	<div id="question" class="questionLayer">
		<img src="./resources/images/AjaxLoader.gif" style="width:48px;margin:0 auto;">
	</div>
	<script type="text/javascript"> showLayer(); </script>
	<!-- <script type="text/javascript" charset="utf-8" src="http://cdn.sencha.io/ext-4.1.0-gpl/ext-all-debug.js"></script>	-->
	<!-- script type="text/javascript" src="extjs/ext-all.js"></script -->
	<!-- script type="text/javascript" src="extjs-4.2.1/ext-all.js"></script-->
	<!-- script type="text/javascript" charset="utf-8" src="http://cdn.sencha.io/ext-4.2.0-gpl/ext-all.js"></script-->	
	<script type="text/javascript">
	
		var thisAppTitle = '<?php echo _TITLE; ?>';
	
	<?php
		/*Ambil keterangan user login*/
		$sessid = $_COOKIE['wbofw-key'];
		//echo 'session= '.$sessid; exit;
		$sql = "SELECT user_id, username, nama, isadmin, param01, param02, param03, param04, param05,
				param06, param07, param08, param09, param10
				FROM users
				WHERE user_id IN (
						SELECT user_id
						FROM sessions
						WHERE session_id = '$sessid'
							AND NOW() < time_logout
							AND logout_status IS NULL
						)
				";
		//echo $sql; exit;
		$dbh = $os->connectDB();
		$stmt = $dbh->prepare($sql);
		$stmt->execute();
		$total = $stmt->rowCount();
		if ($total > 0) {
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				?>
				//console.log(Ext.util.Cookies.get('sgis-key'));
				var UserData = {};
				UserData.user_id = '<?php echo $row['user_id']; ?>' ;
				UserData.username = '<?php echo $row['username']; ?>' ;
				UserData.nama = '<?php echo $row['nama']; ?>' ;
				UserData.isAdmin = '<?php echo $row['isadmin']; ?>' ;
				UserData.periode = '<?php echo $row['param01']; ?>' ;
				UserData.prop = '<?php echo $row['param02']; ?>' ;
				UserData.kab = '<?php echo $row['param03']; ?>' ;
				UserData.kec = '<?php echo $row['param04']; ?>' ;
				UserData.des = '<?php echo $row['param05']; ?>' ;
				UserData.dus = '<?php echo $row['param06']; ?>' ;
				UserData.p7 = '<?php echo $row['param07']; ?>' ;
				UserData.responden = '<?php echo $row['param08']; ?>' ;
				UserData.pendata = '<?php echo $row['param09']; ?>' ;
				UserData.pemeriksa = '<?php echo $row['param10']; ?>' ;
				
				<?php
			}
		} else {
			die ('session tidak aktif');
		}	
	?>
	</script>
	
	<!-- script type="text/javascript" src="/extjs/resources/js/azzurra.js"></script-->	
	
	<script type="text/javascript" src="app.js"></script>	
</body>
</html>