<?php
	require_once("AjaxAction.php");

	$action = new AjaxAction();
	$action->execute();

	echo json_encode($action->result);