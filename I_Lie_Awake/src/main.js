var mainloop = require('sald:mainloop.js');

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

var Vector = function(x, y){
	this.x = x;
	this.y = y;
	this.length = Math.sqrt((x*x) + (y*y));
	this.angle = Math.acos( x / this.length );
}

var getTheta = function(xDelta, yDelta){
	var vec = new Vector(xDelta, yDelta);

	return vec.angle;
}

var square = {
	halfWidth : 10,
	halfHeight : 10,
	x : sald.size.x/2,
	y : sald.size.y/2,
};

function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }

// xDelta and yDelta pixels per second
var setupSquare = function(xDelta, yDelta){
	square.xDelta = xDelta;
	square.yDelta = yDelta;
	
	var theta = getTheta(xDelta, yDelta);

	square.xDiag = Math.cos(theta) * square.xDelta;
	square.yDiag = Math.sin(theta) * square.yDelta;

	console.log(theta, Math.cos(theta), square.xDelta, square.xDiag, square.yDiag);
}

setupSquare(68, 50);

sald.scene = {
	/* Use elapsed to make sure that the framerate doesn't 
	 * affect the gameplay
	 */
	update:function(elapsed) {
		var keys = sald.keys;

		var rightness = 0;
		var downness = 0;

		// Measure input
		if (keys.LEFT  || keys.A){rightness -= square.xDelta;}
		if (keys.RIGHT || keys.D){rightness += square.xDelta;}
		if (keys.UP	   || keys.W){downness  -= square.yDelta;}
		if (keys.DOWN  || keys.S){downness  += square.yDelta;}

		// Unit circle the input, avoiding "fast diagonal movement"
		if (rightness !== 0 && downness !== 0){
			rightness = sign(rightness) * square.xDiag;
			downness = sign(downness) * square.yDiag;
		}

		var newX = rightness * elapsed;
		var newY = downness * elapsed;

		// Collision check
		square.x += newX;
		square.y += newY;
	},
	draw:function() {
		var ctx = sald.ctx;
		ctx.setTransform(1,0, 0,1, 0,0);

		ctx.clearRect( 0 , 0 , ctx.width, ctx.height );

		drawBackground();

		var scalar = sald.ctx.factor;

		ctx.fillStyle = 'rgb(256, 0, 0)';
		// ctx.fillRect(0,0, ctx.width, ctx.height);

		ctx.fillRect((square.x - square.halfWidth) * scalar,
			(square.y - square.halfHeight) * scalar,
			(square.halfWidth * 2 * scalar), 
			(square.halfHeight * 2 * scalar));
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
