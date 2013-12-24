/*global Crafty, config*/
/**
 * Depends on Crafty.js, config.js
 * https://kipik.herokuapp.com/lessons
 */

// Track a user clicking on the "player" entity.
// TODO What about making this a property of the entity?
var numClicks = 0;

function renderNumClicks() {
	return 'Number of clicks: ' + numClicks;
}

// Setup craft's game area.
// @see http://craftyjs.com/api/Crafty-init.html
Crafty.init(
	// Specify width and height of the "stage", else default to window size.
	// Q: What if all "window dressing" are rendered INSIDE crafty instead of outside?
    config.stageX, config.stageY,
    document.getElementById('game')
);

// Why do this? Abstraction from DOM/CSS? Or just a shortcut?
//Crafty.background(config.stage.backgroundColor);

// Create the "floor" for the game, just off the bottom of the "stage".
Crafty.e('2D, DOM, Color, Floor')
	.attr({
	    x: 0,
	    y: config.stageY - config.floorHeight,
	    w: config.stageX,
	    h: config.floorHeight,
	})
	.color('black');

// Create our "player" entity. For now, a boring square.
Crafty.e('2D, DOM, Color, Twoway, Gravity, Mouse')
	.attr({
	    x: 0 + config.bufferSize,
	    y: config.stageY - (config.floorHeight + config.squareSize),
	    //y: Math.floor(config.stageY / 4),
	    w: config.squareSize, h: config.squareSize
	})
	.color('red')
	.twoway(8, 8)
	.gravity('Floor')
	.bind('Click', function () {
		numClicks++;
	});

// Summary display
Crafty.e('2D, DOM, Text')
	.attr({
		x: config.stageX - config.bufferSize - (config.stageX / 4),
		y: config.bufferSize,
		w: (config.stageX / 4),
		h: 50
	})
	.text(renderNumClicks())
	.bind('EnterFrame', function () {
		this.text(renderNumClicks());
	});

// Game title and description - ingame!
Crafty.e('2D, DOM, Text').attr({
	x: config.bufferSize,
	y: config.bufferSize,
	w: config.stageX / 2,
	h: 50
})
.text(config.strings.gameTitle)
.textFont({ size: '20px', weight: 'bold' });

Crafty.e('2D, DOM, Text').attr({
	x: config.bufferSize,
	y: 50,
	w: config.stageX / 2,
	h: 50
})
.text(config.strings.gameInstructions);