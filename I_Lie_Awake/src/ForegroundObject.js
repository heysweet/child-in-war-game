var camera = require("camera.js");

var ForegroundObject = function(image, position){
	this.position = position;
	this.image = image;
}

ForegroundObject.prototype.draw = function() {
	var ctx = sald.ctx;

	var cameraCorner = camera.topLeftCorner();

	ctx.drawImage(this.image, this.position.x - cameraCorner.x, this.position.y - cameraCorner.y);
};

module.exports = ForegroundObject;