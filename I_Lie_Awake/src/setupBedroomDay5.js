var Room = require("Room.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");
var achievement = require("Achievement.js");

var bedroom = new Room(430, 430);

var x = 104;
var y = 90;

var creditsSong = require("./data/music/credits.ogg");

bedroom.setStaticCamera(utils.sleepingCoords.x + window.gamestate.mainCharacter.halfWidth(),
						utils.sleepingCoords.y + window.gamestate.mainCharacter.halfHeight());

bedroom.onEnter = function(){
	setTimeout(
		function() {
			window.gamestate.gameOver = true;
			creditsSong.play();
			achievement.achieve("Had Fun (You beat the game!)");
			window.gamestate.nextDay();
		}, 3500);
}

var objects = [
	new GameObject(x, y, {	image : require("./data/home/bedroom/bed.png"), 
								zOffset : 0
							}),
	new GameObject(x - 4, y + 55, {	image : require("./data/home/bedroom/blanket.png"), 
								zOffset : 72
							})
];

bedroom.addObjects(objects);

module.exports = bedroom;