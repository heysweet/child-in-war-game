var Room = require("Room.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");
var Treadmill = require("Treadmill.js");

var mainCharacter = window.gamestate.mainCharacter;
var speed = mainCharacter.transform.xDelta;

var street = new Room(utils.screenWidth(), utils.screenHeight());

var movement = require("movement.js");

street.setStaticCamera(utils.halfScreenWidth()-(430/2), utils.halfScreenHeight()-100);

var treadmill = new Treadmill(speed);

var school = require("setupSchool.js");
school.leaveTo = street;

street.onEnter = function(){
	// Disable movement
	movement.pause(true);

	var direction = 1;

	// Setup character movement animations
	mainCharacter.forceWalking(true, 1);

	// Set Saturation
	treadmill.setSaturation(1 - (window.gamestate.dayNum() / (2 * window.gamestate.MAX_DAYS)));

	// Setup scrolling background
	treadmill.setSpeed(mainCharacter.moveVector.rightness);

	// Setup Texting
	window.gamestate.shouldShowPhone = true;
	window.gamestate.isTexting = true;

	window.gamestate.startDialogue("toSchool");
}

street.draw = function(){
	treadmill.draw();
}

street.update = function(elapsed){
	treadmill.update(elapsed);
}

street.onLeave = function(){
	// Enable movement
	movement.pause(false);

	// Revert character movement animations
	mainCharacter.forceWalking(false);

	// Get rid of scrolling background?

	// Disable Texting
	window.gamestate.shouldShowPhone = false;
	window.gamestate.isTexting = false;
}

street.goToSchool = function(){
	window.gamestate.setCurrentRoom(school);
	var mainCharacter = window.gamestate.mainCharacter;

	// if (school.staticCamera !== undefined){
	// 	camera.updateTransform(school.staticCamera);
	// } else {
	// 	// Make the camera move to the correct position
	// 	var position = window.gamestate.mainCharacter.transform;

	// 	camera.focusCamera(position);
	// }

	mainCharacter.transform.x = coords.x;
	mainCharacter.transform.y = coords.y;
}

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