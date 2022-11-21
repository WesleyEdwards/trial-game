import { Player } from "./Player.js";
import { Platform } from "./Platform.js";
import { calcInteractions, initialKeyStatus } from "./utils.js";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
export const MAX_WIDTH = canvas.width;
export const MAX_HEIGHT = canvas.height;
export const FLOOR = canvas.height - 400;
const keys = initialKeyStatus;
const player = new Player();
let scrollOffset = 0;
const platforms = [
    new Platform({ x: 100, y: FLOOR - 100 }, 200, 500),
    new Platform({ x: 500, y: FLOOR - 100 }, 200, 500),
    new Platform({ x: 900, y: FLOOR - 100 }, 200, 500),
];
function animate() {
    if (!context)
        throw new Error("Context is null");
    requestAnimationFrame(animate);
    context.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
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
