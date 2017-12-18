<?php
	require_once "Database.php";	

	$db = new Database();

	$db->connect();
	echo $db->deleteEntry($_POST["id"]);
	$db->disconnect();
?>
