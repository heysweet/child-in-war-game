var collision = require("sald:collide.js");

var GameObject = function(x_, y_, width, height){
	
	this.transform = {
		x : x_,
		y : y_
	};

	this.width = width;
	this.height = height;

	// For collisions
	this.relativeBoundingBox = {
		min : {
			x : 0,
			y : 0
		},
		max : {
			x : width,
			y : height
		}
	}

	this.collisionBox = function() {
		var bb = this.relativeBoundingBox;
		var min_ = {x : this.x + bb.min.x,
					y : this.y + bb.min.y};

		return
		{
			min : min_,
			max : {	x : min_.x + bb.max.x,
					y : min_.y + bb.max.y }
		};
	};

	this.isColliding = function(obj2){
		var rect2 = obj2.collisionBox();

		return collision.rectangleRectangle(this.collisionBox(), rect2);
	};
}

module.exports = {
	GameObject:GameObject,
};