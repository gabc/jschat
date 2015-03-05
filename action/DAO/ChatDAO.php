<?php
	class ChatDAO {

		public static function getMessages($client, $key) {
			return $client->call("lireMessages", array("clef" => $key));
		}
	}
