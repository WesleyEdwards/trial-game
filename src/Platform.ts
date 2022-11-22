// import { FLOOR } from "./main.js";
import { Coordinates } from "./Player.js";

export class Platform {
  position: Coordinates;
  width: number;
  height: number;
  color: string;

  constructor(
    position: Coordinates = { x: 100, y: 200 },
    width: number = 200,
    height: number = 1000,
    color: string = "green"
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw(canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = this.color;

    canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  get rightPos() {
    return this.position.x + this.width;
  }
}
