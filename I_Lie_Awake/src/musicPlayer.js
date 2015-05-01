var songs = [
	require("./data/music/day1-1-toSchool.ogg"),

	require("./data/music/day1-3-toHome.ogg"),
	require("./data/music/day1-4-sleep.ogg"),
	require("./data/music/day2-1-toSchool.ogg"),

	require("./data/music/day2-3-toHome.ogg"),
	require("./data/music/day3-1-toSchool.ogg"),

	require("./data/music/day3-3-toHome.ogg"),
	require("./data/music/day4-1-toSchool.ogg"),

	require("./data/music/day4-3-toHome.ogg"),
	require("./data/music/day5-1-toSchool.ogg"),
	require("./data/music/day5-2-toHome.ogg")
];

var nonLoop = new Set([2]);

var currentIndex = -1;
var playingSong = null;

var stopSong = function (){
	if (playingSong !== null){
		console.log("STOPPING TRACK", currentIndex);
		playingSong.stop();
	}
}

var playNextSong = function (loops) {
	stopSong();

	currentIndex++;

	console.log("Playing Track", currentIndex);

	if (currentIndex < songs.length){
		playingSong = songs[currentIndex];

		console.log(playingSong);

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

module.exports = {
	playNextSong:playNextSong,
	stop:stopSong
}