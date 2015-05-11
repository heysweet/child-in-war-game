var utils = require("utils.js");
var Sprite = require("sald:Sprite.js");

var SQUIGGLE_1 = require("./data/blackSquiggles/blackSquiggle1.png");
var SQUIGGLE_2 = require("./data/blackSquiggles/blackSquiggle2.png");
var SQUIGGLE_3 = require("./data/blackSquiggles/blackSquiggle3.png");

var SQUIGGLES = [
	{ image : SQUIGGLE_1, frames : 10, framerate : 5  },
	{ image : SQUIGGLE_2, frames : 28, framerate : 10 },
	{ image : SQUIGGLE_3, frames : 28, framerate : 14 }
];

var animatedSquiggles = [];

var initAnimatedSquiggles = function(){
	animatedSquiggles = [];

	var dayNum = window.gamestate.dayNum();

	var numSquiggles = Math.max((dayNum - 1) * dayNum, 0);

	var animatedDestroyedCar;

	var lastSquiggleNum;

	for (var i = 0; i < numSquiggles; i++){
		var r = lastSquiggleNum;

		while (r == lastSquiggleNum){
			r = Math.floor(Math.random() * SQUIGGLES.length);
		}

		var squiggleNum = r;

		lastSquiggleNum = squiggleNum;

		var data = SQUIGGLES[squiggleNum];

		var frames = data.frames;
		var width = data.image.width / frames;
		var height = data.image.height;
		var framerate = data.framerate + Math.floor(Math.random() * 8);

		var sprite = new Sprite(data.image, { 
			'idle' : {
				x:0,
				y:0,
				width:width,
				height:height,
				size:frames
			}
		});

		sprite.animators['idle'].speed(framerate);
		sprite.animators['idle'].loop(true);

		var x = Math.random() * utils.screenWidth();
		var y = Math.random() * utils.screenHeight();

		var timeUntilMove = 1.0 / framerate;
		var transform = {
			x : x,
			y : y,
			width : width/2,
			height : height/2
		}

		var result = {
			sprite : sprite,
			timeUntilMove : timeUntilMove,
			timeSinceMove : 0,
			transform : transform,
			isHidden : true,
		};

		animatedSquiggles.push(result);
	}
}

function update(elapsed){
	for (var i = 0; i < animatedSquiggles.length; i++){
		var squiggle = animatedSquiggles[i];
		squiggle.timeSinceMove += elapsed;

		if (squiggle.timeSinceMove > squiggle.timeUntilMove){
			squiggle.timeSinceMove = 0;

			if (Math.random() < 0.1){
				squiggle.isHidden = !squiggle.isHidden;
			}

			if (!squiggle.isHidden && Math.random() < 0.3333333){
				var x = Math.random() * (utils.screenWidth() - squiggle.transform.width);
				var y = Math.random() * (utils.screenHeight() - squiggle.transform.height);

				squiggle.transform.x = x;
				squiggle.transform.y = y;
			}
		}
	}
}

function draw(){
	for (var i = 0; i < animatedSquiggles.length; i++){
		var squiggle = animatedSquiggles[i];
		
		if (!squiggle.isHidden){
			var x = squiggle.transform.x;
			var y = squiggle.transform.y; 

			var width = squiggle.transform.width;
			var height = squiggle.transform.height;

			squiggle.sprite.draw('idle', x, y, 0, width, height, 0, 0);
			squiggle.isHidden = true;
		}
	}
}

initAnimatedSquiggles();

module.exports = {
	update:update,
	draw:draw,
	init:initAnimatedSquiggles
};