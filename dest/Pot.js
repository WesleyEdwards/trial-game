import { END_POS } from "./constants.js";
import { makeImage } from "./drawingUtils.js";
export class Pot {
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
    draw(canvas) {
        canvas.drawImage(this.image, this.position.x, this.position.y);
    }
}
