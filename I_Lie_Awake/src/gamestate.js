var GameState = function(){
	var currentDialogue = null;
	var currentRoom = null;
	var dayNum = 0;

	this.currentDialogue = function(){
		return currentDialogue;
	}

	this.setCurrentDialogue = function(dialogue){
		currentDialogue = dialogue;
	}

	this.dayNum = function(){
		return dayNum;
	}

	this.nextDay = function(){
		dayNum++;
	}

	this.currentRoom = function(){
		return currentRoom;
	}

	this.setCurrentRoom = function(room){
		currentRoom && currentRoom.onLeave && currentRoom.onLeave();

		currentRoom = room;

		window.gamestate.activeGameObjects = room.getObjects;
		var mainCharacter = window.gamestate.mainCharacter;
		mainCharacter.movement.updateRoom(room);

		room && room.onEnter && room.onEnter();
	}
}

var gamestate = new GameState();

window.gamestate = gamestate;