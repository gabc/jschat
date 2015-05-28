$(function () {
	tick();
});
var i = 100;

function tick () {
	i += 0.1;
	if(i > 16777215)
		i = 100;
	$("body").css("background-color", "#" + Math.floor(i));
	window.requestAnimationFrame(tick);
}
