var camera = require("camera.js");
var utils = require("utils.js");
var GameObject = require("GameObject.js");

var character;
var isPaused = false;

var pause = function(bool){
	isPaused = bool;
}

var Vector = function(x, y){
	this.x = x;
	this.y = y;
	this.length = Math.sqrt((x*x) + (y*y));
	this.angle = Math.acos( x / this.length );
}

var getTheta = function(xDelta, yDelta){
	var vec = new Vector(xDelta, yDelta);

	return vec.angle;
}

var initialize = function(gameObj){
	character = gameObj;

	var width  = gameObj.getWidth();
	var height = gameObj.getHeight();

	setupTransform(68, 50, width, height);
}

function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }

// xDelta and yDelta pixels per second
var setupTransform = function(xDelta, yDelta, width, height){
	var transform = character.transform;

	transform.xDelta = xDelta;
	transform.yDelta = yDelta;

	transform.halfHeight = height / 2;
	transform.halfWidth = width / 2;

	transform.width = width;
	transform.height = height;
	
	var theta = getTheta(xDelta, yDelta);

	transform.xDiag = Math.cos(theta) * transform.xDelta;
	transform.yDiag = Math.sin(theta) * transform.yDelta;
}

var update = function(elapsed){
	if (isPaused){
		return;
	}

	var keys = sald.keys;

	var rightness = 0;
	var downness = 0;
	
	var transform = character.transform;

	// Measure input
	if (keys.LEFT  || keys.A){rightness -= transform.xDelta;}
	if (keys.RIGHT || keys.D){rightness += transform.xDelta;}
	if (keys.UP    || keys.W){downness  -= transform.yDelta;}
	if (keys.DOWN  || keys.S){downness  += transform.yDelta;}

	// Compute movement if there should be some
	if (rightness !== 0 || downness !== 0) {
		// Unit circle the input, avoiding "fast diagonal movement"
		if (rightness !== 0 && downness !== 0){
			rightness = utils.sign(rightness) * transform.xDiag;
			downness = utils.sign(downness) * transform.yDiag;
		}

		var xDelta = rightness * elapsed;
		var yDelta = downness * elapsed;

		// Collision check
		transform.x += xDelta;
		transform.y += yDelta;

		// Camera updates on movement
		camera.update(elapsed, transform);
	};
}

module.exports = {
	update:update,
	initialize:initialize,
	pause:pause
};