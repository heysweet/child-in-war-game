var gamestate = window.gamestate;
var camera = require("camera.js");
var utils = require("utils.js");

var collisionBoxes = [];

var callDraw = function(obj){
	obj.draw();
}

var Room = function(width, height){
	this.width = width;
	this.height = height;

	var background = null;
	var teleporters = [];

	// Don't draw
	var backgroundObjects = new utils.LinkedList();

	// Draw on top of main character
	var foregroundObjects = new utils.LinkedList();

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

	this.getForegroundObjects = function(){
		return foregroundObjects.asArray();
	}

	this.drawForeground = function(){
		return foregroundObjects.forEach(callDraw);
	}

	this.addForegroundObjects = function(objects){
		foregroundObjects.pushArray(objects);
	}
}

Room.prototype.addCollisionBoxes = function(boxes){
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

Room.prototype.doesCollide = function(gameObj){
	for (var i = 0; i < collisionBoxes.length; i++){
		box = collisionBoxes[i];

		if (gameObj.isColliding(box)){
			return true;
		}
	}

	return false;
}

Room.prototype.draw = function(){
	var background = this.getBackground();

	var ctx = sald.ctx;

	var cameraCorner = camera.topLeftCorner();

	if (background == null){

		ctx.fillStyle = 'rgb(256, 256, 200)';

		ctx.fillRect(-cameraCorner.x, -cameraCorner.y, this.width, this.height);

		// Used for showing moving environment
		ctx.fillStyle = 'rgb(200, 200, 256)';

		ctx.fillRect(200 - cameraCorner.x, 200 - cameraCorner.y, 
					400, 400);
	} else {
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