<?php
	require_once("action/InscriptionAction.php");

	$action = new InscriptionAction();
	$action->execute();

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"> 
		<script src="js/jquery.js"></script>
	</head>
	<body>
	  <form action="inscription.php" method="post">
	    Matricule: <input type="text" autofocus name="mat"/>
	    Prenom: <input type="text" autofocus name="prenom"/>
	    Nom: <input type="text" autofocus name="nom"/>	    
	    Pseudo: <input type="text" autofocus name="usr"/>
	    Phrase: <input type="text" name="phrase" />
	    Mot de passe: <input type="password" name="pwd" />
	    <button id="ntnlogin">go.</button>
	  </form>
	</body>
</html>
