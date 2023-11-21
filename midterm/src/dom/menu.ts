import { createButton, setElementToApp } from "./domHelpers";

export function initializeGameUi(
  startGame: () => void,
  highScores?: () => void
) {
  setElementToApp();
  const onButtonClicked = () => {
    startGame();
    document.getElementById("gameSetup")?.remove();
    document.getElementById("instructions")?.remove();
  };

  const instructions = document.createElement("h2");
  instructions.setAttribute("id", "instructions");
  instructions.innerHTML = "Press play to begin.";

  const gameSetup = document.createElement("div");
  gameSetup.setAttribute("id", "gameSetup");
  gameSetup.setAttribute("class", "infoContainer onBackground");

  gameSetup.appendChild(instructions);
  const playButton = createButton("play-button", "Play", onButtonClicked);
  gameSetup.appendChild(playButton);

  if (highScores) {
    const highScoresButton = createButton(
      "high-scores-button",
      "High Scores",
      highScores
    );
    gameSetup.appendChild(highScoresButton);
  }

  setElementToApp(gameSetup);
}
