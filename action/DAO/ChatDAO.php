<?php
	class ChatDAO {

		public static function getMessages($client, $key) {
			return $client->call("lireMessages", array("clef" => $key));
		}

		public static function ecritMessage($client, $clef, $message) {
			$client->call("ecrireMessage", array("clef" => $clef, $message));
		}

		public static function getUsers($client, $clef) {
			return $client->call("listeDesMembres", array("clef" => $clef));
		}

		public static function deconnection($client, $clef) {
			return $client->call("deconnecter", array("clef" => $clef));
		}
	}
