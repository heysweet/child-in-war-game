// Needed to load gamestate
require("gamestate.js");

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
var GameObject = require("GameObject.js");

var mainCharacter = new MainCharacter();

window.gamestate.mainCharacter = mainCharacter;

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

var kitchenBackground = require("./data/home/kitchen/mainRoom.png");
var girlBedroomBackground = require("./data/home/girlBedroom.png");

kitchen.setBackground(kitchenBackground);
bedroom.setBackground(girlBedroomBackground);

var kitchenCollisions = [
	{min: {x:287, y:0}, max: {x:348, y:81}}, // Fridge to Bedroom Wall
	{min: {x:46, y:0}, max: {x:287, y:132}}, // Fridge
	{min: {x:0, y:131}, max: {x:46, y:490}}, // West Wall
	{min: {x:51, y:492}, max: {x:904, y:541}}, // South Wall
	{min: {x:904, y:255}, max: {x:961, y:540}}, // SE Wall
	{min: {x:904, y:84}, max: {x:961, y:136}}, // NE Wall
	{min: {x:789, y:0}, max: {x:959, y:81}}, // North Wall 3
	{min: {x:456, y:0}, max: {x:666, y:81}}, // North Wall 2
];

/* Make sure to add them in a sorted y-depth draw order */

// var kitchenObjects = [
// 	new ForegroundObject(require("./data/home/kitchen/TV.png"), {x:608, y:218}, 339),
	// new ForegroundObject(require("./data/home/kitchen/middleChair.png"), {x:238, y:280}, 399),
	// new ForegroundObject(require("./data/home/kitchen/rightChair.png"), {x:345, y:307}, 413), 106
	// new ForegroundObject(require("./data/home/kitchen/leftChair.png"), {x:97, y:319}, 415), 96
	// new ForegroundObject(require("./data/home/kitchen/couch.png"), {x:576, y:338}, 458), 120
	// new ForegroundObject(require("./data/home/kitchen/table.png"), {x:167, y:327}, 492), 165
// ];

var kitchenObjects = [
	new GameObject(608, 218, {	image : require("./data/home/kitchen/TV.png"), 
								zOffset : 121,
								relativeBoundingBox : {min: {x:5, y:131}, max: {x:140, y:162}}
							}), // TV

	new GameObject(238, 280, {	image : require("./data/home/kitchen/middleChair.png"),
								zOffset : 119,
								relativeBoundingBox : {min: {x:4, y:57}, max: {x:59, y:100}}
							}), // middleChair

	new GameObject(345, 307, {	image : require("./data/home/kitchen/rightChair.png"), 
								zOffset : 106,
								relativeBoundingBox : {min: {x:4, y:95}, max: {x:48, y:128}}
							}), // rightChair

	new GameObject(97,  319, {	image : require("./data/home/kitchen/leftChair.png"),
								zOffset : 96,
								relativeBoundingBox : {min: {x:10, y:100}, max: {x:51, y:121}}
							}), // leftChair

	new GameObject(576, 338, {	image : require("./data/home/kitchen/couch.png"),
								zOffset : 120,
								relativeBoundingBox : {min: {x:6, y:48}, max: {x:213, y:102}}
							}), // couch

	new GameObject(167, 327, {	image : require("./data/home/kitchen/table.png"),
								zOffset : 165,
								relativeBoundingBox : {min: {x:5, y:55}, max: {x:152, y:165}}
							}) // table
];

kitchen.addCollisionBoxes(kitchenCollisions);
kitchen.addObjects(kitchenObjects);

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