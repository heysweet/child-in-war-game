var utils = require("utils.js");

var tree1 = {
	leaves : [
		require("./data/street/tree1/tree1_leave1.png"),
		require("./data/street/tree1/tree1_leave2.png"),
		require("./data/street/tree1/tree1_leave3.png"),
		require("./data/street/tree1/tree1_leave4.png"),
		require("./data/street/tree1/tree1_leave5.png"),
	],
	trunk : require("./data/street/tree1/tree1_branch.png"),
	numLayersOnDay : [5, 5, 5, 4, 4, 3, 2, 2, 1, 0]
}

var trees = [tree1];

var windOffset = function(layerNum){
	return { x : 0, y : 0};	
}

var Tree = function(x_, y_, treeNum){
	var tree = tree1[treeNum - 1];

	var leaves = tree.leaves;
	var trunk = tree.trunk;

	var numLayersOnDay = tree.numLayersOnDay;

	var transform = {
		x : x_,
		y : y_
	}

	this.draw = function(){
		var camera = window.gamestate.camera;
		var cameraCorner = camera.topLeftCorner();

		var x = this.transform.x - cameraCorner.x;
		var y = this.transform.y - cameraCorner.y;

		// Don't draw if off the screen horizontally
		if (x + trunk.width > 0 && x < utils.screenWidth()){
			var ctx = sald.ctx;

			ctx.drawImage(trunk, x, y);

			var dayNum = window.gamestate.dayNum();
			var numLayersToDraw = numLayersOnDay[dayNum];

			for (var i = 0; i < numLayersToDraw; i++){
				var image = leaves[i];
				
				// Moving Leaves
				// var windOffset = windOffset(i);
				// ctx.drawImage(image, x + windOffset.x, y + windOffset.y);

				// Static Leaves
				ctx.drawImage(image, x, y);
			}
		}
	}
}

module.exports = Tree;