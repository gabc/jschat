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
			
			if (empty($this->error)) {
				$this->key = Connection::login();
				
				if ($this->soapClient->fault) {
					$this->error = "(" . $this->soapClient->faultcode . ") " . $this->soapClient->faultstring;
				} 
			}

			$_SESSION["clef"] = $this->key;

			$_SESSION["client"] = $this->soapClient;
		}
	}
