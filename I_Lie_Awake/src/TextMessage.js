var utils = require("utils.js");

var MY_TOP_BUBBLE_IMAGE = require("./data/phone/myBubble.png");

var TOP_BUBBLE_IMAGE = require("./data/phone/friendsTop.png");
var MIDDLE_BUBBLE_IMAGE = require("./data/phone/friendsMiddle.png");
var BOTTOM_BUBBLE_IMAGE = require("./data/phone/friendsBottom.png");

var TextMessage = function(message_, name){
	var message = "";
	var numLines = 1;

	var isMine = false;
	var shouldWriteName = false;

	var messageFont = "300 16px Gill Sans";

	if (name === undefined){
		isMine = true;
	} else if (name !== "Mom" && name !== "Dad"){
		shouldWriteName = true;
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

	var drawBubble = function(yOffset){
		var drawY = y - yOffset;
		var ctx = sald.ctx;

		var height = 0;

		var middle = MIDDLE_BUBBLE_IMAGE;

		if (isMine){
			var bubble = MY_TOP_BUBBLE_IMAGE; 

			drawY -= (middle.height);

			ctx.drawImage(bubble, x + xOffset, drawY - 13);

			height = 53;
		} else {
			var top = TOP_BUBBLE_IMAGE; 
			var bottom = BOTTOM_BUBBLE_IMAGE;

			ctx.drawImage(bottom, x, drawY);

			height += bottom.height;

			// drawY -= bottom.height;//IMAGE_HEIGHT_OF_BOTTOM_BUBBLE_PART;

			for (var i = 0; i < numLines; i++){
				drawY -= (middle.height);
				ctx.drawImage(middle, x, drawY);
				height += middle.height;
			}

			height += top.height - 1;
			ctx.drawImage(top, x, drawY - (top.height - 1));
		}

		return {height:height, drawY:drawY};
	}

	var drawText = function(yOffset, json){
		var yUpdate = json.drawY;

		var drawY = yUpdate + textOffset.y;
		var drawX = x + textOffset.x;

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

	this.draw = function(yOffset){
		var json = drawBubble(yOffset);
		drawText(yOffset, json);

		return json.height;
	}
};

module.exports = TextMessage;