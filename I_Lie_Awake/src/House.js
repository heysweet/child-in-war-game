var utils = require("utils.js");
var ImageObject = require("ImageObject.js");

var HOUSE_1 = [

];

var HOUSE_2 = [

];

var HOUSE_3 = [

];

var houses = [
	HOUSE_1, HOUSE_2, HOUSE_3
];

var House = function(x_, y_, houseNum){
	var distance = 40;

	var destruction = 0;
	var house;

	// between 0 and 3
	this.setDestruction = function(amt){
		destruction = amt;
	}

	this.setHouseNum = function(num){
		house = houses[num-1];
	}

	this.setHouseNum(houseNum);

	ImageObject.call(this, x_, y_, HOUSE_1[0], distance);

	this.draw = function(){
		if (!isHidden){
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

module.exports = House;