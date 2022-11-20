export class Platform {
    constructor(position = { x: 100, y: 200 }, width = 100, height = 100, color = "green") {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(canvas) {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
