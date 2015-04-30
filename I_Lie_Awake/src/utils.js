var onNewDayList = [];

var sleepingCoords = {
	x : 149.41686328001853,
	y : 83.45958860959138
};

var playgroundCoords = {
	x : 149.41686328001853,
	y : 83.45958860959138
};

var schoolCoords = {
	x : 149.41686328001853,
	y : 83.45958860959138
};

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
		console.log(images[i].width, images[i].height);
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

	for (var i = 0; i < onNewDayList.length; i++){
		onNewDayList[i]();
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

module.exports = {
	sign:sign,
	screenWidth:screenWidth,
	screenHeight:screenHeight,
	halfScreenWidth:halfScreenWidth,
	halfScreenHeight:halfScreenHeight,
	imageScalar:imageScalar,
	imageScalarInverted:imageScalarInverted,
	onScreenSizeChange:onScreenSizeChange,
	numLines:numLines,
	desaturateImage:desaturateImage,
	addToOnNewDay:addToOnNewDay,
	getScaledPoint:getScaledPoint,
	mergeImages:mergeImages,
	sleepingCoords:sleepingCoords,
	playgroundCoords:playgroundCoords,
	schoolCoords:schoolCoords,
};