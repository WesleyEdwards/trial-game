import { INCREMENT_VALUE, playerConstants } from "./constants.js";
import { GameState } from "./GameState.js";
import { Character, hasPosition, Keys } from "./models.js";
import { Platform } from "./Platform.js";
import Player from "./Player.js";

export function updateWithPlayer<T extends hasPosition>(
  keys: Keys,
  player: Player,
  scrollOffset: number,
  objects: T[]
): void {
  if (keys.right && player.velocity.x === 0) {
    objects.forEach((object) => {
      object.position.x -= INCREMENT_VALUE;
    });
  }
  if (keys.left && player.velocity.x === 0 && scrollOffset > 0) {
    objects.forEach((object) => {
      object.position.x += INCREMENT_VALUE;
    });
  }
}

export function calcPlatColl<T extends Character>(platform: Platform, char: T) {
  if (
    char.bottomPos <= platform.position.y &&
    char.bottomPos + char.velocity.y >= platform.position.y &&
    char.rightPos >= platform.position.x &&
    char.position.x <= platform.rightPos
  ) {
    char.move("StopY");
    char.position.y = platform.position.y - char.height;
  }
}

export function checkIfCaught(player: Player, opponents: Character[]): boolean {
  let caught = false;
  opponents.forEach((opp) => {
    const distBetween = Math.sqrt(
      Math.pow(opp.position.x - player.position.x, 2) +
        Math.pow(opp.position.y - player.position.y, 2)
    );
    if (distBetween < playerConstants.radius * 2) {
      caught = true;
    }
  });
  return caught;
}
