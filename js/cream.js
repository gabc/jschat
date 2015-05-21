var chatInterval;
var nameInterval;

$(init);
var canevas;

function init () {
	chatInterval = setInterval(randomLi, 1000);
	// nameInterval = setInterval(randomName, 1000);
	canevas = $("<canvas/>, {'id': 'canevas'}").width(window.innerWidth).height(window.innerHeight);
    	$("body").append(canevas);
	canevas.css("z-index", -1);
	canevas.css("position", "absolute");
	canevas.css("top", 0);
}

function randomLi () {
	var li = rand(1, $("#convo").length);
	li = $("#convo li:nth-child(" + li + ")");
	li.css("filter", "blur(1px)");
}

recoitHook = function (data) {
	data = JSON.parse(data);
	var usr = "";
	var mess = "";
	for(var i = 0; i < data.length; i++) {
		usr = data[i]["nomUsager"] || "Inconnu";
		mess = data[i]["message"] || "Message";
		$("#convo").append(createSaneLi(usr, mess));
		drawRandomShit(mess);
	}
};

envoitHook = function (txt) {
	$("#convo").append(createSaneLi("gabc", txt));
	drawRandomShit($("#inputtext").val());
	$("#inputtext").val("");
};

function drawRandomShit (txt) {
	var ctx = $("canvas")[0].getContext("2d");
	var col;
	var x, y;
	for (var i = 0; i < txt.length/2; i++) {
		x = window.innerWidth;
		y = window.innerHeight;
		col = getRandomColor();
		ctx.fillStyle = col;
		console.log(x, y);
		ctx.fillRect(rand(0, x/4), 0, rand(0, x/2), rand(0, y/2));
	}
}
