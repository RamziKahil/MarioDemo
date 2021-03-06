/*
	This object will respond to user input and store as in variables what the
user is currently pressing.
Entities that wish to react to user input will query this objects `actions`
field, and decide how to behave.

	Note that this design permits decoupling the key stroke from the action,
which makes hardware adaption easy, but it also limits the set of actions
available.
This design is also used for fairness in multiplayer games. See:
https://classroom.udacity.com/courses/cs255/lessons/52850040/concepts/1139048800923#
*/

Input = {
	actions: {},
	bindings: {},
	game: null,
	canvasTop: 0,
	canvasLeft: 0,
	canvas: null,
	registeredEvents: null,
	mousePos: {x:0, y:0},
	
	setup: function(aGame){
		this.canvas = document.getElementById('canvas');
		var canvasOffsetTop = this.canvas.getBoundingClientRect().top;
		var canvasOffsetLeft = this.canvas.getBoundingClientRect().left;
		
		this.canvasTop = canvasOffsetTop;
		this.canvasLeft = canvasOffsetLeft;
		
		var events = {
			'mousemove': this.onMouseMove.bind(this),
			'mousedown': this.onMouseDown.bind(this),
			'mouseup': this.onMouseUp.bind(this),
			'keydown': this.onKeyDown.bind(this),
			'keyup': this.onKeyUp.bind(this)
		};		// hash of name to function
		this.registeredEvents = events;
		for(var event in this.registeredEvents){
			canvas.addEventListener(event, this.registeredEvents[event]);
		}

		this.bind(119, 'move-up');		// 119 - w
		this.bind(87, 'move-up');		//  87 - W
		this.bind(115, 'move-down');	// 115 - s
		this.bind(83, 'move-down');		//  83 - S
		this.bind(100, 'move-right');	// 100 - d
		this.bind(68, 'move-right');	//  68 - D
		this.bind(97, 'move-left');		//  97 - a
		this.bind(65, 'move-left');		//  65 - A
		this.bind(32, 'jump');			//  32 - [space]
		this.bind(112, 'log-something')	// 112 - p
		
		for(var key in this.actions){
			this.actions[key] = false;
		}
		
		this.game = aGame;
	},
	
	_getMousePos: function(mouseEvent){
		return {
			x: this.game.renderer.camera.pos.x - this.game.renderer.camera.halfSize.w + (mouseEvent.pageX - this.canvasLeft) / PhysicsEngineClass.drawScale,
			y: (mouseEvent.pageY - this.canvasTop) / PhysicsEngineClass.drawScale
		};
	},
	
	onMouseMove: function(mouseEvent){
		this.mousePos = this._getMousePos(mouseEvent);
	},
	
	onMouseDown: function(mouseEvent){
		this.mousePos = this._getMousePos(mouseEvent);
		this.actions['mouseClick'] = true;
	},
	
	onMouseUp: function(mouseEvent){
		this.actions['mouseClick'] = false;
	},
	
	onKeyDown: function(keyEvent){
		var ascii = keyEvent.key.charCodeAt(0);
		this.actions[this.bindings[ascii]] = 1;
	},
	
	onKeyUp: function(keyEvent){
		var ascii = keyEvent.key.charCodeAt(0);
		this.actions[this.bindings[ascii]] = 0;
	},
	
	bind: function (key, action) {
		this.bindings[key] = action;
	},
	
	removeAllListeners: function(){
		var canvas = document.getElementById('canvas');
		for(var event in this.registeredEvents){
			canvas.removeEventListener(event, this.registeredEvents[event]);
		}
	}
};
