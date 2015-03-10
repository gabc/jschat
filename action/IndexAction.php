<?php
	date_default_timezone_set('America/New_York');

	require_once('action/lib/nusoap.php'); 

	class IndexAction {
		public $key;
		public $error;
		public $soapClient;

		public function __construct() {
		}
		
		public function execute() {		
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

		public function getMessage() {
			return $this->soapClient->call("lireMessages", array("clef" => $this->key));
		}
	}
