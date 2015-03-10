<?php
	require_once("action/ChatAction.php");

	$action = new ChatAction();
	$action->execute();

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"> 
		<script src="js/jquery.js"></script>
		<script src="js/javascript.js"></script>
	</head>
	<body>
		<?php
			if(empty($action->error)){
		?>
				<div>Clef : <?php echo $action->key; ?></div>
				<div>Voir statut des usagers : <a href="http://apps-de-cours.com/web-chat/server/watch-eye.php" target="watcheye">Watch Eye</a></div>
		<?php
			}
			else {
		?>
				Erreur : <?php echo $action->error; ?>
		<?php
			}
		?>

		<ul id="convo">
		</ul>

		<input type="text" autofocus id="inputtext" />
		<button id="btngo">go.</button>
	</body>
</html>
