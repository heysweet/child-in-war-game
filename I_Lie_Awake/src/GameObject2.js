var BaseGameObject = require("sald:GameObject.js");

/* json : {
	sprite, width, height
} */
var GameObject = function(x, y, width, height, anchor){
	BaseGameObject.call(this, x, y, width, height, anchor);

	var setWidth_ = this.setWidth;
	var setHeight_ = this.setHeight;

	this.zOffset = null;
	this.image = null;
	this.sprite = null;
	this.relativeBoundingBox = null;

	var halfWidth  = width  / 2;
	var halfHeight = height / 2;

	this.setWidth = function(num){
		setWidth_(num);
		halfWidth = num / 2;
	}

	this.setHeight = function(num){
		setHeight_(num);
		halfHeight = num / 2;
	}

	this.halfWidth = function() {
		return halfWidth;
	}

	this.halfHeight = function() {
		return halfHeight;
	}
}

// /* json : {
// 	sprite, width, height
// } */
// var GameObject = function(x_, y_, json){

// 	var width = 0;
// 	var height = 0;

// 	this.transform = {
// 		x : x_,
// 		y : y_
// 	};

// 	var halfWidth  = width  / 2;
// 	var halfHeight = height / 2;

// 	this.getWidth = function() {
// 		return width;
// 	}

// 	this.getHeight = function() {
// 		return height;
// 	}

// 	this.setWidth = function(num){
// 		width = num;
// 		halfWidth = width / 2;
// 	}

// 	this.setHeight = function(num){
// 		height = num;
// 		halfHeight = height / 2;
// 	}

// 	this.halfWidth = function() {
// 		return halfWidth;
// 	}

// 	this.halfHeight = function() {
// 		return halfHeight;
// 	}

// 	this.getTopLeft = function(){
// 		var x_ = this.transform.x - halfWidth;
// 		var y_ = this.transform.y - halfHeight;

// 		return {
// 			x : x_,
// 			y : y_
// 		}
// 	}

// 	this.getBottomCenter = function(){
// 		var x_ = this.transform.x + halfWidth;
// 		var y_ = this.transform.y + halfHeight;

// 		return {
// 			x : x_,
// 			y : y_
// 		}
// 	}
// }

var zSort = function(a, b){
	return a.getZ() - b.getZ();
}

GameObject.draw = function(){
	// Fairly efficient in a mostly sorted list, particularly when short
	// Optimize to be smarter about which objects moved
	var activeInstances = window.gamestate.activeGameObjects(zSort);

	for (var i = 0; i < activeInstances.length; i++){
		activeInstances[i].draw();
	}
}

GameObject.prototype.setImage = function(image){
	this.image = image;
}


GameObject.prototype.getZ = function(){
	var result = this.transform.y + anchor.y;

	if (this.zOffset !== undefined){
		return result + this.zOffset;
	}

	return result;
}

GameObject.prototype.draw = function(){
	var camera = window.gamestate.camera;

	var ctx = sald.ctx;
	var cameraCorner = camera.topLeftCorner();

	if (this.image !== null){
		ctx.drawImage(this.image, this.transform.x - cameraCorner.x, this.transform.y - cameraCorner.y);
	} else {
		var sprite = this.getSprite();

		sprite.draw();
	}
}

GameObject.prototype.setSprite = function(sprite){
	this.sprite = sprite;
}

GameObject.prototype.updateTransform = function(pos){
	this.transform.x = pos.x;
	this.transform.y = pos.y;
}

module.exports = GameObject;