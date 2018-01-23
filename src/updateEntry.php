<?php
	require_once "Database.php";	

	$db = new Database();

	$id = $_POST["id"];
	$la = $_POST["label"];
	$li = $_POST["link"];
	$pri = $_POST["pri"];

	$db->connect();
	echo $db->updateEntry($id, $la, $li, $pri);
	$db->disconnect();
?>
