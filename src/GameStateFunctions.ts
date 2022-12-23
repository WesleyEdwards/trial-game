import { INCREMENT_VALUE, playerConstants } from "./constants.js";
import { GameState } from "./GameState.js";
import { Character, hasPosition, Keys } from "./models.js";
import { Opponent } from "./Opponent.js";
import { Platform } from "./Platform.js";
import Player from "./Player.js";
import { debounceLog } from "./utils.js";

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
  return opponents.some((opp) => {
    const distBetween = Math.sqrt(
      Math.pow(opp.position.x - player.position.x, 2) +
        Math.pow(opp.position.y - player.position.y, 2)
    );
    if (distBetween < playerConstants.radius * 2) {
      return true;
    }
    return false;
  });
}

function knifeStatus(player: Player, opp: Opponent) {
  if (!player.shanking) return false;
  if (player.facing === "right" && player.position.x < opp.position.x)
    return true;
  if (player.facing === "left" && player.position.x > opp.position.x)
    return true;

  return false;
}

export function updateLiveStatus(
  player: Player,
  opponents: Opponent[]
): Opponent | undefined {
  return opponents.find((opp) => {
    const distBetween = Math.sqrt(
      Math.pow(opp.position.x - player.position.x, 2) +
        Math.pow(opp.position.y - player.position.y, 2)
    );
    if (distBetween < playerConstants.radius * 3 && knifeStatus(player, opp)) {
      return opp;
    }
    return undefined;
  });
}
