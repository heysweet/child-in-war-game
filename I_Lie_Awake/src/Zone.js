var Zone = function(x_, y_, width_, height_){
	var isAutoTriggered = true;

	var x = x_;
	var y = y_;
	var width = width_;
	var height = height_;
	var x2;
	var y2;

	var isInZone = false;

	var updateX2 = function(){
		x2 = x + width;
	}

	var updateY2 = function(){
		y2 = y + height;
	}

	updateX2();
	updateY2();

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

	this.inZone = function(bool){
		if (isInZone !== bool){
			if (bool){
				isInZone = true;
				this.onEnterZone();
			} else {
				isInZone = false;
				this.onLeaveZone();
			}
		}
	}

	this.onEnterZone = function(){
		if (this.isAutoTriggered()){
			this.trigger();
		}
	}

	this.onLeaveZone = function(){

	}

	this.collideZone = function(box){
		var x1 = box.min.x;
		var y1 = box.min.y;
		var x2 = box.max.x;
		var y2 = box.max.y;

		var points = [];
		points.push({ x : x1, y : y1});
		points.push({ x : x2, y : y1});
		points.push({ x : x2, y : y2});
		points.push({ x : x1, y : y2});

		for (var i = 0; i < 4; i++){
			var pt = points[i];

			if (this.checkZone(pt.x, pt.y)){
				return true;
			}
		}

		return false;
	}

	this.checkZone = function(x_, y_){
		if (x_ > x && y_ > y
			&& x_ < x2 && y_ < y2){

			this.inZone(true);

			return true;
		}

		this.inZone(false);

		return false;
	};
}

Zone.prototype.trigger = function(){
	if (this.onTrigger !== undefined){
		return this.onTrigger();
	} else {
		return undefined;
	}
}

module.exports = Zone;