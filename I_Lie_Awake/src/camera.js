var camera = {
	x : sald.size.x/2,
	y : sald.size.y/2
};

camera.setCenter = function(x, y){
	camera.x = x;
	camera.y = y;
}

module.exports = {
	transform:camera
};