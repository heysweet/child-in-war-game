var mainloop = require("sald:mainloop.js");
var camera = require("camera.js");
var MainCharacter = require("MainCharacter.js");

// Needed to load gamestate
require("gamestate.js");
var setupVars = require("setup.js");
var testDialogue = setupVars.testDialogue;

function drawBackground() {
	var cameraCorner = camera.topLeftCorner();

	var ctx = sald.ctx;
	
	var d = new Date();
	var n = d.getMilliseconds();

	ctx.fillStyle = 'rgb(256, 256, 200)';

	ctx.fillRect(20, 20, ctx.width, 
			ctx.height);
	
	ctx.fillRect(0,0, ctx.width, ctx.height);

	ctx.fillStyle = 'rgb(200, 200, 256)';

	ctx.fillRect(200 - cameraCorner.x, 200 - cameraCorner.y, 
				400, 400);
}

// Not rescaleable
// sald.size = {x:320, y:240, mode:"exact"};

// Fully, dynamically rescalable
sald.size = {x:320, y:240, mode:"ratio"};

var mainCharacter = new MainCharacter();

// Exact aspect ratio, to match pixel art
// sald.size = {x:320, y:240, mode:"multiple"};

sald.scene = {
	/* Use elapsed to make sure that the framerate doesn't 
	 * affect the gameplay
	 */
	update:function(elapsed) {
		mainCharacter.movement.update(elapsed);
	},
	draw:function() {
		// Clear the screen
		var ctx = sald.ctx;

		var scalar = sald.ctx.factor;

		ctx.setTransform(scalar,0, 0,scalar, 0,0);
		ctx.clearRect( 0, 0, ctx.width, ctx.height );

		var cameraCorner = camera.topLeftCorner();

		// Draw Background
		drawBackground();

		// Draw the character
		var transform = mainCharacter.transform;

		ctx.fillStyle = 'rgb(256, 0, 0)';

		var onScreenPos = {
			x : transform.x - cameraCorner.x,
			y : transform.y - cameraCorner.y
		}

		ctx.fillRect(onScreenPos.x - mainCharacter.halfWidth(),
			onScreenPos.y - mainCharacter.halfHeight(),
			mainCharacter.getWidth(), 
			mainCharacter.getHeight());

		var gamestate = window.gamestate;

		// Draw the foreground
		if (gamestate.currentDialogue !== null){
			gamestate.currentDialogue.draw();
		}
	},
	key:function(key, down) {

		if (!down){
			var dialogue = window.gamestate.currentDialogue;

			if (dialogue !== null){
				if (key === "ONE") {
					dialogue.goToNext(0);
				} else if (key === "TWO") {
					dialogue.goToNext(1);
				}
			}

			if (key === "SPACE") {
				if (dialogue === null){
					testDialogue.start();
				} else {
					dialogue.goToNext();
				}
			} 
		}
	},
	mouse:function(pos, button, down) {
		//Mouse handling.
	},
};

window.main = function main() {
	mainloop.start(document.getElementById("canvas"));
};
