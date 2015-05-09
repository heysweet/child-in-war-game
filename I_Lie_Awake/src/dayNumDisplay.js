var utils = require("utils.js");

var font = "80px Walter Turncoat";

var draw = function () {
	var dayNum = window.gamestate.dayNum();
	var ctx = sald.ctx;

	var x;
	var y;

	var textAlign = ctx.textAlign;
	ctx.textAlign = "center"; 

	var daysRemaining = (window.gamestate.MAX_DAYS + 1) - dayNum;

	ctx.font = font;
	ctx.fillStyle = 'rgb(255, 253, 253)';
	ctx.fillText(daysRemaining + " Days Left", utils.halfScreenWidth(), utils.halfScreenHeight());

	ctx.textAlign = textAlign;
}

module.exports = {
	draw:draw,
}