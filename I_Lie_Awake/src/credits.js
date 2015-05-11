var timeElapsed = 0;

var totalCreditsTime = 20.473
var utils = require("utils.js");

var beginning = 3.026
var zeroDaysLeftTime = 6.974;
var namesTime = 11.612;
var linksTime = 16.527;
var achievementsTime = totalCreditsTime;

var achievement = require("Achievement.js");
var dayNumDisplay = require("dayNumDisplay.js");

// var zeroDaysLeftTime = 4;
// var namesTime = 5.3 + zeroDaysLeftTime;
// var linksTime = 4 + namesTime;
// var achievementsTime = totalCreditsTime;

function update(elapsed){
	timeElapsed += elapsed;
}

function drawZeroDaysLeft(){
	dayNumDisplay.draw();
}

function drawLines(lines, fontSize){
	var font = "" + fontSize + "px Walter Turncoat"

	var ctx = sald.ctx;

	ctx.textAlign = "center"; 

	ctx.font = font;
	ctx.fillStyle = 'rgb(255, 253, 253)';


	var numLines = lines.length;

	var yDelta = fontSize + 2;
	var yOffset = (yDelta/2) * numLines;

	for (var i = 0; i < numLines; i++){
		ctx.fillText(lines[i], utils.halfScreenWidth(), utils.halfScreenHeight() - yOffset + (yDelta * i));
	}
}

var namesFont = 42;
var nameLines = ["Jessica Shen", "Andrew Sweet", "Dave Yan"];

function drawNames(){
	drawLines(nameLines, namesFont);
}

var linkFont = 12;
var linkLines = [
	"Audio",
"freesound.org",
"https://www.youtube.com/watch?v=8PbD3I9eumM",
"https://www.youtube.com/watch?v=_Sur-KDNcDA",
"War Rock",
"Podington Bear",
"Eric Skiff",
"Dominic Bisignano",
"",
"Images",
"http://kirkdunne.com/blog/wp-content/uploads/2011/02/tex_pavped_004.jpg",
"http://fc04.deviantart.net/images/i/2003/11/6/5/Dirt_02.jpg",
"http://wallope.com/wp-content/uploads/textures-wallpapers-462-wood-board-brown-texture-backgrounds-images.jpg",
"http://www.cgtextures.com/texview.php?id=11377",
"http://st.depositphotos.com/1092019/2258/i/950/depositphotos_22588415-Brick-Wall-Seamless-Texture..jpg",
"http://cdn.theatlantic.com/static/infocus/syria040513/s_s06_RTR3EMWL.jpg",
"https://i.stack.imgur.com/ClbRc.png",
"http://i.huffpost.com/gen/1635818/images/o-SYRIA-facebook.jpg",
"http://files.sharenator.com/418357.jpg",
"http://www.worldtribune.com/wp-content/uploads/2013/12/israel-war-games-4-2.jpg",
"http://twt-thumbs.washtimes.com/media/image/2015/01/28/1_282015_mideast-israel-lebanon-38201_c0-155-3692-2307_s561x327.jpg?a7e2306fe4f11dde9565d0e5a23fa32878f329a7",
"https://img.washingtonpost.com/rw/2010-2019/WashingtonPost/2012/11/14/National-Economy/Advance/Images/IMG_10741352931010.jpg",
"http://www.mb3d.co.uk/mb3d/Brick_Seamless_and_Tileable_High_Res_Textures_files/Brick_14_UV_H_CM_1.jpg",
"https://pressstart2begin.files.wordpress.com/2013/08/nes_super_mario_bros-1.png",
"https://epicbuzz-cdn.storage.googleapis.com/uploads/image/image/26465/Pong-Clock_1.jpg",
"https://epicbuzz-cdn.storage.googleapis.com/uploads/image/image/172808/SpaceInvaders-090910_01.jpg",
"https://wscont.apps.microsoft.com/winstore/1x/c1c6ad9c-85f5-42c8-8aef-8be547b44b71/Screenshot.129310.1000001.jpg",
"http://games1.85play.com/thumbs/pac_man_game.jpg",
"http://www.8-bitcentral.com/images/reviews/atari5200/robotron5200Screen.jpg",
"http://www.noupe.com/wp-content/uploads/2012/06/donkey-kong-arcade.png",
];

function drawLinks(){
	drawLines(linkLines, linkFont);
}

var achievementFont = 32;

function getAchievementLines(){
	var totalNum = achievement.numTotalAchievements();
	var unlockedNum = achievement.numAchievementsUnlocked();

	return ["" + unlockedNum + " out of " + totalNum + " achievements unlocked."];
}

function drawAchievements(){
	drawLines(getAchievementLines(), achievementFont);
}

function draw(){
	if (timeElapsed < beginning){
		// Do nothing
	} else if (timeElapsed < zeroDaysLeftTime){
		drawZeroDaysLeft();
	} else if (timeElapsed < namesTime){
		drawNames();
	} else if (timeElapsed < linksTime){
		drawLinks();
	} else if (timeElapsed < achievementsTime){
		drawAchievements();
	}
}

module.exports = {
	update:update,
	draw:draw
};