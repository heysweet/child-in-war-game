function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }

var SCREEN_HEIGHT = sald.size.y / window.gamestate.IMAGE_SCALAR;
var SCREEN_WIDTH  = sald.size.x / window.gamestate.IMAGE_SCALAR;

var HALF_SCREEN_WIDTH  = (SCREEN_WIDTH /2);
var HALF_SCREEN_HEIGHT = (SCREEN_HEIGHT/2);

var screenWidth = function(){
	return SCREEN_WIDTH;
}

var screenHeight = function(){
	return SCREEN_HEIGHT;
}

var halfScreenWidth = function(){
	return HALF_SCREEN_WIDTH;
}

var halfScreenHeight = function(){
	return HALF_SCREEN_HEIGHT;
}

var scalar;
var invertedScalar;
var didScreenSizeChange = true;

var onScreenSizeChange = function(){
	didScreenSizeChange = true;
}

// Cache this, on resize, uncache
var imageScalar = function(){
	if (didScreenSizeChange){
		scalar = (window.gamestate.IMAGE_SCALAR * sald.ctx.factor);
		invertedScalar = 1 / scalar;
		didScreenSizeChange = false;
	}

	return scalar;
}

var imageScalarInverted = function(){
	if (didScreenSizeChange){
		imageScalar();
		didScreenSizeChange = false;
	}

	return invertedScalar;
}

module.exports = {
	sign:sign,
	screenWidth:screenWidth,
	screenHeight:screenHeight,
	halfScreenWidth:halfScreenWidth,
	halfScreenHeight:halfScreenHeight,
	imageScalar:imageScalar,
	imageScalarInverted:imageScalarInverted,
	onScreenSizeChange:onScreenSizeChange,
};