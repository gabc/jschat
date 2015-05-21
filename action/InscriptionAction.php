<?php
	date_default_timezone_set('America/New_York');

	require_once('action/lib/nusoap.php'); 
	require_once("CommonAction.php");
	
	class InscriptionAction extends CommonAction {
		public $key;
		public $error;
		public $soapClient;

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
			$this->soapClient = Connection::getConnection();
		}
        // enregistrer(matricule, prenom, nom, nomUsager, motDePasse (en md5), texteBienvenue)		
		protected function executeAction() {		
			$this->error = $this->soapClient->getError();

			if (!isset($_POST["usr"]) || !isset($_POST["pwd"])) {
				return;
			}
			
			if (empty($this->error)) {
				$this->key = Connection::singin($_POST["mat"], $_POST["prenom"], $_POST["nom"], $_POST["usr"], $_POST["mdp"], $_POST["phrase"]);
				echo $this->key;
				if ($this->soapClient->fault) {
					$this->error = "(" . $this->soapClient->faultcode . ") " . $this->soapClient->faultstring;
				} else {
					$_SESSION["clef"] = $this->key;
                    $_SESSION["usr"] = $_POST["usr"];
					header('Location: index.php'); 
					exit();
				}
			} else {
				echo "WHhooops";
			}
		}
	}
