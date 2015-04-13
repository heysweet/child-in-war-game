// Needed to load gamestate
require("gamestate.js");

var gamestate = window.gamestate;

// Not rescaleable
// sald.size = {x:320, y:240, mode:"exact"};

// Exact aspect ratio, to match pixel art
// sald.size = {x:320, y:240, mode:"multiple"};

// Fully, dynamically rescalable
sald.size = {x:16, y:9, mode:"ratio"};
window.gamestate.IMAGE_SCALAR = 1/60;

var Room = require("Room.js");
var Teleporter = require("Teleporter.js");
var utils = require("utils.js");
var MainCharacter = require("MainCharacter.js");

var mainCharacter = new MainCharacter();

gamestate.mainCharacter = mainCharacter;

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

// Set the initial rooms
var kitchen = new Room(960, 540);
var bedroom = new Room(430, 430);
var parentsBedroom = new Room(utils.screenWidth()/2, utils.screenHeight()/2);

var kitchenBackground = require("./data/home/mainRoom.png");
var girlBedroomBackground = require("./data/home/girlBedroom.png");

kitchen.setBackground(kitchenBackground);
bedroom.setBackground(girlBedroomBackground);

bedroom.setStaticCamera(utils.halfScreenWidth()-(430/2), utils.halfScreenHeight()-100);
parentsBedroom.setStaticCamera(utils.halfScreenWidth() - parentsBedroom.width, 
								parentsBedroom.height/2);

var toBedroomTarget		= { x: 214, y: 321};
var fromBedroomTarget	= { x: 404, y: 84};
var toParentsTarget		= { x: parentsBedroom.width - 40, 
							y: parentsBedroom.height/2};
var fromParentsTarget	= { x: 24, y: 116};

var toBedroomBox = { x : 346, y : 0, width : 117, height : 60 };
var fromBedroomBox = { x : 154, y : 403, width : 118, height : 42 };
var toParentsBox = { x : 668, y : 0, width : 117, height : 60 };
var fromParentsBox = { x : 144, y : 42, width : 20, height : 42 };

var bedroomDoor      = new Teleporter(bedroom, toBedroomBox, toBedroomTarget);
var leaveBedroomDoor = new Teleporter(kitchen, fromBedroomBox,fromBedroomTarget);
var parentsDoor      = new Teleporter(parentsBedroom, toParentsBox, toParentsTarget);
var leaveParentsDoor = new Teleporter(kitchen, fromParentsBox, fromParentsTarget);

kitchen.addTeleporter(bedroomDoor);
kitchen.addTeleporter(parentsDoor);

bedroom.addTeleporter(leaveBedroomDoor);
parentsBedroom.addTeleporter(leaveParentsDoor);

gamestate.setCurrentRoom(kitchen);

module.exports = {
	testDialogue:testDialogue
};