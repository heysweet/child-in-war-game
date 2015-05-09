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

var goToStreet = function(){
	setTimeout(
		function() {
			window.gamestate.leaveBedroom();
		}, 1800);
}

var goToHome = function(){
	setTimeout(
		function() {

			window.gamestate.hasBeenToSchool = false;

			// Go to bed
			var room = utils.rooms.bedroom;
			var coords = utils.sleepingCoords;

			var dayNum = window.gamestate.dayNum();

			if (dayNum == 0){
				window.gamestate.musicPlayer.playNextSong(false);
			} else {
				window.gamestate.musicPlayer.stop();

				if (dayNum == 2){
					window.gamestate.noKeyboardInput = true;
				} else if (window.gamestate.dayNum() > 3){
					window.gamestate.setParentsDiary();
				}
			}

			if (dayNum == 4){
				Teleporter.teleportTo(utils.rooms.kitchen, utils.kitchenCoords);
				utils.pausePlayerMovement(false);
				window.gamestate.noKeyboardInput = false;
			} else {
				Teleporter.teleportTo(room, coords);
				utils.pausePlayerMovement(true);
			}


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
	goToStreet:goToStreet,
	goToSchool:goToSchool,
	goToHome:goToHome,
};