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
			console.log(data);
			data = JSON.parse(data);
			var usr = "";
			var mess = "";
			for(var i = 0; i < data.length; i++) {
				usr = data[i]["nomUsager"] || "Inconnu";
				mess = data[i]["message"] || "Message";
				$("#convo").append("<li>" + usr + ": " + mess + "</li>");
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
	$("#convo").append("<li>" + "gabc" + ": " + $("#inputtext").val() + "</li>");
	$("#inputtext").val("");
}