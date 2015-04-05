var chatInterval;
var nameInterval;

$(init)

function init () {
	chatInterval = setInterval(randomLi, 1000);
	nameInterval = setInterval(randomName, 1000);
}

function randomLi () {
	var li = rand(1, $("#convo").length);
	li = $("#convo li:nth-child(" + li + ")");
	li.css("filter", "blur(1px)");
}
