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
	new Choice("yeah uh huh", null),
	new Choice("sure", null)
];

var dadTalks = [
	new Phrase("Dad", "Morning sweetie, Have a safe trip to school", 	000),
	new Phrase("Dad", "Don't wake mom, she still needs her rest", choicesDad)
];

var dialogueWithDad = new Dialogue(dadTalks);



// Walk to School

var johnnyBoring = [
	new Phrase("Johnny", "borriiiiinnngggggg", 4000),
];

var johnnyNoWay = [
	new Phrase("Johnny", "dude no wayyyyyyyyy", 4000)
];


var choices1 = [
	new Choice("i just beat it", null),
	new Choice("i just lost", null),
];

var choices2 = [
	new Choice("yes", null),
	new Choice("no", null),
];

var choices3 = [
	new Choice("wow noob", null),
	new Choice("you'll do better next time", null),
];

var choices4 = [
	new Choice("you worry too much mom", null),
	new Choice("no problem!", null),
];

var choices5 = [
	new Choice("thats cool", null),
	new Choice("thats scary", null),
];

var choices6 = [
	new Choice("just some soldiers, nothing exciting", johnnyBoring),
	new Choice("oh yeah? i saw a tank", johnnyNoWay)
];

var walkToSchool = [
	new Phrase("Johnny", "yooo", 2000),
	new Phrase("Johnny", "hows that game ur playing?", choices1),
	new Phrase("Johnny", "oh me tooooo!", 2000),
	new Phrase("Johnny", "are u having fun?", choices2),
	new Phrase("Johnny", "oh ok", 2000),
	new Phrase("Johnny", "im heading to school nowww", 2000),
	new Phrase("Sarah", "oh me too. i just lost :(", choices3),
	new Phrase("Mom", "Did you leave already?", 2000),
	new Phrase("Mom", "Stay safe, don't go looking for trouble.", choices4),
	new Phrase("Rachel", "omw there are soldiers everywhere! :O", 2000),
	new Phrase("Johnny", "sam just told me she saw a jeep with a big gun on it!", choices5),
	new Phrase("Andy", "No way Sam is such a liar.", 2000),
	new Phrase("Johnny", "have you seen anything cool yet?", choices6),
];

var dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;


// Walk from School

var choices7 = [
	new Choice("kk i'll be right there", null, "Friends"),
	new Choice("sorry but i got to buy eggs for mom today", null, "Parents")
];

var walkFromSchool = [
	new Phrase("Mom", "I just remembered", 1000),
	new Phrase("Mom", "Can you pick up a dozen eggs from the grocery store today?", 5000),
	new Phrase("Rachel", "hey you coming to the johnny's? :)", 2000),
	new Phrase("Rachel", "we are all going to play xbox today! :D", choices7)
];

var dialogueFromSchool = new Dialogue(walkFromSchool);
dialogueFromSchool.onEnd = defaults.goToHome;

// Walk to home

var walkToHome = [];

var dialogueToHome = new Dialogue(walkToHome);
dialogueToHome.onEnd = defaults.goToHome;

module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool,
	toHome : dialogueToHome
};