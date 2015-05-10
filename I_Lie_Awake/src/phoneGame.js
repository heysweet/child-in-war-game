var soldier1 = require("./data/phone/soldier1.png");
var soldier2 = require("./data/phone/soldier2.png");

var computerX;
var computerY;

var playerX;
var playerY;

var isDying = false;
var isInCombat = false;
var hasGameEnded = false;

var fontSize = 30;
var halfFontHeight = fontSize / 2;
var font = fontSize + "px Roboto";

var transform = {
	x : 7,
	y : 19,
	width : 311,
	height : 581
}

var targetTransform = {
	x : 255,
	y : 476
}

var targetScale = {};

var inverseScale = {};

function calculateTargetScale(){
	targetScale.x = targetTransform.x / transform.width;
	targetScale.y = targetTransform.y / transform.height;
	inverseScale.x = 1/targetScale.x;
	inverseScale.y = 1/targetScale.y;
}

calculateTargetScale();

var shouldShowDying = false;

var Soldier = function(x_, y_, team_){
	this.x1 = x_;
	this.y1 = y_;
	this.team = team_;

	this.isAlive = true;
	this.isProtected = false;
	this.isDying = false;

	if (this.team == 1){
		this.x2 = this.x1 + soldier1.width;
		this.y2 = this.y1 + soldier1.height;
	} else {
		this.x2 = this.x1 + soldier2.width;
		this.y2 = this.y1 + soldier2.height;
	}

	this.kill = function(){
		this.isDying = true;
	}

	this.isInRectangle = function (rx1, ry1, rx2, ry2) {
		return this.isAlive &&
			((rx1 <= this.x1 && this.x1 <= rx2) || (rx1 <= this.x2 && this.x2 <= rx2)) &&
			((ry1 <= this.y1 && this.y1 <= ry2) || (ry1 <= this.y2 && this.y2 <= ry2));
	}

	this.draw = function (argument) {
		if (!this.isAlive || (this.isDying && shouldShowDying)){
			return;
		}

		var ctx = sald.ctx;

		if (this.team == 1){
			ctx.drawImage(soldier1, this.x1, this.y1);
		} else {
			ctx.drawImage(soldier2, this.x1, this.y1);
		}
	}
}

var playerMouseRectWidth = 100;
var halfPlayerMouseRectWidth = playerMouseRectWidth/2;

// for computer selection
var computerMouseRectWidth = 100;
var halfComputerMouseRectWidth = computerMouseRectWidth/2;

var setPlayerMouseRectWidth = function(amt){
	playerMouseRectWidth = amt;
	halfPlayerMouseRectWidth = amt/2;
}

var setComputerMouseRectWidth = function(amt){
	computerMouseRectWidth = amt;
	halfComputerMouseRectWidth = amt/2;
}

// array of soldiers
var topSoldiers = [];
var bottomSoldiers = [];

var mouseX = -10000;
var mouseY = -10000;

// the day number (1 - 4)
var dayNumber = 1;

// number of turns left in game
var numTurnsLeft = 0;

// is the player attacking, and is the player's rectangle on screen
var isAttackPhase;
var isRectOnScreen;

// delay between each turn
var prevTurnEndTime;
var turnCooldown = 2000.0;

var isGameDone;
var didPlayerWin;

var setup = function(){
	prevTurnEndTime = -1000000.0;
	
	setBoard();
}	

setup();

function updateMouse(x, y){
	x -= transform.x;
	y -= transform.y;

	if (x > 0 && y > 0 
		&& x < targetTransform.x 
		&& y < targetTransform.y){
		mouseX = x * inverseScale.x;
		mouseY = y * inverseScale.y;
	} else {
		mouseX = -10000;
		mouseY = -10000;
	}
}

