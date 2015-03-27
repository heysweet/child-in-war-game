var mainloop = require('sald:mainloop.js');
var movement = require('movement.js');
var utils = require('utils.js');

function drawBackground() {
	var ctx = sald.ctx;

	ctx.setTransform(1,0, 0,1, 0,0);

	var scalar = sald.ctx.factor;
	var d = new Date();
	var n = d.getMilliseconds();

	ctx.fillStyle = 'rgb(256, 256, 200)';

	ctx.fillRect(20, 20, ctx.width, 
			ctx.height);


	
	ctx.fillRect(0,0, ctx.width, ctx.height);
}

sald.size = {x:320, y:240, mode:"ratio"};

sald.scene = {
	/* Use elapsed to make sure that the framerate doesn't 
	 * affect the gameplay
	 */
	update:function(elapsed) {
		var keys = sald.keys;

		var rightness = 0;
		var downness = 0;

		var transform = movement.transform;

		// Measure input
		if (keys.LEFT  || keys.A){rightness -= transform.xDelta;}
		if (keys.RIGHT || keys.D){rightness += transform.xDelta;}
		if (keys.UP	   || keys.W){downness  -= transform.yDelta;}
		if (keys.DOWN  || keys.S){downness  += transform.yDelta;}

		// Unit circle the input, avoiding "fast diagonal movement"
		if (rightness !== 0 && downness !== 0){
			rightness = utils.sign(rightness) * transform.xDiag;
			downness = utils.sign(downness) * transform.yDiag;
		}

		var newX = rightness * elapsed;
		var newY = downness * elapsed;

		// Collision check
		transform.x += newX;
		transform.y += newY;
	},
	draw:function() {
		var ctx = sald.ctx;
		ctx.setTransform(1,0, 0,1, 0,0);

		ctx.clearRect( 0 , 0 , ctx.width, ctx.height );

		drawBackground();

		var transform = movement.transform;

		var scalar = sald.ctx.factor;

		ctx.fillStyle = 'rgb(256, 0, 0)';
		// ctx.fillRect(0,0, ctx.width, ctx.height);

		ctx.fillRect((transform.x - transform.halfWidth) * scalar,
			(transform.y - transform.halfHeight) * scalar,
			(transform.halfWidth * 2 * scalar), 
			(transform.halfHeight * 2 * scalar));
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
