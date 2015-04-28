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
var dialogue = require("setupDialogue.js");


// Update the game state
var gamestate = window.gamestate;

// Set the initial rooms
var kitchen = require("setupKitchen.js");
var bedroom = require("setupBedroom.js");
var parentsBedroom = new Room(utils.screenWidth()/2, utils.screenHeight()/2);

var street = require("setupStreet.js");

parentsBedroom.setStaticCamera(utils.halfScreenWidth() - parentsBedroom.width, 
								parentsBedroom.height/2);

// Connect the rooms
var toBedroomTarget		= { x: 183, y: 251};
var fromBedroomTarget	= { x: 373, y: 14};
var toParentsTarget		= { x: parentsBedroom.width - 71, 
							y: (parentsBedroom.height/2) - 70};
var fromParentsTarget	= { x: 699, y: 58};
var toStreetTarget		= { x: 170, y: 190};

var toBedroomBox = { x : 346, y : 0, width : 117, height : 60 };
var fromBedroomBox = { x : 154, y : 403, width : 118, height : 42 };
var toParentsBox = { x : 668, y : 0, width : 117, height : 60 };
var fromParentsBox = { x : 144, y : 42, width : 20, height : 42 };

var toStreetBox = { x : 928, y : 137, width : 40, height : 117 };

var bedroomDoor      = new Teleporter(bedroom, toBedroomBox, toBedroomTarget);
var leaveBedroomDoor = new Teleporter(kitchen, fromBedroomBox,fromBedroomTarget);
var parentsDoor      = new Teleporter(parentsBedroom, toParentsBox, toParentsTarget);
var leaveParentsDoor = new Teleporter(kitchen, fromParentsBox, fromParentsTarget);
var streetDoor		 = new Teleporter(street, toStreetBox, toStreetTarget);

kitchen.addTeleporter(bedroomDoor);
kitchen.addTeleporter(parentsDoor);
kitchen.addTeleporter(streetDoor);

bedroom.addTeleporter(leaveBedroomDoor);
parentsBedroom.addTeleporter(leaveParentsDoor);

gamestate.setCurrentRoom(kitchen);

module.exports = {
	testDialogue:dialogue[0].toSchool
};