function drawBox(x, y, width, height){
	if (x > -width/2 && y > -height/2){
		var ctx = sald.ctx;
		ctx.globalAlpha = 0.5;
		var x_ = Math.max(x, 0);
		var y_ = Math.max(y, 0);

		var x2 = x + width;
		var y2 = y + height;

		var xDelta = x2 - Math.min(x2,  transform.width);
		var yDelta = y2 - Math.min(y2, transform.height);

		var width_  = width  - (x_ - x) - xDelta;
		var height_ = height - (y_ - y) - yDelta;

		ctx.fillRect(x_, y_, width_, height_);

		ctx.globalAlpha = 1.0;
	}
}

function drawBlueBox(x, y, width, height){
	sald.ctx.fillStyle = 'rgb(0,0,255)';
	drawBox(x, y, width, height);	
}

function drawRedBox(x, y, width, height){
	sald.ctx.fillStyle = 'rgb(255,0,0)';
	drawBox(x, y, width, height);
}

// draw hover rectangle
function drawMouseRectangle(){
	isRectOnScreen = false;

	if (mouseX > 0 && mouseX < transform.width){
		if (isAttackPhase && mouseY < transform.height/2 - 50){
			drawRedBox(mouseX - halfPlayerMouseRectWidth, 
				mouseY - halfPlayerMouseRectWidth,
				playerMouseRectWidth,
				playerMouseRectWidth);

			isRectOnScreen = true;
		} else if (!isAttackPhase && mouseY > transform.height/2 + 50) {
			drawBlueBox(mouseX - halfPlayerMouseRectWidth, 
				mouseY - halfPlayerMouseRectWidth,
				playerMouseRectWidth,
				playerMouseRectWidth);
			
			isRectOnScreen = true;
		}
	}
}

// team 1 == top, team 2 == bottom
function checkSoldierCollision(x1, y1, x2, y2, team, isAttack){
	isDying = false;

	var soldiers = topSoldiers;

	if (team == 2){
		soldiers = bottomSoldiers;
	}

	for(var i = 0; i < soldiers.length; i++){
		if(!soldiers[i].isAlive){
			continue;
		}

		if(soldiers[i].isInRectangle(x1,y1,x2,y2)){
			if(isAttack){
				if(!(soldiers[i].isProtected)){
					soldiers[i].kill();
					isDying = true;
				}
			}
			else{
				soldiers[i].isProtected = true;
			}
		}
	}
}

// draw soldiers
function drawSoldiers() {
	for (var i = 0; i < topSoldiers.length; i++){
		topSoldiers[i].draw();
	}

	for (var i = 0; i < bottomSoldiers.length; i++){
		bottomSoldiers[i].draw();
	}
}

function millis(){
	var d = new Date();
	return d.getTime();
}

// player clicks, committed to making a move
function mouseClicked(){
	if (millis() - prevTurnEndTime < turnCooldown){
		return;
	}

	playerX = mouseX - halfPlayerMouseRectWidth;
	playerY = mouseY - halfPlayerMouseRectWidth;
	
	if (!isGameDone && isRectOnScreen){
		playerMakesTurn();
	}
}


// player perform the turn
function playerMakesTurn(){

	var x1 = mouseX - halfPlayerMouseRectWidth;
	var y1 = mouseY - halfPlayerMouseRectWidth;
	var x2 = x1 + playerMouseRectWidth;
	var y2 = y1 + playerMouseRectWidth;

	// player attacks
	if (isAttackPhase){
		computerMakesTurn();
		checkSoldierCollision(x1, y1, x2, y2, 1, true);
	}
	// player defends
	else {
		checkSoldierCollision(x1, y1, x2, y2, 2, false);
		computerMakesTurn();
	}

	// move to next turn

	isAttackPhase = !isAttackPhase;
	if (isAttackPhase) {
		numTurnsLeft--;
	}

	// reset protection
	for(var i = 0; i < topSoldiers.length; i++)
	{
		topSoldiers[i].isProtected = false;
	}
	for(var i = 0; i < bottomSoldiers.length; i++)
	{
		bottomSoldiers[i].isProtected = false;
	}

	prevTurnEndTime = millis();
}


