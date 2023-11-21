import "./dom/style.css";
import { getCanvasContext, setupCanvas } from "./dom/domHelpers";
import { GameState } from "./GameState";
import { handleWinUi } from "./dom/winScreen";
import { initializeGameUi } from "./dom/menu";
import { handleShowHighScores } from "./dom/handleShowHighScores";

function main() {
  let gameState: GameState | undefined;
  let prevTime = 0;
  let initial = true;

  const { canvas, context } = getCanvasContext();

  function update(elapsedTime: number) {
    gameState?.updateAll(elapsedTime, handleWin);
  }

  function render() {
    gameState?.drawAll();
  }

  function gameLoop(timeStamp: number) {
    if (!gameState) return;

    const elapsedTime = initial ? 0 : timeStamp - prevTime;
    initial = false;
    prevTime = timeStamp;

    update(elapsedTime);
    render();

    requestAnimationFrame(gameLoop);
  }

  function handleWin(score: number) {
    prevTime = 0;
    gameState = undefined;
    handleWinUi(score, () => initializeGameUi(startGame));
  }

  function startGame() {
    setupCanvas(canvas, mainMenu);
    initial = true;
    gameState = new GameState(context);
    requestAnimationFrame(gameLoop);
  }

  function mainMenu() {
    prevTime = 0;
    gameState = undefined;
    initializeGameUi(startGame);
  }

  function highScores() {
    prevTime = 0;
    gameState = undefined;
    handleShowHighScores(() => initializeGameUi(startGame));
  }

  initializeGameUi(startGame, highScores);
}

onload = () => main();
