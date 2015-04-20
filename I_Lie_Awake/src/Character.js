var GameObject = require("GameObject.js");

function Character(startX, startY, args){
	GameObject.call(this, startX, startY, args);
}

Character.prototype = Object.create(GameObject.prototype);

Character.prototype.constructor = Character;


module.exports = Character;