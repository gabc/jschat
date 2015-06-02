
$(init);
var canevas;
var quitButton;
var caesar = 0;

var letterCount = 0;
var mousePosX= 0;
var mousePosY = 0;

var fleurs = [];
var lettres = [];
var users = [];

// Normallement j'aimerais en avoir plus, mais 30mo c'est pas gros.
var mus = ["pwn-monkey.mp3"];

function init () {
	//setInterval(randomLi, 2000);
	setInterval(fuckALetter, 500);

	$("#divconv").css("width", window.innerWidth - 15);
	$("#divconv").css("height", window.innerHeight - 50);
	
	// On ajoute le canvas.
	canevas = $("<canvas/>, {'id': 'canevas'}").width(window.innerWidth).height(window.innerHeight);
	$("body").append(canevas);
	canevas.css("z-index", -1);
	canevas.css("position", "absolute");
	canevas.css("top", 0);
	canevas.css("left", 0);
	canevas.mousemove(follow);

	$("body").mousemove(follow);
	// On ajoute le 'bouton' de quit
	quitButton = $("<button/>, {'id': 'button'}").width(75).height(20);
	quitButton.css("position", "absolute");
	quitButton.text("Quitter");
	quitButton.css("top", 0);
	quitButton.css("left", 0);
	$("body").append(quitButton);

	quitButton.on({
        mouseover:function(){
            $(this).css({
                left: rand(0, window.innerWidth)+"px",
                top: rand(0, window.innerHeight)+"px",
            });
        }
	});

	// On ajoute le bouton pour toggler ROT13
	caesarbtn = $("<button/>, {'id': 'caesar'}").width(150).height(20);
	caesarbtn.css("color", "green");
	caesarbtn.text("Tu quoque mi fili?");
	caesarbtn.click(function () {
		caesar = !caesar;
		if(caesar){
			caesarbtn.css("color", "red");
			caesarbtn.text("Καὶ σὺ τέκνον?"); // La version originale en Grec.
		}else{ 
			caesarbtn.css("color", "green");
			caesarbtn.text("Tu quoque filii?"); // Le Latin ça se lit mieux que le Grec.
		}
	});
	$("#indiv").append(caesarbtn);

	// On ajoute les audios
	$("<audio src='mus/" + mus[rand(0, mus.length)] + "' controls id='mus'>").insertAfter($("body"));
	$("<audio src='mus/toastie.mp3' controls id='sound'>").insertAfter($("body"));

	// Je veux que ça commence et que ça finisse jamais.
	document.getElementById("mus").play();
	document.getElementById("mus").onended = function () {
		document.getElementById("mus").play();
	};
	quitButton.click(quitte);
	tick();
}

function follow(event) {
	mousePosX = getMousePositionX(event);
	mousePosY = getMousePositionY(event);
	// Avec ça la vitesse des pseudos augmentent quand l'utilisateur bouge la souris
	for (i = 0; i < users.length; i++) {
		users[i].distance += 0.1;
	}	
}

function tick () {
	// On refresh tout les trucs.
	for (i = 0; i < lettres.length; i++) {
		if (!lettres[i].tick()){
			lettres.splice(i, 1);
			i--;
		}
	}
	for (i = 0; i < fleurs.length; i++) {
		if (!fleurs[i].tick()){
			fleurs.splice(i, 1);
			i--;
		}
	}
	for (i = 0; i < users.length; i++) {
		if (!users[i].tick()){
			users.splice(i, 1);
			i--;
		}
	}
	window.requestAnimationFrame(tick);
}

recoitPseudo = function () {
	listeUser(function (data) {
				var res = "";
				data = JSON.parse(data);
				for(var i = 0; i < data.length; i++) {
					ajoutePseudo(data[i]);
				}
	});
	clearInterval(nameInterval);
	chatInterval = setInterval(recoitMessage, timeNameInterval);
}

function ajoutePseudo (txt) {
	for(var i = 0; i < users.length; i++){
		if(users[i].pseudo === txt) {
			return;
		}
	}
	users.push(new Pseudo(txt));
}

function randomLi () {
	var li = rand(1, $("#convo li").length);
	li = $("#convo li:nth-child(" + li + ")");
	return li;
}

function getBlur (thing) {
	return thing.css("filter").match(/\d+/);
}

// Parce que Chrome et Firefox sont pas pareils.
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
		
		if(caesar)
			mess = caesarShift(mess, rand(0, 26));

		var foo = createSaneLi(usr, mess);
		
		// C'est moche mais j'ai pas vraiment trouvé mieux
		for(var a = 0, l = foo.innerHTML.length; a < l; a++){
			newAns+='<span id="c'+ letterCount++ + '" >'+foo.innerHTML.charAt(a)+'</span>';
			lettres.push(new Lettre(foo.innerHTML.charAt(a)));
		}
		foo.innerHTML = newAns;
		$("#convo").append(foo);
		drawRandomShit(mess);
	}
	if(data.length > 0)
		document.getElementById("sound").play();
};

envoitHook = function (txt) {
	if(caesar){
		txt = caesarShift(txt, rand(0, 26));
	}

	var foo = createSaneLi(usr, txt);
	var newAns = "<li>";
	
	for(var a=0,l=foo.innerHTML.length;a<l;a++){
		newAns+='<span id="c'+ letterCount++ + '" >'+foo.innerHTML.charAt(a)+'</span>';
		lettres.push(new Lettre(foo.innerHTML.charAt(a)));
	}
    	newAns += "</li>";
	foo.innerHTML = newAns;
	$("#convo").append(foo);
	
	drawRandomShit($("#inputtext").val());
	$("#inputtext").val("");
	addFleur();
};

function addFleur () {
	fleurs.push(new Fleur());
}

function drawRandomShit (txt) {
	var ctx = $("canvas")[0].getContext("2d");
	var col;
	var x, y;
	x = window.innerWidth;
	y = window.innerHeight;

	ctx.beginPath();
	ctx.strokeStyle = getRandomColor();
	ctx.lineWidth = "" + rand(1, 3);
	ctx.moveTo(rand(0, x), rand(0, y));
	
	for (var i = 0; i < txt.length; i++) {
		j = rand(0, x);
		if(j> x)
			console.log("j > x")
		k = rand(0,y);
		if(k> y)
			console.log("k > y")

		ctx.lineTo(j, k);
	}
	
	ctx.stroke();
}

function fuckALetter() {
	var n = rand(0, letterCount);
	var c = $("#c" + n);
	c.css("color", getRandomColor());
	if(rand(0, 10) % 2){
		if(rand(0, 10) % 2) {
			blur(c, rand(0, 10));
		}
		else if(rand(0, 10) % 2){
			saturate(c, rand(0, 10)*2);
		}
	}
}
