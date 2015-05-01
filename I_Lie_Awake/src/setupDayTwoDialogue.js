var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");

// Dad Morning

var choices1 = [
	new Choice("ok", null)
];

morningTexts = [
	new Phrase("Dad", "Morning honey, I left food on the table", 2000),
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
	new Phrase("Mom", "Well you should be more careful", 2000),
	new Phrase("Mom", "Apparently a bomb blew up yesterday afternoon on the path you take to school", 2000),
	new Phrase("Mom", "I was worried sick. What if you had been near that?", 2000),
	new Phrase("Mike", "hey hey did you guys hear? there was an explosion yesterday!", 2000),
	new Phrase("Andy", "No way.", 2000),
	new Phrase("Brenda", "yeah i heard it omw home!", 2000),
	new Phrase("Brenda", "didnt c anyting :(", 2000),
	new Phrase("Sarah", "Why do you sound excited? People died.", 2000),
	new Phrase("Mike", "what a downer, ruining the convo", 2000),
	new Phrase("Brenda", "party pooper!", 2000),
	new Phrase("Mike", "party pooper!", 2000),
	new Phrase("Brenda", "party pooper!", choices3)
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;


// Walk from School

var mikeYayy = [
	new Phrase("Mike", "yayyyyy", 2000),
	new Phrase("Brenda", "c u ther", 2000)
];

var brendaSrsly = [
	new Phrase("Brenda", "woww srsly?", 2000)
];

var choices4 = [
	new Choice("i'll be there", mikeYayy, "Friends"),
	new Choice("sorry but I have to help out mom", brendaSrsly, "Parents")
];


walkFromSchool = [
	new Phrase("Mom", "Can you grab some bread on your way home?", 2000),
	new Phrase("Brenda", "hey you are coming to hang out with us today right?", 2000),
	new Phrase("Mike", "i hope you dont ditch like rachel", choices4)
];

dialogueFromSchool = new Dialogue(walkFromSchool);
dialogueFromSchool.onEnd = defaults.goToHome;


// Walk to home

var walkToHome = [
	new Phrase("Johnny", "i wonder what rachel haddd to do", 2000),
	new Phrase("Brenda", "ya she realy missed out", 2000)
];

var dialogueToHome = new Dialogue(walkToHome);
dialogueToHome.onEnd = defaults.goToHome;

module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool,
	toHome : dialogueToHome
};