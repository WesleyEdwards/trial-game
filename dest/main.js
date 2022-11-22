import { Player } from "./Player.js";
import { Platform } from "./Platform.js";
import { calcInteractions, initialKeyStatus } from "./utils.js";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
export const MAX_WIDTH = canvas.width;
export const MAX_HEIGHT = canvas.height;
export const PLAT_FREQUENCY = 200;
const keys = initialKeyStatus;
const player = new Player();
let scrollOffset = 0;
let scrollDiff = 0;
const platforms = [
    new Platform(scrollOffset, 0, 0),
    new Platform(scrollOffset, 300),
    new Platform(scrollOffset, 600),
    new Platform(scrollOffset, 1000),
];
function animate() {
    if (!context)
        throw new Error("Context is null");
    if (scrollOffset - scrollDiff > PLAT_FREQUENCY) {
        scrollDiff = scrollOffset;
        platforms.push(new Platform(scrollOffset));
    }
    requestAnimationFrame(animate);
    context.fillStyle = "white";
    context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    platforms.forEach((plat) => plat.draw(context));
    player.update(context, keys);
    calcInteractions(keys, player, platforms, (num) => {
        scrollOffset -= num;
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
