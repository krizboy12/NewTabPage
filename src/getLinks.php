<?php
	require_once "Database.php";	

	$db = new Database();

	$db->connect();
	$result = $db->retrieveLinks();
	$db->diconnect();

	$rows = array();
	while ($row = $result->fetch_assoc()) {
		$rows[] = $row;
	}

	echo json_encode($rows);
	$result->free_result();
?>
