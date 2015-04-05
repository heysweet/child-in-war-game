var movement = require("movement.js");

/* Overwrite this.onEnd and this.onStart for 
	call-back hooks into when the conversation
	starts and ends */

var Dialogue = function(allowsLoop_){
	var allowsLoop = allowsLoop_;

	var firstPhrase;
	var currentPhrase;

	this.shouldStart = function(){
		return firstPhrase === currentPhrase;
	}

	this.allowsLoop = function(){ return allowsLoop; };
	
	this.getPhrase = function(){
		return currentPhrase;
	}

	this.updatePhrase = function(phrase){
		currentPhrase = phrase;
	}

	this.setFirstPhrase = function(phrase){
		firstPhrase = phrase;
		currentPhrase = firstPhrase;
	}

	this.reset = function(){
		currentPhrase = firstPhrase;
	}
}

Dialogue.prototype.goToNext = function(choiceNum) {
	var phrase = this.getPhrase();
	var next;

	var nextPhrase = phrase.getNext(choiceNum);

	if (nextPhrase === null){
		this.end();
	} else if (nextPhrase === undefined){
		// Do nothing
	} else {
		this.updatePhrase(nextPhrase);
	}
};

Dialogue.prototype.draw = function(){
	var ctx = sald.ctx;
	
	ctx.fillStyle = 'rgb(248, 248, 248)';

	// Dimensions
	var box = {};

	var yBottomBorder = 4;

	box.height = sald.size.y / 4;
	box.x = yBottomBorder;
	box.y = sald.size.y - yBottomBorder - box.height;
	box.width = sald.size.x - (box.x * 2);

	// Draw the box
	ctx.fillRect(box.x, box.y, box.width, box.height);

	// Draw the text
	var phrase = this.getPhrase();

	phrase.draw(box);
}

Dialogue.prototype.start = function(){
	if (this.shouldStart()){
		movement.pause(true);
		gamestate.currentDialogue = this;

		// Callback hooks
		if (this.onStart !== undefined && this.onStart !== null){
			return this.onStart();
		} else {
			return null;
		}
	}
};

Dialogue.prototype.end = function(){
	if (this.allowsLoop()){
		this.reset();
	}

	movement.pause(false);
	gamestate.currentDialogue = null;

	// Callback hooks
	if (this.onEnd !== undefined && this.onEnd !== null){
		return this.onEnd();
	} else {
		return null;
	}
};

module.exports = Dialogue;