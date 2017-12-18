<?php
	require_once "Database.php";

	// grab the label and link from POST data
	$label = $_POST["label"];
	$link = $_POST["link"];

	$db = new Database();

	$db->connect();
	echo $db->addEntry($label, $link);
	$db->disconnect();
?>
