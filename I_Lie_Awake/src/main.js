var mainloop = require('sald:mainloop.js');

var square = {
	halfWidth : 10,
	halfHeight : 10,
	x : 40,
	y : 40,
	xDelta : 2,
	yDelta : 1,
};

function drawBackground() {
	var ctx = sald.ctx;

	ctx.setTransform(1,0, 0,1, 0,0);

	var scalar = sald.ctx.factor;

	ctx.fillStyle = 'rgb(256, 200, 200)';
	ctx.fillRect(0,0, ctx.width, ctx.height);
}

sald.size = {x:320, y:240, mode:"ratio"};
sald.scene = {
	update:function(elapsed) {
		var keys = sald.keys;

		if (keys.LEFT || keys.A){square.x -= square.xDelta;}
		if (keys.RIGHT || keys.D){square.x += square.xDelta;}
		if (keys.UP || keys.W){square.y -= square.yDelta;}
		if (keys.DOWN || keys.S){square.y += square.yDelta;}
	},
	draw:function() {
		var ctx = sald.ctx;
		ctx.setTransform(1,0, 0,1, 0,0);

		drawBackground();

		var scalar = sald.ctx.factor;

		// ctx.fillStyle = 'rgb(256, 256, 256)';
		// ctx.fillRect(0,0, ctx.width, ctx.height);

		ctx.rect((square.x - square.halfWidth) * scalar,
			(square.y - square.halfHeight) * scalar,
			(square.halfWidth * 2 * scalar), (square.halfHeight * 2 * scalar));
		ctx.stroke();
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
