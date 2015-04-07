var movement = require("movement.js");
var Character = require("Character.js");

var startX = sald.size.x/2;
var startY = sald.size.y/2;
var width  = 62;
var height = 140;

function MainCharacter(){
	Character.call(this, startX, startY, width, height);

	movement.initialize(this);
}

MainCharacter.prototype = Object.create(Character.prototype);

MainCharacter.prototype.constructor = MainCharacter;

MainCharacter.prototype.movement = movement;


module.exports = MainCharacter;