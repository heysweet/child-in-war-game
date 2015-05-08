var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");

// Dad Morning

var choices1 = [
	new Choice("ok", null)
];

morningTexts = [
	new Phrase("Dad", "Morning honey, I left food on the table", 3000),
	new Phrase("Dad", "Be careful on your trip to school", choices1)
];

dialogueWithDad = new Dialogue(morningTexts);

// Walk to School

var choices2 = [
	new Choice("great!", null),
	new Choice("ok i guess", null)
];

var choices3 = [
	new Choice("guys cut it out", null),
	new Choice("party pooper!", null)
];


walkToSchool = [
	new Phrase("Mom", "Good morning", 2000),
	new Phrase("Mom", "How are you doing?", choices2),
	new Phrase("Mom", "Well you should be more careful", 4000),
	new Phrase("Mom", "Apparently a bomb blew up yesterday afternoon on the path you take to school", 5000),
	new Phrase("Mom", "I was worried sick. What if you had been near that?", 4000),
	new Phrase("Johnny", "hey hey did you guys hear? there was an explosion yesterday!", 3000),
	new Phrase("Andy", "No way.", 2000),
	new Phrase("Sam", "yeah i heard it omw home!", 1500),
	new Phrase("Sam", "didnt c anyting :(", 2000),
	new Phrase("Sarah", "Why do you sound excited? People died.", 4000),
	new Phrase("Johnny", "what a downer, ruining the convo", 2500),
	new Phrase("Sam", "party pooper!", 1500),
	new Phrase("Johnny", "party pooper!", 1500),
	new Phrase("Sam", "party pooper!", choices3)
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;


// Walk from School

var JohnnyYayy = [
	new Phrase("Johnny", "yayyyyy", 2000),
	new Phrase("Sam", "c u ther", 2000)
];

var SamSrsly = [
	new Phrase("Sam", "woww srsly?", 2000)
];

var choices4 = [
	new Choice("i'll be there", JohnnyYayy, "Friends"),
	new Choice("sorry but I have to help out mom", SamSrsly, "Parents")
];


walkFromSchool = [
	new Phrase("Mom", "Can you grab some bread on your way home?", 5000),
	new Phrase("Sam", "hey you are coming to hang out with us today right?", 2000),
	new Phrase("Johnny", "i hope you dont ditch like rachel", choices4)
];

dialogueFromSchool = new Dialogue(walkFromSchool);
// dialogueFromSchool.onEnd = defaults.goToHome;
dialogueFromSchool.carBomb = 2;


// Walk to home

var walkToHome = [
	new Phrase("Johnny", "i wonder what rachel haddd to do", 2000),
	new Phrase("Sam", "ya she realy missed out", 2000)
];

var dialogueToHome = new Dialogue(walkToHome);
dialogueToHome.onEnd = defaults.goToHome;

module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool,
	toHome : dialogueToHome
};