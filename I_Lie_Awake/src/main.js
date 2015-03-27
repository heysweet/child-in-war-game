var mainloop = require("sald:mainloop.js");
var movement = require("movement.js");
var camera = require("camera.js");

function drawBackground() {
	var cameraCorner = camera.topLeftCorner();

	var ctx = sald.ctx;
	
	var d = new Date();
	var n = d.getMilliseconds();

	ctx.fillStyle = 'rgb(256, 256, 200)';

	ctx.fillRect(20, 20, ctx.width, 
			ctx.height);
	
	ctx.fillRect(0,0, ctx.width, ctx.height);

	ctx.fillStyle = 'rgb(200, 200, 256)';

	ctx.fillRect(200 - cameraCorner.x, 200 - cameraCorner.y, 
				400, 400);
}

sald.size = {x:320, y:240, mode:"ratio"};

sald.scene = {
	/* Use elapsed to make sure that the framerate doesn't 
	 * affect the gameplay
	 */
	update:function(elapsed) {
		movement.update(elapsed);
	},
	draw:function() {
		// Clear the screen
		var ctx = sald.ctx;

		var scalar = sald.ctx.factor;

		ctx.setTransform(scalar,0, 0,scalar, 0,0);
		ctx.clearRect( 0, 0, ctx.width, ctx.height );

		var cameraCorner = camera.topLeftCorner();

		// Draw Background
		drawBackground();

		// Draw the character
		var transform = movement.transform;

		ctx.fillStyle = 'rgb(256, 0, 0)';

		var onScreenPos = {
			x : movement.transform.x - cameraCorner.x,
			y : movement.transform.y - cameraCorner.y
		}

		ctx.fillRect(onScreenPos.x - transform.halfWidth,
			onScreenPos.y - transform.halfHeight,
			transform.width, 
			transform.height);

		// Draw the foreground
	},
	key:function(key, down) {

		// if (key === "SPACE" && down) {
		// 	this.blink = 1.0;
		// }
	},
	mouse:function(pos, button, down) {
		//Mouse handling.
	},
};

window.main = function main() {
	mainloop.start(document.getElementById("canvas"));
};
