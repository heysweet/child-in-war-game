var processPhrases = function(phrases){
	console.log(phrases);

	if (phrases.length > 0){
		var lastPhrase = phrases[0];

		for (var i = 1; i < phrases.length; i++){
			var phrase = phrases[i];

			if (phrase.duration !== undefined){
				lastPhrase.setNextPhrase(phrase);
			}

			lastPhrase = phrase;
		}
	}
}

var Phrase = function(name, text, duration){
	console.log(this, "TEST");
	this.name = name;
	this.text = text;

	this.choices = [];

	var processChoices = function(self, choices){
		for (var i = 0; i < choices.length; i++){
			var choice = choices[i];

			if (choice.phrases !== null){
				self.addOption(choice.text, choice.phrases[0]);
			}

			var phrases = choice.phrases;

			if (phrases !== null){
				processPhrases(phrases);
			}
		}
	}

	if (isNaN(duration)){
		// what was passed was actually a list of choices
		var choices = duration;
		processChoices(this, choices);
	} else {
		if (duration !== null){
			this.duration = duration;
		}
	}
	
	this.next = null;
}

Phrase.prototype.setNextPhrase = function(phrase){
	this.next = phrase;
};

Phrase.prototype.addOption = function(text_, nextPhrase_){
	var option = {
		text : text_,
		next : nextPhrase_
	};

	this.choices.push(option);
};

Phrase.prototype.getNext = function(choiceNum){
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