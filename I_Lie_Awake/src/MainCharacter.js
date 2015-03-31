var movement = require("movement.js");
var GameObject = require("GameObject.js").GameObject;

var startX = sald.size.x/2;
var startY = sald.size.y/2;
var width  = 16;
var height = 30;

function MainCharacter(){
	GameObject.call(this, startX, startY, width, height);

	movement.initialize(this);
}

MainCharacter.prototype = Object.create(GameObject.prototype);

MainCharacter.prototype.constructor = MainCharacter;

MainCharacter.prototype.movement = movement;


module.exports = {
	MainCharacter:MainCharacter
};