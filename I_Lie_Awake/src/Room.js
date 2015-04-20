var gamestate = window.gamestate;
var camera = require("camera.js");
var utils = require("utils.js");

var callDraw = function(obj){
	obj.draw();
}

var callLessThanOrEqualDepth = function(depth){
	var func = function(obj){
		if (obj.getDepth() <= depth) return true;

		return false;
	}

	return func;
}

var compareLessThanOrEqualTo = function(obj1, obj2){
	return (obj1.getDepth() <= obj2.getDepth());
}

var compareGreater = function(obj1, obj2){
	return (obj1.getDepth() > obj2.getDepth());
}

var callGreaterThanDepth = function(depth){
	var func = function(obj){
		if (obj.getDepth() > depth) return true;

		return false;
	}

	return func;
}

var Room = function(width, height){
	this.width = width;
	this.height = height;

	var background = null;
	var teleporters = [];
	var objects = [ window.gamestate.mainCharacter ]; // main character is in every room, should be considered in drawing order

	var collisionBoxes = [];

	this.addTeleporter = function(teleporter){
		teleporters.push(teleporter);
	};

	this.update = function(elapsed){
		var bbox = gamestate.mainCharacter.collisionBox();
		var pos = gamestate.mainCharacter.transform;

		for (var i = 0; i < teleporters.length; i++){
			var tp = teleporters[i];
			var zone = tp.getZone();

			zone.collideZone(bbox);
		}
	};

	this.getBackground = function(){
		return background;
	}

	this.setBackground = function(image){
		background = image;
	}

	this.addObject = function(obj){
		objects.push(obj);
	}

	this.addObjects = function(array){
		for (var i = 0; i < array.length; i++){
			this.addObject(array[i]);
		}
	}

	this.getObjects = function(sort){
		if (sort !== undefined){
			objects.sort(sort);
		}

		return objects;
	}

	this.addCollisionBoxes = function(boxes){
		var tempBoxes = [];

		for (var i = 0; i < boxes.length; i++){
			var temp = function(){
				var box = boxes[i];

				this.collisionBox = function(){
					return box;
				}
			}

			tempBoxes.push(new temp());
		}

		collisionBoxes = collisionBoxes.concat(tempBoxes);
	}

	this.doesCollide = function(gameObj){
		for (var i = 0; i < collisionBoxes.length; i++){
			box = collisionBoxes[i];

			if (gameObj.isColliding(box)){
				return true;
			}
		}

		return false;
	}
}

Room.prototype.draw = function(){
	var background = this.getBackground();

	var ctx = sald.ctx;

	var cameraCorner = camera.topLeftCorner();

	if (background !== null){
		ctx.drawImage(background, -cameraCorner.x, -cameraCorner.y);
	}
}

Room.prototype.setStaticCamera = function(x_, y_) {
	var camera = {x : x_, y : y_};

	this.staticCamera = camera;
};

Room.prototype.clearStaticCamera = function(){
	this.staticCamera = undefined;
}

module.exports = Room;