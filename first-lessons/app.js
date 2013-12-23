/*global Crafty, config*/
/**
 * Depends on Crafty.js, config.js
 * https://kipik.herokuapp.com/lessons
 */

// Setup craft's game area.
// @see http://craftyjs.com/api/Crafty-init.html
Crafty.init(
	// Specify width and height of the "stage", else default to window size.
	// Q: What if all "window dressing" are rendered INSIDE crafty instead of outside?
    config.stageX, config.stageY,
    document.getElementById('game')
);

// Why do this? Abstraction from DOM/CSS? Or just a shortcut?
Crafty.background(config.stage.backgroundColor);

// Create the "floor" for the game, just off the bottom of the "stage".
Crafty.e('2D, DOM, Color, Floor')
	.attr({
	    x: 0,
	    y: config.stageY - config.floorHeight,
	    w: config.stageX,
	    h: config.floorHeight,
	})
	.color('black');

// Create a square that will hit the floor due to Fourway and Gravity components.
Crafty.e('2D, DOM, Color, Fourway, Gravity')
	.attr({
	    x: 0 + config.bufferSize,
	    //y: config.stageY - (config.floorHeight + config.squareSize + config.bufferSize),
	    y: Math.floor(config.stageY / 4),
	    w: config.squareSize, h: config.squareSize
	})
	.color('red')
	.fourway(8, 4)
	.gravity('Floor');