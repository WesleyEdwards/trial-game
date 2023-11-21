import {
  BLOCK_HEIGHT,
  EMPTY_WIDTH,
  PLAYER_TOP,
  PLAYER_WIDTH,
  PLAY_AREA_WIDTH,
  TIME_BETWEEN_BLOCKS,
} from "../helpers/constants";
import { Block } from "./Block";

export class Blocks {
  private blocks: Block[] = [];
  private upNext: Block;
  private timeSinceLast: number = 0;
  private context: CanvasRenderingContext2D;
  private additionalSpeed: number = 0;
  constructor(context: CanvasRenderingContext2D) {
    this.upNext = new Block(context, PLAY_AREA_WIDTH / 2, this.additionalSpeed);
    this.context = context;
  }

  draw() {
    this.upNext.draw(true);
    this.blocks.forEach((block) => block.draw());
  }

  update(elapsedTime: number, addScore: () => void) {
    this.timeSinceLast += elapsedTime;
    this.blocks.forEach((block) => {
      block.update(elapsedTime);
      if (block.posY > 600) {
        addScore();
        this.blocks.shift();
      }
    });

    if (
      this.timeSinceLast >
      TIME_BETWEEN_BLOCKS - this.additionalSpeed * 1000
    ) {
      const previousEmpty = this.upNext.emptySpace;
      this.blocks.push(this.upNext);
      this.upNext = new Block(
        this.context,
        previousEmpty,
        this.additionalSpeed
      );
      this.additionalSpeed += 0.01;
      this.timeSinceLast = 0;
    }
  }

  checkCollision(x: number) {
    if (this.blocks.length === 0) return false;
    const block = this.blocks[0];
    if (
      block.posY + BLOCK_HEIGHT > PLAYER_TOP &&
      block.posY < PLAYER_TOP + PLAYER_WIDTH
    ) {
      if (
        x < block.emptySpace ||
        x + PLAYER_WIDTH > block.emptySpace + EMPTY_WIDTH
      ) {
        return true;
      }
    }
    return false;
  }
}
