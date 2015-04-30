var maxHeight = 200;
var utils = require("utils.js");
var TextMessage = require("TextMessage.js");

var BACKGROUND_IMAGE = require("./data/phone/background.png");
var FOREGROUND_IMAGE = require("./data/phone/foreground.png");

var CHOICE_IMAGE = require("./data/phone/choiceBubble.png");

var RECIEVED_SOUND = require("./data/sound/Recieve_Message.ogg");
var SENT_SOUND = require("./data/sound/Send_Message.ogg");

var PhoneInterface = function(){
	var conversationNum = 0;

	// Mom, Dad, Friends
	var conversations = [
		[], [], [],
	];

	var conversationName = "  Mom";

	var choices = [];

	var currentMessages = conversations[0];
	var dialogue;

	var messageSpacing = 4;

	var backgroundX = 0;
	var backgroundY = 0;

	var choiceX = -1;
	var choiceY = 381;

	var choice1 = {
		min : {
			x : 32,
			y : 387
		},
		max : {
			x : 236,
			y : 426
		}
	}

	var choice2 = {
		min : {
			x : 32,
			y : 433
		},
		max : {
			x : 236,
			y : 472
		}
	}

	var chatTitleTransform = {
		x : 102,
		y : 50
	}

	var drawMessages = function(){
		var ctx = sald.ctx;

		var runningHeight = 0;

		for (var i = currentMessages.length - 1; i >= 0; i--){
			var message = currentMessages[i];

			var height = message.draw(runningHeight);

			runningHeight += height + messageSpacing;
		}
	}

	var drawChoices = function(){
		if (choices !== null && choices !== undefined && choices.length > 0){
			var ctx = sald.ctx;

			var y = choiceY;
			var x = choiceX + 36;

			for (var i = 0; i < choices.length; i++){
				ctx.drawImage(CHOICE_IMAGE, choiceX, y);

				y += CHOICE_IMAGE.height + 4;

				ctx.fillStyle = 'rgb(0, 0, 0)';
				ctx.font = "300 16px Gill Sans";

				ctx.fillText(choices[i].text, x, y - 20);
			}
		}
	}

	var drawBackground = function(){
		var ctx = sald.ctx;
		ctx.drawImage(BACKGROUND_IMAGE, backgroundX, backgroundY);
	}

	var drawForeground = function(){
		var ctx = sald.ctx;
		ctx.drawImage(FOREGROUND_IMAGE, backgroundX, backgroundY);

		ctx.fillStyle = 'rgb(76, 193, 252)';
		ctx.font = "300 18px Gill Sans";
		ctx.fillText(conversationName, chatTitleTransform.x, chatTitleTransform.y);
	}

	this.draw = function(){
		drawBackground();
		drawMessages();
		drawForeground();

		drawChoices();
	}

	this.loadDialogue = function(dialogue_){
		dialogue = dialogue_;
	}

	this.mouse = function(pos){
		if (choices !== undefined && choices != null && choices.length > 0 &&
			pos.x >= choice1.min.x && pos.x <= choice1.max.x){
			var dialogue = gamestate.currentDialogue();

			var phrase;

			console.log(choices);

			if (pos.y >= choice1.min.y && pos.y <= choice1.max.y){
				this.addMyText(choices[0].text);

				dialogue.goToNext(0);

				console.log("BUTTON 1");
			} else if (pos.y >= choice2.min.y && pos.y <= choice2.max.y){
				this.addMyText(choices[1].text);

				dialogue.goToNext(1);
				
				console.log("BUTTON 2");
			}
		}
	}

	this.addTextedPhrase = function(phrase){
		choices = phrase.choices;

		console.log(choices, phrase.name, conversationNum);

		if (phrase.name == "Mom"){
			if (conversationNum !== 0){
				conversationNum = 0;
				currentMessages = conversations[0];
				conversationName = "  Mom";
			}
		} else if (phrase.name == "Dad"){
			if (conversationNum !== 1){
				conversationNum = 1;
				currentMessages = conversations[1];
				conversationName = "  Dad";
			}
		} else if (conversationNum !== 2){
			conversationNum = 2;
			currentMessages = conversations[2];
			conversationName = "Friends";
		}

		var message = new TextMessage(phrase.text, phrase.name);

		currentMessages.push(message);

		if (currentMessages.length > 6){
			currentMessages.splice(0, 1);
		}

		RECIEVED_SOUND.play();
	}

	this.addMyText = function(text){
		var myMessage = new TextMessage(text);

		currentMessages.push(myMessage);

		SENT_SOUND.play();
	}
};

module.exports = PhoneInterface;