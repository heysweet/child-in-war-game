var mainloop = require("sald:mainloop.js");
var camera = require("camera.js");
var MainCharacter = require("MainCharacter.js");

// Needed to load gamestate
require("gamestate.js");
var setupVars = require("setup.js");
var testDialogue = setupVars.testDialogue;

// Not rescaleable
// sald.size = {x:320, y:240, mode:"exact"};

// Fully, dynamically rescalable
sald.size = {x:320, y:240, mode:"ratio"};

var mainCharacter = new MainCharacter();

var gamestate = window.gamestate;
gamestate.mainCharacter = mainCharacter;

function drawBackground() {
	var ctx = sald.ctx;

	ctx.fillStyle = 'rgb(0, 0, 0)';

	ctx.fillRect(0, 0, ctx.width, 
			ctx.height);

	gamestate.currentRoom().draw();
}

// Exact aspect ratio, to match pixel art
// sald.size = {x:320, y:240, mode:"multiple"};

sald.scene = {
	/* Use elapsed to make sure that the framerate doesn't 
	 * affect the gameplay
	 */
	update:function(elapsed) {
		mainCharacter.movement.update(elapsed);
		gamestate.currentRoom().update(elapsed);
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

		var dialogue = gamestate.currentDialogue();

		// Draw the foreground
		if (dialogue !== null){
			dialogue.draw();
		}
	},
	key:function(key, down) {

		if (!down){
			var dialogue = gamestate.currentDialogue();

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
		if (down){
			console.log(camera.getTranslatedPoint(pos));
		}
	},
};

window.main = function main() {
	mainloop.start(document.getElementById("canvas"));
};
