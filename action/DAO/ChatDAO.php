<?php
	class ChatDAO {

		public static function getMessages($client, $key) {
			return $client->call("lireMessages", array("clef" => $key));
		}

		public static function ecritMessage($client, $clef, $message) {
			$client->call("ecrireMessage", array("clef" => $clef, $message));
		}
	}
