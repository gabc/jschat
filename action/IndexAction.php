<?php
	date_default_timezone_set('America/New_York');

	require_once('action/lib/nusoap.php'); 
	require_once("CommonAction.php");
	
	class IndexAction extends CommonAction {
		public $key;
		public $error;
		public $soapClient;

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
			$this->soapClient = Connection::getConnection();
		}
		
		protected function executeAction() {		
			$this->error = $this->soapClient->getError();

			if (!isset($_POST["usr"]) || !isset($_POST["pwd"])) {
				return;
			}
			
			if (empty($this->error)) {
				$this->key = Connection::login($_POST["usr"], $_POST["pwd"]);
				echo $this->key;
				if ($this->soapClient->fault) {
					$this->error = "(" . $this->soapClient->faultcode . ") " . $this->soapClient->faultstring;
				} else {
					$_SESSION["clef"] = $this->key;
					$_SESSION["theme"] = $_POST["theme"]; // really needed?
                    $_SESSION["usr"] = $_POST["usr"];
					header('Location: chat.php'); 
					exit();
				}
			} else {
				echo "WHhooops";
			}
		}
	}
