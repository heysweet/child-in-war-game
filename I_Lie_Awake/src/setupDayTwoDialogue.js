var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");
var achievement = require("Achievement.js");

// Dad Morning

var choices1 = [
	new Choice("yeah sure dad", null),
	new Choice("of course", null),
];


var choice2Yes = [
	new Phrase("Mom", "Oh that's good.", 2000),
];

var choice2No = [
	new Phrase("Mom", "What a shame, games are supposed to be fun.", 4000),
];

var choices2 = [
	new Choice("yes", choice2Yes),
	new Choice("no", choice2No),
];

morningTexts = [
	new Phrase("Dad", "Morning honey, mom is not feeling well", 3000),
	new Phrase("Dad", "Be quiet when you leave the house", choices1)
];

dialogueWithDad = new Dialogue(morningTexts);

var choice1Yes = [
	new Phrase("Mom", "Oh well are you having fun?", choices2),
];

var choice1No = [
	new Phrase("Mom", "Don't lie to me!", 1000),
	new Phrase("Mom", "Are you at least having fun?", choices2),
];

// Walk to School

var choices1b = [
	new Choice("yes", choice1Yes),
	new Choice("no", choice1No),
];

choices1b[1].onChoice = function (argument) {
	achievement.achieve("You Lied to Your Mom!");
};

var choices3 = [
	new Choice("nothing much", null),
	new Choice("that you arent feeling well", null),
];

var choices4 = [
	new Choice("yeah sure mom", null),
	new Choice("ok mom", null),
];

var choices5 = [
	new Choice("party pooper!", null),
	new Choice("guys cut it out", null),
];

choices5[0].onChoice = function (argument) {
	achievement.achieve("Party Pooper!");
};

var choices6 = [
	new Choice("fine, but a few seem scared", null),
];

walkToSchool = [
	new Phrase("Mom", "Good morning honey.", 1500),
	new Phrase("Mom", "Are you playing that game again?", choices1b),
	new Phrase("Mom", "What did Dad tell you this morning?", choices3),
	new Phrase("Mom", "Don't worry about it. it is not a big deal.", choices4),
	new Phrase("Johnny", "i heard an explooooosion last night!", 2000),
	new Phrase("Sam", "i herd it 2", 2000),
	new Phrase("Sam", "didnt c anyting :(", 2000),
	new Phrase("Sarah", "Why are you sad about that? People died.", 2000),
	new Phrase("Sarah", "What is this, a game to you?", 2000),
	new Phrase("Johnny", "what a downer, ruining the convo", 2000),
	new Phrase("Sam", "party pooper!", 2000),
	new Phrase("Johnny", "party pooper!", 800),
	new Phrase("Andy", "party pooper!", choices5),
	new Phrase("Mom", "How are your friends doing?", choices6),
	new Phrase("Mom", "Well make sure to keep your guard up.", 2000),
	new Phrase("Mom", "Stay safe. Have fun.", 2000),
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;


// Walk from School


walkFromSchool = [
	new Phrase("Mom", "Can you grab some bread on your way home?", 2000),
	new Phrase("Sam", "hey u r coming 2 play xbox with us 2day right?", 2000),
	new Phrase("Mom", "We are running a bit low.", 2000),
	new Phrase("Johnny", "i hope uuuuu dont ditch like rachel", 2000),
	new Phrase("Johnny", "theres no excuse to not play with us", 2000),
	new Phrase("Mom", "Also do not stay out too late.", 2000),
	new Phrase("Sam", "dont b loser make sure u come", 2000),
	new Phrase("Mom", "Are you paying attention to me?", 2000),
	new Phrase("Sam", "dont b a scrub", 2000),
	new Phrase("Johnny", "we neeeeeeeeddd u", 2000),
	new Phrase("Mom", "This is important.", 2000),
	new Phrase("Johnny", "sarah will wreck us if u dont come again", 2000),
	new Phrase("Mom", "Do not mess this up.", 2000),
	new Phrase("Johnny", "we r so looooosssttt without u", 2000),
];

dialogueFromSchool = new Dialogue(walkFromSchool);
// dialogueFromSchool.onEnd = defaults.goToHome;
dialogueFromSchool.carBomb = 4;


// Walk to home

var walkToHome = [
];

var dialogueToHome = new Dialogue(walkToHome);
dialogueToHome.onEnd = defaults.goToHome;

module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool,
	toHome : dialogueToHome
};