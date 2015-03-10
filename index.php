<?php
	session_start();
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
		
		<script>
		$.ajax({
			url: "action/AjaxAction.php",
			type: "POST"
		}).done( function(data) {
			console.log(data);
			data = JSON.parse(data);
			//console.log(JSON.parse(data));
			for(var i = 0; i < data.length; i++) {
				console.log(data[i]);
			}
		});
		</script>

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
