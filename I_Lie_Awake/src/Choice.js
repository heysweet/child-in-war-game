var Choice = function(text, nextPhrases, choice){
	this.text = text;
	this.phrases = nextPhrases;

	if (choice == "Friends"){
		this.onChoice = window.gamestate.setFriendsDiary;
	} else if (choice == "Parents"){
		this.onChoice = window.gamestate.setParentsDiary;
	} else {
		this.onChoice = function(){return};
	}
};

module.exports = Choice;