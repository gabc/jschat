var chatUrl = "/~zag/chat";

var chatInterval;
var nameInterval;

var recoitPseudo = undefined;

$(function () {
	chatInterval = setInterval(recoitMessage, 1200);
	$("#btngo").click(envoieMessage);
	$("#inputtext").keyup(activeInput);
});

function activeInput (char) {
	if (char.keyCode === 13){
		envoieMessage($("#inputtext").val());
	}
}

function recoitMessage () {
	$.ajax({
		url: "ajax.php",
		type: "POST",
		data: {
			action: "get"
		}
	}).done( function(data) {
		data = JSON.parse(data);
		if (data == "NOT_LOGGED_IN") {
			iskick();
			return;
		}
		if (typeof recoitHook !== 'undefined')
			recoitHook(data);
		else {
			var usr = "";
			var mess = "";
			for(var i = 0; i < data.length; i++) {
				usr = data[i]["nomUsager"] || "Inconnu";
				mess = data[i]["message"] || "Message";
				$("#convo").append(createSaneLi(usr, mess));
			}
		}
	});
	if(recoitPseudo) {
		clearInterval(chatInterval);
		nameInterval = setInterval(recoitPseudo, 1200);
	}
}

function envoieMessage (opttxt) {
	$.ajax({
		url: "ajax.php",
		type: "POST",
		data: {
			action: "send",
			message: opttxt ? opttxt : $("#inputtext").val()
		}
	});
	if (typeof envoitHook !== 'undefined')
		envoitHook(opttxt ? opttxt : $("#inputtext").val());
	else {
		$("#convo").append(createSaneLi(usr, opttxt ? opttxt : $("#inputtext").val()));
		$("#inputtext").val("");
	}
}

function iskick () {
	location.replace(chatUrl);
	console.log("Changement!");
}

function createSaneLi (usr, mess) {
	var item = document.createElement("LI");
	item.textContent = usr + ": " + mess;
	return item;
}

function listeUser (handle) {
	$.ajax({
		url: "ajax.php",
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
		url: "ajax.php",
		type: "POST",
		data: {
			action: "quit"
		}
	}).done( function(data) {
		document.location.href = "index.php";
	});
}

function rand (bot, up) {
	return  Math.floor((Math.random() * up) + bot); 
}

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
