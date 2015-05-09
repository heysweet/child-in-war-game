var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");

// Dad Morning

var choices1 = [
	new Choice("yeah sure dad", null),
	new Choice("of course", null),
];

morningTexts = [
	new Phrase("Dad", "Morning honey, mom is not feeling well", 3000),
	new Phrase("Dad", "Be quiet when you leave the house", choices1)
];

dialogueWithDad = new Dialogue(morningTexts);

// Walk to School

var choices1 = [
	new Choice("nothing much. why you ask?", null),
	new Choice("that you arent feeling well", null),
];

var choices2 = [
	new Choice("yeah sure mom", null),
	new Choice("ok mom", null),
];

var choices3 = [
	new Choice("i heard nothing", null),
];

var choices4 = [
	new Choice("you are all wimps", null),
	new Choice("im glad it wasnt us", null),
];

var choices5 = [
	new Choice("fine, but a few seem scared", null),
];

walkToSchool = [
	new Phrase("Mom", "Good morning honey.", 2000),
	new Phrase("Mom", "What did Dad tell you?", choices1),
	new Phrase("Mom", "Don't worry about it. it is not a big deal.", choices2),
	new Phrase("Johnny", "i heard jet planes flying last night!", 2000),
	new Phrase("Sam", "I heard them and explosions too!", choices3),
	new Phrase("Sarah", "Mom said west side of town got bombed.", 2000),
	new Phrase("Andy", "That's pretty scary...", choices4),
	new Phrase("Mom", "How are your friends doing?", choices5),
	new Phrase("Mom", "Well make sure to keep your guard up.", 2000),
	new Phrase("Mom", "Be safe.", 2000),
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;


// Walk from School


walkFromSchool = [
	new Phrase("Mom", "Can you grab some bread on your way home?", 2000),
	new Phrase("Sam", "hey you are coming to hang out with us today right?", 2000),
	new Phrase("Mom", "We are running a bit low.", 2000),
	new Phrase("Johnny", "i hope uuuuu dont ditch like rachel", 2000),
	new Phrase("Johnny", "theres no excuse to not play with us", 2000),
	new Phrase("Mom", "Also do not stay out too late.", 2000),
	new Phrase("Sam", "dont be a loser make sure u come", 2000),
	new Phrase("Mom", "Are you paying attention to me?", 2000),
	new Phrase("Sam", "dont be a scrub", 2000),
	new Phrase("Johnny", "we neeeeeeeeddd u", 2000),
	new Phrase("Mom", "This is important.", 2000),
	new Phrase("Johnny", "sarah will wreck us if u dont come again", 2000),
	new Phrase("Mom", "Do not mess this up.", 2000),
	new Phrase("Johnny", "we are so looooosssttt without u", 2000),
];

dialogueFromSchool = new Dialogue(walkFromSchool);
// dialogueFromSchool.onEnd = defaults.goToHome;
dialogueFromSchool.carBomb = 4;


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