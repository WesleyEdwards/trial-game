// import { FLOOR, MAX_WIDTH } from "./main.js";
import { MAX_HEIGHT } from "./main.js";
import { Keys } from "./utils";
export interface Coordinates {
  x: number;
  y: number;
}

export type PlayerAction =
  | "MoveRight"
  | "MoveLeft"
  | "Jump"
  | "Duck"
  | "StopX"
  | "StopY";

const gravity = 0.65;

export class Player {
  position: Coordinates;
  velocity: Coordinates;
  jumps: number;
  width: number;
  height: number;
  color: string;
  jumpPos: number | null;
  image: HTMLImageElement;

  constructor(
    position: Coordinates = { x: 100, y: 100 },
    velocity: Coordinates = { x: 0, y: 0 },
    width: number = 50,
    height: number = 50,
    color: string = "red"
  ) {
    this.position = position;
    this.velocity = velocity;
    this.jumps = 0;
    this.jumpPos = null;
    this.width = width;
    this.height = height;
    this.color = color;
    this.image = new Image(width, height);
    this.image.src =
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/319/mate_1f9c9.png";
  }

  draw(canvas: CanvasRenderingContext2D) {
    canvas.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(canvas: CanvasRenderingContext2D, keys: Keys) {
    if (keys.up) this.move("Jump");

    if (keys.right && this.position.x < 400) this.move("MoveRight");
    if (keys.right && this.position.x >= 400) this.move("StopX");

    if (keys.left && this.position.x >= 100) this.move("MoveLeft");
    if (keys.left && this.position.x < 100) this.move("StopX");

    if (!keys.right && !keys.left) this.move("StopX");

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.bottomPos > MAX_HEIGHT) this.move("StopY");
    else this.velocity.y += gravity;

    this.draw(canvas);
  }

  move(action: PlayerAction) {
    // if (this.velocity.y > 5 && action !== "Jump")
    if (action === "MoveRight") this.velocity.x = 10;
    if (action === "MoveLeft" && this.position.x > 0) this.velocity.x = -10;
    if (action === "StopX") this.velocity.x = 0;
    if (action === "StopY") {
      this.velocity.y = 0;
      this.position.y = MAX_HEIGHT - this.height;
    }

    if (this.velocity.y > 3) {
      this.jumps = 0;
      this.jumpPos = null;
    }
    if (action === "Jump" && Math.abs(this.velocity.y) < 3 && this.jumps < 2) {
      if (
        (this.jumpPos && this.jumpPos - this.position.y > 100) ||
        this.jumpPos === null
      ) {
        this.velocity.y = -15;
        this.jumps++;
        this.jumpPos = this.position.y;
      }
    }
  }

  get bottomPos() {
    return this.position.y + this.height;
  }
  get rightPos() {
    return this.position.x + this.width;
  }
}

export default Player;
