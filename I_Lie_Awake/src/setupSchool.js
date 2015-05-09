var Room = require("Room.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");
var movementPath = require("movementPath.js");
var RelativeMovementPath = movementPath.RelativeMovementPath;
var AbsoluteMovementPath = movementPath.AbsoluteMovementPath;
var Teleporter = require("Teleporter.js");

var school = new Room(960, 540);

var mainCharacter = window.gamestate.mainCharacter;

var grassImage = require("./data/street/grass.jpg");
var sidewalkImage = require("./data/street/path.png");
var schoolImage = require("./data/street/school.png");

var background = utils.mergeImages([grassImage, sidewalkImage, schoolImage]);

school.setBackground(background);

school.setSaturation = function(saturationAmount){
	school.setBackground(utils.desaturateImage(background, saturationAmount));
}

var targetLeaveSchoolChoords = {
	x : 320,
	y : 300
};

var showSchoolText = function(){
	// Stop Music
	window.gamestate.musicPlayer.setVolume(0.1);

	mainCharacter.setHidden(true);
	mainCharacter.faceLeft();
	window.gamestate.diaryText.setIsHidden(false);

	setTimeout(
		function() {
	utils.rooms.street.treadmill.initializeLayers()
		}, 100);

	setTimeout(
		function() {
			window.gamestate.musicPlayer.playNextSong();
			window.gamestate.diaryText.setIsHidden(true);
			mainCharacter.setHidden(false);
			leaveSchoolRelativePath.start();
		}, 12500);
}

var walkToSchoolPaths = [
	new AbsoluteMovementPath([{x : 546, y : 250}, {x : 548, y : 177}], showSchoolText),
	new AbsoluteMovementPath([{x : 546, y : 303}, {x : 548, y : 177}], showSchoolText),
	new AbsoluteMovementPath([{x : 546, y : 303}, {x : 548, y : 177}], showSchoolText),
	new AbsoluteMovementPath([{x : 546, y : 303}, {x : 548, y : 177}], showSchoolText),
	new AbsoluteMovementPath([{x : 546, y : 303}, {x : 548, y : 177}], showSchoolText)
];

var walkToSchoolRelativePath = new RelativeMovementPath([{x : 208, y : 0}, {x : 210, y : -126}], showSchoolText);

// walkToSchoolRelativePath.setMovingObject(mainCharacter);
walkToSchoolPaths[0].setMovingObject(mainCharacter);


// school.path = walkToSchoolRelativePath;
school.path = walkToSchoolPaths[0];

var leaveSchool = function(){
	console.log("LEAVE school");
	utils.rooms.street.dialogueName = "fromSchool";
	Teleporter.teleportTo(utils.rooms.street, targetLeaveSchoolChoords);
}

var leaveSchoolRelativePath = new RelativeMovementPath([{x : -2, y : 126}, {x : -400, y : 126}], leaveSchool);
leaveSchoolRelativePath.setMovingObject(mainCharacter);

school.onEnter = function(){
	window.gamestate.movement.pauseInput(true);
	// walkToSchoolRelativePath.start();
	walkToSchoolPaths[0].start();
}

// school.setStaticCamera(utils.halfScreenWidth()-(430/2), utils.halfScreenHeight()-100);

// var objects = [
// ];

// school.addObjects(objects);

module.exports = school;