function Pseudo (pseudo) {
	this.x = Math.random() * 100;
	this.y = Math.random() * 100;

	this.xspeed = Math.random() * 5;
	this.yspeed = Math.random() * 5;

	this.xvelocity = 0.2;
	this.yvelocity = 0.2;

	this.angle = 0;	
	this.angleRot = 2;

	this.distance = 0.1;
	
	this.pseudo = pseudo;
	this.color = rand(0, 2048);
	this.element = document.createElement("div");
	this.element.className = "pseudo";

	this.element.textContent = pseudo;
	this.element.style.position = "absolute";
	this.element.style.left = this.x + 'px';
	this.element.style.top = this.y + 'px';

	document.body.appendChild(this.element);
}

Pseudo.prototype.tick = function () {
	if (this.xspeed > 7)
		this.xspeed = 7;
	else if (this.xspeed < -7)
		this.xspeed = -7;

	if (this.yspeed > 7)
		this.yspeed = 7;
	else if (this.yspeed < -7)
		this.yspeed = -7;
	
	if (mousePosX > this.x) {
		this.xspeed += this.xvelocity  //* Math.sin(this.angle);
	} else if (mousePosX < this.x) {
		this.xspeed -= this.xvelocity  //* Math.sin(this.angle);
	}
	
	if (mousePosY > this.y) {
		this.yspeed += this.yvelocity  //* Math.cos(this.angle);
	} else if (mousePosY < this.y){
		this.yspeed -= this.yvelocity  //* Math.cos(this.angle);
	}

	this.y += this.yspeed * this.distance;
	if(this.y > window.innerHeight)
		this.y = window.innerHeight/2;
	if(this.y < 0)
		this.y = window.innerHeight/2;

	this.x += this.xspeed * this.distance;
	if(this.x > window.innerWidth)
		this.x = window.innerWidth/2;
	if(this.x < 0)
		this.x = window.innerWidth/2;

	this.distance -= 0.2;
	if(this.distance < 1)
		this.distance = 1;
	
	this.angle += this.angleRot;
	if(this.angle > Math.PI)
		this.angle = 0;
	
	rotateElement(this.element, this.angle);
	
	this.element.style.left = this.x + "px";
	this.element.style.top = this.y + "px";

	if(this.color >= 16777216)
    		this.color = 0;
	this.element.style.color = "#"+ ++this.color;

	return true;
}
