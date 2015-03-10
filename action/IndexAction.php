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
		}
		
		protected function executeAction() {		
			$this->soapClient = new nusoap_client('http://apps-de-cours.com/web-chat/server/services.php', false);
			$this->error = $this->soapClient->getError();
			
			if (empty($this->error)) {
				$this->key = $this->soapClient->call("connecter", array("nomUsager" => "gabc", "motDePasse" => md5("AAAaaa111")));
				
				if ($this->soapClient->fault) {
					$this->error = "(" . $this->soapClient->faultcode . ") " . $this->soapClient->faultstring;
				} 
			}

			$_SESSION["clef"] = $this->key;

			$_SESSION["client"] = $this->soapClient;
		}
	}
