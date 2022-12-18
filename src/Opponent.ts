import { GRAVITY, MAX_HEIGHT, opponentConstants } from "./constants.js";
import { makeImage } from "./drawingUtils.js";
import { Coordinates, PlayerAction } from "./models.js";
import { debounceLog, generateRandomInt, randomOutOf } from "./utils.js";

const { moveSpeed } = opponentConstants;
export class Opponent {
  position: Coordinates;
  velocity: Coordinates;
  width: number;
  height: number;
  image: HTMLImageElement;
  facing: "left" | "right";

  constructor(xPos: number) {
    this.position = { x: xPos, y: 100 };
    this.velocity = { x: moveSpeed, y: 0 };
    this.width = 50;
    this.height = 50;
    this.image = makeImage(this.width, this.height, "opponent");
    this.facing = "right";
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (randomOutOf(150)) {
      this.velocity.y = -15;
    }

    if (randomOutOf(150)) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.bottomPos > MAX_HEIGHT) this.move("StopY");
    else this.velocity.y += GRAVITY;
  }

  move(action: PlayerAction) {
    if (action === "StopY") {
      this.velocity.y = 0;
      this.position.y = MAX_HEIGHT - this.height;
    }
    if (action === "Jump") {
      this.velocity.y = -15;
    }
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

  get bottomPos() {
    return this.position.y + this.height;
  }
  get rightPos() {
    return this.position.x + this.width;
  }
}
