<html>
	<head>
		<title>New Terb</title>
	</head>
	<body>
		<?php
			$server = "localhost";
			$user = "newtab";
			$pass = "bkxDqaNOHJHiy7Je";

			$connection = new mysqli($server, $user, $pass);
			
			if ($connection->connect_error) {
				die("Connection to MySQL server: " . $connection->connect_error);
			}

			echo "Connected Successfully";
		?>
	</body>
</html>
