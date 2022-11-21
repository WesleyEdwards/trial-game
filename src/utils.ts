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
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.move("StopY");
      player.position.y = platform.position.y - player.height;
    }

    if (player.velocity.x === 0 && keys.right) {
      platform.position.x -= 5;
      addScrollOffset(-5);
    }
    if (player.velocity.x === 0 && keys.left) {
      platform.position.x += 5;
      addScrollOffset(5);
    }
  });
}
