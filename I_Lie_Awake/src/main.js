var mainloop = require("sald:mainloop.js");

var setupVars = require("setup.js");

var utils = require("utils.js");
var camera = require("camera.js");
var sound = require("sald:soundController.js");

var testSound = require("./data/test.ogg");

var testDialogue = setupVars.testDialogue;

var mainCharacter = window.gamestate.mainCharacter;

function drawBackground() {
	var ctx = sald.ctx;

	ctx.clearRect(0, 0, utils.screenWidth(), utils.screenHeight());

	gamestate.currentRoom().draw();
}

function drawForeground() {
	var ctx = sald.ctx;

	gamestate.currentRoom().drawForeground();
}

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

		var scalar = utils.imageScalar();

		ctx.setTransform(scalar,0, 0,scalar, 0,0);
		ctx.clearRect( 0, 0, ctx.width, ctx.height );

		var cameraCorner = camera.topLeftCorner();

		// Draw Background
		drawBackground();

		// Draw the character
		mainCharacter.draw(camera);

		drawForeground();

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

			if (key == "T"){
				testSound.currentTime = 0;
				testSound.play();
			} else if (key == "M"){
				if (sound.isMuted()){
					sound.unmute();
				} else {
					sound.mute();
				}
			} else if (key == "P") {
				if (sound.isPaused()){
					sound.resume();
				} else {
					sound.pause();
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
	resize:function(){
		utils.onScreenSizeChange();
	}
};

window.main = function main() {
	mainloop.start(document.getElementById("canvas"));
};
