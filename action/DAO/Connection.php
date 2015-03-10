<?php 
	class Connection {
		private static $connection = null;

		public static function getConnection() {
			if (Connection::$connection == null) {
				Connection::$connection = new nusoap_client('http://apps-de-cours.com/web-chat/server/services.php', false);
			}

			return Connection::$connection;
		}

		public static function closeConnection() {
			Connection::$connection = null;
		}

		public static function login($usr, $mdp) {
			var_dump($mdp);
			return Connection::$connection->call("connecter", array("nomUsager" => $usr, "motDePasse" => md5($mdp)));
		}

		public static function logout() {
			return Connection::$connection->call("deconnecter", array("clef" => $_SESSION["clef"]));
		}
	}