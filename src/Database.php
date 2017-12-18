<?php
	class Database {
		private $server = "localhost";
		private $user = "newtab";
		private $pass = "bkxDqaNOHJHiy7Je";
		private $database = "newtab";

		private $connection;

		function __construct() {}

		public function connect() {
			if (!$this->connection) {
				$this->connection = new mysqli($this->server, $this->user, $this->pass, $this->database);
		
				if ($this->connection->connect_error) {
					die("Could not connect to MySQL server: " . $this->connection->connect_error . "\n");
				}

				echo "Connected successfully\n";
			} else {
				echo "Already connected\n";
			}
		}

		public function diconnect() {
			$this->connection->close();
			echo "Connection closed\n";
		}

		public function query($q) {
			// query the sql code and grab the last id and store it
			$result = $this->connection->query($q);

			// if the query failed, die with error message
			if (!$result) {
				die("Query failed for: " . $q . " " . $this->connection->error . " (" . $this->conn->errno . ")\n");
			}

			echo "Success: \"" . $q . "\"\n";
			return $result;
		}

		public function retrieveLinks() {
			if (!$this->connection) {
				echo "Connect to the database first";
			} else {
				return query("SELECT * FROM links");
			}
		}
	}
?>
