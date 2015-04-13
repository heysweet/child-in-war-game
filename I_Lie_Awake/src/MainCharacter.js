var movement = require("movement.js");
var Character = require("Character.js");
var utils = require("utils.js");
var Sprite = require("sald:Sprite.js");

var startX = utils.screenWidth()/2;
var startY = utils.screenHeight()/2;
var width  = 62;
var height = 140;

var image = require("./data/characters/mainCharacter/walkCycle.png");

var setupCollision = function(mainCharacter){
	var dx = 0;
	var dy = 90;

	mainCharacter.relativeBoundingBox.min = {
		x : dx,
		y : dy
	};
}

var setupAnimations = function(mainCharacter){
	mainCharacter.sprite = new Sprite(image, { 
		'walk' : {
			x:0,
			y:0, 
			width:119,
			height:280, 
			size:9 
		},
		'idle' : {
			x:0,
			y:0, 
			width:119,
			height:280, 
			size:1
		}
	});

	mainCharacter.sprite.animators['walk'].speed(12);
	mainCharacter.sprite.animators['walk'].loop(true);
}

function MainCharacter(){
	Character.call(this, startX, startY, width, height);

	setupCollision(this);
	setupAnimations(this);

	movement.initialize(this);
}

MainCharacter.prototype = Object.create(Character.prototype);

MainCharacter.prototype.constructor = MainCharacter;

MainCharacter.prototype.movement = movement;


MainCharacter.prototype.draw = function(camera){
	var ctx = sald.ctx;

	var cameraCorner = camera.topLeftCorner();

	var transform = this.transform;

	ctx.fillStyle = 'rgb(256, 0, 0)';

	var onScreenPos = {
		x : transform.x - cameraCorner.x,
		y : transform.y - cameraCorner.y
	}

	// ctx.drawImage(image, 30, 30, 
	// 		1073, 280, 
	// 		0, 0,
	// 		1, 1);

	// this.sprite.draw('walk', 0, 0);

	// if (this.moveVector === null){
		ctx.fillRect(onScreenPos.x - this.halfWidth(),
			onScreenPos.y - this.halfHeight(),
			this.getWidth(), 
			this.getHeight());
	// } else {

		

		
	// }
}


module.exports = MainCharacter;