// For common properties that we might tweak later.
var config = {};

// Default size of the "stage".
config.stageX = 800;
config.stageY = 600;

config.stage = {
	backgroundColor: 'grey'
};

// The size of the floor
config.floorHeight = 50;

// Standard size for a "square" in this "game".
config.squareSize = Math.floor(config.stageX / 16);

// Standard buffer between objects.
config.bufferSize = Math.floor(config.squareSize / 4);