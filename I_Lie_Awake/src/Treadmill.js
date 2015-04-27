var ImageObject = require("ImageObject.js");

var elapsed;

var grass = [
	new ImageObject(0, 0, require("./data/street/grass.jpg"), 0),
	new ImageObject(0, 0, require("./data/street/grass.jpg"), 0),
	new ImageObject(0, 0, require("./data/street/grass.jpg"), 0),
];

var road = [
	new ImageObject(0, 0, require("./data/street/path.png"), 0),
	new ImageObject(0, 0, require("./data/street/path.png"), 0),
	new ImageObject(0, 0, require("./data/street/path.png"), 0),
];

var house = [
	new ImageObject(100, 0, require("./data/street/house1/house1.png"), 40), 
	new ImageObject(100, 0, require("./data/street/house1/house1.png"), 40),
	new ImageObject(100, 0, require("./data/street/house1/house1.png"), 40)
];

var drawnGrass = [new ImageObject(0, 0, require("./data/street/grass.jpg"), 0)];
var drawnRoad = [new ImageObject(0, 0, require("./data/street/path.png"), 0)];
var drawnHouse = [new ImageObject(100, 0, require("./data/street/house1/house1.png"), 40)];

var layersPool = [grass, road, house];
var drawnLayers = [drawnGrass, drawnRoad, drawnHouse];

var newestObjects = [];

for (var i = 0; i < drawnLayers.length; i++){
	newestObjects.push(drawnLayers[i]);
}

var Treadmill = function(speed_) {
	var speed = speed_;
	var elapsed;

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

				var offset = lastObj.showNextOffset()

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
		}
	}
};

module.exports = Treadmill;