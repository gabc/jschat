<?php
	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$action->execute();

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"> 
		<script src="js/jquery.js"></script>
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

		<form action="index.php" method="post">
			<select name="theme">
				<option value="retro">Retro look</option>
				<option value="three">Musee des messages</option>
				<option value="cream">Surprise</option>
			</select>
			
			<input type="text" autofocus name="usr" value="<?php if(isset($_SESSION['usr'])){ echo $_SESSION['usr'];} ?>"/>
			<input type="password" name="pwd" />
			<button id="ntnlogin">go.</button>
		</form>
	</body>
</html>
