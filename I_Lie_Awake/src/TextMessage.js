var utils = require("utils.js");

var MY_TOP_BUBBLE_IMAGE = require("./data/phone/myBubble.png");

var TOP_BUBBLE_IMAGE = require("./data/phone/friendsTop.png");
var MIDDLE_BUBBLE_IMAGE = require("./data/phone/friendsMiddle.png");
var BOTTOM_BUBBLE_IMAGE = require("./data/phone/friendsBottom.png");

var TextMessage = function(message_, isMine){
	var message = "";
	var numLines = 1;

	var heightPerLine = 10;

	var x = -10;
	var y = 330;

	var xOffset = 24;
	var textXOffset = 10;

	var textOffset = {
		x : 42,
		y : 22
	}

	this.setMessage = function(message_){
		message = message_;

		numLines = utils.numLines(message_);
	}

	this.setMessage(message_);

	var drawBubble = function(yOffset){
		var drawY = y - yOffset;
		var ctx = sald.ctx;

		var middle = MIDDLE_BUBBLE_IMAGE;

		if (isMine){
			var bubble = MY_TOP_BUBBLE_IMAGE; 

			drawY -= (middle.height);

			ctx.drawImage(bubble, x + xOffset, drawY - 13);
		} else {
			var top = TOP_BUBBLE_IMAGE; 
			var bottom = BOTTOM_BUBBLE_IMAGE;

			ctx.drawImage(bottom, x, drawY);

			// drawY -= bottom.height;//IMAGE_HEIGHT_OF_BOTTOM_BUBBLE_PART;

			for (var i = 0; i < numLines; i++){
				drawY -= (middle.height);
				ctx.drawImage(middle, x, drawY);
			}

			ctx.drawImage(top, x, drawY - (top.height - 1));
		}

		

		return drawY;
	}

	var drawText = function(yUpdate){
		var drawY = yUpdate + textOffset.y;
		var drawX = x + textOffset.x;

		if (isMine){
			drawX += textXOffset;
		}

		var ctx = sald.ctx;

		ctx.fillStyle = 'rgb(0, 0, 0)';

		ctx.font = "300 24px Gill Sans";
		ctx.wrapText(message, drawX, drawY, 2000, 20);
	}

	this.draw = function(yOffset){
		var yUpdate = drawBubble(yOffset);
		drawText(yUpdate);
	}
};

module.exports = TextMessage;