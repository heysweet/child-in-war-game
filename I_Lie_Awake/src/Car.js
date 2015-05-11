var utils = require("utils.js");
var ImageObject = require("ImageObject.js");
var AnimatedImageObject = require("AnimatedImageObject.js");

var lastCarNum = 0;

var CAR_DISTANCE = 880;

var destroyedCarsPercentages = [
	0, 0, 0.2, 0.42, 1.0
];

var shouldCarBeDestroyed = function(){
	var dayNum = window.gamestate.dayNum();

	var chance = destroyedCarsPercentages[dayNum];

	if (chance){
		var r = Math.random();

		if (r < chance){
			return true;
		}
	}

	return false;
}

var getCarNumber = function(){
	var r = lastCarNum;

	while (lastCarNum == r){
		r = Math.floor(Math.random() * CARS.length);
	}

	lastCarNum = r;

	return r;
}

var SOURCE_CARS = [
	require("./data/street/cars/car1.png"),
	require("./data/street/cars/car2.png"),
	require("./data/street/cars/car3.png"),
	require("./data/street/cars/car4.png"),
	require("./data/street/cars/car5.png")
];

var SOURCE_DESTROYED = [
	require("./data/street_day5/cars/car1/car1.png"),
	require("./data/street_day5/cars/car2/car2.png"),
	require("./data/street_day5/cars/car3/car3.png"),
	require("./data/street_day5/cars/car4/car4.png"),
	require("./data/street_day5/cars/car5/car5.png")
]

var CAR_1_IMAGE = require("./data/street/cars/car1.png");
var CAR_2_IMAGE = require("./data/street/cars/car2.png");
var CAR_3_IMAGE = require("./data/street/cars/car3.png");
var CAR_4_IMAGE = require("./data/street/cars/car4.png");
var CAR_5_IMAGE = require("./data/street/cars/car5.png");

// DESTROYED CONTENT
var DESTROYED_CAR_1_ANIMATED = require("./data/street_day5/cars/car1/car1_black.png");
var DESTROYED_CAR_1_IMAGE = require("./data/street_day5/cars/car1/car1.png");

var DESTROYED_CAR_2_ANIMATED = require("./data/street_day5/cars/car2/car2_black.png");
var DESTROYED_CAR_2_IMAGE = require("./data/street_day5/cars/car2/car2.png");

var DESTROYED_CAR_3_ANIMATED = require("./data/street_day5/cars/car3/car3_black.png");
var DESTROYED_CAR_3_IMAGE = require("./data/street_day5/cars/car3/car3.png");

var DESTROYED_CAR_4_ANIMATED = require("./data/street_day5/cars/car4/car4_black.png");
var DESTROYED_CAR_4_IMAGE = require("./data/street_day5/cars/car4/car4.png");

var DESTROYED_CAR_5_ANIMATED = require("./data/street_day5/cars/car5/car5_black.png");
var DESTROYED_CAR_5_IMAGE = require("./data/street_day5/cars/car5/car5.png");

var CARS = [
	CAR_1_IMAGE,
	CAR_2_IMAGE,
	CAR_3_IMAGE,
	CAR_4_IMAGE,
	CAR_5_IMAGE
];

var DESTROYED_ANIMATED_CARS = [
	DESTROYED_CAR_1_ANIMATED,
	DESTROYED_CAR_2_ANIMATED,
	DESTROYED_CAR_3_ANIMATED,
	DESTROYED_CAR_4_ANIMATED,
	DESTROYED_CAR_5_ANIMATED
];

var DESTROYED_CARS = [
	DESTROYED_CAR_1_IMAGE,
	DESTROYED_CAR_2_IMAGE,
	DESTROYED_CAR_3_IMAGE,
	DESTROYED_CAR_4_IMAGE,
	DESTROYED_CAR_5_IMAGE
];

var animatedCarObjects = [];

var loadAnimatedCars = function(){
	animatedCarObjects = [];

	var numCars = DESTROYED_CARS.length;

	var animatedDestroyedCar;

	for (var i = 0; i < numCars; i++){
		animatedDestroyedCar = new AnimatedImageObject(100, 350, DESTROYED_ANIMATED_CARS[i], 5, 9, 0, CAR_DISTANCE);
		animatedDestroyedCar.image = DESTROYED_CARS[i];

		animatedCarObjects.push(animatedDestroyedCar);
	}
}

loadAnimatedCars();


var Car = function(x_, y_){
	var distance = CAR_DISTANCE;

	// Image only used for dimensions, not content
	ImageObject.call(this, x_, y_, CARS[0], distance);

	var carNum = getCarNumber();

	var destroyed = shouldCarBeDestroyed();
	var carImage;
	var carAnimatedImage;

	var update = this.update;

	this.update = function(elapsed){
		update.call(this, elapsed);

		if (destroyed){
			carAnimatedImage.update(elapsed);
		}
	}

	var setOffscreenPerfect = this.setOffscreenPerfect;

	this.setOffscreenPerfect = function(offset){
		setOffscreenPerfect.call(this, offset);

		this.setDestroyed(shouldCarBeDestroyed());
		this.setCarNum(getCarNumber() + 1);

		if (destroyed){
			carAnimatedImage.transform.x = this.transform.x;
		}
	}

	var updateImage = function(){
		if (destroyed){
			carAnimatedImage = animatedCarObjects[carNum];
		} else {
			carImage = CARS[carNum];
		}
	}

	// amt can be between 0 and 3
	this.setDestroyed = function(bool){
		destroyed = bool;

		updateImage();
	}

	this.setCarNum = function(num){
		carNum = num - 1;

		updateImage();
	}

	// Load the images
	updateImage();

	this.draw = function(){
		if (!this.isHidden()){
			var x = this.transform.x
			var y = this.transform.y;

			var ctx = sald.ctx;

			if (destroyed){
				carAnimatedImage.draw();
			} else {
				ctx.drawImage(carImage, x, y);
			}
		}
	}
}

// Prototypical Inheritance
Car.prototype = Object.create(ImageObject.prototype);

Car.prototype.constructor = Car;

Car.desaturate = function(saturationAmount){
	var i;

	for (i = 0; i < SOURCE_CARS.length; i++){
		CARS[i] = utils.desaturateImage(SOURCE_CARS[i], saturationAmount);
	}

	for (i = 0; i < SOURCE_DESTROYED.length; i++){
		DESTROYED_CARS = utils.desaturateImage(SOURCE_DESTROYED[i], saturationAmount);
	}
}

module.exports = Car;