function random(zero, value){
	return Math.floor(Math.random() * value);
}

// the AI makes the turn
function computerMakesTurn()
{
	if(isAttackPhase)
	{
		var i = random(0,topSoldiers.length);
		while(!topSoldiers[i].isAlive)
		{
			i = random(0,topSoldiers.length);
		}

		var s = topSoldiers[i];

		var x1 = ((s.x1 + s.x2) / 2) - halfComputerMouseRectWidth;
		var y1 = ((s.y1 + s.y2) / 2) - halfComputerMouseRectWidth;
		var x2 = x1 + computerMouseRectWidth;
		var y2 = y1 + computerMouseRectWidth;

		computerX = ((s.x1 + s.x2) / 2) - halfComputerMouseRectWidth;
		computerY = ((s.y1 + s.y2) / 2) - halfComputerMouseRectWidth;

		checkSoldierCollision(x1,y1,x2,y2,1,false);

		drawBlueBox(computerX, computerY, computerMouseRectWidth, computerMouseRectWidth);
	}
	else
	{
		var i = random(0,bottomSoldiers.length);
		while(!bottomSoldiers[i].isAlive)
		{
			i = random(0,bottomSoldiers.length);
		}

		var s = bottomSoldiers[i];

		var x1 = (s.x1 + s.x2) / 2 - halfComputerMouseRectWidth;
		var y1 = (s.y1 + s.y2) / 2 - halfComputerMouseRectWidth;
		var x2 = x1 + computerMouseRectWidth;
		var y2 = y1 + computerMouseRectWidth;

		checkSoldierCollision(x1,y1,x2,y2,2,true);

		computerX = ((s.x1 + s.x2) / 2) - halfComputerMouseRectWidth;
		computerY = ((s.y1 + s.y2) / 2) - halfComputerMouseRectWidth;

		drawRedBox(computerX, computerY, computerMouseRectWidth, computerMouseRectWidth);
	}
}


