var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");

/**

	NOTE!! Dialogue only supports dynamic choice branching from the main 
	Dialogue parameter list as follows. Should you want to do more complicated
	branching, follow the Day 1 "Dad Morning" example

**/

//**** Day 1 ****//


// Dad Morning

var day_1_dad_3 = new Phrase("Dad", "Don't wake mom, she still needs her rest", null);

	// null is the next phrase that the option would take you to
day_1_dad_3.addOption("ok", null);

	// Who it's from, what the message is, number of milliseconds until next message
var day_1_dad_2 = new Phrase("Dad", "Have a safe trip to school :)", 2000);
var day_1_dad_1 = new Phrase("Dad", "Morning sweetie, I left some breakfast on the table", 2000);

day_1_dad_1.setNextPhrase(day_1_dad_2);
day_1_dad_2.setNextPhrase(day_1_dad_3);


var dialogueWithDad = new Dialogue(day_1_dad_1);



// Walk to School

var mikeShucks = [
	new Phrase("Mike", "awww shucks", 2000),
	new Phrase("Mike", "see you at school", 2000),
];

var mikeNoWay = [
	new Phrase("Mike", "dude no wayyyyyyyyy :O", 2000)
];

var choices2 = [
	new Choice("just some soldiers, nothing exciting", mikeShucks),
	new Choice("oh yeah? i saw a tank", mikeNoWay)
];

	// null will make sure it jumps back into the next phrase in the main dialogue
var choices1 = [
	new Choice("don't worry mom, i'll be ok", null),
	new Choice("you worry too much mom", null)
];

var walkToSchool = [
	new Phrase("Mom", "Did you leave already?", 2000),
	new Phrase("Mom", "I am worried about the situations recently", 2000),
	new Phrase("Mom", "Stay safe, don't go looking for trouble", 2000),
	new Phrase("Mike", "yooo coming to school today?", 2000),
	new Phrase("Rachel", "i am! where are you guys?", 2000),
	new Phrase("Mike", "already hereeee", 2000),
	new Phrase("Sarah", "I will be there soon...", 2000),
	new Phrase("Mom", "Try to avoid crowds and strangers", choices1),
	new Phrase("Rachel", "omw there are soldiers everywhere!", 2000),
	new Phrase("Mike", "[skip text]... have you seen anything cool yet?", choices2),
];

var dialogueToSchool = new Dialogue(walkToSchool);


// Walk from School

var walkFromSchool = [
];

var dialogueFromSchool = new Dialogue(walkFromSchool);

module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool
};