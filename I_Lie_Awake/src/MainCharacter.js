var movement = require("movement.js");
var Character = require("Character.js");
var utils = require("utils.js");
var Sprite = require("sald:Sprite.js");

var startX = utils.screenWidth()/2;
var startY = utils.screenHeight()/2;
var width  = 62;
var height = 140;

var image = require("./data/characters/mainCharacter/walkCycle1.png");

var faceRight = true;

var setupCollision = function(mainCharacter){
	var dx = 8;
	var dy = 90;

	var oldMaxY = mainCharacter.rel

	mainCharacter.relativeBoundingBox = {
		min : {x : 0, y : 0}, 
		max : {x : mainCharacter.getWidth(), y : mainCharacter.getHeight()}
	};

	mainCharacter.relativeBoundingBox.min = {
		x : dx,
		y : dy
	};

	mainCharacter.relativeBoundingBox.max.x -= dx;
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
	var args = {
		width : width,
		height : height,
		zOffset : 40
	}

	Character.call(this, startX, startY, args);

	setupCollision(this);
	setupAnimations(this);

	movement.initialize(this);
	this.isMain = true;
}

MainCharacter.prototype = Object.create(Character.prototype);

MainCharacter.prototype.constructor = MainCharacter;

MainCharacter.prototype.movement = movement;


MainCharacter.prototype.draw = function(){
	var camera = window.gamestate.camera;

	var ctx = sald.ctx;

	var cameraCorner = camera.topLeftCorner();

	var transform = this.transform;

	ctx.fillStyle = 'rgb(256, 0, 0)';

	var onScreenPos = {
		x : transform.x - cameraCorner.x,
		y : transform.y - cameraCorner.y
	}

	var width = this.getWidth();
	var height = this.getHeight();;

	// ctx.drawImage(image, 30, 30, 
	// 		1073, 280, 
	// 		0, 0,
	// 		1, 1);

	if (this.moveVector !== null){
		if (this.moveVector.rightness < 0){
			faceRight = false
		} else if (this.moveVector.rightness > 0){
			faceRight = true;
		}
	}

	var scalar = 1;
	var offset = 0;

	if (!faceRight){
		ctx.save();
		ctx.scale(-1, 1);
		scalar = -1;
		offset = this.getWidth()
	}

	if (this.moveVector === null){
		this.sprite.draw('idle', (onScreenPos.x - this.halfWidth() + offset) * scalar, 
			onScreenPos.y - this.halfHeight(), 
			0, width, height, 0, 1);
	} else {
		this.sprite.draw('walk', (onScreenPos.x - this.halfWidth() + offset) * scalar, 
			onScreenPos.y - this.halfHeight(), 
			0, width, height, 0, 1);
	}

	ctx.restore();
}


module.exports = MainCharacter;