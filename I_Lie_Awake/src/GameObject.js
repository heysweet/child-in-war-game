var collision = require("sald:collide.js");

var GameObject = function(x_, y_, width_, height_){

	var width = width_;
	var height = height_;

	var halfWidth  = width  / 2;
	var halfHeight = height / 2;

	this.getWidth = function() {
		return width;
	}

	this.getHeight = function() {
		return height;
	}

	this.setWidth = function(num){
		width = num;
		halfWidth = width / 2;
	}

	this.setHeight = function(num){
		height = num;
		halfHeight = height / 2;
	}

	this.halfWidth = function() {
		return halfWidth;
	}

	this.halfHeight = function() {
		return halfHeight;
	}

	this.getTopLeft = function(){
		var x_ = this.transform.x - halfWidth;
		var y_ = this.transform.y - halfHeight;

		return {
			x : x_,
			y : y_
		}
	}

	this.getBottomCenter = function(){
		var x_ = this.transform.x + halfWidth;
		var y_ = this.transform.y + halfHeight;

		return {
			x : x_,
			y : y_
		}
	}

	this.transform = {
		x : x_,
		y : y_
	};

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
}

GameObject.prototype.collisionBox = function() {
	var transform = this.getTopLeft();
	var x = transform.x;
	var y = transform.y;

	var bb = this.relativeBoundingBox;
	var min_ = {x : x + bb.min.x,
				y : y + bb.min.y};
	var max_ = {	
		x : x + bb.max.x,
		y : y + bb.max.y 
	}

	return {
		min : min_,
		max : max_
	};
};

GameObject.prototype.updateTransform = function(pos){
	this.transform.x = pos.x;
	this.transform.y = pos.y;
}

GameObject.prototype.isColliding = function(obj2){
	var rect2 = obj2.collisionBox();

	return collision.rectangleRectangle(this.collisionBox(), rect2);
};

module.exports = GameObject;