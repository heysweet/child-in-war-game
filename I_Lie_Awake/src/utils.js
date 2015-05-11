var onNewDayList = [];

var sleepingCoords = {
	x : 149.41686328001853,
	y : 83.45958860959138
};

var kitchenCoords = {
	x : 659,
	y : 85
};

var sleepingCoordsEnd = {
	x : 427,
	y : 83.45958860959138
};


var displayDayNumTime = 2100;

var glitch = require("glitch-canvas.js");

var glitchedImages = [];
var glitchedScreenShots = [];
var drawnGlitch = null;
var chanceToChange = 0.15;

// Never returns negative results
function mod(n, m) {
	return ((n % m) + m) % m;
}

var queueGlitchCapture = function(){
	window.gamestate.glitchCurrentCanvas = true;
}

var glitchImages = function(images){
	window.gamestate.imagesToGlitch = window.gamestate.imagesToGlitch.concat(images);
}

var takeGlitchedScreenshot = function(){
	var ctx = sald.ctx;

	var amount = 2 + Math.floor(Math.random() * 39);
	var seed = 1 + Math.floor(Math.random() * 20);
	var iterations = 1 + Math.floor(Math.random() * 4);
	var quality = 50 + Math.floor(Math.random() * 49);

	var my_image_data = ctx.getImageData(0, 0, screenWidth(), screenHeight());
	var parameters = { amount: amount, seed: seed, iterations: iterations, quality: quality };

	function drawGlitchedImageData(image_data) {
		var canvas = document.createElement('canvas');
		var canvasContext = canvas.getContext('2d');

		canvas.width = image_data.width;
		canvas.height = image_data.height;

		canvasContext.putImageData(image_data, 0, 0, 0, 0, image_data.width, image_data.height);

		var result = new Image(image_data.width, image_data.height);

		result.src = canvas.toDataURL();

		glitchedScreenShots.push(result);
	}

	glitch.glitchImageData(my_image_data, parameters, drawGlitchedImageData);
}

var glitchCanvas = function(){
	var ctx = sald.ctx;

	var amount = 30 + Math.floor(Math.random() * 69);
	var seed = 1 + Math.floor(Math.random() * 97);
	var iterations = 14 + Math.floor(Math.random() * 11);
	var quality = 3 + Math.floor(Math.random() * 60);

	var my_image_data = ctx.getImageData(0, 0, screenWidth(), screenHeight());
	var parameters = { amount: amount, seed: seed, iterations: iterations, quality: quality };

	function drawGlitchedImageData(image_data) {
		var canvas = document.createElement('canvas');
		var canvasContext = canvas.getContext('2d');

		canvas.width = image_data.width;
		canvas.height = image_data.height;

		canvasContext.putImageData(image_data, 0, 0, 0, 0, image_data.width, image_data.height);

		var result = new Image(image_data.width, image_data.height);

		result.src = canvas.toDataURL();

		glitchedImages.push(result);
	}

	glitch.glitchImageData(my_image_data, parameters, drawGlitchedImageData);
}

var drawGlitches = function(){
	var ctx = sald.ctx;

	if (Math.random() < chanceToChange){
		var random1 = Math.random();

		var halfListLength = Math.floor(glitchedImages.length / 2);
		var remainingItems = glitchedImages.length - halfListLength;

		if (random1 > 0.2){
			var baseIndex = halfListLength;

			drawnGlitch = glitchedImages[baseIndex + Math.floor(Math.random() * remainingItems)];
		} else {
			drawnGlitch = glitchedImages[Math.floor(Math.random() * halfListLength)];
		}

	}

	if (drawnGlitch){
		ctx.drawImage(drawnGlitch, 0, 0);
	}
}

var drawGlitchesScreenshots = function(){
	var r = Math.random();
	var chanceToGlitch = 0.01;

	if (r < chanceToGlitch){

	}
}

var clearGlitchedImages = function(){
	glitchedImages = [];
}

