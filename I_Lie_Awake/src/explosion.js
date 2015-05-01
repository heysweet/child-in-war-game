var Sprite = require("sald:Sprite.js");
var image = require("./data/street/explosion/explosion.png");

var utils = require("utils.js");
var airstrikeSound = require("./data/sound/bombExplosion.ogg");

var frames = 12;
var framerate = 10;

var Explosion = function(){
	var width = image.width / frames;
	var height = image.height;

	this.image = null;
	var isExploding = false;

	this.sprite = new Sprite(image, { 
		'explode' : {
			x:0,
			y:0,
			width:width,
			height:height,
			size:frames
		}
	});

	this.sprite.animators['explode'].speed(framerate);
	this.sprite.animators['explode'].loop(false);

	this.draw = function(){
		if (isExploding){
			var x = 0;
			var y = 0;

			this.sprite.draw('explode', x, y, 0, width, height, 0, 0);
		}
	}

	this.hide = function(){
		isExploding = false;
	}

	this.start = function(){
		isExploding = true;
	}
}

Explosion.airstrike = function(){
	window.gamestate.explosion = new Explosion();
	airstrikeSound.play();

	setTimeout(
		function() {
			window.gamestate.explosion.start();
			utils.rooms.street.onExplode();
			window.gamestate.phoneInterface.killPhone();
	}, 4477);
}

module.exports = Explosion;