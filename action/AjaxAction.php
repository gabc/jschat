<?php
	require_once("lib/nusoap.php");
	require_once("DAO/ChatDAO.php");
	require_once("CommonAction.php");

	class AjaxAction extends CommonAction {
		private $soapClient;
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
			date_default_timezone_set("America/New_York"); 
			$this->soapClient = Connection::getConnection();
		}

		public $result;

		protected function executeAction() {
			if ($_POST["action"] === "get") {
				$this->result = ChatDAO::getMessages($this->soapClient, $_SESSION["clef"]);
			} elseif ($_POST["action"] === "send") {
				ChatDAO::ecritMessage($this->soapClient, $_SESSION["clef"], $_POST["message"]);
				$this->result = "";
			} elseif ($_POST["action"] === "usrs") {
				$this->result = ChatDAO::getUsers($this->soapClient, $_SESSION["clef"]);
			}
		}
	}
