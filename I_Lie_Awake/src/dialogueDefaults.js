var Teleporter = require("Teleporter.js");
var utils = require("utils.js");

var goToSchool = function(){
	window.gamestate.setSchoolDiary();
	
	setTimeout(
		function() {

			window.gamestate.hasBeenToSchool = true;

			// Go to school
			var room = utils.rooms.school;
			var coords = utils.schoolCoords;

			Teleporter.teleportTo(room, coords);

		}, 2000);
}

var goToPlayground = function(){
	setTimeout(
		function() {

			// Go to playground
			var room = utils.rooms.playground;
			var coords = utils.playgroundCoords;

			Teleporter.teleportTo(room, coords);

		}, 2000);
}

var goToHome = function(){
	window.gamestate.setHomeDiary();

	setTimeout(
		function() {

			window.gamestate.hasBeenToSchool = false;

			// Go to bed
			var room = utils.rooms.bedroom;
			var coords = utils.sleepingCoords;

			Teleporter.teleportTo(room, coords);
			utils.pausePlayerMovement(true);

			setTimeout(
				function(){
					window.gamestate.diaryText.setIsHidden(false);

					setTimeout(
						function(){
							window.gamestate.diaryText.setIsHidden(true);
							utils.goToTheNextDay();
						}, 4200);

				}, 1600);

		}, 2000);
}

module.exports = {
	goToSchool:goToSchool,
	goToPlayground:goToPlayground,
	goToHome:goToHome
};