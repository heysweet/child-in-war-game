var Teleporter = function(room, coords){
	var room;
	var coords;

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
		
	}
}

module.exports = Teleporter;