<?php
	require_once("lib/nusoap.php");

	require_once("DAO/ChatDAO.php");

	date_default_timezone_set("America/New_York"); 
	$client = new nusoap_client('http://apps-de-cours.com/web-chat/server/services.php', false);
 	return json_parse(ChatDAO::getMessages($client, $_POST["key"]));;
