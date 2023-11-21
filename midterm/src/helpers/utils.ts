import { LostParticle } from "../gameObjects/LostParticle";
import { PLAYER_TOP } from "./constants";
import { Keys } from "./types";

export function addEventListeners(keys: Keys) {
  window.addEventListener("keydown", ({ key }) => {
    if (key === "ArrowRight") keys.right = true;
    if (key === "ArrowLeft") keys.left = true;
    if (key === "Escape") keys.escape = true;
  });

  window.addEventListener("keyup", ({ key }) => {
    if (key === "ArrowRight") keys.right = false;
    if (key === "ArrowLeft") keys.left = false;
  });
}

export function debounceLog(val: any) {
  if (generateRandomInt(0, 100) === 1) {
    console.log(val);
  }
}

export function generateRandomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function createLostParticles(
  context: CanvasRenderingContext2D,
  playerPos: number
): LostParticle[] {
  const particles: LostParticle[] = [];
  for (let i = 0; i < 100; i++) {
    particles.push(
      new LostParticle(
        context,
        playerPos + Math.random() * 30,
        PLAYER_TOP + Math.random() * 30
      )
    );
  }
  return particles;
}
