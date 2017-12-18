<?php
	class Database {
		private $server = "localhost";
		private $user = "newtab";
		private $pass = "bkxDqaNOHJHiy7Je";
		private $database = "newtab";

		private $connection;

		function __construct() {}

		public function connect() {
			if (!$connection) {
				$connection = new mysqli($server, $this->user, $pass, $database);
		
				if ($connection->connect_error) {
					die("Could not connect to MySQL server: " . $connection->connect_error . "\n");
				}

				echo "Connected successfully\n";
			} else {
				echo "Already connected\n";
			}
		}

		public function diconnect() {
			$connection->close();
			echo "Connection closed\n";
		}
	}
?>
