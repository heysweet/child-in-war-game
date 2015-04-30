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

var johnnyShucks = [
	new Phrase("Johnny", "awww shucks", 2000),
	new Phrase("Johnny", "see you at school", 2000),
];

var johnnyNoWay = [
	new Phrase("Johnny", "dude no wayyyyyyyyy :O", 2000)
];

var choices2 = [
	new Choice("just some soldiers, nothing exciting", johnnyShucks),
	new Choice("oh yeah? i saw a tank", johnnyNoWay)
];

	// null will make sure it jumps back into the next phrase in the main dialogue
	// Whenever a dialogue path
var choices1 = [
	new Choice("don't worry mom, i'll be ok", null),
	new Choice("you worry too much mom", null)
];

var walkToSchool = [
	new Phrase("Mom", "Did you leave already?", 2000),
	new Phrase("Mom", "I am worried about the situations recently", 2000),
	new Phrase("Mom", "Stay safe, don't go looking for trouble", 2000),
	new Phrase("Johnny", "yooo coming to \nschool today?", 2000),
	new Phrase("Rachel", "i am! where are you guys?", 2000),
	new Phrase("Johnny", "already hereeee", 2000),
	new Phrase("Sarah", "I will be there soon...", 2000),
	new Phrase("Mom", "Try to avoid crowds and strangers", choices1),
	new Phrase("Rachel", "omw there are soldiers everywhere!", 2000),
	new Phrase("Johnny", "brenda just told me he saw a jeep with a big gun on it!", 2000),
	new Phrase("Andy", "No way brenda is such a liar.", 2000),
	new Phrase("Johnny", "have you seen anything cool yet?", choices2)
];

var dialogueToSchool = new Dialogue(walkToSchool);


// Walk from School

var choices3 = [
	new Choice("kk i’ll be right there", null),
	new Choice("sorry but i got to buy eggs for mom today", null)
];

var walkFromSchool = [
	new Phrase("Mom", "I just remembered", 2000),
	new Phrase("Mom", "Can you pick up a dozen eggs from the grocery store today?", 2000),
	new Phrase("Rachel", "hey you coming to the park? :)", 2000),
	new Phrase("Rachel", "we are all going to play hide and seek today! :D", choices3)
];

var dialogueFromSchool = new Dialogue(walkFromSchool);


// Walk to home

var walkToHome = [
	new Phrase("Johnny", "ttyl dinner with familyyyy", 2000),
	new Phrase("Rachel", "bye bye :)", 2000),
	new Phrase("Brenda", "c u tommorw", 2000),
	new Phrase("Sarah", "Be careful on your way home.", 2000)
];

var dialogueToHome = new Dialogue(walkToHome);

module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool
};