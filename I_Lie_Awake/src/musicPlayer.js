var songs = [
	require("./data/music/day1-1-toSchool.ogg"),
	require("./data/music/day1-3-toHome.ogg"),
	require("./data/music/day1-4-sleep.ogg"),

	require("./data/music/day2-1-toSchool.ogg"),
	require("./data/music/day2-3-toHome.ogg"),

	require("./data/music/day3-1-toSchool.ogg"),
	require("./data/music/day3-3-toHome.ogg"),

	require("./data/music/day4-1-toSchool.ogg"),
	require("./data/music/day4-2-toHome.ogg"),
];

var nonLoop = new Set([2]);

var currentIndex = -1;
var playingSong = null;

var stopSong = function (){
	if (playingSong !== null){
		playingSong.stop();
	}
}

var playNextSong = function (loops) {
	stopSong();

	currentIndex++;

	if (currentIndex < songs.length){
		playingSong = songs[currentIndex];

		if (loops === undefined || loops == true){
			playingSong.setShouldLoop(true);
		} else {
			playingSong.setShouldLoop(false);
		}

		playingSong.play();
	} else {
		currentIndex--;
	}
}

var setVolume = function(vol){
	if (playingSong){
		playingSong.setVolume(vol);
	}
}

module.exports = {
	playNextSong:playNextSong,
	stop:stopSong,
	setVolume:setVolume
}