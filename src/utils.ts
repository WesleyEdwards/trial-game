import {
  END_POS,
  INCREMENT_VALUE,
  Keys,
  MAX_HEIGHT,
  MAX_WIDTH,
  NUM_OPPONENTS,
  NUM_PLATFORMS,
} from "./constants.js";
import { GameState } from "./GameState.js";
import { Opponent } from "./Opponent.js";
import { Platform } from "./Platform.js";
import Player, { Coordinates, PlayerAction } from "./Player.js";

interface hasPosition {
  position: Coordinates;
}

interface Character {
  position: Coordinates;
  velocity: Coordinates;
  bottomPos: number;
  rightPos: number;
  height: number;
  move: (action: PlayerAction) => void;
}

export function updateEverything(gameState: GameState) {
  const { player, opponents, keys, scrollOffset } = gameState;
  player.update(keys, scrollOffset);
  opponents.forEach((opponent) => opponent.update());
}

export function createPlatforms(): Platform[] {
  return new Array(NUM_PLATFORMS).fill(null).map((_, i) => {
    const sectionY = i % 3 === 0 ? "top" : i % 3 === 1 ? "middle" : "bottom";
    return new Platform(END_POS - i * 150, sectionY);
  });
}

export function createOpponents(): Opponent[] {
  return new Array(NUM_OPPONENTS).fill(null).map((_, i) => {
    return new Opponent(generateRandomInt(0, END_POS));
  });
}

export function drawEverything(
  context: CanvasRenderingContext2D,
  gameState: GameState
) {
  const { platforms, opponents, player } = gameState;

  context.fillStyle = "white";
  context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

  platforms.forEach((plat) => plat.draw(context));
  opponents.forEach((opponent) => opponent.draw(context));
  player.draw(context);
}

function updateWithPlayer<T extends hasPosition>(
  gameState: GameState,
  objects: T[]
): void {
  const { keys, player } = gameState;
  if (keys.right && player.velocity.x === 0) {
    objects.forEach((object) => {
      object.position.x -= INCREMENT_VALUE;
    });
  }
  if (keys.left && player.velocity.x === 0 && gameState.scrollOffset > 0) {
    objects.forEach((object) => {
      object.position.x += INCREMENT_VALUE;
    });
  }
}

function calcPlatColl<T extends Character>(platform: Platform, char: T) {
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

export function calcInteractions(gameState: GameState) {
  const { platforms, opponents, player, keys } = gameState;

  platforms.forEach((platform) => {
    opponents.forEach((opp) => calcPlatColl(platform, opp));
    calcPlatColl(platform, player);
  });

  updateWithPlayer(gameState, platforms);
  updateWithPlayer(gameState, opponents);

  if (keys.right && player.velocity.x === 0) {
    gameState.incrementScrollOffset(-INCREMENT_VALUE);
  }
  if (keys.left && player.velocity.x === 0 && gameState.scrollOffset > 0) {
    gameState.incrementScrollOffset(INCREMENT_VALUE);
  }
}

export function generateRandomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function randomOutOf(max: number): boolean {
  return generateRandomInt(0, max) === 1;
}

export function debounceLog(val: string) {
  if (generateRandomInt(0, 100) === 1) {
    console.log(val);
  }
}
