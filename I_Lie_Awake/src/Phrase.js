var processPhrases = function(phrases){
	if (phrases.length > 0){
		var lastPhrase = phrases[0];

		for (var i = 1; i < phrases.length; i++){
			var phrase = phrases[i];

			// if (phrase.text == "Don't lie to me!"){
				console.log("WOOT", phrases, lastPhrase, phrase);
			// }

			if (phrase.duration !== undefined){
				lastPhrase.next = phrase;
				console.log(lastPhrase);
			}

			lastPhrase = phrase;
		}
	}
}

var Phrase = function(name, text, duration){
	this.name = name;
	this.text = text;

	this.choices = [];

	var processChoices = function(self, choices){
		for (var i = 0; i < choices.length; i++){
			var choice = choices[i];

			if (choice.phrases !== null){
				self.addOption(choice.text, choice.phrases[0], choice.onChoice);
				processPhrases(choice.phrases);
			} else {
				self.addOption(choice.text, null, choice.onChoice);
			}
		}
	}

	this.next = null;


	if (isNaN(duration)){
		// what was passed was actually a list of choices
		var choices = duration;
		processChoices(this, choices);
		this.duration = 200;
	} else {
		if (duration !== null){
			this.duration = duration;
		}
	}

	console.log("PHRASE: ", text, duration, this.duration);
}

Phrase.prototype.addOption = function(text_, nextPhrase_, onChoice_){
	var option = {
		text : text_,
		next : nextPhrase_,
		onChoice : onChoice_
	};

	this.choices.push(option);
};

Phrase.prototype.getNext = function(choiceNum){
	console.log(this.text, "->", this.next);

	if (choiceNum === undefined){
		if (this.choices.length == 0){
			return this.next;
		} else {
			return undefined;
		}
	} else if (choiceNum < 0 || this.choices.length == 0){
		return undefined;
	} else if (choiceNum >= this.choices.length) {
		return null;
	}
	
	return this.choices[choiceNum].next;
}

Phrase.prototype.draw = function(box){
	var ctx = sald.ctx;

	var border = 4;
	var pxHeight = 12;

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = pxHeight.toString() + "px Georgia";
	ctx.fillText(this.text, box.x + border, box.y + border + pxHeight, 
		box.width - (2 * border));

	
	var yOffsetDelta = pxHeight + 4;
	var yOffset = yOffsetDelta;

	for (var i = 0; i < this.choices.length; i++){
		ctx.fillText(this.choices[i].text, box.x + border, box.y + border + pxHeight + yOffset, 
			box.width - (2 * border));
		yOffset += yOffsetDelta;
	}
}



// Phrase.draw = Phrase.prototype.setNextPhrase;
// Phrase.draw = Phrase.prototype.addOption;
// Phrase.draw = Phrase.prototype.getNext;
// Phrase.draw = Phrase.prototype.draw;

module.exports = Phrase;