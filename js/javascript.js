$(function () {
	setInterval(tick, 7000);
	$("#btngo").click(envoieMessage);
});

function tick () {
	ajaxe();
}

function ajaxe () {
	return $.ajax({
				url: "action/AjaxAction.php",
				type: "POST"
			}).done( function(data) {
				console.log(data);
				data = JSON.parse(data);
				//console.log(JSON.parse(data));
				for(var i = 0; i < data.length; i++) {
					$("#convo").append("<li>" + data[i]["nomUsager"] + ": " + data[i]["message"] + "</li>");
				}
			});
}

function envoieMessage () {
	console.log($("#inputtext").val());
	$.ajax({
		url: "action/EnvoieMessage.php",
		type: "POST",
		data: {
			message: $("#inputtext").val()
		}
	})
	$("#convo").append("<li>" + "gabc" + ": " + $("#inputtext").val() + "</li>");
	$("#inputtext").val("");
}