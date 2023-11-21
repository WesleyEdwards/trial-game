import {
  PARTICLE_SPEED,
  PARTICLE_WIDTH,
  PLAY_AREA_START,
} from "../helpers/constants";

export class LostParticle {
  private context: CanvasRenderingContext2D;
  yPos: number;
  xPos: number;
  color: string = "white";
  velX: number;
  velY: number;
  constructor(context: CanvasRenderingContext2D, xPos: number, posY: number) {
    this.context = context;
    this.yPos = posY;
    this.xPos = xPos;
    this.velX = Math.random() * 2 - 1;
    this.velY = Math.random() * 2 - 1;
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
    this.yPos += PARTICLE_SPEED * elapsedTime * this.velY;
    this.xPos += PARTICLE_SPEED * elapsedTime * this.velX;
    this.velX *= 0.99;
    this.velY *= 0.99;
  }
}
