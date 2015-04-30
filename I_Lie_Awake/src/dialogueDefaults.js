var Teleporter = require("Teleporter.js");
var utils = require("utils.js");

var goToSchool = function(){
	// Go to school
	var room = utils.rooms.school;
	var coords = utils.schoolCoords;

	Teleporter.teleportTo(room, coords);
}

var goToPlayground = function(){
	// Go to playground
	var room = utils.rooms.playground;
	var coords = utils.playgroundCoords;

	Teleporter.teleportTo(room, coords);
}

var goToHome = function(){
	// Go to bed
	var room = utils.rooms.bedroom;
	var coords = utils.sleepingCoords;

	Teleporter.teleportTo(room, coords);
}

module.exports = {
	goToSchool:goToSchool,
	goToPlayground:goToPlayground,
	goToHome:goToHome
};