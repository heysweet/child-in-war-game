var GameObject = require("GameObject.js");

function Character(startX, startY, width, height, args){
	GameObject.call(this, startX, startY, width, height, args);
}

// Prototypical Inheritance
Character.prototype = Object.create(GameObject.prototype);

Character.prototype.constructor = Character;


module.exports = Character;