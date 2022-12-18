import {
  createPlatforms,
  calculateInteractions,
  drawEverything,
  createOpponents,
  updateEverything,
  debounceLog,
} from "./utils.js";
import { MAX_HEIGHT, MAX_WIDTH } from "./constants.js";
import { GameState } from "./GameState.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");
if (!context) throw new Error("Context is null");

const button = document.getElementById("play-game");
const container = document.getElementById("main-div");

if (button && container) {
  button.addEventListener("click", () => {
    enterGameLoop();
    button.setAttribute("disabled", "true");
  });
  container.appendChild(button);
}

canvas.width = MAX_WIDTH;
canvas.height = MAX_HEIGHT;

const gameState = new GameState();

function animate() {
  requestAnimationFrame(animate);
  debounceLog(gameState.winState);

  if (gameState.winState === "lose") {
    handleLose(context as CanvasRenderingContext2D);
    return;
  }

  drawEverything(context as CanvasRenderingContext2D, gameState);

  updateEverything(gameState);
  calculateInteractions(gameState);
}

const enterGameLoop = () => {
  gameState.setGameState("playing");
  animate();
};

function handleLose(context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
  context.font = "30px Arial";
  context.fillText("You lose! :(", MAX_WIDTH / 2 - 60, MAX_HEIGHT / 2);
  // const button = document.getElementById("play-game");
  // if (button) {
  //   button.removeAttribute("disabled");
  // }
}

addEventListener("keydown", ({ code }) => {
  if (code === "ArrowUp") gameState.keys.up = true;
  if (code === "ArrowRight") gameState.keys.right = true;
  if (code === "ArrowLeft") gameState.keys.left = true;
  if (code === "Space") gameState.keys.space = true;
});

addEventListener("keyup", ({ code }) => {
  if (code === "ArrowUp") gameState.keys.up = false;
  if (code === "ArrowRight") gameState.keys.right = false;
  if (code === "ArrowLeft") gameState.keys.left = false;
  if (code === "Space") gameState.keys.space = false;
});
