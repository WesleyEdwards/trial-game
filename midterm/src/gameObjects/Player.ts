import {
  PLAYER_SPEED,
  PLAYER_MOST_LEFT_POS,
  PLAYER_MOST_RIGHT_POS,
  PLAYER_TOP,
  PLAY_AREA_WIDTH,
  PLAYER_WIDTH,
  PLAY_AREA_START,
} from "../helpers/constants";
import { images } from "../helpers/drawingHelpers";
import { Direction, Keys } from "../helpers/types";

export class Player {
  pos: number = PLAY_AREA_WIDTH / 2;
  private moving: Direction = "none";
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  update(keys: Keys, elapsedTime: number) {
    if (keys.left) {
      this.movePlayer("left", elapsedTime);
      this.moving = "left";
    }
    if (keys.right) {
      this.movePlayer("right", elapsedTime);
      this.moving = "right";
    }

    if (this.moving === "left" && !keys.left) this.moving = "none";
    if (this.moving === "right" && !keys.right) this.moving = "none";
  }

  movePlayer(direction: Direction, elapsedTime: number) {
    if (direction === "left" && this.pos > PLAYER_MOST_LEFT_POS) {
      this.pos -= PLAYER_SPEED * elapsedTime;
    }
    if (direction === "right" && this.pos < PLAYER_MOST_RIGHT_POS) {
      this.pos += PLAYER_SPEED * elapsedTime;
    }
  }

  draw() {
    const image = new Image();
    image.src = images.player;
    this.context.drawImage(
      image,
      PLAY_AREA_START + this.pos,
      PLAYER_TOP,
      PLAYER_WIDTH,
      PLAYER_WIDTH
    );
  }
}
