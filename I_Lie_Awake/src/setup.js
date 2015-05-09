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

require("DiaryText.js");

var mainCharacter = new MainCharacter();

window.gamestate.mainCharacter = mainCharacter;

mainCharacter.transform.x = utils.sleepingCoords.x;
mainCharacter.transform.y = utils.sleepingCoords.y;

// Setup Dialogue
require("setupDialogue.js");


// Update the game state
var gamestate = window.gamestate;

// Set the initial rooms
var kitchen = require("setupKitchen.js");
var bedroom = require("setupBedroom.js");
var parentsBedroom = new Room(utils.screenWidth()/2, utils.screenHeight()/2);

var street = require("setupStreet.js");
var school = require("setupSchool.js");
school.leaveTo = street;


window.gamestate.musicPlayer = require("musicPlayer.js");

var rooms = {
	kitchen:kitchen,
	bedroom:bedroom,
	parentsBedroom:parentsBedroom,
	street:street,
	school:school
}

utils.rooms = rooms;

parentsBedroom.setStaticCamera(utils.halfScreenWidth() - parentsBedroom.width, 
								parentsBedroom.height/2);

// Connect the rooms
var toBedroomTarget		= { x: 183, y: 251};
var fromBedroomTarget	= { x: 373, y: 14};
var toParentsTarget		= { x: parentsBedroom.width - 71, 
							y: (parentsBedroom.height/2) - 70};
var fromParentsTarget	= { x: 699, y: 58};
var toStreetTarget		= { x: 340, y: 298};

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

window.gamestate.streetDoor = streetDoor;

var hasLeftTheHouseBefore = false;

streetDoor.onTrigger = function() {
	streetDoor.setIsEnabled(false);
	street.dialogueName = "toSchool";
	window.gamestate.musicPlayer.playNextSong();

	if (!hasLeftTheHouseBefore){
		hasLeftTheHouseBefore = true;
		leaveBedroomDoor.setTargetRoom(street);
		leaveBedroomDoor.setTargetCoords(toStreetTarget);
	}
};

leaveBedroomDoor.onTrigger = function(){
	window.gamestate.shouldShowPhone = false;
	window.gamestate.isTexting = false;

	window.gamestate.mainCharacter.faceRight();

	if (hasLeftTheHouseBefore){
		streetDoor.onTrigger();
	}
}

window.gamestate.leaveBedroom = leaveBedroomDoor.performTeleport;

var reenableStreetDoor = function(){
	streetDoor.setIsEnabled(true);
}

window.gamestate.drawNothing = false;

var onRestoreFromBlack = function(){
	var delayedHidePhone = function(time){return function(){setTimeout(
		function() {window.gamestate.phoneInterface.hidePhone()}, time)}};

	window.gamestate.shouldShowPhone = true;
	window.gamestate.isTexting = true;
	window.gamestate.startDialogue("morning", delayedHidePhone(1800));
}

var hitBlack = function(){
	window.gamestate.drawNothing = true;
	utils.rooms.street.treadmill.initializeLayers();

	setTimeout(
		function() {
			if (!window.gamestate.gameOver){
				window.gamestate.drawNothing = false;
				onRestoreFromBlack();
			}
		}, 1800);
}

utils.addToOnNewDay(reenableStreetDoor);
utils.addToOnNewDay(hitBlack);

kitchen.addTeleporter(bedroomDoor);
kitchen.addTeleporter(parentsDoor);
kitchen.addTeleporter(streetDoor);
parentsDoor.setIsEnabled(false);

bedroom.addTeleporter(leaveBedroomDoor);
parentsBedroom.addTeleporter(leaveParentsDoor);

Teleporter.teleportTo(bedroom, mainCharacter.transform);

window.gamestate.movement.pauseInput(true);
window.gamestate.drawNothing = true;

var camera = require("camera.js");
var WrapperPath = require("movementPath.js").WrapperPath;

var PhoneInterface = require("PhoneInterface.js");
window.gamestate.phoneInterface = new PhoneInterface();

window.gamestate.shouldShowPhone = false;
window.gamestate.isTexting = false;

window.gamestate.electricity = true;

var mainCharacter = window.gamestate.mainCharacter;
window.gamestate.camera = camera;
window.gamestate.phoneGame = require("phoneGame.js");
window.gamestate.isInGame = false;
window.gamestate.phoneIsCracked = false;
window.gamestate.noKeyboardInput = false;

function startGame(){
	setTimeout(
			function() {
				
		utils.goToTheNextDay();

		// var delayedHidePhone = function(time){return function(){setTimeout(
		// 	function() {window.gamestate.phoneInterface.hidePhone()}, time)}};

		// window.gamestate.shouldShowPhone = true;
		// window.gamestate.isTexting = true;
		// window.gamestate.startDialogue("morning", delayedHidePhone(1800));
		// window.gamestate.drawNothing = false;
	}, 1600);
}

module.exports = {
	startGame:startGame
}