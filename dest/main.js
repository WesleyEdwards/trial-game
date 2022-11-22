import { Player } from "./Player.js";
import { Platform } from "./Platform.js";
import { calcInteractions, initialKeyStatus } from "./utils.js";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
// canvas.width = innerWidth;
// canvas.height = innerHeight;
canvas.width = 1024;
canvas.height = 576;
export const MAX_WIDTH = canvas.width;
export const MAX_HEIGHT = canvas.height;
const keys = initialKeyStatus;
const player = new Player();
let scrollOffset = 0;
const platforms = [
    new Platform({ x: 50, y: MAX_HEIGHT - 30 }),
    new Platform({ x: 500, y: MAX_HEIGHT - 10 }),
    new Platform({ x: 1100, y: MAX_HEIGHT - 50 }),
    new Platform({ x: 1400, y: MAX_HEIGHT - 100 }),
];
function animate() {
    if (!context)
        throw new Error("Context is null");
    requestAnimationFrame(animate);
    context.fillStyle = "white";
    context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    platforms.forEach((plat) => plat.draw(context));
    player.update(context, keys);
    calcInteractions(keys, player, platforms, (num) => {
        scrollOffset += num;
    });
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
