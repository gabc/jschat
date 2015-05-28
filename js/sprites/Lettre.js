function Lettre (txt) {
	this.x = rand(0, window.innerWidth);
	this.y = - rand(0, 1000);

	this.yspeed = 1;

	this.element = document.createElement("div");
	this.element.className = "lettre";

	this.element.textContent = txt;
	this.element.style.position = "absolute";
	this.element.style.left = this.x + 'px';
	this.element.style.top = this.y + 'px';

	document.body.appendChild(this.element);
}

Lettre.prototype.tick = function () {
	this.y += this.yspeed;

	this.element.style.top = this.y + "px";

	this.element.style.color = getRandomColor();

	if (this.y < window.innerHeight - 10)
		return true;
	else {
		this.element.style.display = "none";
		return false;
	}
};
