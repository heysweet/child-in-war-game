var camera = require("camera.js");
var Zone = require("Zone.js");

var Teleporter = function(targetRoom, fromBox, targetCoords){
	var room = targetRoom;
	var coords = targetCoords;
	var isEnabled = true;

	var this_ = this;

	var zone = new Zone(fromBox.x, fromBox.y, fromBox.width, fromBox.height);

	this.setTargetRoom = function(room_){
		room = room_;
	}

	this.getTargetRoom = function(){
		return room;
	}

	this.setTargetCoords = function(coords_){
		coords = coords_;
	}

	this.getTargetCoords = function(){
		return coords;
	}

	this.teleport = function(){
		if (this_.isEnabled()){
			Teleporter.teleportTo(room, coords);
		}
	}

	var onTrigger_ = function(){
		var shouldTP = this_.isEnabled();
		if (this_.onTrigger){
			this_.onTrigger();
		}

		var updatedValue = this_.isEnabled();
		isEnabled = shouldTP;

		this_.teleport();
		isEnabled = updatedValue;
	};

	zone.onTrigger = onTrigger_;

	this.getZone = function(){
		return zone;
	}

	this.isEnabled = function(){
		return isEnabled;
	}

	this.setIsEnabled = function(bool){
		isEnabled = bool;
	}

	this.performTeleport = function(){
		zone.trigger();
	}
}

Teleporter.teleportTo = function(room, coords){
	var mainCharacter = window.gamestate.mainCharacter;

	mainCharacter.path = undefined;

	window.gamestate.setCurrentRoom(room);

	if (room.staticCamera !== undefined){
		camera.updateTransform(room.staticCamera);
	} else {
		// Make the camera move to the correct position
		var position = window.gamestate.mainCharacter.transform;

		camera.focusCamera(position);
	}

	mainCharacter.transform.x = coords.x;
	mainCharacter.transform.y = coords.y;

	mainCharacter.moveVector = null;
};

module.exports = Teleporter;