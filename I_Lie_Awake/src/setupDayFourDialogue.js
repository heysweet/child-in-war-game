var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");

// Dad Morning

morningTexts = [
	new Phrase("Dad", null, 800),
];

dialogueWithDad = new Dialogue(morningTexts);

// Walk to School

var choices1 = [
	new Choice("no", null)
];

walkToSchool = [
	new Phrase("Mom", "Hey", 1600),
	new Phrase("Mom", "Have you heard from Dad yet?", choices1),
	new Phrase("Mom", "I'm heading out to find him. Stay out of trouble.", 2000),
	new Phrase("Sarah", "I am not going to be at school today, sorry guys.", 2000),
	new Phrase("Sarah", "My mom won't let me.", 2000),
	new Phrase("Johnny", "aite but will you play with us after school?", 2000),
	new Phrase("Sarah", "They won't even let me out of the house.", 2000)
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;

// Walk from School

var choices2 = [
	new Choice("sure i'll be there", null)
];


walkFromSchool = [
	new Phrase("Johnny", "heyyyyy you are coming to play right?", 2000),
	new Phrase("Johnny", "dont ditch like all the other loserrrrs", choices2)
];

dialogueFromSchool = new Dialogue(walkFromSchool);
dialogueFromSchool.onEnd = defaults.goToHome;


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