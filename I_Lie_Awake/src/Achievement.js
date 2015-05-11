var utils = require("utils.js");

var achievementSet = new Set();

var text;
var achievementSound = require("./data/sound/achievement.ogg");
var achievementImage = require("./data/achievement.png");

var achievementDuration = 3.2;
var timeUntilDisappear = (achievementDuration * 2) / 3;

var isShowing = false;
var animationOffset = 0;
var animationDelta  = 600;

var MAX_NUM_ACHIEVEMENTS = 2;

var bottomSpacing = 10;
var maxAnimationOffset = achievementImage.height + bottomSpacing;

var font = "200 17px Roboto";
var elapsedTime = 100000;

var transform = {
	x : utils.halfScreenWidth() - (achievementImage.width/2),
	y : utils.screenHeight()
};

var textTransform = {
	x : transform.x + 81,
	y : transform.y + 60
}

function time(){
	var d = new Date();
	return d.getTime();
}

function achieve(text_){
	if (!achievementSet.has(text_)){
		achievementSet.add(text_)

		text = text_;
		animationOffset = 0;
		elapsedTime = 0;
		isShowing = true;

		achievementSound.play();
	}
}

function numAchievementsUnlocked(){
	return achievementSet.size;
}

function numTotalAchievements(){
	// Make it look like there's one more achievement than there really is
	return MAX_NUM_ACHIEVEMENTS + 1;
}

var update = function(elapsed){
	if (isShowing){
		elapsedTime += elapsed;

		if (elapsedTime < timeUntilDisappear){
			if (animationOffset < maxAnimationOffset){
				animationOffset += (animationDelta * elapsed);
				
				if (animationOffset > maxAnimationOffset){
					animationOffset = maxAnimationOffset;
				}
			}
		} else {
			if (animationOffset > 0){
				animationOffset -= (animationDelta * elapsed);

				if (animationOffset < 0){
					animationOffset = 0;
					isShowing = false;
				}
			}
		}
	}
}

var draw = function(){
	if (isShowing){
		var ctx = sald.ctx;

		var x = transform.x;
		var y = transform.y - animationOffset;

		var textX = textTransform.x;
		var textY = textTransform.y - animationOffset;

		ctx.drawImage(achievementImage, x, y);

		ctx.font = font;
		ctx.fillStyle = 'rgb(210, 210, 210)';

		ctx.fillText(text, textX, textY);
	}
}


module.exports = {
	update:update,
	draw:draw,
	achieve:achieve,
	numTotalAchievements:numTotalAchievements,
	numAchievementsUnlocked:numAchievementsUnlocked,
};