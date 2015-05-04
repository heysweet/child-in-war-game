var Room = require("Room.js");
var GameObject = require("GameObject.js");
var utils = require("utils.js");

var bedroom = new Room(430, 430);

var girlBedroomBackground = require("./data/home/bedroom/girlBedroom.png");

bedroom.setBackground(girlBedroomBackground);

bedroom.setStaticCamera(utils.halfScreenWidth()-(430/2), utils.halfScreenHeight()-100);

var collisions = [
	{min : {x : 39, y : 30}, max : {x : 61, y : 368}}, // West Wall
	{min : {x : 39, y : 29}, max : {x : 378, y : 120}}, // North Wall
	{min : {x : 360, y : 50}, max : {x : 379, y : 375}}, // East Wall
	{min : {x : 61, y : 352}, max : {x : 156, y : 430}}, // SouthWest Walls
	{min : {x : 273, y : 352}, max : {x : 382, y : 430}}, // SouthEast Walls
	{min : {x : 255, y : 106}, max : {x : 326, y : 166}}, // Nightstand
	{min : {x : 106, y : 224}, max : {x : 243, y : 256}}, // South Bed
	{min : {x : 106, y : 88}, max : {x : 243, y : 173}}, // North Bed
	{min : {x : 111, y : 88}, max : {x : 144, y : 256}} // West Bed
];

var objects = [
	new GameObject(100, 145, {	image : require("./data/home/bedroom/blanket.png"), 
								zOffset : 72
							})
];

bedroom.addCollisionBoxes(collisions);
bedroom.addObjects(objects);

module.exports = bedroom;