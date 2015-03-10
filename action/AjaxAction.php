<?php
	require_once("lib/nusoap.php");
	require_once("DAO/ChatDAO.php");
	session_start();

	date_default_timezone_set("America/New_York"); 
	//$client = new nusoap_client('http://apps-de-cours.com/web-chat/server/services.php', false);
	return json_encode(ChatDAO::getMessages($_SESSION["client"], $_SESSION["clef"]));
