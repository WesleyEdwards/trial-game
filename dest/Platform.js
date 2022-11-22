export class Platform {
    constructor(position = { x: 100, y: 200 }, width = 200, height = 1000, color = "green") {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(canvas) {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    get rightPos() {
        return this.position.x + this.width;
    }
}
