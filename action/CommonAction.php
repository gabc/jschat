<?php 
	session_start();	
	//require_once("action/constants.php");
	require_once("DAO/Connection.php");

	abstract class CommonAction {
		public static $VISIBILITY_PUBLIC = 0;
		public static $VISIBILITY_MEMBER = 1;
		public static $VISIBILITY_MOD = 2;
		public static $VISIBILITY_ADMIN = 3;
        public $ERR = array("USERNAME_ALREADY_IN_USE" => "Le nom d'usager est deja pris"
                            ,"USERNAME_ALREADY_IN_USE" => "Le matricule est invalide"
                            ,"SPECIAL_CHARACTERS_ARE_NOT_ALLOWED" => "Il ne doit pas y avoir de caractères speciaux pour le pseudo"
                            ,"USERNAME_CANNOT_BE_GUEST" => "Le pseudo ne peut pas etre guest"
                            ,"FIELDS_TOO_SHORT" => "Les champs doivent contenir au moins 3 chars"
                            ,"USERNAME_TOO_LONG" => "Les champs ne peuvent depasser 15 chars"
                            ,"USER_IS_BANNED" => "Vous avez ete banni"
                            ,"INVALID_USERNAME_PASSWORD" => "Nom d'usager et/ou mot de passe invalide");
        
		private $pageVisibility;
        
		public function __construct($pageVisibility) {
			$this->pageVisibility = $pageVisibility;
		}

		public function execute() {
            if (empty($_SESSION["theme"])){
                $_SESSION["theme"] = "retro";
            }
            if (!empty($_GET["theme"])) {
                $_SESSION["theme"] = $_GET["theme"];
            }
                
			if (!empty($_GET["logout"])) {
				session_unset();
				session_destroy();
				session_start();
			}
			
			if (empty($_SESSION["visibility"])) {
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
			}

			if ($_SESSION["visibility"] < $this->pageVisibility) {
				//header("location:login.php");
				exit;
			}

			$this->executeAction(); // template method pattern

            Connection::closeConnection();
		}

		protected abstract function  executeAction();

		public function isLoggedIn() {
			return $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;
		}

		public function getName() {
			$name = "guest";

			if ($this->isLoggedIn()) {
				$name = $_SESSION["name"];
			}

			return $name;
		}

        protected function getErrorMess($err) {
            if(array_key_exists($err, $this->ERR))
                return $this->ERR[$err];
            else{
                return "correct";
            }
        }
	}