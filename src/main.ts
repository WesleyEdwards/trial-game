import { drawEverything } from "./utils.js";
import { GameState } from "./GameState.js";
import {
  addEventListeners,
  getStatsHTML,
  handleLose,
  setupGame,
} from "./DomFunctions.js";

const statsHTML = getStatsHTML();
const gameState = new GameState(statsHTML);

const enterGameLoop = () => {
  gameState.enterGame();
  loop();
};

const canvas = setupGame(enterGameLoop);
const context = canvas.getContext("2d");

if (!context) throw new Error("Context is null");

let requestId: number | undefined = undefined;

function loop() {
  requestId = undefined;

  if (gameState.winState === "lose") {
    handleLose(context!!);
    stop();
    return;
  }

  gameState.updateEverything();
  gameState.calcInteractions();
  gameState.drawEverything(context!!);

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
