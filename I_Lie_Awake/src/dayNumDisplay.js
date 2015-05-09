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

	var text;

	if (daysRemaining == 1){
		text = "1 Day Left"
	} else {
		text = daysRemaining + " Days Left";
	}

	ctx.fillText(text, utils.halfScreenWidth(), utils.halfScreenHeight());

	ctx.textAlign = textAlign;
}

module.exports = {
	draw:draw,
}