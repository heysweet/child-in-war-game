var utils = require("utils.js");

var ImageObject = function(x_, y_, image_, distance_){
	this.image = image_;
	this.distance = distance_;

	var speed = 0;

	var transform = {
		x : x_,
		y : y_
	}


	this.setOffscreenRight = function(){
		transform.x = utils.screenWidth();
	}

	this.setOffscreenLeft = function(){
		transform.x = -this.image.width;
	}
	
	this.setOffscreen = function(){
		if (speed < 0){
			this.setOffscreenRight();
		} else {
			this.setOffscreenLeft();
		}
	}


	this.isOffscreenLeft = function(){
		return this.transform.x + this.image.width > 0;
	}

	this.isOffscreenRight = function(){
		return this.transform.x < utils.screenWidth();
	}

	this.hasMovedOffscreen = function(){
		if (speed < 0){
			return this.isOffscreenLeft();
		} else {
			return this.isOffscreenRight();
		}
	}


	this.shouldShowNextToRight = function(){
		return (transform.x + this.image.width) < this.distance;
	}

	this.shouldShowNextToLeft = function(){
		return transform.x > this.distance;
	}

	this.shouldShowNext = function(){
		if (speed < 0){
			return this.shouldShowNextToRight();
		} else {
			return this.shouldShowNextToLeft();
		}
	}

	this.update = function(speed_){
		transform.x += speed_;
		speed = speed_;
	}

	this.draw = function(){
		var x = this.transform.x
		var y = this.transform.y;

		var ctx = sald.ctx;

		ctx.drawImage(this.image, x, y);
	}
}

module.exports = ImageObject;