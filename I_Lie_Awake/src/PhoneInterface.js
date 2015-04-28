var maxHeight = 200;
var utils = require("utils.js");
var TextMessage = require("TextMessage.js");

var BACKGROUND_IMAGE = require("./data/phone/background.png");
var FOREGROUND_IMAGE = require("./data/phone/foreground.png");

var PhoneInterface = function(){
	var conversationNum = 0;

	// Mom, Dad, Friends
	var conversations = [
		[], [], [],
	];

	var currentMessages = conversations[0];
	var dialogue;

	var messageSpacing = 4;

	var backgroundX = 0;
	var backgroundY = 0;

	var drawMessages = function(){
		var ctx = sald.ctx;

		var runningHeight = 0;

		for (var i = currentMessages.length - 1; i >= 0; i--){
			var message = currentMessages[i];

			var height = message.draw(runningHeight);

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
	}

	this.loadDialogue = function(dialogue_){
		dialogue = dialogue_;
	}

	this.mouse = function(pos){

	}

	this.addTextedPhrase = function(phrase){
		if (phrase.name == "Mom"){
			if (conversationNum !== 0){
				currentMessages = conversations[0];
			}
		} else if (phrase.name == "Dad"){
			if (conversationNum !== 1){
				currentMessages = conversations[1];
			}
		} else if (conversationNum !== 2){
			currentMessages = conversations[2];
		}

		var message = new TextMessage(phrase.text, phrase.name);

		currentMessages.push(message);

		if (currentMessages.length > 6){
			currentMessages.splice(0, 1);
		}
	}

	this.addMyText = function(text){
		var myMessage = new TextMessage(text);

		currentMessages.push(myMessage);
	}
};

module.exports = PhoneInterface;