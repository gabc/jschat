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
		<script src="js/utils.js"></script>
		<?php if ($_SESSION["theme"] === "three") { ?>
		      <script src="js/three.min.js"></script>
		      <script src="http://mrdoob.github.com/three.js/examples/fonts/helvetiker_regular.typeface.js"></script>
		      <script src="js/FirstPersonControls.js"></script>
		      <script src="js/viewportSize-min.js"></script>
		<?php } else if ($_SESSION["theme"] === "cream") { ?>
		      <script src="js/sprites/Fleur.js"></script>
		      <script src="js/sprites/Lettre.js"></script>
		      <script src="js/sprites/Pseudo.js"></script>
		<?php } ?>
		<link rel="stylesheet" href="css/<?= $_SESSION["theme"] ?>.css">
		<script src="js/<?= $_SESSION["theme"] ?>.js"></script>
         <script>var usr = "<?= $_SESSION['usr'] ?>"</script>
	</head>
	<body>
		<?php if ($_SESSION["theme"] !== "three") {?>
			<div id="divconv">
				<ul id="convo">
				</ul>
			</div>
		<?php } else {?>
			<img src="img/board.png">
		<?php } ?>
		<?php if (isset($action->error)) {
				echo $action->error;
			  }?>
		<input type="text" id="inputtext" <?php if($_SESSION["theme"] == "retro") echo "readonly"; else echo "autofocus"; ?>/>
	</body>
</html>
