var maxHeight = 200;
var utils = require("utils.js");

var PhoneInterface = function(){
	var currentMessages = [];
	var dialogue;

	var messageSpacing = 4;

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

	this.draw = function(){
		drawMessages();
	}

	this.loadDialogue = function(dialogue_){
		dialogue = dialogue_;
	}
};

module.exports = PhoneInterface;