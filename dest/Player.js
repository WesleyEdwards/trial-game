import { FLOOR } from "./main.js";
const gravity = 0.5;
export class Player {
    constructor(position = { x: 100, y: 100 }, velocity = { x: 0, y: 0 }, jumps = 0, width = 50, height = 50, color = "red") {
        this.position = position;
        this.velocity = velocity;
        this.jumps = jumps;
        this.width = width;
        this.height = height;
        this.color = color;
        this.image = new Image(width, height);
        this.image.src =
            "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/319/mate_1f9c9.png";
    }
    draw(canvas) {
        canvas.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update(canvas, keys) {
        if (keys.up)
            this.move("Jump");
        if (keys.right && this.position.x < 500)
            this.move("MoveRight");
        if (keys.right && this.position.x >= 500)
            this.move("StopX");
        if (keys.left && this.position.x >= 100)
            this.move("MoveLeft");
        if (keys.left && this.position.x < 100)
            this.move("StopX");
        if (!keys.right && !keys.left)
            this.move("StopX");
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height > FLOOR)
            this.move("StopY");
        else
            this.velocity.y += gravity;
        this.draw(canvas);
    }
    move(action) {
        if (this.velocity.y > 0 && this.jumps > 0)
            this.jumps = 0;
        if (action === "MoveRight")
            this.velocity.x = 10;
        if (action === "MoveLeft" && this.position.x > 0)
            this.velocity.x = -10;
        if (action === "StopX")
            this.velocity.x = 0;
        if (action === "StopY")
            this.velocity.y = 0;
        if (action === "Jump" && this.velocity.y == 0 && this.jumps < 2) {
            this.velocity.y = -15;
            this.jumps++;
        }
    }
}
export default Player;
