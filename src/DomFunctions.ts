import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from "./constants.js";
import { GameState } from "./GameState.js";

export function setupGame(enterGameLoop: () => void): HTMLCanvasElement {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const playGameButton = document.getElementById("play-game");
  const container = document.getElementById("main-div");

  if (playGameButton && container) {
    playGameButton.addEventListener("click", () => {
      enterGameLoop();
      playGameButton.setAttribute("disabled", "true");
    });
    container.appendChild(playGameButton);
  }

  canvas.width = MAX_CANVAS_WIDTH;
  canvas.height = MAX_CANVAS_HEIGHT;

  return canvas;
}

export function handleLose(context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
  context.font = "30px Arial";
  context.fillText(
    "You lose! :(",
    MAX_CANVAS_WIDTH / 2 - 60,
    MAX_CANVAS_HEIGHT / 2
  );
  const button = document.getElementById("play-game");
  if (button) {
    button.removeAttribute("disabled");
  }
}

export function addEventListeners(gameState: GameState) {
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
}