// set the board based on which day it is
function setBoard()
{
	switch(dayNumber)
	{
		case 1:
			topSoldiers = [];
			bottomSoldiers = [];

			topSoldiers[0] = new Soldier(15, 31, 1);
			topSoldiers[1] = new Soldier(105, 18, 1);
			topSoldiers[2] = new Soldier(187, 31, 1);
			topSoldiers[3] = new Soldier(254, 54, 1);
			topSoldiers[4] = new Soldier(82, 83, 1);
			topSoldiers[5] = new Soldier(163, 86, 1);
			topSoldiers[6] = new Soldier(14, 130, 1);
			topSoldiers[7] = new Soldier(243, 138, 1);
			topSoldiers[8] = new Soldier(78, 170, 1);
			topSoldiers[9] = new Soldier(177, 184, 1);

			bottomSoldiers[0] = new Soldier(16, 368, 2);
			bottomSoldiers[1] = new Soldier(142, 359, 2);
			bottomSoldiers[2] = new Soldier(248, 374, 2);
			bottomSoldiers[3] = new Soldier(89, 416, 2);
			bottomSoldiers[4] = new Soldier(12, 449, 2);
			bottomSoldiers[5] = new Soldier(143, 459, 2);
			bottomSoldiers[6] = new Soldier(254, 451, 2);
			bottomSoldiers[7] = new Soldier(23, 530, 2);
			bottomSoldiers[8] = new Soldier(144, 531, 2);
			bottomSoldiers[9] = new Soldier(259, 528, 2);

			setPlayerMouseRectWidth(100);
			setComputerMouseRectWidth(100);
			break;
		case 2:
			topSoldiers = [];
			bottomSoldiers = [];

			topSoldiers[0] = new Soldier(21, 10, 1);
			topSoldiers[1] = new Soldier(115, 13, 1);
			topSoldiers[2] = new Soldier(202, 16, 1);
			topSoldiers[3] = new Soldier(47, 93, 1);
			topSoldiers[4] = new Soldier(141, 87, 1);
			topSoldiers[5] = new Soldier(250, 75, 1);
			topSoldiers[6] = new Soldier(16, 161, 1);
			topSoldiers[7] = new Soldier(115, 154, 1);
			topSoldiers[8] = new Soldier(200, 141, 1);
			topSoldiers[9] = new Soldier(260, 189, 1);


			bottomSoldiers[0] = new Soldier(62, 354, 2);
			bottomSoldiers[1] = new Soldier(162, 374, 2);
			bottomSoldiers[2] = new Soldier(240, 369, 2);
			bottomSoldiers[3] = new Soldier(43, 420, 2);
			bottomSoldiers[4] = new Soldier(98, 467, 2);
			bottomSoldiers[5] = new Soldier(160, 446, 2);
			bottomSoldiers[6] = new Soldier(217, 437, 2);
			bottomSoldiers[7] = new Soldier(50, 516, 2);
			bottomSoldiers[8] = new Soldier(156, 519, 2);
			bottomSoldiers[9] = new Soldier(225, 508, 2);

			setPlayerMouseRectWidth(80);
			setComputerMouseRectWidth(120);
			break;
		case 3:
			topSoldiers = [];
			bottomSoldiers = [];

			topSoldiers[0] = new Soldier(67, 9, 1);
			topSoldiers[1] = new Soldier(197, 7, 1);
			topSoldiers[2] = new Soldier(26, 49, 1);
			topSoldiers[3] = new Soldier(107, 51, 1);
			topSoldiers[4] = new Soldier(180, 86, 1);
			topSoldiers[5] = new Soldier(255, 89, 1);
			topSoldiers[6] = new Soldier(74, 113, 1);
			topSoldiers[7] = new Soldier(37, 167, 1);
			topSoldiers[8] = new Soldier(138, 170, 1);
			topSoldiers[9] = new Soldier(225, 173, 1);

			bottomSoldiers[0] = new Soldier(12, 358, 2);
			bottomSoldiers[1] = new Soldier(82, 373, 2);
			bottomSoldiers[2] = new Soldier(170, 343, 2);
			bottomSoldiers[3] = new Soldier(250, 371, 2);
			bottomSoldiers[4] = new Soldier(40, 450, 2);
			bottomSoldiers[5] = new Soldier(142, 420, 2);
			bottomSoldiers[6] = new Soldier(234, 440, 2);
			bottomSoldiers[7] = new Soldier(26, 523, 2);
			bottomSoldiers[8] = new Soldier(136, 518, 2);
			bottomSoldiers[9] = new Soldier(258, 517, 2);

			setPlayerMouseRectWidth(60);
			setComputerMouseRectWidth(160);
			break;
			
		case 4:
			topSoldiers = [];
			bottomSoldiers = [];

			topSoldiers[0] = new Soldier(15, 31, 1);
			topSoldiers[1] = new Soldier(105, 18, 1);
			topSoldiers[2] = new Soldier(187, 31, 1);
			topSoldiers[3] = new Soldier(254, 54, 1);
			topSoldiers[4] = new Soldier(82, 83, 1);
			topSoldiers[5] = new Soldier(163, 86, 1);
			topSoldiers[6] = new Soldier(14, 130, 1);
			topSoldiers[7] = new Soldier(243, 138, 1);
			topSoldiers[8] = new Soldier(78, 170, 1);
			topSoldiers[9] = new Soldier(177, 184, 1);

			bottomSoldiers[0] = new Soldier(16, 368, 2);
			bottomSoldiers[1] = new Soldier(142, 359, 2);
			bottomSoldiers[2] = new Soldier(248, 374, 2);
			bottomSoldiers[3] = new Soldier(89, 416, 2);
			bottomSoldiers[4] = new Soldier(12, 449, 2);
			bottomSoldiers[5] = new Soldier(143, 459, 2);
			bottomSoldiers[6] = new Soldier(254, 451, 2);
			bottomSoldiers[7] = new Soldier(23, 530, 2);
			bottomSoldiers[8] = new Soldier(144, 531, 2);
			bottomSoldiers[9] = new Soldier(259, 528, 2);

			setPlayerMouseRectWidth(40);
			setComputerMouseRectWidth(300);
			break;
		default:
			break;
	}


	isAttackPhase = true;
	isGameDone = false;
	didPlayerWin = false;
	numTurnsLeft = 3;
}

