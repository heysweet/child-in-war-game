var Teleporter = require("Teleporter.js");
var utils = require("utils.js");

var goToSchool = function(){
	window.gamestate.setSchoolDiary();

	setTimeout(
		function() {

			window.gamestate.hasBeenToSchool = true;

			// Go to school
			var room = utils.rooms.school;
			var coords = utils.schoolCoords();

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

	setTimeout(
		function() {

			window.gamestate.hasBeenToSchool = false;

			// Go to bed
			var room = utils.rooms.bedroom;
			var coords = utils.sleepingCoords;

			console.log("DAY NUM ", window.gamestate.dayNum());
			if (window.gamestate.dayNum() == 0){
				window.gamestate.musicPlayer.playNextSong(false);
			} else {
				window.gamestate.musicPlayer.stop();
			}

			Teleporter.teleportTo(room, coords);
			utils.pausePlayerMovement(true);

			setTimeout(
				function(){
					window.gamestate.diaryText.setIsHidden(false);

					setTimeout(
						function(){
							window.gamestate.diaryText.setIsHidden(true);
							utils.goToTheNextDay();
						}, 12500);

				}, 1600);

		}, 2000);
}

module.exports = {
	goToSchool:goToSchool,
	goToPlayground:goToPlayground,
	goToHome:goToHome
};