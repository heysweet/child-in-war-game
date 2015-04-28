var maxHeight = 200;
var utils = require("utils.js");
var TextMessage = require("TextMessage.js");

var BACKGROUND_IMAGE = require("./data/phone/background.png");
var FOREGROUND_IMAGE = require("./data/phone/foreground.png");

var PhoneInterface = function(){
	var currentMessages = [];
	var dialogue;

	var messageSpacing = 4;

	var backgroundX = 0;
	var backgroundY = 0;

	var textMessage = new TextMessage("This is a test", true);

	var drawMessages = function(){
		var ctx = sald.ctx;

		ctx.font = "36px Indie Flower";
		ctx.fillText("Indie Flower",10,50);

		var runningHeight = 0;

		for (var i = currentMessages.length - 1; i >= 0; i--){
			var message = currentMessages[i];

			message.draw(runningHeight);

			var height = message.height;
			runningHeight += height + messageSpacing;
		}
	}

	var drawBackground = function(){
		var ctx = sald.ctx;
		ctx.drawImage(BACKGROUND_IMAGE, backgroundX, backgroundY);
	}

	var drawForeground = function(){
		var ctx = sald.ctx;
		ctx.drawImage(FOREGROUND_IMAGE, backgroundX, backgroundY);
	}

	this.draw = function(){
		drawBackground();
		drawMessages();
		drawForeground();

		textMessage.draw(0);
	}

	this.loadDialogue = function(dialogue_){
		dialogue = dialogue_;
	}

	this.mouse = function(pos){

	}
};

module.exports = PhoneInterface;