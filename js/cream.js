var chatInterval;
var nameInterval;

$(init);
var canevas;
var letterCount = 0;

function init () {
	chatInterval = setInterval(randomLi, 2000);
	// nameInterval = setInterval(randomName, 1000);
	setInterval(fuckALetter, 500);
	canevas = $("<canvas/>, {'id': 'canevas'}").width(window.innerWidth).height(window.innerHeight);
    	$("body").append(canevas);
	canevas.css("z-index", -1);
	canevas.css("position", "absolute");
	canevas.css("top", 0);
	canevas.css("left", 0);
}

function randomLi () {
	var li = rand(1, $("#convo li").length);
	li = $("#convo li:nth-child(" + li + ")");
	return li;
}

function getBlur (thing) {
	return thing.css("filter").match(/\d+/);
}

function blur (thing, amount) {
	thing.css({'-webkit-filter' : 'blur('+amount+'px)',
		  'filter' : 'blur('+amount+'px)'})
}

function saturate (thing, amount) {
	thing.css({'-webkit-filter' : 'saturate('+amount+'px)',
		   'filter' : 'saturate('+amount+'px)'});
}

recoitHook = function (data) {
	var usr = "";
	var mess = "";
	var newAns = "";
	for(var i = 0; i < data.length; i++) {
		usr = data[i]["nomUsager"] || "Inconnu";
		mess = data[i]["message"] || "Message";
		var foo = createSaneLi(usr, mess);
		for(var a=0,l=foo.innerHTML.length;a<l;a++){
			newAns+='<span id="c'+ letterCount++ + '" >'+foo.innerHTML.charAt(a)+'</span>';
		}
		foo.innerHTML = newAns;
		$("#convo").append(foo);
		// drawRandomShit(mess);
	}
};

envoitHook = function (txt) {
	var foo = createSaneLi(usr, txt);
	var newAns = "<li>";
	for(var a=0,l=foo.innerHTML.length;a<l;a++){
		newAns+='<span id="c'+ letterCount++ + '" >'+foo.innerHTML.charAt(a)+'</span>';
	}
    	newAns += "</li>";
	foo.innerHTML = newAns;
	$("#convo").append(foo);
	
	// drawRandomShit($("#inputtext").val());
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

function fuckALetter() {
	var n = rand(0, letterCount);
	var c = $("#c" + n);
	c.css("color", getRandomColor());
	if(rand(0, 10) % 2){
		if(rand(0, 10) %2)
			blur(c, rand(0, 1));
		else if(rand(0, 10) %2)
			saturate(c, rand(0, 10)*2);
	}
}
