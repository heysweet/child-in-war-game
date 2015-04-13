var movement = require("movement.js");
var Character = require("Character.js");
var utils = require("utils.js");

var startX = utils.screenWidth()/2;
var startY = utils.screenHeight()/2;
var width  = 62;
var height = 140;

var setupCollision = function(mainCharacter){
	var dx = 0;
	var dy = 90;

	mainCharacter.relativeBoundingBox.min = {
		x : dx,
		y : dy
	};


	console.log(mainCharacter.relativeBoundingBox);
}

function MainCharacter(){
	Character.call(this, startX, startY, width, height);

	setupCollision(this);

	movement.initialize(this);
}

MainCharacter.prototype = Object.create(Character.prototype);

MainCharacter.prototype.constructor = MainCharacter;

MainCharacter.prototype.movement = movement;


module.exports = MainCharacter;