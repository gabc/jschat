
// Permet de faire une rotation d'un élément pour un angle donné.
// Exemple : DIV à 45 degré.
//                       Prend le DIV dans son angle original (0) et fait une
//                       rotation de 45 degré.
// Note : Ce script ne fonctionne pas sous IE

function rotateElement(element, angle) {
	var properties = ['transform', 'WebkitTransform', 'MozTransform'];
	var p = null;
	var result = null;

	while (p = properties.shift()) {
		if (typeof element.style[p] != 'undefined') {
			result = p;
		}
	}

	if (result != null) {
		element.style[result] = 'rotate(' + angle + 'deg)';
	}
}

// L'angle 0 correspond au nord (vers le haut)
// Exemple : getElementAngle(posElementX, posElementY, posSourisX, posSourisY)
//                       Ceci retournera l'angle de l'élément par rapport à la position de la souris
function getElementAngle(x1, y1, x2, y2) {
	var adj = x2 - x1;
	var opp = y2 - y1;

	var angle = Math.abs(Math.atan(opp/adj) * 180/Math.PI);

	if (adj > 0 && opp < 0 ) {
		angle = 90 - angle;
	}
	else if (adj >= 0 && opp >= 0) {
		angle += 90;
	}
	else if (adj < 0 && opp >= 0) {
		angle = 180 + (90 - angle);
	}
	else {
		angle += 270;
	}

	return angle;
}

// Retourne la position de la souris X
// Exemple : <div onclick="alert(getMousePositionX(event))">...</div>
function getMousePositionX(e) {
	var IE = document.all?true:false;
	var tempX = 0;

	if (IE) {
		tempX = event.clientX + document.body.scrollLeft;
	}
	else {
		tempX = e.pageX;
	}

	return tempX;
}

// Retourne la position de la souris Y
// Exemple : <div onclick="alert(getMousePositionY(event))">...</div>
function getMousePositionY(e) {
	var IE = document.all?true:false;
	var tempY = 0;

	if (IE) {
		tempY = event.clientY + document.body.scrollLeft;
	}
	else {
		tempY = e.pageY;
	}

	return tempY;
}
