import { initialKeyStatus } from "./helpers/constants";
import { addEventListeners, createLostParticles } from "./helpers/utils";
import { Player } from "./gameObjects/Player";
import { Keys } from "./helpers/types";
import { Blocks } from "./gameObjects/Blocks";
import { drawBackground, drawPlayBorder } from "./helpers/drawBackground";
import { colorPalette } from "./helpers/drawingHelpers";
import { LostParticle } from "./gameObjects/LostParticle";

export class GameState {
  private keys: Keys = initialKeyStatus;
  private player: Player;
  private context: CanvasRenderingContext2D;
  private blocks: Blocks;
  private score: number = 0;
  private lostParticles: LostParticle[] | null = null;

  constructor(context: CanvasRenderingContext2D) {
    addEventListeners(this.keys);
    this.player = new Player(context);
    this.blocks = new Blocks(context);
    this.context = context;
  }

  updateAll(elapsedTime: number, handleWin: (score: number) => void) {
    if (
      this.blocks.checkCollision(this.player.pos) &&
      this.lostParticles === null
    ) {
      this.lostParticles = createLostParticles(this.context, this.player.pos);
    }
    if (this.keys.escape) {
      handleWin(this.score);
      this.keys.escape = false;
    }
    if (this.lostParticles !== null) {
      this.lostParticles.forEach((particle) => particle.update(elapsedTime));
      return;
    }
    this.player.update(this.keys, elapsedTime);
    this.blocks.update(elapsedTime, () => (this.score += 1));
  }

  drawAll() {
    drawBackground(this.context, this.score);
    if (this.lostParticles === null) {
      this.player.draw();
    } else {
      this.lostParticles.forEach((particle) => particle.draw());
    }
    this.blocks.draw();
    drawPlayBorder(this.context);

    if (this.lostParticles !== null) {
      this.context.fillStyle = colorPalette.timerBg;
      this.context.fillRect(300 - 35, 300 - 35, 420, 100);

      this.context.fillStyle = colorPalette.loseText;
      this.context.font = "30px Arial";
      this.context.fillText("You Lost!", 300, 300);
      this.context.font = "20px Arial";
      this.context.fillText(
        "Press 'escape' to return to the main menu",
        300,
        350
      );
    }
  }
}
