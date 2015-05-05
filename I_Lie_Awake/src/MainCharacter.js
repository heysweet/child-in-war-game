var movement = require("movement.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");
var Sprite = require("sald:Sprite.js");

var startX = utils.screenWidth()/2;
var startY = utils.screenHeight()/2;
var width  = 60.9;
var height = 140.5;
var anchor = { x : 0, y : 0};

var image = require("./data/characters/mainCharacter/walk.png");

var faceRight = true;

var forceWalking = false;

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
			width:121.8,
			height:281, 
			size:9 
		},
		'idle' : {
			x:0,
			y:0, 
			width:121.8,
			height:281, 
			size:1
		}
	});

	mainCharacter.sprite.animators['walk'].speed(12);
	mainCharacter.sprite.animators['walk'].loop(true);

	mainCharacter.text_sprite = new Sprite(require("./data/characters/mainCharacter/textwalk.png"), { 
		'walk' : {
			x:0,
			y:0, 
			width:121.8,
			height:281, 
			size:9 
		},
		'idle' : {
			x:0,
			y:0, 
			width:121.8,
			height:281, 
			size:1
		}
	});

	mainCharacter.text_sprite.animators['walk'].speed(12);
	mainCharacter.text_sprite.animators['walk'].loop(true);

	mainCharacter.text_blink_sprite = new Sprite(require("./data/characters/mainCharacter/textblink.png"), {
		'walk' : {
			x:0,
			y:0, 
			width:121.8,
			height:281, 
			size:9 
		},
		'idle' : {
			x:0,
			y:0, 
			width:121.8,
			height:281, 
			size:1
		}
	});

	mainCharacter.text_blink_sprite.animators['walk'].speed(12);
	mainCharacter.text_blink_sprite.animators['walk'].loop(true);
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
	this.moveVector = null;

	this.forceWalking = function(bool, direction){
		forceWalking = bool;

		if (forceWalking){
			this.moveVector.rightness = Math.abs(this.moveVector.rightness) * direction;
		}
	}

	this.faceLeft = function(){
		faceRight = false;
	}

	this.faceRight = function(){
		faceRight = true;
	}
}

// Prototypical Inheritance
MainCharacter.prototype = Object.create(GameObject.prototype);

MainCharacter.prototype.constructor = MainCharacter;

MainCharacter.prototype.movement = movement;
window.gamestate.movement = movement;


MainCharacter.prototype.draw = function(){
	var camera = window.gamestate.camera;

	var ctx = sald.ctx;

	var cameraCorner = camera.topLeftCorner();

	var transform = this.transform;

	var onScreenPos = {
		x : transform.x - cameraCorner.x,
		y : transform.y - cameraCorner.y
	}

	var width = this.getWidth();
	var height = this.getHeight();;

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


	if (window.gamestate.shouldShowPhone){
		if (this.moveVector === null && !forceWalking){
			this.text_sprite.draw('idle', (onScreenPos.x + offset) * scalar, 
				onScreenPos.y, 
				0, width, height, 0, 1);
		} else {
			this.text_sprite.draw('walk', (onScreenPos.x + offset) * scalar, 
				onScreenPos.y, 
				0, width, height, 0, 1);
		}
	} else {
		if (this.moveVector === null && !forceWalking){
			this.sprite.draw('idle', (onScreenPos.x + offset) * scalar, 
				onScreenPos.y, 
				0, width, height, 0, 1);
		} else {
			this.sprite.draw('walk', (onScreenPos.x + offset) * scalar, 
				onScreenPos.y, 
				0, width, height, 0, 1);
		}
	}

	

	ctx.restore();
}


module.exports = MainCharacter;