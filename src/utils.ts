import {
  END_POS,
  listOfColors,
  MAX_CANVAS_HEIGHT,
  MAX_CANVAS_WIDTH,
  OPP_PER_LEVEL,
  NUM_PLATFORMS,
} from "./constants.js";
import { GameState } from "./GameState.js";
import { Opponent } from "./Opponent.js";
import { Platform } from "./Platform.js";

export function updateEverything(gameState: GameState) {
  const { player, opponents, keys } = gameState;
  player.update(keys, gameState.getScrollOffset());
  opponents.forEach((opponent) => opponent.update());
}

export function createPlatforms(level: number): Platform[] {
  const platColor = listOfColors[(level - 1) % listOfColors.length];
  return new Array(NUM_PLATFORMS).fill(null).map((_, i) => {
    const sectionY = i % 3 === 0 ? "top" : i % 3 === 1 ? "middle" : "bottom";
    return new Platform(END_POS - i * 150, sectionY, platColor);
  });
}

export function createOpponents(level: number): Opponent[] {
  return new Array(OPP_PER_LEVEL * level)
    .fill(null)
    .map(() => new Opponent(generateRandomInt(500, END_POS)));
}

export function drawEverything(
  context: CanvasRenderingContext2D,
  gameState: GameState
) {
  const { platforms, opponents, player, pot } = gameState;

  context.fillStyle = "white";
  context.fillRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);

  platforms.forEach((plat) => plat.draw(context));
  opponents.forEach((opponent) => opponent.draw(context));
  player.draw(context);

  pot.draw(context);
}

export function calculateInteractions(gameState: GameState) {
  gameState.calcInteractions();
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
