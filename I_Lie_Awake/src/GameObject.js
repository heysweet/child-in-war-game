var collision = require("sald:collision.js");

var GameObject = function(x_, y_, width, height){
	
	this.transform = {
		x : x_,
		y : y_
	};

	this.width = width;
	
	this.height = height;

	this.collisionBox = function() {
		return
		{
			min : {	x : this.x,
					y : this.y },
			max : {	x : this.x + this.width
					y : this.y + this.height }
		};
	};

	this.isColliding = function(rect2){
		return collision.rectangleRectangle(this.collisionBox(), rect2);
	};
}

module.exports = {
	Room:Room,
};