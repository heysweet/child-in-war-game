var gamestate = window.gamestate;
var camera = require("camera.js");

var Room = function(width, height){
	this.width = width;
	this.height = height;

	var teleporters = [];

	this.addTeleporter = function(teleporter){
		teleporters.push(teleporter);
	};

	this.update = function(elapsed){
		var pos = gamestate.mainCharacter.getBottomCenter();

		for (var i = 0; i < teleporters.length; i++){
			var tp = teleporters[i];
			var zone = tp.getZone();

			if (zone.checkZone(pos.x, pos.y)){
				console.log("BOOM", zone, pos.x, pos.y)
			}
		}
	};
}

Room.prototype.draw = function(){
	var ctx = sald.ctx;

	var cameraCorner = camera.topLeftCorner();

	ctx.fillStyle = 'rgb(256, 256, 200)';

	ctx.fillRect(-cameraCorner.x, -cameraCorner.y, this.width, this.height);

	// Used for showing moving environment
	ctx.fillStyle = 'rgb(200, 200, 256)';

	ctx.fillRect(200 - cameraCorner.x, 200 - cameraCorner.y, 
				400, 400);
}

Room.prototype.setStaticCamera = function(x_, y_) {
	var camera = {x : x_, y : y_};

	this.staticCamera = camera;
};

Room.prototype.clearStaticCamera = function(){
	this.staticCamera = undefined;
}

module.exports = Room;