var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");
var Explosion = require("Explosion.js");

// Dad Morning

morningTexts = [
	new Phrase("Dad", null, 5000),
];

dialogueWithDad = new Dialogue(morningTexts);

// Walk to School

var choices1 = [
	new Choice("whats wrong?", null),
	new Choice("help!!!!! I dont know where my parents are?!??!!?", null),
];

var choices2 = [
	new Choice("what?", null),
	new Choice("sarah, what are you saying????", null),
];

var choices3 = [
	new Choice("uh huh...", null),
	new Choice("sarah please help me!!!", null),
];

var choices4 = [
	new Choice("...", null),
	new Choice("sarah!!! please listen to me!", null),
];

var choices5 = [
	new Choice("...", null),
	new Choice("sarah!!", null),
];

var choices6 = [
	new Choice("...", null),
	new Choice("SARAH!!!!!!", null),
];

walkToSchool = [
	new Phrase("Sarah", "Hey.", 3000),
	new Phrase("Sarah", "I am not going to be at school today.", choices1),
	new Phrase("Sarah", "Hope in reality is the worst of all evils ", choices2),
	new Phrase("Sarah", "because it prolongs the torments of man.", choices3),
	new Phrase("Sarah", "Existence really is an imperfect tense that never becomes a present.", choices4),
	new Phrase("Sarah", "I still live, I still think: I still have to live, for I still have to think.", choices5),
	new Phrase("Sarah", "One has to die several times while one is still alive", choices6),
	new Phrase("Sarah", "Let us beware of saying that death is the opposite of life", 3000),
	new Phrase("Sarah", "The living being is only a species of the dead,", 3000),
	new Phrase("Sarah", "and a very rare species.", 3000),
];

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;

// Walk from School

var choices2 = [
	new Choice("sure i'll be there", null, "Friends")
];


walkFromSchool = [
	new Phrase("Sarah", null, 7000),
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