var loadFonts = function(){
	var string = " ";

	setTimeout(
	function() {
		var ctx = sald.ctx;

		if (ctx == null){
			loadFonts()
		} else {
			ctx.font = "20px Indie Flower";
			ctx.fillText(string, -100, -100);

			ctx.font = "20px Roboto";
			ctx.fillText(string, -100, -100);

			ctx.font = "20px Walter Turncoat";
			ctx.fillText(string, -100, -100);

			var setup = require("setup.js");

			setup.startGame();
		}
	}, 1000);
}

loadFonts();


var schoolCoords = function(){
	var dayNum = window.gamestate.dayNum();

	if (dayNum == 0){
		return {x : 546, y : 303};
	} else if (dayNum == 1){
		return {x : 350, y : 303};
	} else if (dayNum == 2){
		return {x : 250, y : 303};
	} else if (dayNum == 3){
		return {x : 120, y : 303};
	} else {
		return {x : 10, y : 303};
	}
}

function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }


//http://stackoverflow.com/questions/5026961/html5-canvas-ctx-filltext-wont-do-line-breaks
CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
	var lines = text.split("\n");

	var height = 0;

	for (var i = 0; i < lines.length; i++) {

		var words = lines[i].split(' ');
		var line = '';

		for (var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = this.measureText(testLine);
			var testWidth = metrics.width;

			if (testWidth > maxWidth && n > 0) {
				this.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
				height += lineHeight;
			}
			else {
				line = testLine;
			}
		}

		this.fillText(line, x, y);
		y += lineHeight;
		height += lineHeight;
	}

	return height;
}

CanvasRenderingContext2D.prototype.measureWrapText = function (text, x, y, maxWidth, lineHeight) {
	var lines = text.split("\n");

	var numLines = 0;

	for (var i = 0; i < lines.length; i++) {

		var words = lines[i].split(' ');
		var line = '';

		for (var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = this.measureText(testLine);
			var testWidth = metrics.width;

			if (testWidth > maxWidth && n > 0) {
				line = words[n] + ' ';
				y += lineHeight;
				numLines++;
			}
			else {
				line = testLine;
			}
		}

		y += lineHeight;
		numLines++;
	}

	return numLines;
}



var SCREEN_HEIGHT = sald.size.y / window.gamestate.IMAGE_SCALAR;
var SCREEN_WIDTH  = sald.size.x / window.gamestate.IMAGE_SCALAR;

var HALF_SCREEN_WIDTH  = (SCREEN_WIDTH /2);
var HALF_SCREEN_HEIGHT = (SCREEN_HEIGHT/2);

var desaturate = function(imgPixels, saturationAmount){
	var sat = saturationAmount;
	var inv = 1 - sat;

	for (var y = 0; y < imgPixels.height; y++){
		for (var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = (avg * inv) + (imgPixels.data[i] * sat);
			imgPixels.data[i + 1] = (avg * inv) + (imgPixels.data[i + 1] * sat);
			imgPixels.data[i + 2] = (avg * inv) + (imgPixels.data[i + 2] * sat);
		}
	}
}

var colorize = function(image, color){
	var red = color[0];
	var green = color[1];
	var blue = color[2];

	var canvas = document.createElement('canvas');
	var canvasContext = canvas.getContext('2d');

	var imgW = image.width;

	var imgH = image.height;
	canvas.width = imgW;
	canvas.height = imgH;

	canvasContext.drawImage(image, 0, 0);

	var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

	for (var y = 0; y < imgPixels.height; y++){
		for (var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;

			imgPixels.data[i] = red;
			imgPixels.data[i + 1] = green;
			imgPixels.data[i + 2] = blue;
		}
	}

	canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

	var result = new Image(imgPixels.width, imgPixels.height);

	result.src = canvas.toDataURL();

	return result;
}

