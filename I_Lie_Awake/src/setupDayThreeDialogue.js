var Dialogue = require("Dialogue.js");
var Phrase = require("Phrase.js");
var Choice = require("Choice.js");
var defaults = require("dialogueDefaults.js");
var achievement = require("Achievement.js");

var glassBreak = require("./data/sound/glassBreak.ogg");
var glassBreakReverse = require("./data/sound/glassBreakReverse.ogg");

// // Dad Morning
// var choicesDad = [
// 	new Choice("yeah ok", null),
// 	new Choice("sure", null)
// ];

// var dadTalks = [
// 	new Phrase("Dad", "Morning sweetie, Have a safe trip to school", 3000),
// 	new Phrase("Dad", "Don't wake mom, she still needs her rest", choicesDad)
// ];

// var dialogueWithDad = new Dialogue(dadTalks);

// Dad Morning

var choices1 = [
	new Choice("yes", null),
	new Choice("how am i alive? is this a dream?", null),
];

var choices2 = [
	new Choice("alright", null),
	new Choice("i didn't get eggs", null),
];


morningTexts = [
	new Phrase("Dad", "Morning sweetie", 1600),
	new Phrase("Dad", "Are you having fun?", choices1),
	new Phrase("Dad", "You should go make breakfast before you leave.", 2000),
	new Phrase("Dad", "Eggs are in the refrigerator.", choices2)
];

dialogueWithDad = new Dialogue(morningTexts);
dialogueWithDad.onEnd = defaults.goToStreet;

// Walk to School

var choices2 = [
	new Choice("uh...", null),
	new Choice("um...", null),
];

var choices3 = [
	new Choice("uhhh......", null),
	new Choice("she did die, right?", null),
];

var choices4 = [
	new Choice("uhhhhhhhhhh..........", null),
	new Choice("i couldn't click it", null),
];

var choices7 = [
	new Choice("Yes.", null),
	new Choice("NOOOOOOOOO!!!!!!!!!", null),
];

choices7[0].onChoice = function (argument) {
	achievement.achieve("Carving Your Destiny!");
};

var choices6Both = [
	new Phrase("Andy", "Well now that that's clear...", 1400),
]

choices6Both[0].onText = function(){
	glassBreak.play();
	window.gamestate.phoneIsCracked = true;
}

var choices6 = [
	new Choice("My choice is just an illusion.", choices6Both),
	new Choice("My choice IS just an illusion.", choices6Both),
];


var choices5No = [
	new Phrase("Sarah", "Well fine then. I've broken it again. Happy?", choices7),
]

choices5No[0].onText = function(){
	glassBreak.play();
	window.gamestate.phoneIsCracked = true;
}

var choices5Yes = [
	new Phrase("Sarah", "So how much does your choice really matter then?", choices6),
]

var choices5 = [
	new Choice("No", choices5No),
	new Choice("YES!", choices5Yes),
];


var choices8 = [
	new Choice("no", null),
	new Choice("yes", null),
];

var choices8_2 = [
	new Choice("uh....", null),
	new Choice("ART", null),
];

var choices9 = [
	new Choice("yes", null),
	new Choice("no", null),
];

var choices10 = [
	new Choice("yes", null),
	new Choice("no", null),
];



walkToSchool = [
	new Phrase("Mom", "Hey.", 800),
	new Phrase("Mom", "See that girl walking to school?", 2000),
	new Phrase("Mom", "What's her name anyways?", choices2),
	new Phrase("Mom", "Why is she going to school in a warzone?", 2000),
	new Phrase("Mom", "Shouldn't she be dead?", choices3),
	new Phrase("Johnny", "Why didn't you choose the other option?", 2000),
	new Phrase("Johnny", "Aren't you supposed to have choice?", choices4),
	new Phrase("Sam", "It must be that broken phone of yours.", 2000),
	new Phrase("Sam", "Is this better?", choices5),
	new Phrase("Johnny", "are you having funnnnnnnn yetttttttt?", choices8),
	new Phrase("Andy", "why not?", choices8_2),
	new Phrase("Johnny", "let me ask again...", choices9),
	new Phrase("Sarah", "Are you having fun yet?", choices9),
	new Phrase("Sam", "r u havin fun yet????", choices10),
	new Phrase("Dad", "are", 1600),
	new Phrase("Mom", "you", 1200),
	new Phrase("Sarah", "having", 800),
	new Phrase("Sam", "fun", 800),
	new Phrase("Andy", "yet", 500),
	new Phrase("Johnny", "?", 800),
];

var hasRepaired = false;

walkToSchool[7].onText = function () {
	if (!hasRepaired){
		hasRepaired = true;

		glassBreakReverse.play();
		window.gamestate.phoneIsCracked = false;
	}
};

dialogueToSchool = new Dialogue(walkToSchool);
dialogueToSchool.onEnd = defaults.goToSchool;



// Walk from School

var choices11 = [
	new Choice("yes", null),
	new Choice("no", null),
];

var choices12 = [
	new Choice("yes", null),
	new Choice("no", null),
];


var choices13 = [
	new Choice("yes", null),
	new Choice("no", null),
];

var choices14 = [
	new Choice("yes", null, "Friends"),
	new Choice("no", null, "Friends"),
];

walkFromSchool = [
	new Phrase("Andy", "So...", 1000),
	new Phrase("Andy", "Are games about making choices?", choices11),
	new Phrase("Sam", "Are games about rules?", choices12),
	new Phrase("Johnny", "Are games about winning?", choices13),
	new Phrase("Sarah", "Are games about narratives?", choices14),
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