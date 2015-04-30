// For animating the object to walk along a path

function MovementPath(start, path_, onFinish){
	var object = null;
	var path;

	this.setMovingObject = function(obj){
		object = obj;
	}

	this.getMovingObject = function(){
		return object;
	}

	this.setPath = function(path_){
		path = path_;
	}

	this.getPath = function(){
		return path;
	}

	this.setPath(path_);

	this.start = function(){
		object.followPath(path, onFinish);
	}
}

var AbsoluteMovementPath = function (start, path, onFinish) {
	MovementPath.call(this, start, path, onFinish);

	var start_ = this.start;

	this.start = function(){
		var object = this.getMovingObject();

		object.transform.x = start.x;
		object.transform.y = start.y;

		start_();
	}
}

// Prototypical Inheritance
AbsoluteMovementPath.prototype = Object.create(MovementPath.prototype);

AbsoluteMovementPath.prototype.constructor = AbsoluteMovementPath;




var RelativeMovementPath = function(deltasPath, onFinish) {
	MovementPath.call(this, start, path, onFinish);

	var start_ = this.start;

	this.start = function(){
		var absolutePath = [];

		var object = this.getMovingObject();

		var startCoord = object.transform;

		for (var i = 0; i < deltasPath.length; i++){
			var delta = deltasPath[i];

			var coord = {
				x : delta.x + startCoord.x,
				y : delta.y + startCoord.y
			};

			absolutePath.push(coord);
		}

		this.setPath(absolutePath);

		start_();
	}
}

var WrapperPath = function(target){
	this.size = function(){
		return 1;
	}

	this.target = function(){
		return target;
	}

	this.reachedNode = function(){
		target = undefined;
	}
}

// Prototypical Inheritance
RelativeMovementPath.prototype = Object.create(MovementPath.prototype);

RelativeMovementPath.prototype.constructor = RelativeMovementPath;

module.exports = {
	AbsoluteMovementPath : AbsoluteMovementPath,
	RelativeMovementPath : RelativeMovementPath,
	WrapperPath : WrapperPath
}