// import { FLOOR } from "./main.js";
import { generateRandomInt } from "./utils.js";
import { MAX_HEIGHT, MAX_WIDTH, PLAT_FREQUENCY } from "./main.js";
const PLAT_Y_MIN = 50;
const PLAT_Y_MAX = 576 - 50;
export class Platform {
    constructor(scrollOffset = 0, xPos, yPos) {
        console.log(xPos, yPos);
        this.position = {
            x: xPos
                ? xPos
                : scrollOffset + MAX_WIDTH + generateRandomInt(0, PLAT_FREQUENCY),
            y: yPos ? MAX_HEIGHT - yPos : generateRandomInt(PLAT_Y_MIN, PLAT_Y_MAX),
        };
        this.width = generateRandomInt(100, 500);
        this.height = 50;
        this.color = "green";
    }
    draw(canvas) {
        canvas.fillStyle = this.color;
        canvas.strokeStyle = "black";
        canvas.lineWidth = 8;
        canvas.strokeRect(this.position.x, this.position.y, this.width, this.height);
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    get rightPos() {
        return this.position.x + this.width;
    }
}
