var ImageObject = require("ImageObject.js");
var AnimatedImageObject = require("AnimatedImageObject.js");

var GRASS_IMAGE = require("./data/street/grass.jpg");
var PATH_IMAGE = require("./data/street/path.png");
var HOUSE_1_IMAGE = require("./data/street/house1/house1.png");

var desaturatedGrass = GRASS_IMAGE;
var desaturatedHouse = HOUSE_1_IMAGE;

var CAR_1_IMAGE = require("./data/street/cars/car1.png");
var CAR_2_IMAGE = require("./data/street/cars/car2.png");
var CAR_3_IMAGE = require("./data/street/cars/car3.png");
var CAR_4_IMAGE = require("./data/street/cars/car4.png");
var CAR_5_IMAGE = require("./data/street/cars/car5.png");

var DESTROYED_HOUSE_1_ANIMATED = require("./data/street/house1/house1_destroy_black.png");
var DESTROYED_HOUSE_1 = require("./data/street/house1/house1_destroy.png");

var utils = require("utils.js");

var elapsed;
var grass;
var road;
var cars;

var animatedDestroyedHouse;

var house;

var drawnGrass;
var drawnRoad;
var drawnHouse;
var drawnCars;

var layersPool;
var drawnLayers;

var newestObjects;

var Explosion = require("Explosion.js");

var initializeLayers = function(){
	window.gamestate.explosion = new Explosion();

	grass = [
		new ImageObject(0, 0, desaturatedGrass, 0),
		new ImageObject(0, 0, desaturatedGrass, 0),
		new ImageObject(0, 0, desaturatedGrass, 0),
	];

	road = [
		new ImageObject(0, 0, PATH_IMAGE, 0),
		new ImageObject(0, 0, PATH_IMAGE, 0),
		new ImageObject(0, 0, PATH_IMAGE, 0),
	];

	animatedDestroyedHouse = new AnimatedImageObject(100, 0, DESTROYED_HOUSE_1_ANIMATED, 4, 10, 140, 40);
	animatedDestroyedHouse.image = DESTROYED_HOUSE_1;
	animatedDestroyedHouse.isDestroyed = true;

	house = [
		new ImageObject(100, 0, desaturatedHouse, 40), 
		new ImageObject(100, 0, desaturatedHouse, 40),
		animatedDestroyedHouse,
		// new ImageObject(100, 0, HOUSE_1_IMAGE, 40)
	];

	cars = [
		new ImageObject(100, 400, CAR_2_IMAGE, 900), 
		new ImageObject(100, 400, CAR_3_IMAGE, 900), 
		new ImageObject(100, 400, CAR_4_IMAGE, 900), 
		new ImageObject(100, 400, CAR_5_IMAGE, 900), 
	];

	drawnGrass = [new ImageObject(0, 0, desaturatedGrass, 0)];
	drawnRoad = [new ImageObject(0, 0, PATH_IMAGE, 0)];
	drawnHouse = [new ImageObject(100, 0, desaturatedHouse, 40)];
	drawnCars = [];

	layersPool = [grass, road, house, cars];
	drawnLayers = [drawnGrass, drawnRoad, drawnHouse, cars];

	newestObjects = [new ImageObject(100, 400, CAR_1_IMAGE, 900)];
}

initializeLayers();

for (var i = 0; i < drawnLayers.length; i++){
	newestObjects.push(drawnLayers[i]);
}

var Treadmill = function(speed_) {
	var speed = speed_;
	var elapsed;
	var foregroundLayerNum = 3;

	var carBomb = null;
	var carBombX = 200;

	var init = function(){
		initializeLayers();
		carBomb = null;
	}

	this.initializeLayers = init;

	this.setSaturation = function(saturationAmount){
		desaturatedGrass = utils.desaturateImage(GRASS_IMAGE, saturationAmount);
		desaturatedHouse = utils.desaturateImage(HOUSE_1_IMAGE, saturationAmount);

		for (var i = 0; i < grass.length; i++){
			grass[i].image = desaturatedGrass;
		}

		for (var i = 0; i < drawnGrass.length; i++){
			drawnGrass[i].image = desaturatedGrass;
		}

		for (var i = 0; i < house.length; i++){
			if (!house[i].isDestroyed){
				house[i].image = desaturatedHouse;
			}
		}

		for (var i = 0; i < drawnHouse.length; i++){
			if (!drawnHouse[i].isDestroyed){
				drawnHouse[i].image = desaturatedHouse;
			}
		}
	}

	this.update = function(elapsed_){
		elapsed = elapsed_;
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
						nextObj.setOffscreen(offset);

						layer.push(nextObj);
					}
				}
			}

			if (i == foregroundLayerNum - 1){
				window.gamestate.mainCharacter.draw();
			}
		}
	}

	this.addCarBomb = function (func){
		console.log("BOMB IS PRIMED");
		carBomb = func;
	};
};

module.exports = Treadmill;