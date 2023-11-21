import {
  PARTICLE_SPEED,
  PARTICLE_WIDTH,
  PLAY_AREA_START,
} from "../helpers/constants";
import { particleColors } from "../helpers/drawingHelpers";

export class Particle {
  private context: CanvasRenderingContext2D;
  yPos: number;
  xPos: number;
  color: string;
  constructor(context: CanvasRenderingContext2D, xPos: number, posY: number) {
    this.context = context;
    this.yPos = posY;
    this.xPos = xPos;
    this.color =
      particleColors[Math.floor(Math.random() * particleColors.length)];
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      PLAY_AREA_START + this.xPos,
      this.yPos,
      PARTICLE_WIDTH,
      PARTICLE_WIDTH
    );
  }

  update(elapsedTime: number) {
    this.yPos += PARTICLE_SPEED * elapsedTime;
  }
}
