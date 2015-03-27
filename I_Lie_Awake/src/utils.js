function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }

var HALF_SCREEN_WIDTH = (sald.size.x/2);
var HALF_SCREEN_HEIGHT = (sald.size.y/2);

var halfScreenWidth = function(){
	return HALF_SCREEN_WIDTH;
}

var halfScreenHeight = function(){
	return HALF_SCREEN_HEIGHT;
}

module.exports = {
	sign:sign,
	halfScreenWidth:halfScreenWidth,
	halfScreenHeight:halfScreenHeight
};