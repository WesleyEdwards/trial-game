import { generateRandomInt } from "./utils.js";
import { MAX_WIDTH, PLAT_FREQUENCY } from "./constants.js";
const PLAT_Y_MIN = 50;
const PLAT_Y_MAX = 576 - 50;
const PLAT_WIDTH_MIN = 200;
const PLAT_WIDTH_MAX = 500;
const TOTAL_HEIGHT = 576;
export class Platform {
    constructor(scrollOffset = 0, sectionY, xPos) {
        this.position = {
            x: getXPos(scrollOffset, xPos),
            y: getYPos(sectionY),
        };
        this.width = generateRandomInt(PLAT_WIDTH_MIN, PLAT_WIDTH_MAX);
        this.height = 40;
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
export function getYPos(sectionY) {
    const third = TOTAL_HEIGHT / 3;
    if (sectionY === "top") {
        return generateRandomInt(PLAT_Y_MIN, third);
    }
    if (sectionY === "bottom") {
        return generateRandomInt(third, 2 * third);
    }
    if (sectionY === "middle") {
        return generateRandomInt(2 * third, PLAT_Y_MAX);
    }
    return PLAT_Y_MAX;
}
export function getXPos(offset, xPos) {
    if (xPos !== undefined) {
        return xPos;
    }
    return offset + MAX_WIDTH + generateRandomInt(0, PLAT_FREQUENCY);
}
