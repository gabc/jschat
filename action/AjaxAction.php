<?php
	require_once("lib/nusoap.php");
	require_once("DAO/ChatDAO.php");
	require_once("CommonAction.php");

	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
			date_default_timezone_set("America/New_York"); 
		}

		public $result;

		protected function executeAction() {
			if ($_POST["action"] === "get") {
				$this->result = ChatDAO::getMessages($_SESSION["client"], $_SESSION["clef"]);
			} elseif ($_POST["action"] === "send") {
				ChatDAO::ecritMessage($_SESSION["client"], $_SESSION["clef"], $_POST["message"]);
				$this->result = "";
			}
		}
	}