var setOpacity = function(image, opacity){
	opacity *= 255;

	var canvas = document.createElement('canvas');
	var canvasContext = canvas.getContext('2d');

	var imgW = image.width;

	var imgH = image.height;
	canvas.width = imgW;
	canvas.height = imgH;

	canvasContext.drawImage(image, 0, 0);

	var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

	for (var y = 0; y < imgPixels.height; y++){
		for (var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;

			imgPixels.data[i + 3] = opacity;
		}
	}

	canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

	var result = new Image(imgPixels.width, imgPixels.height);

	result.src = canvas.toDataURL();

	return result;
}

// http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
var desaturateImage = function(image, saturationAmount){
	if (saturationAmount >= 1) return image;

	if (saturationAmount < 0){
		saturationAmount = 0;
	}

	var canvas = document.createElement('canvas');
	var canvasContext = canvas.getContext('2d');

	var imgW = image.width;

	var imgH = image.height;
	canvas.width = imgW;
	canvas.height = imgH;

	canvasContext.drawImage(image, 0, 0);

	var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

	desaturate(imgPixels, saturationAmount);

	canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

	var result = new Image(imgPixels.width, imgPixels.height);

	result.src = canvas.toDataURL();

	return result;
}

var mergeImages = function(images){
	var canvas = document.createElement('canvas');
	var canvasContext = canvas.getContext('2d');

	var imgW = 0;
	var imgH = 0;

	for (var i = 0; i < images.length; i++){
		imgW = Math.max(imgW, images[i].width);
		imgH = Math.max(imgH, images[i].height);
	}

	canvas.width = imgW;
	canvas.height = imgH;

	for (var i = 0; i < images.length; i++){
		canvasContext.drawImage(images[i], 0, 0);
	}

	var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

	var result = new Image(imgPixels.width, imgPixels.height);

	result.src = canvas.toDataURL();

	return result;
}

var numLines = function(str){
	lines = str.split(/\r\n|\r|\n/);
	return lines.length;
}

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

var goToTheNextDay = function(){
	window.gamestate.nextDay();

	if (!window.gamestate.gameover){
		window.gamestate.drawNothing = true;
		window.gamestate.displayDayNum = true;

		setTimeout(
			function(){
				window.gamestate.drawNothing = false;
				window.gamestate.displayDayNum = false;

				var dayNum = window.gamestate.dayNum();

				if (dayNum == 3){
					window.gamestate.electricity = false;
				}

				for (var i = 0; i < onNewDayList.length; i++){
					onNewDayList[i]();
				}
			}, displayDayNumTime);
	}
}

var addToOnNewDay = function(f){
	onNewDayList.push(f);
}

var getScaledPoint = function(pt){
	var scalar = imageScalarInverted();

	var x_ = (pt.x * scalar);
	var y_ = (pt.y * scalar);

	return { x : x_, y : y_ };
}

var pausePlayerMovement = function(bool){
	window.gamestate.movement.pauseInput(bool);
}

module.exports = {
	sign:sign,
	mod:mod,
	screenWidth:screenWidth,
	screenHeight:screenHeight,
	halfScreenWidth:halfScreenWidth,
	halfScreenHeight:halfScreenHeight,
	imageScalar:imageScalar,
	imageScalarInverted:imageScalarInverted,
	onScreenSizeChange:onScreenSizeChange,
	numLines:numLines,
	desaturateImage:desaturateImage,
	goToTheNextDay:goToTheNextDay,
	addToOnNewDay:addToOnNewDay,
	getScaledPoint:getScaledPoint,
	mergeImages:mergeImages,
	sleepingCoords:sleepingCoords,
	sleepingCoordsEnd:sleepingCoordsEnd,
	kitchenCoords:kitchenCoords,
	schoolCoords:schoolCoords,
	pausePlayerMovement:pausePlayerMovement,
	colorize:colorize,
	setOpacity:setOpacity,
	glitchCanvas:glitchCanvas,
	clearGlitchedImages:clearGlitchedImages,
	drawGlitches:drawGlitches,
	queueGlitchCapture:queueGlitchCapture,
	glitchImages:glitchImages
};