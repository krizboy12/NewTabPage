<?php
	class Database {
		private $server = "localhost";
		private $user = "newtab";
		private $pass = "bkxDqaNOHJHiy7Je";
		private $database = "newtab";

		private $table = "links";

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
			$qid = $this->connection->insert_id;

			// if the query failed, die with error message
			if (!$result) {
				die("Query failed for: " . $q . " " . $this->connection->error . " (" . $this->conn->errno . ")\n");
			}

			echo "Success: \"{$q}\" ({$qid}) \n";
			return $result;
		}

		private function scrub(&$s) {
			$this->connection->real_escape_string($s);
		}

		public function getList() {
			if (!$this->connection) {
				echo "Connect to the database first";
			} else {
				return $this->query("SELECT * FROM {$this->table};");
			}
		}

		public function addEntry($la, $li) {
			if (!$this->connection) {
				echo "Connect to the database first";
			} else {
				$this->scrub($la);
				$this->scrub($li);

				if (empty($la) || empty($li))
					return "Query failed: empty strings\n";

				return $this->query("INSERT INTO {$this->table} (label,link) VALUES ('{$la}','{$li}');");
			}
		}

		public function deleteEntry($id) {
			if (!$this->connection) {
				echo "Connect to the database first";
			} else {
				$this->scrub($id);

				return $this->query("DELETE FROM {$this->table} WHERE id IN ({$id});");
			}
		}

		public function updateEntry($id, $la, $li) {
			if (!$this->connection) {
				echo "Connect to the database first";
			} else {
				$this->scrub($id);
				$this->scrub($la);
				$this->scrub($li);

				if (empty($id) || empty($la) || empty($li)) 
					return "Query failed: empty strings\n";

				return $this->query("UPDATE {$this->table} SET label='{$la}',link='{$li}' WHERE id={$id};");
			}
		}
	}
?>
