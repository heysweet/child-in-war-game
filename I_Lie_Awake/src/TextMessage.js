var utils = require("utils.js");

var MY_TOP_BUBBLE_IMAGE = utils.colorize(require("./data/phone/myBubble.png"), [250, 250, 250]);

var TOP_BUBBLE_IMAGE = require("./data/phone/friendsTop.png");
var MIDDLE_BUBBLE_IMAGE = require("./data/phone/friendsMiddle.png");
var BOTTOM_BUBBLE_IMAGE = require("./data/phone/friendsBottom.png");

var topBubbles = [];
var middleBubbles = [];
var bottomBubbles = [];

var colors = [
	[255, 249, 213], // yellow, Sarah
	[255, 229, 234], // pink, Sam
	[238, 255, 234], // green, Andy
	[229, 252, 255], // blue, Dad
	[235, 232, 255], // purple, Johnny
	[255, 233, 212], // orange, Mom
	[245, 225, 255], // light purple, Rachel
	[220, 255, 240] // turquoise, Mike
]

var getBubbleIndex = function(name){
	switch (name) {
		case "Sarah":
			return 0;
		case "Sam":
			return 1;
		case "Andy":
			return 2;
		case "Dad":
			return 3;
		case "Johnny":
			return 4;
		case "Mom":
			return 5;
		case "Rachel":
			return 6;
		// case "Mike":
		// return 7;
	}

	return 7;
}

var bubbles = [];

var setupBubbles = function(){
	for (var i = 0; i < colors.length; i++){
		var color = colors[i];

		var top = utils.colorize(TOP_BUBBLE_IMAGE, color);
		var middle = utils.colorize(MIDDLE_BUBBLE_IMAGE, color);
		var bottom = utils.colorize(BOTTOM_BUBBLE_IMAGE, color);

		topBubbles.push(top);
		middleBubbles.push(middle);
		bottomBubbles.push(bottom);
	}
}

setupBubbles();

var TextMessage = function(message_, name){
	var message = "";
	var numLines = 1;

	var isMine = false;
	var shouldWriteName = false;

	var bubbleIndex;
	var topBubble;
	var midBubble;
	var btmBubble;
	var bubbleHeight_ = null;

	var messageFont = "300 16px Gill Sans";

	if (name === undefined){
		isMine = true;
	} else if (name !== "Mom" && name !== "Dad"){
		shouldWriteName = true;
		bubbleIndex = getBubbleIndex(name);

		topBubble = topBubbles[bubbleIndex];
		midBubble = middleBubbles[bubbleIndex];
		btmBubble = bottomBubbles[bubbleIndex];
	} else {
		bubbleIndex = getBubbleIndex(name);

		topBubble = topBubbles[bubbleIndex];
		midBubble = middleBubbles[bubbleIndex];
		btmBubble = bottomBubbles[bubbleIndex];
	}

	var heightPerLine = 10;

	var x = -10;
	var y = 330;

	var xOffset = 24;
	var textXOffset = 10;

	var textOffset = {
		x : 42,
		y : 20
	}

	this.setMessage = function(message_){
		message = message_;

		var ctx = sald.ctx;

		if (ctx){
			ctx.font = messageFont;
			numLines = ctx.measureWrapText(message, 0, 0, 195, 20);
		} else {
			numLines = 2;
		}
	}

	this.setMessage(message_);

	var drawBubble = function(xOffset_, yOffset){
		var drawY = y - yOffset;
		var ctx = sald.ctx;

		var height = 0;

		var middle = midBubble;

		if (isMine){
			var bubble = MY_TOP_BUBBLE_IMAGE; 

			drawY -= (MIDDLE_BUBBLE_IMAGE.height);

			ctx.drawImage(bubble, x + xOffset + xOffset_, drawY - 13);

			height = 53;
		} else {
			var top = topBubble; 
			var bottom = btmBubble;

			ctx.drawImage(bottom, x + xOffset_, drawY);

			height += bottom.height;

			// drawY -= bottom.height;//IMAGE_HEIGHT_OF_BOTTOM_BUBBLE_PART;

			for (var i = 0; i < numLines; i++){
				drawY -= (middle.height);
				ctx.drawImage(middle, x + xOffset_, drawY);
				height += middle.height;
			}

			height += top.height - 1;
			ctx.drawImage(top, x + xOffset_, drawY - (top.height - 1));
		}

		bubbleHeight_ = height;

		return {height:height, drawY:drawY};
	}

	var drawText = function(xOffset_, yOffset, json){
		var yUpdate = json.drawY;

		var drawY = yUpdate + textOffset.y;
		var drawX = x + textOffset.x + xOffset_;

		if (isMine){
			var offset = 0;

			if (numLines > 1){
				offset = 8;
			}

			drawX += textXOffset;
			drawY -= offset;
		}

		var ctx = sald.ctx;

		ctx.fillStyle = 'rgb(0, 0, 0)';

		ctx.font = messageFont;
		ctx.wrapText(message, drawX, drawY, 195, 20);

		if (shouldWriteName){
			ctx.fillStyle = 'rgb(100, 100, 100)';
			ctx.font = "300 12px Gill Sans";

			ctx.fillText(name, drawX, yUpdate + json.height - 14);
		}
	}

	this.getBubbleHeight = function(){
		if (bubbleHeight_){
			return bubbleHeight_;
		}

		var height = 0;
		var middle = midBubble;

		if (isMine){
			height = 53;
		} else {
			var top = topBubble; 
			var bottom = btmBubble;
			height += bottom.height;

			for (var i = 0; i < numLines; i++){
				height += middle.height;
			}

			height += top.height - 1;
		}

		return height;
	}

	this.draw = function(xOffset, yOffset){
		var json = drawBubble(xOffset, yOffset);
		drawText(xOffset, yOffset, json);

		return json.height;
	}
};

module.exports = TextMessage;