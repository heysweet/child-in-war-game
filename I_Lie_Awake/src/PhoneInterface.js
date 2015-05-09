var maxHeight = 200;
var utils = require("utils.js");
var TextMessage = require("TextMessage.js");

var BACKGROUND_IMAGE = require("./data/phone/background.png");
var FOREGROUND_IMAGE = require("./data/phone/foreground.png");

var CHOICE_IMAGE = require("./data/phone/choiceBubble.png");
var HOVERED_CHOICE_IMAGE = require("./data/phone/choiceBubbleSelect.png");

var RECIEVED_SOUND = require("./data/sound/Recieve_Message.ogg");
var SENT_SOUND = require("./data/sound/Send_Message.ogg");

var crack = require("./data/phone/crack.png");

var phoneEdge = require("./data/phone/phoneEdge.png");

var addedPhrases = [];
var addingPhrases = false;
var animateOffset = 0;
var requiredOffset = 0;
var elapsedTime = 0;
var animationTime = 0.3;

var halfPi = Math.PI / 2;

function drawOverlay(){
	var ctx = sald.ctx;
	ctx.drawImage(phoneEdge, 0, 0);
}

function drawCrack(){
	var ctx = sald.ctx;
	ctx.drawImage(crack, 0, 0);
}

var getAnimateOffset = function(){
	var scalar = Math.sin(halfPi * elapsedTime/animationTime);

	return requiredOffset * scalar;
}

var PhoneInterface = function(){
	var conversationNum = 0;
	var isDead = false;
	var choiceHover = -1;

	// Mom, Dad, Friends
	var conversations = [
		[], [], [],
	];

	var conversationName = "   Dad";

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

	var animate = function(elapsed){
		elapsedTime += elapsed;
		animateOffset = getAnimateOffset();
		
		if (elapsedTime >= animationTime){
			elapsedTime = 0;
			animateOffset = 0;
			requiredOffset = 0;

			currentMessages.push(addedPhrases[0]);
			addedPhrases.shift();

			if (addedPhrases.length == 0){
				addingPhrases = false;
			}
		}
	}

	var drawMessages = function(){
		var ctx = sald.ctx;

		var runningHeight = animateOffset - requiredOffset;

		for (var i = addedPhrases.length - 1; i >= 0; i--){
			var message = addedPhrases[i];

			var height = message.draw(runningHeight);

			runningHeight += height + messageSpacing;
		}

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
				if (choiceHover == i){
					ctx.drawImage(HOVERED_CHOICE_IMAGE, choiceX, y);
				} else {
					ctx.drawImage(CHOICE_IMAGE, choiceX, y);
				}

				y += CHOICE_IMAGE.height + 4;

				ctx.fillStyle = 'rgb(0, 0, 0)';
				ctx.font = "300 16px Gill Sans";

				var numLines = ctx.measureWrapText(choices[i].text, x, y - 20, 195, 18);

				var offset = 20;

				if (numLines > 1) offset += 8;

				ctx.wrapText(choices[i].text, x, y - offset, 195, 18);
			}
		}
	}

	var drawBackground = function(){
		var ctx = sald.ctx;

		if (isDead){
			ctx.fillStyle = 'rgb(35, 35, 35)';
			ctx.fillRect(backgroundX, backgroundY, BACKGROUND_IMAGE.width, BACKGROUND_IMAGE.height);
		} else {
			ctx.drawImage(BACKGROUND_IMAGE, backgroundX, backgroundY);
		}
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

		if (!isDead){
			if (window.gamestate.isInGame){
				window.gamestate.phoneGame.draw();
			} else {
				drawMessages();
				drawForeground();

				drawChoices();
			}
		}

		if (window.gamestate.phoneIsCracked){
			drawCrack();
		}

		drawOverlay();
	}

	this.loadDialogue = function(dialogue_){
		dialogue = dialogue_;
	}

	this.mouseClick = function(pos){
		if (choices !== undefined && choices != null && choices.length > 0 &&
			pos.x >= choice1.min.x && pos.x <= choice1.max.x){
			var dialogue = gamestate.currentDialogue();

			var phrase;

			if (pos.y >= choice1.min.y && pos.y <= choice1.max.y){
				var choice = choices[0];
				this.addMyText(choice.text);

				if (choice && choice.onChoice){
					choice.onChoice();
				}

				dialogue.goToNext(0);
			} else if (pos.y >= choice2.min.y && pos.y <= choice2.max.y){
				var choice = choices[1];

				this.addMyText(choice.text);

				if (choice && choice.onChoice){
					choice.onChoice();
				}

				dialogue.goToNext(1);
			}
		}
	}

	this.mouse = function(pos){
		if (choices !== undefined && choices != null && choices.length > 0 &&
			pos.x >= choice1.min.x && pos.x <= choice1.max.x){
			var dialogue = gamestate.currentDialogue();

			var phrase;

			if (pos.y >= choice1.min.y && pos.y <= choice1.max.y){
				choiceHover = 0;
			} else if (pos.y >= choice2.min.y && pos.y <= choice2.max.y){
				choiceHover = 1;
			} else {
				choiceHover = -1;
			}
		} else {
			choiceHover = -1;
		}
	}

	this.addTextedPhrase = function(phrase){
		choices = phrase.choices;

		if (phrase.name == "Mom"){
			if (conversationNum !== 0){
				conversationNum = 0;
				currentMessages = conversations[0];
				conversationName = "   Mom";
			}
		} else if (phrase.name == "Dad"){
			if (conversationNum !== 1){
				conversationNum = 1;
				currentMessages = conversations[1];
				conversationName = "   Dad";
			}
		} else if (conversationNum !== 2){
			conversationNum = 2;
			currentMessages = conversations[2];
			conversationName = "Friends";
		}

		if (phrase.text !== null){
			var message = new TextMessage(phrase.text, phrase.name);

			if (!addedPhrases){
				elapsedTime = 0;
			}

			requiredOffset = message.getBubbleHeight();
			addedPhrases.push(message);
			addingPhrases = true;

			if (currentMessages.length > 6){
				currentMessages.splice(0, 1);
			}

			RECIEVED_SOUND.play();
		}
	}

	this.addMyText = function(text){
		choices = [];
		var myMessage = new TextMessage(text);

		if (!addedPhrases){
			elapsedTime = 0;
		}

		requiredOffset = myMessage.getBubbleHeight();
		addedPhrases.push(myMessage);
		addingPhrases = true;

		SENT_SOUND.play();
	}

	this.hidePhone = function(){
		window.gamestate.shouldShowPhone = false;
	}

	this.killPhone = function(){
		isDead = true;
	}

	this.update = function(elapsed){
		if (addingPhrases){
			animate(elapsed);
		}
	}
};

module.exports = PhoneInterface;