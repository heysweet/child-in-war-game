var Room = require("Room.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");

var school = new Room(960, 540);

var grassImage = require("./data/street/grass.jpg");
var sidewalkImage = require("./data/street/path.png");
var schoolImage = require("./data/street/school.png");

var background = utils.mergeImages([grassImage, sidewalkImage, schoolImage]);

school.setBackground(background);

var targetLeaveSchoolChoords = {
	x : 200,
	y : 200
};

var leaveSchool = function(){
	window.gamestate.setCurrentRoom(school.leaveTo);
	var mainCharacter = window.gamestate.mainCharacter;

	mainCharacter.transform.x = targetLeaveSchoolChoords.x;
	mainCharacter.transform.y = targetLeaveSchoolChoords.y;
}



// school.setStaticCamera(utils.halfScreenWidth()-(430/2), utils.halfScreenHeight()-100);

// var objects = [
// ];

// school.addObjects(objects);

module.exports = school;