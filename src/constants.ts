export const MAX_WIDTH = 1024;
export const MAX_HEIGHT = 576;

export const GRAVITY = 0.65;

export const PLAT_FREQUENCY = 350;

export const NUM_PLATFORMS = 30;
export const NUM_OPPONENTS = 5;
export const END_POS = 4500;
export const INCREMENT_VALUE = 5;

export interface Keys {
  up: boolean;
  right: boolean;
  left: boolean;
  space: boolean;
}

export const initialKeyStatus: Record<keyof Keys, boolean> = {
  up: false,
  right: false,
  left: false,
  space: false,
};
