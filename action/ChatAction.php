<?php
	date_default_timezone_set('America/New_York');

	require_once('action/lib/nusoap.php'); 
	require_once("CommonAction.php");
	
	class ChatAction extends CommonAction {
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
				
				if ($this->soapClient->fault) {
					$this->error = "(" . $this->soapClient->faultcode . ") " . $this->soapClient->faultstring;
				} 
			}
		}
	}
