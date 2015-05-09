var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");


// // Dad Morning
// var choicesDad = [
// 	new Choice("yeah ok", null),
// 	new Choice("sure", null)
// ];

// var dadTalks = [
// 	new Phrase("Dad", "Morning sweetie, Have a safe trip to school", 3000),
// 	new Phrase("Dad", "Don't wake mom, she still needs her rest", choicesDad)
// ];

// var dialogueWithDad = new Dialogue(dadTalks);

// Dad Morning

var choices1 = [
	new Choice("fine", null),
	new Choice("am i dead?", null),
];

var choices2 = [
	new Choice("alright", null),
	new Choice("is everything alright?", null),
];

morningTexts = [
	new Phrase("Dad", "Morning sweetie", 2000),
	new Phrase("Dad", "How'd you sleep?", choices1),
	new Phrase("Dad", "I'm taking mom to the hospital", 2000),
	new Phrase("Dad", "Don't worry about us", choices2)
];

dialogueWithDad = new Dialogue(morningTexts);
dialogueWithDad.onEnd = defaults.goToStreet;

// Walk to School



var choices3 = [
	new Choice("ok i guess", null),
	new Choice("are you alright?", null),
];

var choices4 = [
	new Choice("dont worry mom", null),
	new Choice("but i was!!!!", null),
];

var choices4b = [
	new Choice("woah", null),
	new Choice("i think my phone's broken...", null),
];

var choices5 = [
	new Choice("party pooper!", null),
	new Choice("guys cut it out", null),
];

walkToSchool = [
	new Phrase("Mom", "Good morning.", 2000),
	new Phrase("Mom", "How are you doing?",  choices3),
	new Phrase("Mom", "Well you should be more careful.", 2000),
	new Phrase("Mom", "A bomb blew up yesterday afternoon on the path you take to school.", 2000),
	new Phrase("Mom", "I was worried sick. What if you had been near that?", choices4),
	new Phrase("Johnny", "hey hey did u guys hear? there was an explosionnnnn yesterday!", 2000),
	new Phrase("Andy", "No way.", choices4b),
	new Phrase("Sam", "yeah i heard it omw home!", 2000),
	new Phrase("Sam", "didnt c anyting :(", 2000),
	new Phrase("Sarah", "Why do you sound excited? People died.", 2000),
	new Phrase("Johnny", "what a downer, ruining the convo", 2000),
	new Phrase("Sam", "party pooper!", 2000),
	new Phrase("Johnny", "party pooper!", 2000),
	new Phrase("Sam", "party pooper!", choices5),
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;

// Walk from School

var choices6 = [
	new Choice("sure", null),
	new Choice("sorry have to get water for mom", null),
];	

walkFromSchool = [
	new Phrase("Andy", "my dad called", 2000),
	new Phrase("Andy", "Going to leave early today.", 4000),
	new Phrase("Mom", "Can you fetch some water on your way home? We are running a bit low.", 4000),
	new Phrase("Johnny", "andy you quitterrrrrrrrrr", 4000),
	new Phrase("Sarah", "Johnny, stop being a bully...", 2000),
	new Phrase("Johnny", "im nottt", 2000),
	new Phrase("Johnny", "but you will come right?", choices6)
];

dialogueFromSchool = new Dialogue(walkFromSchool);
dialogueFromSchool.onEnd = defaults.goToHome;


// Walk to home

var walkToHome = [
	new Phrase("Johnny", "hey andy ", 2000),
	new Phrase("Johnny", "you will be able to play tomorrow righhhtt?", 3000),
	new Phrase("Johnny", "you are always the best at hide and seek", 3000),
	new Phrase("Johnny", "without you sarah destroyeeeedddd us", 2000)
];

var dialogueToHome = new Dialogue(walkToHome);
dialogueToHome.onEnd = defaults.goToHome;


module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool,
	toHome : dialogueToHome
};