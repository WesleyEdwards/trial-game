import { createButton, setElementToApp } from "./domHelpers";
import { getScores } from "./winScreen";

export function handleShowHighScores(playAgain: () => void) {
  const scores = getScores();

  const highScoreDiv = document.createElement("div");
  highScoreDiv.setAttribute("id", "highScoreDiv");

  const titleDiv = document.createElement("h3");
  titleDiv.innerHTML = "High Scores";
  highScoreDiv.appendChild(titleDiv);

  if (scores.length === 0) {
    const noScores = document.createElement("div");
    noScores.innerHTML = "No Scores Yet";
    highScoreDiv.appendChild(noScores);
  }
  scores.forEach((score, index) => {
    const scoresDiv = document.createElement("div");
    scoresDiv.innerHTML = `${index + 1}: ${score}`;
    highScoreDiv.appendChild(scoresDiv);
  });

  const scoreBoard = document.createElement("div");
  scoreBoard.setAttribute("class", "infoContainer onBackground");

  const playButton = createButton("playAgain", "Play Again", playAgain);

  scoreBoard.appendChild(highScoreDiv);
  scoreBoard.appendChild(playButton);

  setElementToApp(scoreBoard);
}
