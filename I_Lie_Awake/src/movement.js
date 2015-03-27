var camera = require("camera.js");
var utils = require("utils.js");

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

var transform = {
	x : sald.size.x/2,
	y : sald.size.y/2,
};

function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }

// xDelta and yDelta pixels per second
var setupTransform = function(xDelta, yDelta, width, height){
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

setupTransform(68, 50, 30, 40);

var update = function(elapsed){
	var keys = sald.keys;

	var rightness = 0;
	var downness = 0;

	// Measure input
	if (keys.LEFT  || keys.A){rightness -= transform.xDelta;}
	if (keys.RIGHT || keys.D){rightness += transform.xDelta;}
	if (keys.UP	   || keys.W){downness  -= transform.yDelta;}
	if (keys.DOWN  || keys.S){downness  += transform.yDelta;}

	// Unit circle the input, avoiding "fast diagonal movement"
	if (rightness !== 0 && downness !== 0){
		rightness = utils.sign(rightness) * transform.xDiag;
		downness = utils.sign(downness) * transform.yDiag;
	}

	var newX = rightness * elapsed;
	var newY = downness * elapsed;

	// Collision check
	transform.x += newX;
	transform.y += newY;
}

module.exports = {
	transform:transform,
	update:update
};