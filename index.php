<?php

	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$action->execute();

?>
<!DOCTYPE html>
<html>
	<head>
	</head>
	<body>
		<?php
			if (empty($action->error)) {
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
		<ul>
		<?php foreach($action->getMessage() as $foo){ ?>
			<li><?= $foo["nomUsager"] . ":	" . $foo["message"] ?></li>
		<?php } ?>
		</ul>
		<form action="index.php" method="get">
			<input type="text" autofocus name="inputtext" />
			<button type="submit">go.</button>
		</form>

	</body>
</html>
