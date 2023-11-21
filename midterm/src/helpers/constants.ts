import { Keys } from "./types";

export const initialKeyStatus: Keys = {
  left: false,
  right: false,
  escape: false,
  shoot: false,
};

export const PIXEL_SCALE_FACTOR = 57.6;

export const TIME_TO_WIN = 7000;

export const LEFT_EXTRA = 150;

export const PLAY_AREA_WIDTH = 576;
// Canvas
export const CANVAS_WIDTH = PLAY_AREA_WIDTH + 2 * LEFT_EXTRA;
export const CANVAS_HEIGHT = 576;
export const CANVAS_BORDER = 10;

export const PLAY_AREA_START = LEFT_EXTRA;
export const PLAY_AREA_END = CANVAS_WIDTH - LEFT_EXTRA;

export const PLAYER_MOST_LEFT_POS = CANVAS_BORDER;

// Player
export const PLAYER_SPEED = 0.2;
export const PLAYER_WIDTH = 25;
export const PLAYER_TOP = CANVAS_HEIGHT - PLAYER_WIDTH * 1.5;

export const PLAYER_MOST_RIGHT_POS =
  PLAY_AREA_WIDTH - CANVAS_BORDER - PLAYER_WIDTH;

// Blocks
export const EMPTY_WIDTH = 100;
export const BLOCK_HEIGHT = 25;

export const BLOCK_SPEED = 0.15;
export const PARTICLE_SPEED = 0.05;

export const TIME_BETWEEN_BLOCKS = 1000;

export const PARTICLE_WIDTH = 3;
export const PARTICLE_MAX_DIST = 100;
export const MORE_PARTICLES_FACTOR = 2;
