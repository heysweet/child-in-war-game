var Room = require("Room.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");
var movementPath = require("movementPath.js");
var RelativeMovementPath = movementPath.RelativeMovementPath;
var AbsoluteMovementPath = movementPath.AbsoluteMovementPath;
var Teleporter = require("Teleporter.js");

var achievement = require("Achievement.js");

var school = new Room(960, 540);

var mainCharacter = window.gamestate.mainCharacter;

var grassImage = require("./data/street/grass.jpg");
var sidewalkImage = require("./data/street/path.png");
var schoolImage = require("./data/street/school.png");

var background = utils.mergeImages([grassImage, sidewalkImage, schoolImage]);

school.setBackground(background);

var imageAlpha = 0;

school.setSaturation = function(saturationAmount){
	school.setBackground(utils.desaturateImage(background, saturationAmount));

	var dayNum = window.gamestate.dayNum();

	switch(dayNum) {
		case 0:
			imageAlpha = 0.0;
			break;
		case 1:
			imageAlpha = 0.2;
			break;
		case 2:
			imageAlpha = 0.4;
			break;
		case 3:
			imageAlpha = 0.6;
			break;
		case 4:
			imageAlpha = 1.0;
			break;
		default:
			break;
	}
}

var targetLeaveSchoolChoords = {
	x : 320,
	y : 300
};

var photoGrass  = require("./data/street_day5/grass.jpg");
var photoSchool = require("./data/street_day5/school.png");
var photoPath   = require("./data/street_day5/path.png");

var photoSchoolMerge = utils.mergeImages([photoGrass, photoSchool, photoPath]);

var oldDraw = school.draw;
school.draw = function(){
	oldDraw.call(school);

	var ctx = sald.ctx;

	var dayNum = window.gamestate.dayNum();

	ctx.globalAlpha = imageAlpha;

	ctx.drawImage(photoSchoolMerge, 0, 0);

	ctx.globalAlpha = 1.0;
}

var showSchoolText = function(){
	// Stop Music
	window.gamestate.musicPlayer.setVolume(0.43);

	mainCharacter.setHidden(true);
	mainCharacter.faceLeft();
	window.gamestate.diaryText.setIsHidden(false);

	var dayNum = window.gamestate.dayNum();

	if (dayNum == 1){
		achievement.achieve("Beat Johnny's High Score!");
	}

	var readSchoolTextTime;

	if (dayNum < 2){
		readSchoolTextTime = 9000;
	} else {
		readSchoolTextTime = 7500;
	}

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
		}, readSchoolTextTime);
}

var walkToSchoolPaths = [
	new AbsoluteMovementPath([{x : 606, y : 250}, {x : 608, y : 177}], showSchoolText),
	new AbsoluteMovementPath([{x : 606, y : 303}, {x : 608, y : 177}], showSchoolText),
	new AbsoluteMovementPath([{x : 606, y : 303}, {x : 608, y : 177}], showSchoolText),
	new AbsoluteMovementPath([{x : 606, y : 303}, {x : 608, y : 177}], showSchoolText),
	new AbsoluteMovementPath([{x : 606, y : 303}, {x : 608, y : 177}], showSchoolText)
];

var walkToSchoolRelativePath = new RelativeMovementPath([{x : 208, y : 0}, {x : 210, y : -126}], showSchoolText);

// walkToSchoolRelativePath.setMovingObject(mainCharacter);
walkToSchoolPaths[0].setMovingObject(mainCharacter);


// school.path = walkToSchoolRelativePath;
school.path = walkToSchoolPaths[0];

var leaveSchool = function(){
	utils.rooms.street.dialogueName = "fromSchool";
	Teleporter.teleportTo(utils.rooms.street, targetLeaveSchoolChoords);
	window.gamestate.mainCharacter.faceLeft();
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