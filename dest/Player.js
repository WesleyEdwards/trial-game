// import { FLOOR, MAX_WIDTH } from "./main.js";
import { MAX_HEIGHT, GRAVITY, images } from "./constants.js";
const shankTime = 250;
const shankCoolDown = 250;
const makeImage = (width, height, object) => {
    const image = new Image(width, height);
    if (object === "knife")
        image.src = images.knifeRight;
    if (object === "player")
        image.src = images.player;
    return image;
};
export class Player {
    constructor(color = "red") {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };
        this.jumps = 0;
        this.width = 50;
        this.height = 50;
        this.color = color;
        this.image = makeImage(this.width, this.height, "player");
        this.knifeImage = makeImage(this.width, this.height, "knife");
        this.shank = 0;
    }
    draw(canvas) {
        canvas.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        if (Date.now() - this.shank < shankTime) {
            canvas.drawImage(this.knifeImage, this.position.x + this.width / 2, this.position.y, this.width, this.height);
        }
    }
    update(canvas, keys) {
        if (keys.up)
            this.move("Jump");
        if (keys.right && this.position.x < 400)
            this.move("MoveRight");
        if (keys.right && this.position.x >= 400)
            this.move("StopX");
        if (keys.left && this.position.x >= 100)
            this.move("MoveLeft");
        if (keys.left && this.position.x < 100)
            this.move("StopX");
        if (!keys.right && !keys.left)
            this.move("StopX");
        if (keys.space && Date.now() - this.shank > shankTime + shankCoolDown) {
            this.shank = Date.now();
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.bottomPos > MAX_HEIGHT)
            this.move("StopY");
        else
            this.velocity.y += GRAVITY;
        this.draw(canvas);
    }
    move(action) {
        if (action === "MoveRight")
            this.velocity.x = 10;
        if (action === "MoveLeft" && this.position.x > 0)
            this.velocity.x = -10;
        if (action === "StopX")
            this.velocity.x = 0;
        if (action === "StopY") {
            this.velocity.y = 0;
            this.position.y = MAX_HEIGHT - this.height;
        }
        if (action === "Jump" && this.velocity.y === 0 && this.jumps < 1) {
            this.velocity.y = -15;
            this.jumps++;
        }
        if (this.velocity.y > 0)
            this.jumps = 0;
    }
    get bottomPos() {
        return this.position.y + this.height;
    }
    get rightPos() {
        return this.position.x + this.width;
    }
}
export default Player;
