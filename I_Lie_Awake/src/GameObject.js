var collision = require("sald:collide.js");


/* json : {
	sprite, width, height
} */
var GameObject = function(x_, y_, json){

	var width = 0;
	var height = 0;

	this.transform = {
		x : x_,
		y : y_
	};

	if (json.hasOwnProperty('zOffset')){
		this.zOffset = json.zOffset;
	}

	if (json.hasOwnProperty('width')){
		width = json.width;
	}

	if (json.hasOwnProperty('height')){
		height = json.height;
	}

	this.image = null;

	if (json.hasOwnProperty('image')){
		this.image = json.image;
	}

	this.sprite = json.sprite;

	if (json.hasOwnProperty('relativeBoundingBox')){
		this.relativeBoundingBox = json.relativeBoundingBox;
	} else {
		// For collisions
		this.relativeBoundingBox = null;//{
		// 	min : {
		// 		x : 0,
		// 		y : 0
		// 	},
		// 	max : {
		// 		x : width,
		// 		y : height
		// 	}
		// }
	}


	var halfWidth  = width  / 2;
	var halfHeight = height / 2;

	this.getWidth = function() {
		return width;
	}

	this.getHeight = function() {
		return height;
	}

	this.setWidth = function(num){
		width = num;
		halfWidth = width / 2;
	}

	this.setHeight = function(num){
		height = num;
		halfHeight = height / 2;
	}

	this.halfWidth = function() {
		return halfWidth;
	}

	this.halfHeight = function() {
		return halfHeight;
	}

	this.getTopLeft = function(){
		var x_ = this.transform.x - halfWidth;
		var y_ = this.transform.y - halfHeight;

		return {
			x : x_,
			y : y_
		}
	}

	this.getBottomCenter = function(){
		var x_ = this.transform.x + halfWidth;
		var y_ = this.transform.y + halfHeight;

		return {
			x : x_,
			y : y_
		}
	}
}

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

// GameObject.prototype.getAnchor = function(){
// 	if (this.sprite){
// 		return this.sprite.anchor;
// 	}

// 	return this.anchor;
// }

GameObject.prototype.setImage = function(image){
	this.image = image;
}


GameObject.prototype.getZ = function(){
	var result = this.transform.y;

	if (this.zOffset !== undefined){
		return result + this.zOffset;
	}

	return result;

	// var anchor = this.getAnchor();

	// if (this.sprite && (anchor !== undefined && anchor !== null)){
	// 	return anchor.y;
	// }

	// return Number.NEGATIVE_INFINITY;
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

GameObject.prototype.collisionBox = function() {
	var bb = this.relativeBoundingBox;

	if (bb === null) return null;

	var transform = this.getTopLeft();
	var x = transform.x;
	var y = transform.y;

	var min_ = {x : x + bb.min.x,
				y : y + bb.min.y};
	var max_ = {	
		x : x + bb.max.x,
		y : y + bb.max.y 
	}

	return {
		min : min_,
		max : max_
	};
};

GameObject.prototype.updateTransform = function(pos){
	this.transform.x = pos.x;
	this.transform.y = pos.y;
}

GameObject.prototype.isColliding = function(obj2){
	var rect = this.collisionBox();
	var rect2 = obj2.collisionBox();

	if (rect === null || rect2 === null) return false;

	return collision.rectangleRectangle(rect, rect2);
};

module.exports = GameObject;