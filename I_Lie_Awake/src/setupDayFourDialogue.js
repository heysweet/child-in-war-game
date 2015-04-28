var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");

// Dad Morning

morningTexts = [
];

dialogueWithDad = new Dialogue(morningTexts);

// Walk to School

walkToSchool = [
];

dialogueToSchool = new Dialogue(walkToSchool);

// Walk from School

walkFromSchool = [
];

dialogueFromSchool = new Dialogue(walkFromSchool);


// Walk to home

var walkToHome = [
];

var dialogueToHome = new Dialogue(walkToHome);


module.exports = {
	morning : dialogueWithDad,
	toSchool : dialogueToSchool,
	fromSchool : dialogueFromSchool
};