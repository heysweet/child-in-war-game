var camera = require("camera.js");
var utils = require("utils.js");
var GameObject = require("GameObject.js");

var gamestate = window.gamestate;

var character;
var isPaused = false;
var isInputPaused = false;

var minX = 0;
var minY = 0;
var maxX = 0;
var maxY = 0;

var movingObjects = new Set();

var addMovingObject = function(obj){
	movingObjects.add(obj);
}

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

var pauseInput = function(bool){
	isInputPaused = bool;
}

var isPaused_ = function(){
	return isPaused;
}

var isInputPaused_ =  function(){
	return isInputPaused;
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

var movementVector = function(toTargetVector, transform){
	if (toTargetVector.x === toTargetVector.y && toTargetVector.x === 0) return {
		dx : toTargetVector.x,
		dy : toTargetVector.y
	};

	xDelta = toTargetVector.x;
	xDeltaMax = transform.xDelta; 

	var invert = 1;

	if (toTargetVector.y < 0) invert = -1;

	yDelta = toTargetVector.y;
	yDeltaMax = transform.yDelta;

	var theta = getTheta(xDelta, yDelta);

	var result = {};

	result.dx = Math.cos(theta) * xDeltaMax;
	result.dy = Math.sin(theta) * yDeltaMax * invert;

	if (Math.abs(result.dx) < 1){result.dx = 0};
	if (Math.abs(result.dy) < 1){result.dy = 0};

	return result;
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

// Thrown together code tbh
// Switched between mouse and keyboard input
var updateMovement = function(elapsed){
	var mainCharacter = gamestate.mainCharacter;

	movingObjects.add(mainCharacter);

	var updatedMovingObjects = [];
	var currentRoom = gamestate.currentRoom();

	// var mainCharacterNum = movingObjects.length - 1;

	var somethingMoved = false;

	movingObjects.forEach(function(object){
		if (object.path){
			var pathSize = object.path.size();
		}

		var hasPath = false;
		var hasKeyPress = false;

		var rightness = 0;
		var downness = 0;
		var transform = object.transform;
		var target;
		var toTargetVector;

		if (object.path && pathSize > 0){
			var finishedPath = false;

			for (var i = 0; i < pathSize; i++){
				finishedPath = false;
				
				target = object.path.target();

				if (target === undefined || target === null){
					finishedPath = true;
					break;
				}

				toTargetVector = {
					x : target.x - transform.x,
					y : target.y - transform.y
				};

				if (Math.abs(toTargetVector.x) < 1) toTargetVector.x = 0;
				if (Math.abs(toTargetVector.y) < 1) toTargetVector.y = 0;

				// Reached current target
				if (Math.abs(toTargetVector.x) === 0 && Math.abs(toTargetVector.y) === 0){
					object.path.reachedNode();
					
					// Only remains true if i == pathSize - 1
					finishedPath = true;
				} else {
					break;
				}
			}

			if (finishedPath){
				object.finishPath();
				object.moveVector = null;
				object.path = undefined;
			} else {
				hasPath = true;
			}
		} else {
			if (object == mainCharacter && !isPaused && !isInputPaused && window.gamestate.currentRoom() !== utils.rooms.street){
				if (!window.gamestate.noKeyboardInput){
					if (sald.keys.W || sald.keys.UP){
						downness -= transform.yDelta;
					}
					if (sald.keys.S || sald.keys.DOWN){
						downness += transform.yDelta;
					}
					if (sald.keys.A || sald.keys.LEFT){
						rightness -= transform.xDelta;
					}
					if (sald.keys.D || sald.keys.RIGHT){
						rightness += transform.xDelta;
					}
				}

				toTargetVector = {
					x : rightness,
					y : downness
				}

				if (rightness != 0 || downness != 0){
					hasKeyPress = true;
				} else {
					object.moveVector = null;
				}
			}
		}

		if (hasPath || hasKeyPress){
			updatedMovingObjects.push(object);

			var dVector = movementVector(toTargetVector, transform);
			rightness = dVector.dx;
			downness = dVector.dy;

			// Compute movement if there should be some
			if (rightness !== 0 || downness !== 0) {
				// Unit circle the input, avoiding "fast diagonal movement"

				var xDelta = rightness * elapsed;
				var yDelta = downness * elapsed;

				var newX = transform.x + xDelta;
				var newY = transform.y + yDelta;

				newX = Math.max(Math.min(newX, maxX), minX);
				newY = Math.max(Math.min(newY, maxY), minY);

				var isMoving = false;

				var oldX = transform.x;
				var oldY = transform.y;

				var isMovingX = true;
				var isMovingY = true;

				if (transform.x != newX){
					transform.x = newX;

					// Collision check
					if (!doesCollide(object)){
						object.moveVector = { rightness : rightness, downness : downness };
						isMoving = true;
					} else {
						isMovingX = false;
						transform.x = oldX;
					}
				}

				if (transform.y != newY){
					transform.y = newY;

					// Collision check
					if (!doesCollide(object)){
						object.moveVector = { rightness : rightness, downness : downness };
						isMoving = true;
					} else {
						isMovingY = false;
						transform.y = oldY;
					}
				}

				var absDx = Math.abs(rightness);
				var absDy = Math.abs(downness);

				if (!isMovingX && isMovingY){
					if (absDy < 60){
						if (absDx - absDy < 60){
							newY = oldY + (utils.sign(dVector.dy) * 20 * elapsed);
							newY = Math.max(Math.min(newY, maxY), minY);
							transform.y = newY;
						} else {
							isMoving = false;
							transform.y = oldY;
						}
					}
				}

				if (!isMovingY && isMovingX){
					if (absDx < 100){
						if (absDy - absDx < 60){
							newX = oldX + (utils.sign(dVector.dx) * 40 * elapsed);
							newX = Math.max(Math.min(newX, maxX), minX);
							transform.x = newX;
						} else {
							isMoving = false;
							transform.x = oldX;
						}
					}
				}

				if (!isMoving){
					object.moveVector = null;
				}

				// if (mainCharacterNum === i){
				// 	// Camera updates on movement
				// 	camera.update(elapsed, transform);
				// }
			} else {
				object.moveVector = null;
			};

			if (object.moveVector !== null){
				somethingMoved = true;
			}
		}
	});

	if (somethingMoved){
		currentRoom.update();
	}

	movingObjects = new Set(updatedMovingObjects);
}

var update = function(elapsed){
	if (isPaused){
		return;
	}

	updateMovement(elapsed);
}

module.exports = {
	update:update,
	initialize:initialize,
	pause:pause,
	pauseInput:pauseInput,
	updateRoom:updateRoom,
	addMovingObject:addMovingObject,
	isPaused:isPaused_,
	isInputPaused:isInputPaused_
};