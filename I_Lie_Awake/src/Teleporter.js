var camera = require("camera.js");
var Zone = require("Zone.js");

var Teleporter = function(targetRoom, fromBox, targetCoords){
	var room = targetRoom;
	var coords = targetCoords;
	var isEnabled = true;

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
		if (isEnabled){
			window.gamestate.setCurrentRoom(room);
			var mainCharacter = window.gamestate.mainCharacter;

			if (room.staticCamera !== undefined){
				camera.updateTransform(room.staticCamera);
			} else {
				// Make the camera move to the correct position
				var position = window.gamestate.mainCharacter.transform;

				camera.focusCamera(position);
			}

			mainCharacter.transform.x = coords.x;
			mainCharacter.transform.y = coords.y;
		}
	}

	zone.onTrigger = this.teleport;

	this.getZone = function(){
		return zone;
	}

	this.isEnabled = function(){
		return isEnabled;
	}

	this.setIsEnabled = function(bool){
		isEnabled = bool;
	}
}

module.exports = Teleporter;