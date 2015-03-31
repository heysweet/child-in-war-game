var movement = require("movement.js");

var startX = sald.size.x/2;
var startY = sald.size.y/2;
var width  = 16;
var height = 30;

var MainCharacter = function(){
	var gameObject = new GameObject(startX, startY, width, height);

	gameObject.movement = movement;
	movement.initialize(gameObject);

	return gameObject;
}

module.exports = {
	MainCharacter:MainCharacter
};