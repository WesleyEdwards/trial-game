import { Player } from "./Player.js";
import {
  createPlatforms,
  calcInteractions,
  initialKeyStatus,
  drawEverything,
} from "./utils.js";
import { MAX_HEIGHT, MAX_WIDTH, PLAT_FREQUENCY } from "./constants.js";
import { GameState } from "./GameState.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

const button = document.getElementById("play-game");
const container = document.getElementById("main-div");

if (button && container) {
  button.addEventListener("click", () => enterGameLoop());
  container.appendChild(button);
}

canvas.width = MAX_WIDTH;
canvas.height = MAX_HEIGHT;

const keys = initialKeyStatus;

const player = new Player();
const gameState = new GameState();

let scrollOffset = 0;

const platforms = createPlatforms();

function animate() {
  if (!context) throw new Error("Context is null");

  requestAnimationFrame(animate);

  drawEverything(context, platforms, player);

  player.update(keys, scrollOffset);

  calcInteractions(keys, player, platforms, gameState);
}

const enterGameLoop = () => {
  animate();
};

addEventListener("keydown", ({ code }) => {
  if (code === "ArrowUp") keys.up = true;
  if (code === "ArrowRight") keys.right = true;
  if (code === "ArrowLeft") keys.left = true;
  if (code === "Space") keys.space = true;
});

addEventListener("keyup", ({ code }) => {
  if (code === "ArrowUp") keys.up = false;
  if (code === "ArrowRight") keys.right = false;
  if (code === "ArrowLeft") keys.left = false;
  if (code === "Space") keys.space = false;
});
