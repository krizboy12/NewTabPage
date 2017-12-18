<?php
	require_once "Database.php";	

	$db = new Database();

	$db->connect();
	$db->diconnect();
?>
