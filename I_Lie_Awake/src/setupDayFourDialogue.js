var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");
var Explosion = require("Explosion.js");
var achievement = require("Achievement.js");

// Dad Morning

morningTexts = [
	new Phrase("Dad", null, 5000),
];

dialogueWithDad = new Dialogue(morningTexts);
dialogueWithDad.onEnd = defaults.goToStreet;

// Walk to School

var choices1 = [
	new Choice("whats wrong?", null),
	new Choice("wait, didn't you die?", null),
];

var choices2 = [
	new Choice("what?", null),
	new Choice("rachel, what are you saying????", null),
];

var choices3 = [
	new Choice("uh huh...", null),
	new Choice("rachel please help me!!!", null),
];

var choices4 = [
	new Choice("...", null),
	new Choice("rachel!!! please listen to me!", null),
];

var choices5 = [
	new Choice("...", null),
	new Choice("RACHEL!!!!!", null),
];


walkToSchool = [
	new Phrase("Rachel", "Hey.", 3000),
	new Phrase("Rachel", "I am not going to be at school today.", choices1),
	new Phrase("Rachel", "Hope in reality is the worst of all evils ", 3000),
	new Phrase("Rachel", "because it prolongs the torments of man.", choices2),
	new Phrase("Rachel", "Existence really is an imperfect tense that never becomes a present.", choices3),
	new Phrase("Rachel", "I still live, I still think: I still have to live, for I still have to think.", choices4),
	new Phrase("Rachel", "One has to die several times while one is still alive", choices5),
	new Phrase("Rachel", "Let us beware of saying that death is the opposite of life", 2600),
	new Phrase("Rachel", "The living being is only a species of the dead,", 2600),
	new Phrase("Rachel", "and a very rare species.", 4000),
	new Phrase("Rachel", "Are you having fun?", 6000),
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;

// Walk from School

var choices2 = [
	new Choice("sure i'll be there", null, "Friends")
];


walkFromSchool = [
	new Phrase("Rachel", null, 7000),
];

dialogueFromSchool = new Dialogue(walkFromSchool);
// dialogueFromSchool.onEnd = defaults.goToHome;
dialogueFromSchool.onEnd = Explosion.airstrike;


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