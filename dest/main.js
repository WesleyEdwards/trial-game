import { calcInteractions, drawEverything, updateEverything, } from "./utils.js";
import { MAX_HEIGHT, MAX_WIDTH } from "./constants.js";
import { GameState } from "./GameState.js";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
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
if (!context)
    throw new Error("Context is null");
function animate() {
    requestAnimationFrame(animate);
    drawEverything(context, gameState);
    updateEverything(gameState);
    calcInteractions(gameState);
}
const enterGameLoop = () => {
    animate();
};
addEventListener("keydown", ({ code }) => {
    if (code === "ArrowUp")
        gameState.keys.up = true;
    if (code === "ArrowRight")
        gameState.keys.right = true;
    if (code === "ArrowLeft")
        gameState.keys.left = true;
    if (code === "Space")
        gameState.keys.space = true;
});
addEventListener("keyup", ({ code }) => {
    if (code === "ArrowUp")
        gameState.keys.up = false;
    if (code === "ArrowRight")
        gameState.keys.right = false;
    if (code === "ArrowLeft")
        gameState.keys.left = false;
    if (code === "Space")
        gameState.keys.space = false;
});
