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
var bubbleAnimateOffset = 0;
var bubbleRequiredOffset = 0;
var bubbleElapsedTime = 0;
var bubbleAnimationTime = 0.3;

var oldConversationName = null;
var oldConversationNum = null;

var clipTransform = {
	x : 8,
	y : 17,
	width : 256,
	height : 481
};

var inTransition = false;
var conversationAnimateOffset = 0;
var conversationRequiredOffset = 255;
var conversationElapsedTime = 0;
var conversationAnimationTime = 0.45;

var halfPi = Math.PI / 2;

function getConversationNum(name){
	if (name == "Dad"){
		return 0;
	} else if (name == "Mom"){
		return 1;
	} else {
		return 2;
	}
}

function drawOverlay(){
	var ctx = sald.ctx;
	ctx.drawImage(phoneEdge, 0, 0);
}

function drawCrack(){
	var ctx = sald.ctx;
	ctx.drawImage(crack, 0, 0);
}

var getBubbleAnimateOffset = function(){
	var scalar = Math.sin(halfPi * bubbleElapsedTime/bubbleAnimationTime);

	return bubbleRequiredOffset * scalar;
}

var getConversationAnimateOffset = function(){
	var scalar = Math.sin(halfPi * conversationElapsedTime/conversationAnimationTime);

	return conversationRequiredOffset * scalar;
}

var PhoneInterface = function(){
	var conversationNum = 0;
	var isDead = false;
	var choiceHover = -1;

	// Mom, Dad, Friends
	var conversations = [
		[], [], [],
	];

	var conversationName = "Dad";

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
		x : BACKGROUND_IMAGE.width/2,
		y : 50
	}

	var animateBubbles = function(elapsed){
		bubbleElapsedTime += elapsed;
		bubbleAnimateOffset = getBubbleAnimateOffset();
		
		if (bubbleElapsedTime >= bubbleAnimationTime){
			bubbleElapsedTime = 0;
			bubbleAnimateOffset = 0;
			bubbleRequiredOffset = 0;

			var json = addedPhrases[0];
			var num = json.conversationNum;

			var messages = conversations[num];

			messages.push(json.message);
			addedPhrases.shift();

			if (addedPhrases.length == 0){
				addingPhrases = false;
			}
		}
	}

	var animateTransition = function(elapsed){
		conversationElapsedTime += elapsed;
		conversationAnimateOffset = -inTransition * getConversationAnimateOffset();

		if (conversationElapsedTime >= conversationAnimationTime){
			inTransition = false;
			conversationElapsedTime = 0;
			conversationAnimateOffset = 0;

			currentMessages = conversations[conversationNum];
		}
	}


	var drawMessages = function(){
		var ctx = sald.ctx;

		var runningHeight = bubbleAnimateOffset - bubbleRequiredOffset;
		var xOffset = conversationAnimateOffset;
		var xOffset2 = xOffset;
		var runningHeight_ = 0;

		var additionalOffset = inTransition * conversationRequiredOffset;

		if (inTransition){
			xOffset2 = xOffset + additionalOffset;
		}

		for (var i = addedPhrases.length - 1; i >= 0; i--){
			var json = addedPhrases[i];
			var message = json.message;

			if (json.conversationNum == conversationNum){
				var height = message.draw(xOffset2, runningHeight);

				runningHeight += height + messageSpacing;
			} else {
				var height = message.draw(xOffset, runningHeight_);

				runningHeight_ += height + messageSpacing;
			}

		}

		if (inTransition){
			var oldMessages = conversations[oldConversationNum];

			for (var i = oldMessages.length - 1; i >= 0; i--){
				var message = oldMessages[i];

				var height = message.draw(xOffset, runningHeight_);

				runningHeight_ += height + messageSpacing;
			}
		}

		for (var i = currentMessages.length - 1; i >= 0; i--){
			var message = currentMessages[i];

			var height = message.draw(xOffset2, runningHeight);

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

		var textAlign = ctx.textAlign;
		ctx.textAlign = "center"; 

		ctx.fillStyle = 'rgb(76, 193, 252)';
		ctx.font = "300 18px Gill Sans";

		if (inTransition){
			var additionalOffset = inTransition * conversationRequiredOffset;

			ctx.fillText(oldConversationName, 
				chatTitleTransform.x + conversationAnimateOffset, 
				chatTitleTransform.y);

			ctx.fillText(conversationName, 
				chatTitleTransform.x + conversationAnimateOffset + additionalOffset, 
				chatTitleTransform.y);
		} else {
			ctx.fillText(conversationName, 
				chatTitleTransform.x, 
				chatTitleTransform.y);
		}

		ctx.textAlign = textAlign;
	}

	this.draw = function(){
		drawBackground();
		var ctx = sald.ctx;

		if (inTransition){
			ctx.save();
			ctx.rect(clipTransform.x, clipTransform.y, clipTransform.width, clipTransform.height);
			ctx.clip();
		}

		if (!isDead){
			if (window.gamestate.isInGame){
				window.gamestate.phoneGame.draw();

				if (inTransition){
					ctx.restore();
				}
			} else {
				drawMessages();

				drawForeground();

				if (inTransition){
					ctx.restore();
				}

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

				if (choice){
					this.addMyText(choice.text);

					if (choice && choice.onChoice){
						choice.onChoice();
					}

					dialogue.goToNext(1);
				}
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

	var transitionTo = function(name, num){
		oldConversationName = conversationName;
		oldConversationNum = conversationNum;

		conversationName = name;
		conversationNum = num;
		currentMessages = conversations[num];

		 if (oldConversationNum > conversationNum){
			inTransition = -1;
		} else {
			inTransition = 1;
		}
	}

	var queueMessage = function(message){

		var payload = {
			message : message,
			conversationNum : conversationNum
		};

		bubbleRequiredOffset = message.getBubbleHeight();
		addedPhrases.push(payload);
		addingPhrases = true;
	}

	this.addTextedPhrase = function(phrase){
		choices = phrase.choices;

		if (phrase.name == "Dad"){
			if (conversationNum !== 0){
				transitionTo("Dad", 0);
			}
		} else if (phrase.name == "Mom"){
			if (conversationNum !== 1){
				transitionTo("Mom", 1);
				// conversationNum = 1;
				// currentMessages = conversations[1];
				// conversationName = "Dad";
			}
		} else if (conversationNum !== 2){
			transitionTo("Friends", 2);
			// conversationNum = 2;
			// currentMessages = conversations[2];
			// conversationName = "Friends";
		}

		if (phrase.text !== null){
			var message = new TextMessage(phrase.text, phrase.name);

			if (!addedPhrases){
				bubbleElapsedTime = 0;
			}

			queueMessage(message);

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
			bubbleElapsedTime = 0;
		}

		queueMessage(myMessage);

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
			animateBubbles(elapsed);
		}

		if (inTransition){
			animateTransition(elapsed);
		}
	}
};

module.exports = PhoneInterface;