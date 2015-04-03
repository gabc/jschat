$(function () {
	setInterval(tick, 7000);
	$("#btngo").click(envoieMessage);
});

function tick () {
	recoitMessage();
}

function recoitMessage () {
	$.ajax({
		url: "action/ajax.php",
		type: "POST",
		data: {
			action: "get"
		}
	}).done( function(data) {
		data = JSON.parse(data);
		var usr = "";
		var mess = "";
		for(var i = 0; i < data.length; i++) {
			usr = data[i]["nomUsager"] || "Inconnu";
			mess = data[i]["message"] || "Message";
			$("#convo").append(createSaneLi(usr, mess));
		}
	});
}

function envoieMessage () {
	$.ajax({
		url: "action/ajax.php",
		type: "POST",
		data: {
			action: "send",
			message: $("#inputtext").val()
		}
	})
	$("#convo").append(createSaneLi("gabc", $("#inputtext").val()));
	$("#inputtext").val("");
}

function createSaneLi (usr, mess) {
	var item = document.createElement("LI");
	item.textContent = usr + ": " + mess;
	return item;
}

function listeUser (handle) {
	$.ajax({
		url: "action/ajax.php",
		type: "POST",
		data: {
			action: "usrs"
		}
	}).done( function(data) {
		handle(data);
	});
}

function quitte () {
	$.ajax({
		url: "action/ajax.php",
		type: "POST",
		data: {
			action: "quit"
		}
	}).done( function(data) {
		document.location.href = "index.php";
	});
}
