var utils = require("utils.js");

var ImageObject = function(x_, y_, image_, distance_){
	this.image = image_;
	this.distance = distance_;

	var showingNext = false;

	var speed = 0;

	var transform = {
		x : x_,
		y : y_
	}

	this.setOffscreenRight = function(offset){
		transform.x = offset + this.image.width + this.distance;
		showingNext = false;
	}

	this.setOffscreenLeft = function(offset){
		transform.x = offset - this.distance - this.image.width;
		showingNext = false;
	}

	this.setOffscreen = function(offset){
		if (speed > 0){
			this.setOffscreenRight(offset);
		} else {
			this.setOffscreenLeft(offset);
		}
	}


	this.isOffscreenLeft = function(){
		return transform.x + this.image.width < 0;
	}

	this.isOffscreenRight = function(){
		return transform.x > utils.screenWidth();
	}

	this.hasMovedOffscreen = function(){
		if (speed > 0){
			return this.isOffscreenLeft();
		} else {
			return this.isOffscreenRight();
		}
	}


	this.showNextToRightOffset = function(){
		if (showingNext) return null;

		var offset = transform.x - utils.screenWidth();

		if (offset < this.distance){
			showingNext = true;
			return transform.x;
		}

		return null;
	}

	this.showNextToLeftOffset = function(){
		if (showingNext) return null;

		var offset = transform.x;

		if (offset > this.distance){
			showingNext = true;
			return transform.x;
		}

		return null;
	}

	this.showNextOffset = function(){
		if (speed > 0){
			return this.showNextToRightOffset();
		} else {
			return this.showNextToLeftOffset();
		}
	}

	this.update = function(speed_){
		transform.x -= speed_;
		speed = speed_;
	}

	this.draw = function(){
		var x = transform.x
		var y = transform.y;

		var ctx = sald.ctx;

		ctx.drawImage(this.image, x, y);
	}
}

module.exports = ImageObject;