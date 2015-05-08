var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");

/**

	NOTE!! Dialogue only supports dynamic choice branching from the main 
	Dialogue parameter list as follows. Should you want to do more complicated
	branching, follow the Day 1 "Dad Morning" example

**/

//**** Day 1 ****//


// Dad Morning
var choicesDad = [
	new Choice("ok", null)
];

var dadTalks = [
	new Phrase("Dad", "Morning sweetie, I left some breakfast on the table", 3000),
	new Phrase("Dad", "Have a safe trip to school", 2500),
	new Phrase("Dad", "Don't wake mom, she still needs her rest", choicesDad)
];

var dialogueWithDad = new Dialogue(dadTalks);



// Walk to School

var johnnyShucks = [
	new Phrase("Johnny", "awww shucks", 4000),
	new Phrase("Johnny", "see you at school", 4000),
];

var johnnyNoWay = [
	new Phrase("Johnny", "dude no wayyyyyyyyy :O", 4000)
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
	new Phrase("Mom", "Did you leave already?", 3000),
	new Phrase("Mom", "I am worried about the situations recently", 4000),
	new Phrase("Mom", "Stay safe, don't go looking for trouble", 4500),
	new Phrase("Johnny", "yooo coming to school today?", 3000),
	new Phrase("Rachel", "i am! where are you guys?", 1500),
	new Phrase("Johnny", "already hereeee", 1000),
	new Phrase("Sarah", "I will be there soon...", 4000),
	new Phrase("Mom", "Try to avoid crowds and strangers", choices1),
	new Phrase("Rachel", "omw there are soldiers everywhere!", 3000),
	new Phrase("Johnny", "Sam just told me she saw a jeep with a big gun on it!", 3000),
	new Phrase("Andy", "No way Sam is such a liar.", 2000),
	new Phrase("Johnny", "have you seen anything cool yet?", choices2)
];

var dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;


// Walk from School

var choices3 = [
	new Choice("kk i'll be right there", null, "Friends"),
	new Choice("sorry but i got to buy eggs for mom today", null, "Parents")
];

var walkFromSchool = [
	new Phrase("Mom", "I just remembered", 1000),
	new Phrase("Mom", "Can you pick up a dozen eggs from the grocery store today?", 5000),
	new Phrase("Rachel", "hey you coming to the park? :)", 2000),
	new Phrase("Rachel", "we are all going to play hide and seek today! :D", choices3)
];

var dialogueFromSchool = new Dialogue(walkFromSchool);
dialogueFromSchool.onEnd = defaults.goToHome;

// Walk to home

var walkToHome = [
	new Phrase("Johnny", "ttyl dinner with familyyyy", 2000),
	new Phrase("Rachel", "bye bye :)", 1000),
	new Phrase("Sam", "c u tommorw", 1500),
	new Phrase("Sarah", "Be careful on your way home.", 4000)
];

var dialogueToHome = new Dialogue(walkToHome);
dialogueToHome.onEnd = defaults.goToHome;

module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool,
	toHome : dialogueToHome
};