import { calculateInteractions, drawEverything, updateEverything, } from "./utils.js";
import { GameState } from "./GameState.js";
import { addEventListeners, handleLose, setupGame } from "./DomFunctions.js";
const gameState = new GameState();
const enterGameLoop = () => {
    gameState.reset();
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
    drawEverything(context, gameState);
    updateEverything(gameState);
    calculateInteractions(gameState);
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
