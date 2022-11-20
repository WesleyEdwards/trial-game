import { FLOOR, MAX_WIDTH } from "./main.js";
import { Keys } from "./utils";

export interface Coordinates {
  x: number;
  y: number;
}

export type PlayerAction = "MoveRight" | "MoveLeft" | "Jump" | "Duck" | "Stop";

const gravity = 0.5;

export class Player {
  position: Coordinates;
  velocity: Coordinates;
  width: number;
  height: number;
  color: string;

  constructor(
    position: Coordinates = { x: 100, y: 100 },
    velocity: Coordinates = { x: 0, y: 0 },
    width: number = 30,
    height: number = 30,
    color: string = "red"
  ) {
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(canvas: CanvasRenderingContext2D, keys: Keys) {
    if (keys.up) this.move("Jump");

    if (keys.right) {
      if (this.position.x <= MAX_WIDTH - this.width) {
        this.move("MoveRight");
      } else {
        this.move("Stop");
      }
    }

    if (keys.left) {
      if (this.position.x >= 0) {
        this.move("MoveLeft");
      } else {
        this.move("Stop");
      }
    }
    if (!keys.right && !keys.left) this.move("Stop");

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height > FLOOR) {
      this.stopY();
    } else {
      this.velocity.y += gravity;
    }

    this.draw(canvas);
  }

  move(action: PlayerAction) {
    if (action === "MoveRight" && this.position.x < MAX_WIDTH)
      this.velocity.x = 10;
    if (action === "MoveLeft" && this.position.x > 0) this.velocity.x = -10;
    if (action === "Stop") this.velocity.x = 0;
    if (action === "Jump" && this.velocity.y == 0) {
      this.velocity.y = -15;
    }
  }

  stopY() {
    this.velocity.y = 0;
  }
}

export default Player;
