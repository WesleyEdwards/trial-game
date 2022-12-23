import { Keys } from "./models";

export const MAX_CANVAS_WIDTH = 1024;
export const MAX_CANVAS_HEIGHT = 576;

export const GRAVITY = 0.65;

export const PLAT_FREQUENCY = 350;

export const NUM_PLATFORMS = 30;
export const NUM_OPPONENTS = 15;
export const END_POS = 4500;
export const INCREMENT_VALUE = 5;

// Player
export const playerConstants = {
  shankTime: 200,
  shankCoolDown: 100,
  radius: 25,
  moveSpeed: 10,
};

export const opponentConstants = {
  moveSpeed: 2,
};

export const initialKeyStatus: Record<keyof Keys, boolean> = {
  up: false,
  right: false,
  left: false,
  space: false,
};
