function Pseudo (pseudo) {
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;

    this.xspeed = Math.random() * 5;
    this.yspeed = Math.random() * 5;

    this.xvelocity = 0.2;
    this.yvelocity = 0.2;

    this.angle = 10;

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
		this.xspeed += this.xvelocity;
    } else if (mousePosX < this.x) {
		this.xspeed -= this.xvelocity;
    }
    
    if (mousePosY > this.y) {
		this.yspeed += this.yvelocity;
    } else if (mousePosY < this.y){
		this.yspeed -= this.yvelocity;
    }

    this.y += this.yspeed;
    this.x += this.xspeed;
    this.angle += 2;
    rotateElement(this.element, this.angle);

    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";

    if(this.color >= 16777216)
    	this.color = 0;
    this.element.style.color = "#"+ ++this.color;

    return true;
}
