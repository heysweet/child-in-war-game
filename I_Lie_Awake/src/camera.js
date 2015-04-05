var utils = require("utils.js")

var camera = {
	x : utils.halfScreenWidth(),
	y : utils.halfScreenHeight()
};

var update = function(elapsed, movementTransform){
	var room = window.gamestate.currentRoom;

	var halfScreenWidth = utils.halfScreenWidth()
	var halfScreenHeight = utils.halfScreenHeight();

	if (movementTransform.x > halfScreenWidth &&
		movementTransform.x < room.width - halfScreenWidth){
		camera.x = movementTransform.x;
	}

	if (movementTransform.y > halfScreenHeight &&
		movementTransform.y < room.height - halfScreenHeight){
		camera.y = movementTransform.y;
	}
}

var topLeftCorner = function(){
	return {
		x : camera.x - utils.halfScreenWidth(),
		y : camera.y - utils.halfScreenHeight()
	};
}

module.exports = {
	transform:camera,
	update:update,
	topLeftCorner:topLeftCorner
};