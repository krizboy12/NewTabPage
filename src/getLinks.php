<?php
	require_once "Database.php";	

	$db = new Database();

	$db->connect();
	$result = $db->retrieveLinks();
	$db->diconnect();

	while ($row = $result->fetch_assoc()) {
		echo $row . "\n";
	}

	$result->free_result();
?>
