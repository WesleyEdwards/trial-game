import { Player } from "./Player.js";
import { Platform } from "./Platform.js";
import { calcInteractions, initialKeyStatus } from "./utils.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

export const MAX_WIDTH = 1024;
export const MAX_HEIGHT = 576;

canvas.width = MAX_WIDTH;
canvas.height = MAX_HEIGHT;

export const PLAT_FREQUENCY = 500;

const keys = initialKeyStatus;

const player = new Player();

let scrollOffset = 0;
let scrollDiff = 0;

const platforms = [
  new Platform(scrollOffset, "start", 100),
  new Platform(scrollOffset, "bottom", 300),
  new Platform(scrollOffset, "bottom", 600),
  new Platform(scrollOffset, "bottom", 1000),
];

function animate() {
  if (!context) throw new Error("Context is null");

  if (scrollOffset - scrollDiff > PLAT_FREQUENCY) {
    scrollDiff = scrollOffset;
    platforms.push(new Platform(scrollOffset, "top"));
    platforms.push(new Platform(scrollOffset, "middle"));
    platforms.push(new Platform(scrollOffset, "bottom"));
  }

  requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

  platforms.forEach((plat) => plat.draw(context));
  player.update(context, keys);

  calcInteractions(keys, player, platforms, (num: number) => {
    scrollOffset -= num;
  });
}

animate();

addEventListener("keydown", ({ code }) => {
  if (code === "ArrowUp") keys.up = true;
  if (code === "ArrowRight") keys.right = true;
  if (code === "ArrowLeft") keys.left = true;
  if (code === "Space") keys.space = true;
});

addEventListener("keyup", ({ code }) => {
  if (code === "ArrowUp") keys.up = false;
  if (code === "ArrowRight") keys.right = false;
  if (code === "ArrowLeft") keys.left = false;
  if (code === "Space") keys.space = false;
});
