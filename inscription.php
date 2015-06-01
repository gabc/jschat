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
		<link rel="stylesheet" type="text/css" href="css/inscription.css">
	</head>
	<body>
	  <form action="inscription.php" method="post" id="frm">
	    Matricule: <input type="text" autofocus name="mat" class="in"/>
	    Prenom: <input type="text" name="prenom" class="in"/>
	    Nom: <input type="text" name="nom" class="in"/>
	    Pseudo: <input type="text" name="usr" class="in"/>
	    Phrase: <input type="text" name="phrase" class="in"/>
	    Mot de passe: <input type="password" name="pwd" class="in"/>
	    <button id="ntnlogin">go.</button>
	  </form>
	</body>
</html>
