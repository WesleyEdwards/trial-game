import {
  BLOCK_HEIGHT,
  BLOCK_SPEED,
  EMPTY_WIDTH,
  PLAY_AREA_START,
  PLAY_AREA_WIDTH,
} from "../helpers/constants";
import { colorPalette } from "../helpers/drawingHelpers";
import { Particles } from "./Particles";

export class Block {
  posY: number;
  emptySpace: number;
  private context: CanvasRenderingContext2D;
  private particles: Particles;
  private speed: number = BLOCK_SPEED;
  constructor(
    context: CanvasRenderingContext2D,
    previousEmptySpace: number,
    additionalSpeed: number
  ) {
    this.posY = 0;
    this.emptySpace = findNewPosition(previousEmptySpace);
    this.context = context;
    this.particles = new Particles(context);
    this.speed = BLOCK_SPEED + additionalSpeed;
  }

  draw(inStack: boolean = false) {
    this.context.fillStyle = inStack
      ? colorPalette.readyBlock
      : colorPalette.block;

    this.context.fillRect(
      PLAY_AREA_START,
      this.posY,
      this.emptySpace,
      BLOCK_HEIGHT
    );

    this.context.fillRect(
      PLAY_AREA_START + this.emptySpace + EMPTY_WIDTH,
      this.posY,
      PLAY_AREA_WIDTH - this.emptySpace - EMPTY_WIDTH,
      BLOCK_HEIGHT
    );

    this.particles.draw();
  }

  update(elapsedTime: number) {
    this.posY += this.speed * elapsedTime;

    this.particles.update(elapsedTime, this.emptySpace, this.posY);
  }
}

function findNewPosition(previousEmptySpace: number): number {
  const distanceFromPrev = Math.floor(
    Math.random() * (EMPTY_WIDTH * 0.75 - EMPTY_WIDTH * 0.15) +
      EMPTY_WIDTH * 0.15
  );

  if (previousEmptySpace - distanceFromPrev < 0) {
    return distanceFromPrev;
  }

  if (previousEmptySpace + distanceFromPrev > PLAY_AREA_WIDTH - EMPTY_WIDTH) {
    return previousEmptySpace - distanceFromPrev;
  }

  return Math.random() > 0.5
    ? previousEmptySpace - distanceFromPrev
    : previousEmptySpace + distanceFromPrev;
}
