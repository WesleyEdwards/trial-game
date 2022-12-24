import { calculateInteractions, drawEverything, updateEverything, } from "./utils.js";
import { GameState } from "./GameState.js";
import { addEventListeners, handleLose, setupGame } from "./DomFunctions.js";
const levelStats = document.getElementById("level-stats");
const scoreStats = document.getElementById("score-stats");
const livesStats = document.getElementById("lives-stats");
const statsDiv = {
    level: levelStats,
    score: scoreStats,
    lives: livesStats,
};
const gameState = new GameState(statsDiv);
const enterGameLoop = () => {
    console.log("entering game loop");
    gameState.enterGame();
    loop();
};
const canvas = setupGame(enterGameLoop);
const context = canvas.getContext("2d");
if (!context)
    throw new Error("Context is null");
let requestId = undefined;
function loop() {
    requestId = undefined;
    if (gameState.winState === "lose") {
        handleLose(context);
        stop();
        return;
    }
    updateEverything(gameState);
    calculateInteractions(gameState);
    drawEverything(context, gameState);
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
