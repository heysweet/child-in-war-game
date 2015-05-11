var utils = require("utils.js");

var DiaryText = function (string_) {
	var x = 40;
	var y = 60;
	var maxWidth = utils.screenWidth() - (2 * x);
	var lineheight = 46;
	var font = "40px Indie Flower";
	var isHidden = true;
	var string = string_;

	var overlay = require("./data/street/darkness.png");

	this.draw = function(){
		if (!isHidden){
			var ctx = sald.ctx;

			ctx.drawImage(overlay, 0, 0);

			ctx.font = font;
			ctx.fillStyle = 'rgb(255, 255, 255)';

			ctx.wrapText(string, x, y, maxWidth, lineheight);
		}
	}

	this.setText = function(text){
		string = text;
	}

	this.setIsHidden = function(bool){
		isHidden = bool;
	}
}

var diaries = require("setupDiaries.js");

var parentsDiaries = diaries.parents;
var friendsDiaries = diaries.friends;
var schoolDiaries = diaries.school;

var setFriendsDiary = function(){
	var dayNum = window.gamestate.dayNum();

	window.gamestate.diaryText.setText(friendsDiaries[dayNum]);
}

var setParentsDiary = function(){
	var dayNum = window.gamestate.dayNum();

	window.gamestate.diaryText.setText(parentsDiaries[dayNum]);
}

var setSchoolDiary = function(){
	var dayNum = window.gamestate.dayNum();

	window.gamestate.diaryText.setText(schoolDiaries[dayNum]);
}


window.gamestate.diaryText = new DiaryText("");
window.gamestate.setFriendsDiary = setFriendsDiary;
window.gamestate.setParentsDiary = setParentsDiary;
window.gamestate.setSchoolDiary = setSchoolDiary;