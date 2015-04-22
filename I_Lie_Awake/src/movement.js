var camera = require("camera.js");
var utils = require("utils.js");
var GameObject = require("GameObject.js");

var gamestate = window.gamestate;

var character;
var isPaused = false;

var minX = 0;
var minY = 0;
var maxX = 0;
var maxY = 0;

var updateRoom = function(room){
	var mainCharacter = gamestate.mainCharacter;

	var bb = mainCharacter.collisionRect();
	var transform = mainCharacter.transform;

	var smallX = transform.x - bb.min.x;
	var smallY = transform.y - bb.min.y;

	var bigX = bb.max.x - transform.x;
	var bigY = bb.max.y - transform.y;

	minX = smallX;
	minY = smallY;

	maxX = room.width - bigX;
	maxY = room.height - bigY;
}

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

	setupTransform(136, 100, width, height);
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

var doesCollide = function(collidingObject){
	// Room Collisions
	var currentRoom = gamestate.currentRoom();

	if (currentRoom.doesCollide(collidingObject)){
		return true;
	}

	// Object Collisions
	var objects = window.gamestate.activeGameObjects();

	for (var i = 0; i < objects.length; i++){
		var obj = objects[i];

		if (obj !== collidingObject && obj.isColliding(collidingObject)){
			return true;
		}
	}

	return false;
}

var update = function(elapsed){
	if (isPaused){
		return;
	}

	var currentRoom = gamestate.currentRoom();

	var keys = sald.keys;

	var rightness = 0;
	var downness = 0;
	
	var transform = character.transform;

	// Measure input
	if (keys.LEFT  || keys.A){rightness -= transform.xDelta;}
	if (keys.RIGHT || keys.D){rightness += transform.xDelta;}
	if (keys.UP    || keys.W){downness  -= transform.yDelta;}
	if (keys.DOWN  || keys.S){downness  += transform.yDelta;}

	var mainCharacter = gamestate.mainCharacter;

	// Compute movement if there should be some
	if (rightness !== 0 || downness !== 0) {
		// Unit circle the input, avoiding "fast diagonal movement"
		if (rightness !== 0 && downness !== 0){
			rightness = utils.sign(rightness) * transform.xDiag;
			downness = utils.sign(downness) * transform.yDiag;
		}

		var xDelta = rightness * elapsed;
		var yDelta = downness * elapsed;

		var newX = transform.x + xDelta;
		var newY = transform.y + yDelta;

		newX = Math.max(Math.min(newX, maxX), minX);
		newY = Math.max(Math.min(newY, maxY), minY);

		var isMoving = false;

		if (transform.x != newX){
			var oldX = transform.x;

			transform.x = newX;

			// Collision check
			if (!doesCollide(mainCharacter)){
				mainCharacter.moveVector = { rightness : rightness, downness : downness };
				isMoving = true;
			} else {
				transform.x = oldX;
			}
		}

		if (transform.y != newY){
			var oldY = transform.y;

			transform.y = newY;

			// Collision check
			if (!doesCollide(mainCharacter)){
				mainCharacter.moveVector = { rightness : rightness, downness : downness };
				isMoving = true;
			} else {
				transform.y = oldY;
			}
		}

		if (!isMoving){
			mainCharacter.moveVector = null;
		}

		// Camera updates on movement
		camera.update(elapsed, transform);
	} else {
		mainCharacter.moveVector = null;
	};

	if (mainCharacter.moveVector !== null){
		currentRoom.update();
	}
}

module.exports = {
	update:update,
	initialize:initialize,
	pause:pause,
	updateRoom:updateRoom
};