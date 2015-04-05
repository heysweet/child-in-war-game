var Zone = function(x, y, width, height){
	var isAutoTriggered = true;

	var x = x;
	var y = y;
	var width = width;
	var height = height;
	var x2;
	var y2;

	var updateX2 = function(){
		x2 = x + width;
	}

	var updateY2 = function(){
		y2 = y + height;
	}

	var setX = function(x_){
		x = x_;
		updateX2();
	}

	var setY = function(y_){
		y = y_;
		updateY2();
	}

	var setWidth = function(width_){
		width = width_;
		updateX2();
	}

	var setHeight = function(height_){
		height = height_;
		updateY2();
	}

	this.setIsAutoTriggered = function(bool){
		isAutoTriggered = bool;
	}

	this.isAutoTriggered = function(){
		return isAutoTriggered;
	}

	this.trigger = function(){
		if (this.onTrigger !== undefined){
			return this.onTrigger();
		} else {
			return undefined;
		}
	}

	this.checkZone = function(x, y){
		if (x >= this.x && y >= this.y
			&& x <= this.x2 && y <= this.y2){
			if (isAutoTriggered){
				this.trigger();
			}

			return true;
		}

		return false;
	}
}

module.exports = Zone;