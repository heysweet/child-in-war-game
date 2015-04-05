var GameObject = require("GameObject.js");

function Character(startX, startY, width, height){
	GameObject.call(this, startX, startY, width, height);
}

Character.prototype = Object.create(GameObject.prototype);

Character.prototype.constructor = Character;


module.exports = Character;