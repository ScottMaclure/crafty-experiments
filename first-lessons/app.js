/*global Crafty, config*/
/**
 * Depends on Crafty.js, config.js
 * @see http://kipik.herokuapp.com/lessons
 * @see http://craftyjs.com/api/
 */

// Track a user clicking on the "player" entity.
// TODO What about making this a property of the entity?
var numClicks = 0;

/**
 * @return {string} Standard display text for the user clicking the player entity.
 */
function renderNumClicks() {
	return 'Number of clicks: ' + numClicks;
}

/**
 * Aware of dynamic stage size.
 */
function getPlayerMoveSpeed() {
	return Math.floor(config.stageX / 100);
}

/**
 * Aware of dynamic stage size.
 */
function getPlayerJumpSpeed() {
	var base = Math.floor(config.stageY / 100);
	return base + Math.floor(base / 4);
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

// Create the "Platform" for the game, just off the bottom of the "stage".
// Works in conjunction with gravity.
Crafty.e('2D, DOM, Color, Platform')
	.attr({
	    x: 0,
	    y: config.stageY - config.platformHeight,
	    w: config.stageX,
	    h: config.platformHeight,
	})
	.color('black');

// Create our "player" entity. For now, a boring square.
Crafty.e('2D, DOM, Color, Twoway, Gravity, Mouse')
	.attr({
	    x: 0 + config.bufferSize,
	    y: config.stageY - (config.platformHeight + config.squareSize),
	    w: config.squareSize, h: config.squareSize
	})
	.color('red')
	// TODO How do I compute the jump height dynamically, depending on stageX?
	.twoway(getPlayerMoveSpeed(), getPlayerJumpSpeed())
	.gravity('Platform')
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
// And desc
Crafty.e('2D, DOM, Text').attr({
	x: config.bufferSize,
	y: 50,
	w: config.stageX / 2,
	h: 50
})
.text(config.strings.gameInstructions);

// Create another "Platform" entity, that our player can jump up onto.
var entityWidth = Math.floor(config.stageX / 4);
var entityYPos = Math.floor(config.stageY / 4);
Crafty.e('2D, DOM, Color, Platform')
	.attr({
	    x: config.stageX - entityWidth,
	    y: config.stageY - entityYPos,
	    w: entityWidth,
	    h: 20,
	})
	.color('black');