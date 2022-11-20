import { Player } from "./Player.js";
import { Platform } from "./Platform.js";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
export const MAX_WIDTH = canvas.width;
export const MAX_HEIGHT = canvas.height;
export const FLOOR = canvas.height - 400;
const player = new Player();
const platform = new Platform({ x: 100, y: FLOOR - 100 }, 200, MAX_HEIGHT - FLOOR - 100);
const keys = {
    up: false,
    right: false,
    left: false,
};
function animate() {
    if (!context)
        throw new Error("Context is null");
    requestAnimationFrame(animate);
    context.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    player.update(context, keys);
    platform.draw(context);
    if (player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >=
            platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width) {
        player.stopY();
        player.position.y = platform.position.y - player.height;
    }
}
animate();
addEventListener("keydown", ({ code }) => {
    if (code === "ArrowUp")
        keys.up = true;
    if (code === "ArrowRight")
        keys.right = true;
    if (code === "ArrowLeft")
        keys.left = true;
});
addEventListener("keyup", ({ code }) => {
    if (code === "ArrowUp")
        keys.up = false;
    if (code === "ArrowRight")
        keys.right = false;
    if (code === "ArrowLeft")
        keys.left = false;
});
