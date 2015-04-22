var Room = require("Room.js");
var GameObject = require("GameObject.js");

var kitchen = new Room(960, 540);
var kitchenBackground = require("./data/home/kitchen/mainRoom.png");

kitchen.setBackground(kitchenBackground);

var collisions = [
	{min: {x:287, y:0}, max: {x:348, y:81}}, // Fridge to Bedroom Wall
	{min: {x:46, y:0}, max: {x:287, y:132}}, // Fridge
	{min: {x:0, y:131}, max: {x:46, y:490}}, // West Wall
	{min: {x:51, y:492}, max: {x:904, y:541}}, // South Wall
	{min: {x:904, y:255}, max: {x:961, y:540}}, // SE Wall
	{min: {x:904, y:84}, max: {x:961, y:136}}, // NE Wall
	{min: {x:789, y:0}, max: {x:959, y:81}}, // North Wall 3
	{min: {x:456, y:0}, max: {x:666, y:81}}, // North Wall 2
];

var objects = [
	new GameObject(608, 218, {	image : require("./data/home/kitchen/TV.png"), 
								zOffset : 121,
								collisionShape : { rect : {min: {x:5, y:131}, max: {x:150, y:162}} }
							}), // TV

	new GameObject(238, 280, {	image : require("./data/home/kitchen/middleChair.png"),
								zOffset : 119,
								collisionShape : { rect : {min: {x:4, y:57}, max: {x:59, y:100}} }
							}), // middleChair

	new GameObject(345, 307, {	image : require("./data/home/kitchen/rightChair.png"), 
								zOffset : 106,
								collisionShape : { rect : {min: {x:4, y:95}, max: {x:48, y:128}} }
							}), // rightChair

	new GameObject(97,  319, {	image : require("./data/home/kitchen/leftChair.png"),
								zOffset : 96,
								collisionShape : { rect : {min: {x:10, y:100}, max: {x:51, y:121}} }
							}), // leftChair

	new GameObject(576, 338, {	image : require("./data/home/kitchen/couch.png"),
								zOffset : 120,
								collisionShape : { rect : {min: {x:6, y:48}, max: {x:213, y:102}} }
							}), // couch

	new GameObject(167, 327, {	image : require("./data/home/kitchen/table.png"),
								zOffset : 165,
								collisionShape : { rect : {min: {x:5, y:55}, max: {x:152, y:165}} }
							}) // table
];

kitchen.addCollisionBoxes(collisions);
kitchen.addObjects(objects);

module.exports = kitchen;