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
		<?php if ($_SESSION["theme"] === "three") { ?>
		<script src="js/three.min.js"></script>
		<script src="http://mrdoob.github.com/three.js/examples/fonts/helvetiker_regular.typeface.js"></script>
		<script src="js/FirstPersonControls.js"></script>
		<script src="js/viewportSize-min.js"></script>
		<link rel="stylesheet" href="css/three.css">
		<?php } ?>
		<script src="js/<?= $_SESSION["theme"] ?>.js"></script>
	</head>
	<body>
		<?php if ($_SESSION["theme"] !== "three") {?>
		<ul id="convo">
		</ul>
		<?php }?>

		<form class="textin" action="#" onsubmit="envoieMessage(this.text)">
			<input type="text" autofocus id="inputtext" />
		</form>
	</body>
</html>
