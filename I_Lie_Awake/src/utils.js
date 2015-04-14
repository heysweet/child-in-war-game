function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }

var SCREEN_HEIGHT = sald.size.y / window.gamestate.IMAGE_SCALAR;
var SCREEN_WIDTH  = sald.size.x / window.gamestate.IMAGE_SCALAR;

var HALF_SCREEN_WIDTH  = (SCREEN_WIDTH /2);
var HALF_SCREEN_HEIGHT = (SCREEN_HEIGHT/2);

var screenWidth = function(){
	return SCREEN_WIDTH;
}

var screenHeight = function(){
	return SCREEN_HEIGHT;
}

var halfScreenWidth = function(){
	return HALF_SCREEN_WIDTH;
}

var halfScreenHeight = function(){
	return HALF_SCREEN_HEIGHT;
}

var scalar;
var invertedScalar;
var didScreenSizeChange = true;

var onScreenSizeChange = function(){
	didScreenSizeChange = true;
}

// Cache this, on resize, uncache
var imageScalar = function(){
	if (didScreenSizeChange){
		scalar = (window.gamestate.IMAGE_SCALAR * sald.ctx.factor);
		invertedScalar = 1 / scalar;
		didScreenSizeChange = false;
	}

	return scalar;
}

var imageScalarInverted = function(){
	if (didScreenSizeChange){
		imageScalar();
		didScreenSizeChange = false;
	}

	return invertedScalar;
}

var LinkedList = function(){
	var first = null;
	var last = null;

	var hasChanged = true;
	var arrayForm = [];

	var Node = function(){
	}

	var count = 0;

	this.asArray = function(){
		if (hasChanged){
			var current = first;
			var temp = [];

			for (var i = 0; i < count; i++){
				temp.push(current.data);

				current = current.next;
			}

			arrayForm = temp;
			hasChanged = false;
		}
		
		return arrayForm;
	}

	this.pushArray = function(arr){
		for (var i = 0; i < arr.length; i++){
			this.addLast(arr[i]);
		}
	}

	this.forEach = function(func){
		var current = first;

		for (var i = 0; i < count; i++){
			func(current.data);
			current = current.next;
		}
	}

	this.get = function(index){
		var current = first;

		for (var i = 0; i < index; i++){
			current = current.next;
		}

		return current.data;
	}

	this.getFirst = function(){
		if (first === null) return null;

		return first.data;
	}

	this.getLast = function(){
		if (last === null) return null;

		return last.data;
	}

	this.addFirst = function(data){
		var node = new Node();
		
		node.data = data;
		node.next = first;
		node.prev = null;
		
		if (count === 0){
			last = node;
		} else {
			first.prev = node;
		}

		count++;
		first = node;
	}

	this.removeFirst = function(){
		if (count > 0){
			first = first.next;
			first.prev = null;

			count--;
		}
	}

	this.addLast = function(data){
		var node = new Node();
		
		node.data = data;
		node.prev = last;
		node.next = null;

		if (count === 0){
			first = node;
		} else {
			last.next = node;
		}

		count++;
		last = node;
	}

	this.removeLast = function(){
		if (count > 0){
			last = last.prev;
			last.next = null;

			count--;
		}
	}
}

module.exports = {
	sign:sign,
	screenWidth:screenWidth,
	screenHeight:screenHeight,
	halfScreenWidth:halfScreenWidth,
	halfScreenHeight:halfScreenHeight,
	imageScalar:imageScalar,
	imageScalarInverted:imageScalarInverted,
	onScreenSizeChange:onScreenSizeChange,
	LinkedList:LinkedList
};