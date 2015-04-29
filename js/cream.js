var chatInterval;
var nameInterval;

$(init);
var canevas;

function init () {
	chatInterval = setInterval(randomLi, 1000);
	// nameInterval = setInterval(randomName, 1000);
	canevas = $("<canvas/>, {'id': 'canevas'}").width(200).height(200);
	$("body").append(canevas);
	// canevas.css("z-index", -1);

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
}

function drawRandomShit (txt) {
	var ctx = $("canvas")[0].getContext("2d");
	var col = getRandomColor();
	ctx.fillStyle = col;
	console.log(col);
	ctx.fillRect(0, 0, 100, 100);
}
