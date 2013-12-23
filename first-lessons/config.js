// For common properties that we might tweak later.
var config = {};

// Default size of the "stage".
config.stageX = window.innerWidth;
config.stageY = window.innerHeight;

config.stage = {
	backgroundColor: '#FAEBD7'
};

// The size of the floor
config.floorHeight = 50;

// Standard size for a "square" in this "game".
config.squareSize = Math.floor(config.stageX / 16);

// Standard buffer between objects.
config.bufferSize = Math.floor(config.squareSize / 4);

config.strings = {};


config.strings.gameTitle = 'Crafty - First Lessons';
config.strings.gameInstructions = 'W,S,A,D or arrow keys to move.';