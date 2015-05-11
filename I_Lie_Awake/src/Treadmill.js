var ImageObject = require("ImageObject.js");
var AnimatedImageObject = require("AnimatedImageObject.js");

var DIRT_IMAGE = require("./data/street_day5/grass.jpg");
var GRASS_IMAGE = require("./data/street/grass.jpg");
var PATH_IMAGE = require("./data/street/path.png");
var DAY_5_PATH_IMAGE = require("./data/street_day5/path.png");

var House = require("House.js");
var Car = require("Car.js");

var desaturatedGrass = GRASS_IMAGE;

var utils = require("utils.js");

var squiggle = require("Squiggle.js");

var elapsed;
var grass;
var road;
var house;
var cars;

var animatedDestroyedHouse;

var drawnGrass;
var drawnRoad;
var drawnHouse;
var drawnCars;

var layersPool;
var drawnLayers;

var Explosion = require("Explosion.js");

var DESTROYED_HOUSE_1_ANIMATED = require("./data/street_day5/house1/house1_black.png");
var DESTROYED_HOUSE_1 = require("./data/street_day5/house1/house1.png");


var initializeLayers = function(){
	window.gamestate.explosion = new Explosion();

	grass = [
		new ImageObject(0, 0, desaturatedGrass, 0),
		new ImageObject(0, 0, desaturatedGrass, 0),
		new ImageObject(0, 0, desaturatedGrass, 0),
	];

	var dayNum = window.gamestate.dayNum();

	if (dayNum == 4){
		house = [];

		var animatedDestroyedHouse;
		var numHouses = 4;
		var lastHouseNum = numHouses - 1;

		for (var i = 0; i < numHouses; i++){
			animatedDestroyedHouse = new AnimatedImageObject(0, 0, DESTROYED_HOUSE_1_ANIMATED, 4, 10, 0, 40);
			animatedDestroyedHouse.image = DESTROYED_HOUSE_1;
			animatedDestroyedHouse.isDestroyed = true;

			if (i !== lastHouseNum){
				house.push(animatedDestroyedHouse);
			}
		}

		drawnHouse = [animatedDestroyedHouse];

		road = [
			new ImageObject(0, 0, DAY_5_PATH_IMAGE, 0),
			new ImageObject(0, 0, DAY_5_PATH_IMAGE, 0),
			new ImageObject(0, 0, DAY_5_PATH_IMAGE, 0),
		];

		drawnRoad = [new ImageObject(0, 0, DAY_5_PATH_IMAGE, 0)];
	} else {
		house = [
			new House(100, 0),
			new House(100, 0),
			new House(100, 0) 
		];

		drawnHouse = [new House(100, 0)];

		road = [
			new ImageObject(0, 0, PATH_IMAGE, 0),
			new ImageObject(0, 0, PATH_IMAGE, 0),
			new ImageObject(0, 0, PATH_IMAGE, 0),
		];

		drawnRoad = [new ImageObject(0, 0, PATH_IMAGE, 0)];
	}

	cars = [
		new Car(100, 400),
		new Car(100, 400),
		new Car(100, 400),
		new Car(100, 400)
	];

	drawnGrass = [new ImageObject(0, 0, desaturatedGrass, 0)];
	
	drawnCars = [new Car(100, 400)];

	layersPool = [grass, road, house, cars];
	drawnLayers = [drawnGrass, drawnRoad, drawnHouse, drawnCars];

	squiggle.init();
}

initializeLayers();

var Treadmill = function(speed_) {
	var speed = speed_;
	var elapsed;
	var foregroundLayerNum = 3;

	var carBomb = null;
	var carBombX = 180;

	var init = function(){
		initializeLayers();
		carBomb = null;
	}

	this.initializeLayers = init;

	this.setSaturation = function(saturationAmount){
		var grass;

		var dayNum = window.gamestate.dayNum();

		if (dayNum == 4){
			grass = DIRT_IMAGE;
		} else {
			grass = GRASS_IMAGE;
		}

		desaturatedGrass = utils.desaturateImage(grass, saturationAmount);
		House.desaturate(saturationAmount);

		for (var i = 0; i < grass.length; i++){
			grass[i].image = desaturatedGrass;
		}

		for (var i = 0; i < drawnGrass.length; i++){
			drawnGrass[i].image = desaturatedGrass;
		}
	}

	this.update = function(elapsed_){
		elapsed = elapsed_;
		squiggle.update(elapsed_);
	}

	this.setSpeed = function(amt){
		speed = amt;
	}

	var getNextObject = function(layerNum){
		var layer = layersPool[layerNum];

		if (layer.length == 0) return null;

		var index = Math.floor(Math.random() * layer.length);

		var obj = layer[index];

		if (index > -1) {
			layer.splice(index, 1);
		}

		return obj;
	}

	this.draw = function(){
		for (var i = 0; i < drawnLayers.length; i++){
			layer = drawnLayers[i];

			// Move the first object back to the object pool if it's moved offscreen
			if (layer.length > 0){
				var firstObj = layer[0];

				if (firstObj.hasMovedOffscreen()){
					layersPool[i].push(firstObj);
					layer.splice(0, 1);
				}
			}

			if (i == 3 && carBomb !== null){
				if (Math.abs(firstObj.transform.x - carBombX) < 2){
					speed = 0;
					carBomb();
					carBomb = null;
				}
			}

			// Draw all drawn layers
			for (var j = 0; j < layer.length; j++){
				obj = layer[j];

				// It's fine to update in the drawn loop since you can't interact with the background
				obj.update(speed * elapsed);

				obj.draw();

				lastObj = obj;
			}

			if (layer.length > 0){
				var lastObj = layer[layer.length - 1];

				var offset = lastObj.showNextOffset();

				if (offset !== null){
					var nextObj = getNextObject(i);

					if (nextObj !== null){
						// update needed to set which side to setOffscreen
						nextObj.update(speed * elapsed);

						// if (i <= 1){
						nextObj.setOffscreenPerfect(offset);
						// } else {
						// 	nextObj.setOffscreen();
						// }

						layer.push(nextObj);
					}
				}
			}

			if (i == foregroundLayerNum - 1){
				window.gamestate.mainCharacter.draw();
			}
		}

		squiggle.draw();
	}

	this.addCarBomb = function (func){
		carBomb = func;
	};
};

module.exports = Treadmill;