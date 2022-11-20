import { FLOOR, MAX_WIDTH } from "./main.js";
const gravity = 0.5;
export class Player {
    constructor(position = { x: 100, y: 100 }, velocity = { x: 0, y: 0 }, width = 30, height = 30, color = "red") {
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(canvas) {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(canvas, keys) {
        if (keys.up)
            this.move("Jump");
        if (keys.right) {
            if (this.position.x <= MAX_WIDTH - this.width) {
                this.move("MoveRight");
            }
            else {
                this.move("Stop");
            }
        }
        if (keys.left) {
            if (this.position.x >= 0) {
                this.move("MoveLeft");
            }
            else {
                this.move("Stop");
            }
        }
        if (!keys.right && !keys.left)
            this.move("Stop");
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height > FLOOR) {
            this.stopY();
        }
        else {
            this.velocity.y += gravity;
        }
        this.draw(canvas);
    }
    move(action) {
        if (action === "MoveRight" && this.position.x < MAX_WIDTH)
            this.velocity.x = 10;
        if (action === "MoveLeft" && this.position.x > 0)
            this.velocity.x = -10;
        if (action === "Stop")
            this.velocity.x = 0;
        if (action === "Jump" && this.velocity.y == 0) {
            this.velocity.y = -15;
        }
    }
    stopY() {
        this.velocity.y = 0;
    }
}
export default Player;