function onGameEnd(){
	window.gamestate.gameEnd();
}

// depend on state of the game, make decision, draw appropriate things
function victoryChecker()
{
	var ctx = sald.ctx;

	// check if game is done
	if(!isGameDone)
	{	
		// number of soldiers the player has
		var playerSoldierLeft = 0;
		for(var i = 0; i < bottomSoldiers.length; i++)
		{
			if(bottomSoldiers[i].isAlive)
			{
				playerSoldierLeft++;
			}
		}

		// number of soldiers the computer has
		var computerSoldierLeft = 0;
		for(var i = 0; i < topSoldiers.length; i++)
		{
			if(topSoldiers[i].isAlive)
			{
				computerSoldierLeft++;
			}
		}

		// is someone has 0 soldiers, game is over
		isGameDone = numTurnsLeft == 0 || playerSoldierLeft == 0 || computerSoldierLeft == 0;
		didPlayerWin = playerSoldierLeft >= computerSoldierLeft;
	}

	// draw the player's mouse rectangle, and tell player how much time is left
	if(!isGameDone && numTurnsLeft > 0)
	{
		drawMouseRectangle();
		drawMiddle();
		
		// display the number of turns left
		var textAlign = ctx.textAlign;
		ctx.textAlign = "center";

		ctx.font = font;
		ctx.fillStyle = 'rgb(255,255,255)';

		if (isAttackPhase){
			ctx.fillText("Attack the enemy!", transform.width/2, transform.height/2 + halfFontHeight);
		} else {
			ctx.fillText("Defend your troops!", transform.width/2, transform.height/2 + halfFontHeight);
		}

		// ctx.fillText("Turns left: " + numTurnsLeft, transform.width/2, transform.height/2);

		ctx.textAlign = textAlign;
	}
	// display win/lose text
	else
	{
		drawMiddle();

		if (!hasGameEnded){
			hasGameEnded = true;
			onGameEnd();
		}

		if(didPlayerWin)
		{
			var textAlign = ctx.textAlign;
			ctx.textAlign = "center"; 

			ctx.font = font;
			ctx.fillStyle = 'rgb(53,110,190)';
			ctx.fillText("WIN", transform.width/2, transform.height/2 + halfFontHeight);
			
			ctx.textAlign = textAlign;
		}
		else
		{
			var textAlign = ctx.textAlign;
			ctx.textAlign = "center"; 

			ctx.font = font;
			ctx.fillStyle = 'rgb(210,26,17)';
			ctx.fillText("LOSE", transform.width/2, transform.height/2 + halfFontHeight);
			
			ctx.textAlign = textAlign;
		}
	}
}

function background(r, g, b){
	var ctx = sald.ctx;
	ctx.fillStyle = 'rgb(' + r + ',' + g +',' + b + ')';

	ctx.fillRect(0, 0, transform.width, transform.height);
}

// draw background
function drawBackground()
{
	background(72, 84, 108);
}

function drawMiddle(){
	var ctx = sald.ctx;
	// draw center
	if(isGameDone)
	{
		ctx.fillStyle = 'rgb(130,132,136)';
	}
	else
	{
		ctx.fillStyle = 'rgb(130,132,136)';
	}
	ctx.fillRect(0, (transform.height/2) - 50, transform.width, 100);
}

