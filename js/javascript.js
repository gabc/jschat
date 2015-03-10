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
			for(var i = 0; i < data.length; i++) {
				$("#convo").append("<li>" + data[i]["nomUsager"] + ": " + data[i]["message"] + "</li>");
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