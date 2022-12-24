import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from "./constants.js";
import { GameState } from "./GameState.js";
import { StatsHTML } from "./models.js";

export function getStatsHTML(): StatsHTML {
  const levelStats = document.getElementById("level-stats");
  const scoreStats = document.getElementById("score-stats");
  const livesStats = document.getElementById("lives-stats");
  return {
    level: levelStats!!,
    score: scoreStats!!,
    lives: livesStats!!,
  };
}

export function setupGame(enterGameLoop: () => void): HTMLCanvasElement {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

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

export function handleStartPlaying(
  context: CanvasRenderingContext2D,
  instructions: HTMLElement
) {
  const { canvas } = context;
  canvas.width = MAX_CANVAS_WIDTH;
  canvas.height = MAX_CANVAS_HEIGHT;
  instructions.innerHTML = "";
}

export function handleLose(
  context: CanvasRenderingContext2D,
  instructions: HTMLElement
) {
  context.canvas.height = 0;
  const highScore = true;

  if (highScore) {
    instructions.innerHTML = `<h2>Game Over!</h2><p>You got a high score!<br />To receive credit, Enter your name:<div id="submit-box"></p><input type="text" id="name-input" /><button type="submit" id="submit-score">Submit</button></div>`;
    const name = document.getElementById("name-input") as HTMLInputElement;
    const submit = document.getElementById("submit-score") as HTMLButtonElement;

    if (submit) {
      submit.addEventListener("click", () =>
        handleSubmitName(name.value).then(() => displayScores(instructions))
      );
    }
  } else {
    displayScores(instructions);
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

interface PlayerScore {
  name: string;
  score: number;
}

function generateScoresHTML(): string {
  const scores: PlayerScore[] = [
    { name: "John Doe", score: 100 },
    { name: "Jane Doe", score: 90 },
    { name: "Joe Doe", score: 80 },
    { name: "Jill Doe", score: 70 },
    { name: "Jack Doe", score: 60 },
  ];

  return `<h2>High Scores:</h2><p>1 - ${scores[0].name} (${scores[0].score})</p><p>2 - ${scores[1].name} (${scores[1].score})</p><p>3 - ${scores[2].name} (${scores[2].score})</p><p>4 - ${scores[3].name} (${scores[3].score})</p><p>5 - ${scores[4].name} (${scores[4].score})</p>`;
}

function displayScores(instructions: HTMLElement) {
  instructions.innerHTML = generateScoresHTML();
  const button = document.getElementById("play-game");
  if (button) {
    button.removeAttribute("disabled");
  }
}

const handleSubmitName = (name: string) => {
  console.log(name);
  return Promise.resolve();
};