var blockerAlpha = 100.0/255.0;

// black out half of the player's screen that is not interactable
function drawBlocker()
{
	var ctx = sald.ctx;

	if(isGameDone)
	{
		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.globalAlpha = blockerAlpha;

		var y = ((transform.height/2 + 50) + transform.height) / 2;
		var h = (transform.height - y) * 2;
		var halfH = h / 2;

		ctx.fillRect(0, y - halfH, transform.width, h);
		
		y = (transform.height/2 - 50) / 2;
		h = y * 2;
		ctx.fillRect(0, y - halfH, transform.width, h);
		ctx.globalAlpha = 1.0;
	}
	else
	{
		if(isAttackPhase)
		{
			var y = ((transform.height/2 + 50) + transform.height) / 2;
			var h = (transform.height - y) * 2;
			var halfH = h / 2;

			ctx.fillStyle = 'rgb(0,0,0)';
			ctx.globalAlpha = blockerAlpha;
			ctx.fillRect(0, y - halfH, transform.width, h);
			ctx.globalAlpha = 1.0;
		}
		else
		{
			var y = (transform.height/2 - 50) / 2;
			var h = y * 2;
			var halfH = h / 2;

			ctx.fillStyle = 'rgb(0,0,0)';
			ctx.globalAlpha = blockerAlpha;
			ctx.fillRect(0, y - halfH, transform.width, h);
			ctx.globalAlpha = 1.0;
		}
	}
}

function drawTargetBoxes(){
	if (isAttackPhase){
		drawBlueBox(playerX, playerY, playerMouseRectWidth, playerMouseRectWidth);
		drawRedBox(computerX, computerY, computerMouseRectWidth, computerMouseRectWidth);
	} else {
		drawBlueBox(computerX, computerY, computerMouseRectWidth, computerMouseRectWidth);
		drawRedBox(playerX, playerY, playerMouseRectWidth, playerMouseRectWidth);
	}
}

var flashFrequency = 350;
var lastChange = 0;

function killDying(){
	isDying = false;

	var soldiers = topSoldiers;

	for(var i = 0; i < soldiers.length; i++){
		if(soldiers[i].isDying){
			soldiers[i].isDying = false;
			soldiers[i].isAlive = false;
		}
	}

	soldiers = bottomSoldiers;

	for(var i = 0; i < soldiers.length; i++){
		if(soldiers[i].isDying){
			soldiers[i].isDying = false;
			soldiers[i].isAlive = false;
		}
	}
}

function draw()
{
	// pause during the end of each turn
	
	if (isDying){
		var mills = millis();

		if (mills - lastChange > flashFrequency){
			lastChange = mills;
			shouldShowDying = !shouldShowDying;
		}
	}

	var ctx = sald.ctx;

	ctx.translate(transform.x, transform.y);
	ctx.scale(targetScale.x, targetScale.y);

	drawBackground();
	drawSoldiers();
	drawBlocker();

	if (millis() - prevTurnEndTime < turnCooldown){
		drawTargetBoxes();
		drawMiddle();
		isInCombat = true;

		var textAlign = ctx.textAlign;
		ctx.textAlign = "center"; 

		ctx.font = font;
		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fillText("Turns left: " + numTurnsLeft, transform.width/2, transform.height/2 + halfFontHeight);

		ctx.textAlign = textAlign;
	} else {
		if (isInCombat){
			isInCombat = false;
			isDying = false;

			killDying();
		}

		victoryChecker();
	}

	ctx.scale(inverseScale.x, inverseScale.y);
	
	ctx.translate(-transform.x, -transform.y);
}

function start(){
	var dayNum = window.gamestate.dayNum();
	dayNumber = dayNum + 1;
	setBoard();
	hasGameEnded = false;
}

module.exports = {
	draw:draw, // no parameters
	mouseClicked:mouseClicked, // no parameters
	updateMouse:updateMouse, // x, y
	start:start
}