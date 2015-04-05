var Character = require("character.js").Character;

function InteractiveCharacter(startX, startY, width, height, dialogue){
	Character.call(this, startX, startY, width, height);

	this.dialogue = dialogue;
}

InteractiveCharacter.prototype = Object.create(Character.prototype);

InteractiveCharacter.prototype.constructor = InteractiveCharacter;

InteractiveCharacter.prototype.startDialogue() = function(){
	this.dialogue.startDialogue();
}

InteractiveCharacter.prototype.continueDialogue() = function(choiceNum){
	this.dialogue.continueDialogue(choiceNum);
}


module.exports = {
	InteractiveCharacter:InteractiveCharacter
};