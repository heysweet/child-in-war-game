var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");

// Dad Morning

var choices1 = [
	new Choice("ok", null)
];

morningTexts = [
	new Phrase("Dad", "Morning sweetie, food’s on table", 2000),
	new Phrase("Dad", "be careful on way to school", choices1)
];

dialogueWithDad = new Dialogue(morningTexts);

// Walk to School
	
walkToSchool = [
	new Phrase("Mom", "Good morning honey.", 2000),
	new Phrase("Mom", "Be careful on your way to and back from school today.", 2000),
	new Phrase("Johnny", "i heard jet planes flying last night!", 2000),
	new Phrase("Andy", "I heard them and explosions too.", 2000),
	new Phrase("Sarah", "Mom said west side of town got bombed.", 2000),
	new Phrase("Andy", "That’s pretty scary...", 2000)
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.arriveAtSchool;

// Walk from School

var choices2 = [
	new Choice("sure", null),
	new Choice("sorry, have to get water for mom", null)
];


walkFromSchool = [
	new Phrase("Andy", "Dad called", 2000),
	new Phrase("Andy", "Gonna leave early today.", 2000),
	new Phrase("Mom", "Can you fetch some water on your way home? We are running a bit low.", 2000),
	new Phrase("Johnny", "andy you quitter", 2000),
	new Phrase("Sarah", "Johnny, stop being a bully…", 2000),
	new Phrase("Johnny", "im nottt", 2000),
	new Phrase("Johnny", "but you will come right?", choices2)
];

dialogueFromSchool = new Dialogue(walkFromSchool);
dialogueFromSchool.onEnd = defaults.arriveAtHome;


// Walk to home

var walkToHome = [
	new Phrase("Johnny", "hey andy ", 2000),
	new Phrase("Johnny", "you will be able to play tomorrow righhhtt?", 2000),
	new Phrase("Johnny", "you are always the best at hide and seek", 2000),
	new Phrase("Johnny", "without you sarah destroyeeeedddd us", 2000)
];

var dialogueToHome = new Dialogue(walkToHome);
dialogueToHome.onEnd = defaults.arriveAtHome;


module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool
};