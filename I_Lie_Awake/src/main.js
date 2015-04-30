var mainloop = require("sald:mainloop.js");

require("setup.js");

var GameObject = require("GameObject.js");
var utils = require("utils.js");
var camera = require("camera.js");
var sound = require("sald:soundController.js");
var PhoneInterface = require("PhoneInterface.js");

var testSound = require("./data/test.ogg");

var mainCharacter = window.gamestate.mainCharacter;
window.gamestate.camera = camera;

window.gamestate.phoneInterface = new PhoneInterface();

window.gamestate.shouldShowPhone = false;
window.gamestate.isTexting = false;

function drawBackground() {
	var ctx = sald.ctx;

	ctx.clearRect(0, 0, utils.screenWidth(), utils.screenHeight());

	gamestate.currentRoom().draw();
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

		GameObject.draw();

		if (window.gamestate.shouldShowPhone){
			window.gamestate.phoneInterface.draw();
		}
	},
	key:function(key, down) {
		// if (!down){
		// 	var dialogue = gamestate.currentDialogue();

		// 	if (dialogue !== null){
		// 		if (key === "ONE") {
		// 			dialogue.goToNext(0);
		// 		} else if (key === "TWO") {
		// 			dialogue.goToNext(1);
		// 		}
		// 	}

		// 	if (key === "SPACE") {
		// 		if (dialogue === null){
		// 			testDialogue.start();
		// 		} else {
		// 			dialogue.goToNext();
		// 		}
		// 	}

		// 	if (key == "Z"){
		// 		console.log(mainCharacter.transform);
		// 	}

		// 	if (key == "T"){
		// 		testSound.currentTime = 0;
		// 		testSound.play();
		// 	} else if (key == "M"){
		// 		if (sound.isMuted()){
		// 			sound.unmute();
		// 		} else {
		// 			sound.mute();
		// 		}
		// 	} else if (key == "P") {
		// 		if (sound.isPaused()){
		// 			sound.resume();
		// 		} else {
		// 			sound.pause();
		// 		}
		// 	}
		// }
	},
	mouse:function(pos, button, down) {
		pos = utils.getScaledPoint(pos);

		if (button !== undefined){
			if (window.gamestate.isTexting && !down && button === "LEFT"){
				window.gamestate.phoneInterface.mouse(pos);		
			}

			if (down){
				console.log(pos, utils.screenWidth(), utils.screenHeight());
			}
		}
	},
	resize:function(){
		utils.onScreenSizeChange();
	}
};

window.main = function main() {
	mainloop.start(document.getElementById("canvas"));
};
