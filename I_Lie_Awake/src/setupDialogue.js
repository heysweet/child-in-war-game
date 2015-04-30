var dayOneDialogue = require("setupDayOneDialogue.js");
var dayTwoDialogue = require("setupDayTwoDialogue.js");
var dayThreeDialogue = require("setupDayThreeDialogue.js");
var dayFourDialogue = require("setupDayFourDialogue.js");
var dayFiveDialogue = require("setupDayFiveDialogue.js");

var allDialogue = [
	dayOneDialogue,
	dayTwoDialogue,
	dayThreeDialogue,
	dayFourDialogue,
	dayFiveDialogue,
];

window.gamestate.startDialogue = function(dialogueName){
	var dayNum = window.gamestate.dayNum();

	var dialogue = allDialogue[dayNum];

	dialogue[dialogueName].start();
	dialogue[dialogueName].goToNext();

	console.log(dialogue[dialogueName]);
}