var utils = require("utils.js");

var transform = {
	x : utils.halfScreenWidth(),
	y : utils.halfScreenHeight()
};

var update = function(elapsed, movementTransform){
	var room = window.gamestate.currentRoom();

	if (room.staticCamera === undefined){
		var halfScreenWidth = utils.halfScreenWidth()
		var halfScreenHeight = utils.halfScreenHeight();

		if (movementTransform.x > halfScreenWidth &&
			movementTransform.x < room.width - halfScreenWidth){
			transform.x = movementTransform.x;
		}

		if (movementTransform.y > halfScreenHeight &&
			movementTransform.y < room.height - halfScreenHeight){
			transform.y = movementTransform.y;
		}
	}
}

var topLeftCorner = function(){
	return {
		x : transform.x - utils.halfScreenWidth(),
		y : transform.y - utils.halfScreenHeight()
	};
}

var getTranslatedPoint = function(pt){
	var cameraCorner = topLeftCorner();

	var pos = utils.getScaledPoint(pt);

	var x_ = cameraCorner.x + pos.x;
	var y_ = cameraCorner.y + pos.y;

	return { x : x_, y : y_ };
}

var focusCamera = function(coords){
	var gamestate = window.gamestate;

	var t = gamestate.mainCharacter.transform;
	var room = gamestate.currentRoom();

	var halfScreenWidth = utils.halfScreenWidth()
	var halfScreenHeight = utils.halfScreenHeight();

	var x = Math.min(Math.max(halfScreenWidth, t.x), room.width - halfScreenWidth);
	var y = Math.min(Math.max(halfScreenHeight, t.y), room.height - halfScreenHeight);

	transform.x = x;
	transform.y = y;
}

var updateTransform = function(pos){
	transform.x = pos.x;
	transform.y = pos.y;
}

module.exports = {
	transform:transform,
	update:update,
	topLeftCorner:topLeftCorner,
	getTranslatedPoint:getTranslatedPoint,
	focusCamera:focusCamera,
	updateTransform:updateTransform
};