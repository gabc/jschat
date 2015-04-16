$(init);

var offsetncube = 0;
var listeMess = [];
var maxmess = 5;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
var controls = new THREE.FirstPersonControls(camera, renderer.domElement);

var render = function () {
	controls.update();
	console.log("ouais");
	renderer.render(scene, camera);
	requestAnimationFrame( render );
};

function init () {
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	plane.rotation.x = Math.PI /2;
	scene.add( plane );
	controls.mouvementSpeed = 70;
	controls.lookSpeed = 0.5;
	controls.noFly = true;
	controls.lookVertical = false;
	camera.position.z = 5;
	camera.position.y = 2;
	render();
}

// $(document).bind('keydown', function(e) {
// 	if (e.key == 'a') {
// 		var y = camera.rotation.y;
// 		camera.position.z += Math.sin(y);
// 		camera.position.x -= Math.cos(y);
// 	}
// 	if (e.key == 'd') {
// 		var y = camera.rotation.y;
// 		camera.position.z -= Math.sin(y);
// 		camera.position.x += Math.cos(y);
// 	}
	
// 	if (e.key == 's') {
// 		var y = camera.rotation.y;
// 		camera.position.z += Math.cos(y);
// 		camera.position.x += Math.sin(y);
// 	}
// 	if (e.key == 'w') {
// 		var y = camera.rotation.y;
// 		camera.position.z -= Math.cos(y);
// 		camera.position.x -= Math.sin(y);
// 	}
	
	
// 	if (e.key == '4') {
// 		camera.rotation.y += 0.1;
// 	}
// 	if (e.key == '6') {
// 		camera.rotation.y -= 0.1;
// 	}
	
// 	if (e.key == '8') {
// 		camera.rotation.x += 0.1; 
// 	}
// 	if (e.key == '2') {
// 		camera.rotation.x -= 0.1;
// 	}

// 	if (e.key == 'f') {
// 		newtext("Texte!");
// 	}
// })
;    

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
