import { MAX_HEIGHT, MAX_WIDTH } from "./constants.js";
import { Platform } from "./Platform.js";
import Player from "./Player.js";

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

export function createPlatforms(): Platform[] {
  return [
    new Platform(0, "start", 100),
    new Platform(0, "bottom", 400),
    new Platform(0, "bottom", 700),
    new Platform(0, "bottom", 1000),
    new Platform(0, "bottom", 1300),
  ];
}

export function morePlatforms(offset: number): Platform[] {
  return [
    new Platform(offset, "top"),
    new Platform(offset, "middle"),
    new Platform(offset, "bottom"),
  ];
}

export function drawEverything(
  context: CanvasRenderingContext2D,
  platforms: Platform[],
  player: Player
): void {
  context.fillStyle = "white";
  context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

  platforms.forEach((plat) => plat.draw(context));
  player.draw(context);
}

export function calcInteractions(
  keys: Keys,
  player: Player,
  platforms: Platform[],
  scrollOffset: number,
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
    }
    if (keys.left && player.velocity.x === 0 && scrollOffset > 0) {
      platform.position.x += 5;
    }
  });

  if (keys.right && player.velocity.x === 0) {
    addScrollOffset(-10);
  }
  if (keys.left && player.velocity.x === 0 && scrollOffset > 0) {
    addScrollOffset(10);
  }
}

export function generateRandomInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
