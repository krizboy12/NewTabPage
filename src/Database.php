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

		public function disconnect() {
			$this->connection->close();
			echo "Connection closed\n";
		}

		private function query($q) {
			// query the sql code and grab the last id and store it
			$result = $this->connection->query($q);

			// if the query failed, die with error message
			if (!$result) {
				die("Query failed for: " . $q . " " . $this->connection->error . " (" . $this->conn->errno . ")\n");
			}

			echo "Success: \"" . $q . "\"\n";
			return $result;
		}

		private function scrub(&$s) {
			$this->connection->real_escape_string($s);
		}

		public function getList() {
			if (!$this->connection) {
				echo "Connect to the database first";
			} else {
				return $this->query("SELECT label,link FROM links");
			}
		}

		public function addEntry($label, $link) {
			if (!$this->connection) {
				echo "Connect to the database first";
			} else {
				$this->scrub($label);
				$this->scrub($link);

				return $this->query("INSERT INTO links (label,link) VALUES ('{$label}','{$link}')");
			}
		}
	}
?>
