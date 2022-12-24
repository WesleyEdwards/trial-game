var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from "./constants.js";
import { fetchPlayerScores, handleSubmitName } from "./FirebaseHelpers.js";
export function getStatsHTML() {
    const levelStats = document.getElementById("level-stats");
    const scoreStats = document.getElementById("score-stats");
    const livesStats = document.getElementById("lives-stats");
    return {
        level: levelStats,
        score: scoreStats,
        lives: livesStats,
    };
}
export function setupGame(enterGameLoop) {
    const canvas = document.getElementById("canvas");
    const playGameButton = document.getElementById("play-game");
    const container = document.getElementById("main-div");
    canvas.width = MAX_CANVAS_WIDTH;
    if (playGameButton && container) {
        playGameButton.addEventListener("click", () => {
            enterGameLoop();
            playGameButton.setAttribute("disabled", "true");
        });
        container.appendChild(playGameButton);
    }
    return canvas;
}
export function handleStartPlaying(context, instructions) {
    const { canvas } = context;
    canvas.width = MAX_CANVAS_WIDTH;
    canvas.height = MAX_CANVAS_HEIGHT;
    instructions.innerHTML = "";
}
export function handleLose(context, instructions) {
    context.canvas.height = 0;
    const highScore = true;
    if (highScore) {
        instructions.innerHTML = `<h2>Game Over!</h2><p>You got a high score!<br />To receive credit, Enter your name:<div id="submit-box"></p><input type="text" id="name-input" /><button type="submit" id="submit-score">Submit</button></div>`;
        const name = document.getElementById("name-input");
        const submit = document.getElementById("submit-score");
        if (submit) {
            submit.addEventListener("click", () => handleSubmitName(name.value).then(() => displayScores(instructions)));
        }
    }
    else {
        displayScores(instructions);
    }
}
export function addEventListeners(gameState) {
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
}
function generateScoresHTML() {
    return __awaiter(this, void 0, void 0, function* () {
        const scores = yield fetchPlayerScores();
        return `<h2>High Scores:</h2><p>1 - ${scores[0].name} (${scores[0].score})</p><p>2 - ${scores[1].name} (${scores[1].score})</p><p>3 - ${scores[2].name} (${scores[2].score})</p><p>4 - ${scores[3].name} (${scores[3].score})</p><p>5 - ${scores[4].name} (${scores[4].score})</p>`;
    });
}
function displayScores(instructions) {
    const button = document.getElementById("play-game");
    if (button) {
        button.removeAttribute("disabled");
    }
    generateScoresHTML().then((html) => {
        instructions.innerHTML = html;
    });
}
