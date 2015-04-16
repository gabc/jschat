$(init);

var offsetncube;
var listeMess;
var maxmess;

var scene;
var camera;
var renderer;

var clock;
var geometry;
var material;
var plane;
var controls;

function render () {
	var delta = clock.getDelta();
	controls.update(delta);
	renderer.render(scene, camera);
};

function initvar () {
	offsetncube = 0;
	listeMess = [];
	maxmess = 5;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 80, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();

	geometry = new THREE.PlaneGeometry( 5, 20, 32 );
	material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	plane = new THREE.Mesh( geometry, material );
	controls = new THREE.FirstPersonControls(camera);

	camera.position.y = 3;
	controls.movementSpeed = 10;
	controls.lookSpeed = 0.075;
	controls.noFly = false;
	controls.lookVertical = true;

	clock = new THREE.Clock();
	$(document).keyup(keyboardmanager);
}

function init () {
	initvar();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	plane.rotation.x = Math.PI /2;
	scene.add( plane );
	setInterval(render, 60);
	render();
}

function showoption () {
	console.log("showoption");
}

function textinsert () {
	envoieMessage(prompt());
}

function fire () {
	console.log("Pew pew");
}

function keyboardmanager (event) {
	var key = event.key;
	switch (key) {
	case 'o':
		showoption();
		break;
	case 't':
		textinsert();
		break;
	case ' ':	// Space..?
		fire();
		break;

	}
}

function newtext (txt) {
	var geometry = new THREE.TextGeometry(txt, { face: "helvetiker", size: 1.0, height: 0.1} );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	var i = camera.position.z;
	cube.position.x = 0;
	cube.position.y = 1.5;
	cube.position.z = -offsetncube;
	offsetncube += 20;
	listeMess.push(cube);

	if (listeMess.length > maxmess) {
		var n = listeMess.length - maxmess;
		for (var i = 0; i < n; i++) {
			scene.remove(listeMess[0]);
			listeMess.splice(0,1);
		}
	}
	
	scene.add( cube );
}

var envoitHook = function (data) {
	newtext("gabc: " + data);
};

var recoitHook = function (data) {
	data = JSON.parse(data);
	var usr = "";
	var mess = "";
	for(var i = 0; i < data.length; i++) {
		usr = data[i]["nomUsager"] || "Inconnu";
		mess = data[i]["message"] || "Message";
		newtext(usr + ': ' + mess);
	}
};
