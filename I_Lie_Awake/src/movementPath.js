// For animating the object to walk along a path

function MovementPath(path_, onFinish){
	var object = null;
	var path;
	var index = 0;
	var this_ = this;
	this.onFinish = onFinish;

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

	this.reversePath = function(){
		if (path === undefined) return new MovementPath(undefined, this_.onFinish);

		var reversedPath = [];

		for (var i = path.length - 1; i >= 0; i--){
			reversedPath.push(path[i]);
		}

		return new MovementPath(reversedPath, this_.onFinish);
	}

	this.setPath(path_);

	this.start = function(){
		index = 0;
		object.followPath(this_, this_.onFinish);
	}

	this.size = function(){
		return path.length;
	}

	this.target = function(){
		if (path && index < path.length){
			return path[index];
		} else {
			return null;
		}
	}

	this.reachedNode = function(){
		index++;
	}

	this.clear = function(){
		path = [];
		index = 0;
		
		if (this.onFinish){
			this.onFinish();
		}
	}
}

var AbsoluteMovementPath = function (path, onFinish) {
	MovementPath.call(this, path, onFinish);

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
	MovementPath.call(this, null, onFinish);

	var start_ = this.start;

	var getPath_ = this.getPath;

	this.getPath = function(){
		var path = getPath_();

		if (path === null || path === undefined){
			return deltasPath;
		} else {
			return path;
		}
	}

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

	this.reversePath = function(){
		var path = this.getPath();

		if (path === undefined || path === null || path.length === 0) return new RelativeMovementPath(undefined, this.onFinish);

		var reversedPath = [];

		if (path.length > 1){
			var start = path[path.length - 1];

			var loopLength = path.length - 1;

			for (var i = loopLength; i >= 0; i--){
				var coord = path[i];

				var temp;
				if (i < loopLength){
					temp = {
						x : coord.x - start.x,
						y : coord.y - start.y
					};
				} else{
					temp = {
						x : -start.x,
						y : -start.y
					}
				}

				reversedPath.unshift(temp);
			}
		} else { // path is length 1
			var temp = [{
				x : -path[0].x,
				y : -path[0].y
			}];

			return new RelativeMovementPath(temp, this.onFinish);
		}

		console.log("PATH< reversedPath", path, reversedPath);

		return new RelativeMovementPath(reversedPath, this.onFinish);
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