var Room = require("Room.js");
var GameObject = require("GameObject.js");

var kitchen = new Room(960, 540);
var kitchenBackground = require("./data/home/kitchen/mainRoom_day5.png");
var Sprite = require("sald:Sprite.js");

kitchen.setBackground(kitchenBackground);

var collisions = [
	{min: {x:51, y:492}, max: {x:904, y:541}}, // South Wall
	{min: {x:904, y:255}, max: {x:961, y:540}}, // SE Wall
	{min: {x:904, y:84}, max: {x:961, y:136}}, // NE Wall
	{min: {x:456, y:0}, max: {x:959, y:81}}, // North Wall
	{min: {x:354, y:157}, max: {x:522, y:397}},
	{min: {x:548, y:265}, max: {x:913, y:464}},
	{min: {x:798, y:0}, max: {x:957, y:348}},
	{min: {x:654, y:64}, max: {x:794, y:151}},
	{min: {x:216, y:68}, max: {x:353, y:147}}
];

kitchen.addCollisionBoxes(collisions);

module.exports = kitchen;