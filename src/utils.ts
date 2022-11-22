import { Platform } from "./Platform";
import Player from "./Player";


export interface Keys {
  up: boolean;
  right: boolean;
  left: boolean;
}

export const initialKeyStatus: Keys = {
  up: false,
  right: false,
  left: false,
};

export function calcInteractions(
  keys: Keys,
  player: Player,
  platforms: Platform[],
  addScrollOffset: (num: number) => void
) {
  platforms.forEach((platform) => {
    if (
      player.bottomPos <= platform.position.y &&
      player.bottomPos + player.velocity.y >= platform.position.y &&
      player.rightPos >= platform.position.x &&
      player.position.x <= platform.rightPos
    ) {
      player.move("StopY");
      player.position.y = platform.position.y - player.height;
    }

    if (keys.right && player.velocity.x === 0) {
      platform.position.x -= 5;
      addScrollOffset(-5);
    }
    if (keys.left && player.velocity.x === 0) {
      platform.position.x += 5;
      addScrollOffset(5);
    }
  });
}

export function generateRandomInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
