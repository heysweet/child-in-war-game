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
	var bb = this.relativeBoundingBox;
	var min_ = {x : this.x + bb.min.x,
				y : this.y + bb.min.y};
	var max_ = {	
		x : min_.x + bb.max.x,
		y : min_.y + bb.max.y 
	}
	return {
		min : min_,
		max : max_
	};
};

GameObject.prototype.isColliding = function(obj2){
	var rect2 = obj2.collisionBox();

	return collision.rectangleRectangle(this.collisionBox(), rect2);
};

module.exports = {
	GameObject:GameObject,
};