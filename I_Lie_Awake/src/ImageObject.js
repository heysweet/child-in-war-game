var utils = require("utils.js");

var ImageObject = function(x_, y_, image_, distance_){
	this.image = image_;
	this.distance = distance_;

	var showingNext = false;

	var isHidden = false;
	var speed = 0;

	this.transform = {
		x : x_,
		y : y_
	}

	this.setOffscreenRight = function(offset){
		this.transform.x = offset + this.image.width + this.distance;
		showingNext = false;
	}

	this.setOffscreenLeft = function(offset){
		this.transform.x = offset - this.distance - this.image.width;
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
		return this.transform.x + this.image.width < 0;
	}

	this.isOffscreenRight = function(){
		return this.transform.x > utils.screenWidth();
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

		var offset = this.transform.x - utils.screenWidth();

		if (offset < this.distance){
			showingNext = true;
			return this.transform.x;
		}

		return null;
	}

	this.showNextToLeftOffset = function(){
		if (showingNext) return null;

		var offset = this.transform.x;

		if (offset > this.distance){
			showingNext = true;
			return this.transform.x;
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
		this.transform.x -= speed_;
		speed = speed_;
	}

	this.draw = function(){
		if (!isHidden){
			var x = this.transform.x
			var y = this.transform.y;

			var ctx = sald.ctx;

			ctx.drawImage(this.image, x, y);
		}
	}

	this.setHidden = function(bool){
		isHidden = bool;
	}
}

module.exports = ImageObject;