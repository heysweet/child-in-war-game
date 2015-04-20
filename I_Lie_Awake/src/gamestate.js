var GameState = function(){
	var currentDialogue = null;
	var currentRoom = null;

	this.currentDialogue = function(){
		return currentDialogue;
	}

	this.setCurrentDialogue = function(dialogue){
		currentDialogue = dialogue;
	}

	this.currentRoom = function(){
		return currentRoom;
	}

	this.setCurrentRoom = function(room){
		currentRoom = room;

		window.gamestate.activeGameObjects = room.getObjects;
		var mainCharacter = window.gamestate.mainCharacter;
		mainCharacter.movement.updateRoom(room);
	}
}

var gamestate = new GameState();

window.gamestate = gamestate;