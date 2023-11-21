import { END_POS, MAX_CANVAS_HEIGHT } from "./constants.js";
import { makeImage } from "./drawingUtils.js";
import { Coordinates } from "./models.js";

export class Pot {
  position: Coordinates;
  width: number;
  height: number;
  color: string;
  image: HTMLImageElement;

  constructor() {
    this.position = {
      x: END_POS + 750,
      y: 50,
    };
    this.width = 500;
    this.height = 750;
    this.color = "green";
    this.image = makeImage(500, 750, "matePot");
  }
  draw(canvas: CanvasRenderingContext2D) {
    canvas.drawImage(this.image, this.position.x, this.position.y);
  }
}
