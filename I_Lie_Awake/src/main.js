var mainloop = require("sald:mainloop.js");

var setup = require("setup.js");

var GameObject = require("GameObject.js");
var utils = require("utils.js");
var camera = require("camera.js");
var sound = require("sald:soundController.js");
var WrapperPath = require("movementPath.js").WrapperPath;
var dayNumDisplay = require("dayNumDisplay.js");

var mainCharacter = window.gamestate.mainCharacter;

function drawBackground() {
	var ctx = sald.ctx;

	// ctx.clearRect(0, 0, utils.screenWidth(), utils.screenHeight());

	gamestate.currentRoom().draw();
}

sald.scene = {
	/* Use elapsed to make sure that the framerate doesn't 
	 * affect the gameplay
	 */
	update:function(elapsed) {
		mainCharacter.movement.update(elapsed);
		gamestate.currentRoom().update(elapsed);
		window.gamestate.phoneInterface.update(elapsed);
	},
	draw:function() {
		// Clear the screen
		var ctx = sald.ctx;

		var scalar = utils.imageScalar();

		ctx.setTransform(scalar,0, 0,scalar, 0,0);

		var imageToGlitch = window.gamestate.imageToGlitch;
		var didGlitch = false;

		if (!imageToGlitch && window.gamestate.imagesToGlitch.length > 0){
			window.gamestate.imageToGlitch = window.gamestate.imagesToGlitch[0];
			window.gamestate.imagesToGlitch.shift();
			imageToGlitch = window.gamestate.imageToGlitch;

			if (imageToGlitch){
				ctx.clearRect( 0, 0, utils.screenHeight()*2, utils.screenWidth()*2);
				ctx.drawImage(imageToGlitch, 0, 0);
				utils.glitchCanvas();
				window.gamestate.imageToGlitch = null;
				imageToGlitch = null;
				didGlitch = true;
				ctx.clearRect( 0, 0, utils.screenHeight()*2, utils.screenWidth()*2);
			}
		}

		if (!window.gamestate.drawNothing && !window.gamestate.drawGlitches){
			if (!didGlitch){
				ctx.clearRect( 0, 0, utils.screenHeight()*2, utils.screenWidth()*2);
			}

			var cameraCorner = camera.topLeftCorner();

			// Draw Background
			drawBackground();

			if (window.gamestate.currentRoom() !== utils.rooms.street){
				GameObject.draw();
			}

			if (!window.gamestate.electricity 
				&& window.gamestate.currentRoom() !== utils.rooms.street 
				&& window.gamestate.currentRoom() !== utils.rooms.school){
				ctx.globalAlpha = 0.4;
				ctx.fillStyle = "#000055";
				ctx.fillRect(0,0,utils.screenWidth(),utils.screenHeight());
				ctx.globalAlpha = 1.0;
			}

			if (window.gamestate.shouldShowPhone){
				window.gamestate.phoneInterface.draw();
			}

			window.gamestate.diaryText.draw();

			if (window.gamestate.explosion){
				window.gamestate.explosion.draw();
			}
		} else {
			ctx.clearRect( 0, 0, utils.screenHeight()*30, utils.screenWidth()*30);

			if (window.gamestate.drawGlitches){
				utils.drawGlitches();
			}
		}

		if (window.gamestate.displayDayNum){
			dayNumDisplay.draw();
		}

		if (window.gamestate.glitchCurrentCanvas){
			utils.glitchCanvas();
			window.gamestate.glitchCurrentCanvas = false;
		}
	},
	key:function(key, down) {
		if (!down){
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

			if (key == "M"){
				if (sound.isMuted()){
					sound.unmute();
				} else {
					sound.mute();
				}
			} 
			// else if (key == "P") {
		// 		if (sound.isPaused()){
		// 			sound.resume();
		// 		} else {
		// 			sound.pause();
		// 		}
		// 	}
		}
	},
	mouse:function(pos, button, down) {
		camPos = camera.getTranslatedPoint(pos);
		pos = utils.getScaledPoint(pos);

		if (window.gamestate.phoneIsCracked){
			if (pos.y > 430){
				if (window.gamestate.isInGame){
					window.gamestate.phoneGame.updateMouse(-10000, -10000);
				} else {
					window.gamestate.phoneInterface.mouse(-10000, -10000);
				}
				return;
			}
		}
		
		if (window.gamestate.isInGame){
			window.gamestate.phoneGame.updateMouse(pos.x, pos.y);
		} else {
			window.gamestate.phoneInterface.mouse(pos);
		}

		if (button === "LEFT"){
			if (window.gamestate.isInGame){
				if (!down){
					window.gamestate.phoneGame.mouseClicked();
				}
			} else if (window.gamestate.isTexting && !down){
				window.gamestate.phoneInterface.mouseClick(pos);		
			}

			if (down){
				var targetPos = {
					x: camPos.x - 35,
					y: camPos.y - 135 
				};

				// if (!mainCharacter.movement.isInputPaused() && window.gamestate.currentRoom() !== utils.rooms.street){
				// 	mainCharacter.path = new WrapperPath(targetPos);
				// }
				console.log(pos, utils.screenWidth(), utils.screenHeight());
				// console.log(mainCharacter.path);
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