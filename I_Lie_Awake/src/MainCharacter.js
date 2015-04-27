var movement = require("movement.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");
var Sprite = require("sald:Sprite.js");

var startX = utils.screenWidth()/2;
var startY = utils.screenHeight()/2;
var width  = 70;
var height = 140;
var anchor = { x : 0, y : 0};

var image = require("./data/characters/mainCharacter/walkCycle.png");

var faceRight = true;

var setupCollision = function(mainCharacter){
	var dx = 8;
	var dy = 90;

	var boundingBox = {
		min : {x : 0, y : 0}, 
		max : {x : mainCharacter.getWidth(), y : mainCharacter.getHeight()}
	};

	boundingBox.min = {
		x : dx,
		y : dy
	};

	boundingBox.max.x -= dx;

	mainCharacter.setCollisionRect(boundingBox, false);
}

var setupAnimations = function(mainCharacter){
	mainCharacter.sprite = new Sprite(image, { 
		'walk' : {
			x:0,
			y:0, 
			width:141.7,
			height:280, 
			size:9 
		},
		'idle' : {
			x:0,
			y:0, 
			width:141,
			height:280, 
			size:1
		}
	});

	mainCharacter.sprite.animators['walk'].speed(12);
	mainCharacter.sprite.animators['walk'].loop(true);
}

function MainCharacter(){
	var args = {
		anchor : anchor,
		zOffset : 120,
		width : width,
		height : height
	}

	GameObject.call(this, startX, startY, args);

	setupCollision(this);
	setupAnimations(this);

	movement.initialize(this);
}

// Prototypical Inheritance
MainCharacter.prototype = Object.create(GameObject.prototype);

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

	var anchor = this.getScaledAnchor();

	if (this.moveVector === null){
		this.sprite.draw('idle', (onScreenPos.x + offset) * scalar, 
			onScreenPos.y, 
			0, width, height, 0, 1);
	} else {
		this.sprite.draw('walk', (onScreenPos.x + offset) * scalar, 
			onScreenPos.y, 
			0, width, height, 0, 1);
	}

	ctx.restore();
}


module.exports = MainCharacter;