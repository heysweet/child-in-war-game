var movement = require("movement.js");
var Character = require("character.js").Character;

var startX = sald.size.x/2;
var startY = sald.size.y/2;
var width  = 16;
var height = 30;

function MainCharacter(){
	Character.call(this, startX, startY, width, height);

	movement.initialize(this);
}

MainCharacter.prototype = Object.create(Character.prototype);

MainCharacter.prototype.constructor = MainCharacter;

MainCharacter.prototype.movement = movement;


module.exports = {
	MainCharacter:MainCharacter
};