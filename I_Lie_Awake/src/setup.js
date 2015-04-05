var Room = require("Room.js");

// Setup Dialogue
var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");

var shouldLoopDialogue = true;
var testDialogue = new Dialogue(shouldLoopDialogue);
var lastPhrase1 = new Phrase("Ending 1!");
var lastPhrase2 = new Phrase("Ending 2!");
var choicePhrase = new Phrase("Question?");

choicePhrase.addOption("choice 1", lastPhrase1);
choicePhrase.addOption("choice 2", lastPhrase2);

var firstPhrase = new Phrase("Statement!");
firstPhrase.setNextPhrase(choicePhrase);

testDialogue.setFirstPhrase(firstPhrase);

// Update the game state
var gamestate = window.gamestate;

// Set the initial room
gamestate.currentRoom = new Room(500, 400);

module.exports = {
	testDialogue:testDialogue
};