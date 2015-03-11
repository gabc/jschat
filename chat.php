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

		<ul id="convo">
		</ul>

		<input type="text" autofocus id="inputtext" />
		<button id="btngo">go.</button>
	</body>
</html>
