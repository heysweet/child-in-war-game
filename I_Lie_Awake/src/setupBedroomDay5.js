var Room = require("Room.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");

var bedroom = new Room(430, 430);

// bedroom.setStaticCamera(utils.halfScreenWidth()-(430/2), utils.halfScreenHeight()-100);

var objects = [
	new GameObject(100, 145, {	image : require("./data/home/bedroom/bed.png"), 
								zOffset : 0
							}),
	new GameObject(100, 145, {	image : require("./data/home/bedroom/blanket.png"), 
								zOffset : 72
							})
];

bedroom.addObjects(objects);

module.exports = bedroom;