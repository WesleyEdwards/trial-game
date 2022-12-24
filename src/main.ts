import { drawEverything } from "./utils.js";
import { GameState } from "./GameState.js";
import {
  addEventListeners,
  getStatsHTML,
  handleLose,
  handleStartPlaying,
  setupGame,
} from "./DomFunctions.js";
import { MAX_CANVAS_HEIGHT } from "./constants.js";

const statsHTML = getStatsHTML();
const instructions = document.getElementById("instructions") as HTMLElement;
const gameState = new GameState(statsHTML);

const enterGameLoop = () => {
  handleStartPlaying(context, instructions);
  gameState.enterGame();
  loop();
};

const canvas = setupGame(enterGameLoop);
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

let requestId: number | undefined = undefined;

function loop() {
  requestId = undefined;

  if (gameState.winState === "lose") {
    handleLose(context, instructions);
    stop();
    return;
  }

  gameState.updateEverything();
  gameState.calcInteractions();
  gameState.drawEverything(context);

  start();
}

function start() {
  if (!requestId) {
    requestId = window.requestAnimationFrame(loop);
  }
}

function stop() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}

addEventListeners(gameState);
