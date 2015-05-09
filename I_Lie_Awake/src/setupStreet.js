var Room = require("Room.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");
var Treadmill = require("Treadmill.js");
var Teleporter = require("Teleporter.js");

var mainCharacter = window.gamestate.mainCharacter;
var speed = mainCharacter.transform.xDelta;

var street = new Room(utils.screenWidth(), utils.screenHeight());

var movement = require("movement.js");

// street.setStaticCamera(utils.halfScreenWidth()-(430/2), utils.halfScreenHeight()-100);

street.treadmill = new Treadmill(speed);

street.onEnter = function(){
	// Disable movement
	movement.pauseInput(true);

	var direction = 1;

	if (window.gamestate.hasBeenToSchool){
		direction = -1;
	}

	// Setup character movement animations
	mainCharacter.forceWalking(true, direction);

	// Setup scrolling background
	street.treadmill.setSpeed(direction * mainCharacter.transform.xDelta);

	// Setup Texting
	window.gamestate.shouldShowPhone = true;
	window.gamestate.isTexting = true;

	window.gamestate.startDialogue(street.dialogueName);
}

street.draw = function(){
	street.treadmill.draw();
}

street.update = function(elapsed){
	street.treadmill.update(elapsed);
}

street.onLeave = function(){
	// Enable movement
	// movement.pauseInput(false);

	// Revert character movement animations
	mainCharacter.forceWalking(false);

	// Get rid of scrolling background?

	// Disable Texting
	window.gamestate.shouldShowPhone = false;
	window.gamestate.isTexting = false;
}

street.goToSchool = function(){
	window.gamestate.setCurrentRoom(utils.rooms.school);
	var mainCharacter = window.gamestate.mainCharacter;

	// if (school.staticCamera !== undefined){
	// 	camera.updateTransform(school.staticCamera);
	// } else {
	// 	// Make the camera move to the correct position
	// 	var position = window.gamestate.mainCharacter.transform;

	// 	camera.focusCamera(position);
	// }

	// mainCharacter.transform.x = coords.x;
	// mainCharacter.transform.y = coords.y;
}


var explosionSound = require("./data/sound/carExplosion.ogg");
 

var wakeUpInBed = function(){
	window.gamestate.hasBeenToSchool = false;

	// Go to bed
	var room = utils.rooms.bedroom;
	var coords = utils.sleepingCoords;

	window.gamestate.musicPlayer.stop();

	Teleporter.teleportTo(room, coords);
	utils.pausePlayerMovement(true);

	utils.goToTheNextDay();
}

street.onExplode = function(){
	window.gamestate.musicPlayer.stop();

	setTimeout(
		function() {
			window.gamestate.explosion.hide();
			wakeUpInBed();
	}, 7430);
}

street.setCarBomb = function(){
	var explode = function(){
		street.onExplode();
		explosionSound.play();

		window.gamestate.explosion.start();
	}

	street.treadmill.addCarBomb(explode);
}

var updateSaturation = function(){
	var saturationAmount = 1 - (window.gamestate.dayNum() / (2 * window.gamestate.MAX_DAYS));
	street.treadmill.setSaturation(saturationAmount);
	utils.rooms.school.setSaturation(saturationAmount);
}

utils.addToOnNewDay(updateSaturation);

// var collisions = [
// 	{min : {x : 39, y : 30}, max : {x : 61, y : 368}}, // West Wall
// 	{min : {x : 39, y : 29}, max : {x : 378, y : 120}}, // North Wall
// 	{min : {x : 360, y : 50}, max : {x : 379, y : 375}}, // East Wall
// 	{min : {x : 61, y : 352}, max : {x : 156, y : 430}}, // SouthWest Walls
// 	{min : {x : 273, y : 352}, max : {x : 382, y : 430}}, // SouthEast Walls
// 	{min : {x : 255, y : 106}, max : {x : 326, y : 166}}, // Nightstand
// 	{min : {x : 106, y : 224}, max : {x : 243, y : 271}}, // South Bed
// 	{min : {x : 106, y : 88}, max : {x : 243, y : 173}}, // North Bed
// 	{min : {x : 111, y : 88}, max : {x : 144, y : 261}} // West Bed
// ];


// var objects = [
// 	new GameObject(608, 218, {	image : require("./data/home/kitchen/TV.png"), 
// 								zOffset : 121,
// 								relativeBoundingBox : {min: {x:5, y:131}, max: {x:140, y:162}}
// 							}), // TV

// 	new GameObject(238, 280, {	image : require("./data/home/kitchen/middleChair.png"),
// 								zOffset : 119,
// 								relativeBoundingBox : {min: {x:4, y:57}, max: {x:59, y:100}}
// 							}), // middleChair

// 	new GameObject(345, 307, {	image : require("./data/home/kitchen/rightChair.png"), 
// 								zOffset : 106,
// 								relativeBoundingBox : {min: {x:4, y:95}, max: {x:48, y:128}}
// 							}), // rightChair

// 	new GameObject(97,  319, {	image : require("./data/home/kitchen/leftChair.png"),
// 								zOffset : 96,
// 								relativeBoundingBox : {min: {x:10, y:100}, max: {x:51, y:121}}
// 							}), // leftChair

// 	new GameObject(576, 338, {	image : require("./data/home/kitchen/couch.png"),
// 								zOffset : 120,
// 								relativeBoundingBox : {min: {x:6, y:48}, max: {x:213, y:102}}
// 							}), // couch

// 	new GameObject(167, 327, {	image : require("./data/home/kitchen/table.png"),
// 								zOffset : 165,
// 								relativeBoundingBox : {min: {x:5, y:55}, max: {x:152, y:165}}
// 							}) // table
// ];

module.exports = street;