var utils = require("utils.js");
var ImageObject = require("ImageObject.js");


var lastHouseNum = 0;

// Used for how battered buildings should be
var destructionDistribution = [
	[0.7, 0.3, 0.0, 0.0],
	[0.3, 0.5, 0.2, 0.0],
	[0.1, 0.3, 0.3, 0.3],
	[0.0, 0.1, 0.4, 0.5]
];

var getHouseDestruction = function(){
	var dayNum = window.gamestate.dayNum();

	var breakdown = destructionDistribution[dayNum];

	var r = Math.random();

	for (var i = 0; i < breakdown.length; i++){
		var chance = breakdown[i];

		if (r < chance){
			return i;
		}

		r -= chance;
	}

	// Shouldn't ever get here
	return breakdown.length;
}

var getHouseNumber = function(){
	var r = Math.random();

	if (r < 0.2){
		return lastHouseNum + 1;
	}

	if (r < 0.6){
		lastHouseNum = utils.mod((lastHouseNum + 1), 3);
		return lastHouseNum + 1;
	}

	lastHouseNum = utils.mod((lastHouseNum - 1), 3);

	return lastHouseNum + 1;
}



var SOURCE_HOUSE_1 = [
	require("./data/street/house1/house1.png"),
	require("./data/street/house1/house1_grass.png"),
	require("./data/street/house1/house1_deterioration1.png"),
	require("./data/street/house1/house1_deterioration2.png"),
	require("./data/street/house1/house1_deterioration3.png")
];

var SOURCE_HOUSE_2 = [
	require("./data/street/house2/house2.png"),
	require("./data/street/house2/house2_grass.png"),
	require("./data/street/house2/house2_deterioration1.png"),
	require("./data/street/house2/house2_deterioration2.png"),
	require("./data/street/house2/house2_deterioration3.png"),
];

// var SOURCE_HOUSE_3 = [
// ];

var HOUSE_1 = [
	require("./data/street/house1/house1.png"),
	require("./data/street/house1/house1_grass.png"),
	require("./data/street/house1/house1_deterioration1.png"),
	require("./data/street/house1/house1_deterioration2.png"),
	require("./data/street/house1/house1_deterioration3.png")
];

var HOUSE_2 = [
	require("./data/street/house2/house2.png"),
	require("./data/street/house2/house2_grass.png"),
	require("./data/street/house2/house2_deterioration1.png"),
	require("./data/street/house2/house2_deterioration2.png"),
	require("./data/street/house2/house2_deterioration3.png"),
];

var HOUSE_3 = [

];

var SOURCES = [
	SOURCE_HOUSE_1, 
	SOURCE_HOUSE_2, 
	//SOURCE_HOUSE_3
];

var houses = [
	HOUSE_1, 
	HOUSE_2, 
	HOUSE_3
];

var House = function(x_, y_){
	var distance = 40;

	// Image only used for dimensions, not content
	ImageObject.call(this, x_, y_, HOUSE_1[0], distance);

	var houseNum = getHouseNumber();

	var destruction = 1;
	var house;

	// amt can be between 0 and 3
	this.setDestruction = function(amt){
		destruction = amt + 1;
	}

	this.setHouseNum = function(num){
		if (num == 3){
			console.log("TODO: REMOVE THIS CODE ONCE HOUSE 3 IS ADDED");
			num = 2;
		}

		house = houses[num-1];
	}

	var setOffscreenPerfect = this.setOffscreenPerfect;

	this.setOffscreenPerfect = function(offset){
		setOffscreenPerfect.call(this, offset);

		this.setDestruction(getHouseDestruction());
		this.setHouseNum(getHouseNumber());
	}

	this.setHouseNum(houseNum);

	this.draw = function(){
		if (!this.isHidden()){
			var x = this.transform.x
			var y = this.transform.y;

			var ctx = sald.ctx;

			for (var i = 0; i < destruction; i++){
				ctx.drawImage(house[i], x, y);
			}
		}
	}
}

// Prototypical Inheritance
House.prototype = Object.create(ImageObject.prototype);

House.prototype.constructor = House;

House.desaturate = function(saturationAmount){
	for (var i = 0; i < SOURCES.length; i++){
		var targets = SOURCES[i];

		// Just the grass and the house
		for (var j = 0; j < targets.length; j++){
			var target = targets[j];
			var desaturated = utils.desaturateImage(target, saturationAmount);

			houses[i][j] = desaturated;
		}
	}
}

module.exports = House;