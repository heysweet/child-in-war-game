var utils = require("utils.js");
var ImageObject = require("ImageObject.js");
var Sprite = require("sald:Sprite.js");

var AnimatedImageObject = function(x, y, image, frames, framerate, beforeDistance, afterDistance){
	var width = image.width / frames;
	var height = image.height;

	this.image = null;

	var imageData = {
		width: width,
		height: height
	};

	ImageObject.call(this, x, y, imageData, afterDistance);


	this.sprite = new Sprite(image, { 
		'idle' : {
			x:0,
			y:0,
			width:width,
			height:height,
			size:frames
		}
	});

	this.sprite.animators['idle'].speed(framerate);
	this.sprite.animators['idle'].loop(true);

	this.draw = function(){
		var x = this.transform.x - beforeDistance;
		var y = this.transform.y;

		if (this.image !== null){
			var ctx = sald.ctx;

			ctx.drawImage(this.image, x, y);
		}

		this.sprite.draw('idle', x, y, 0, width, height, 0, 0);
	}
}

// Prototypical Inheritance
AnimatedImageObject.prototype = Object.create(ImageObject.prototype);

AnimatedImageObject.prototype.constructor = AnimatedImageObject;

module.exports = AnimatedImageObject;