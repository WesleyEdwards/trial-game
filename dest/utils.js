import { MAX_HEIGHT, MAX_WIDTH } from "./constants.js";
import { Platform } from "./Platform.js";
const NUM_PLATFORMS = 30;
const END_POS = 4500;
const INCREMENT_VALUE = 5;
export const initialKeyStatus = {
    up: false,
    right: false,
    left: false,
    space: false,
};
export function createPlatforms() {
    return new Array(NUM_PLATFORMS).fill(null).map((_, i) => {
        const sectionY = i % 3 === 0 ? "top" : i % 3 === 1 ? "middle" : "bottom";
        return new Platform(END_POS - i * 150, sectionY);
    });
}
export function drawEverything(context, platforms, player) {
    context.fillStyle = "white";
    context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    platforms.forEach((plat) => plat.draw(context));
    player.draw(context);
}
export function calcInteractions(keys, player, platforms, gameState) {
    platforms.forEach((platform) => {
        if (player.bottomPos <= platform.position.y &&
            player.bottomPos + player.velocity.y >= platform.position.y &&
            player.rightPos >= platform.position.x &&
            player.position.x <= platform.rightPos) {
            player.move("StopY");
            player.position.y = platform.position.y - player.height;
        }
        if (keys.right && player.velocity.x === 0) {
            platform.position.x -= INCREMENT_VALUE;
        }
        if (keys.left && player.velocity.x === 0 && gameState.scrollOffset > 0) {
            platform.position.x += INCREMENT_VALUE;
        }
    });
    if (keys.right && player.velocity.x === 0) {
        gameState.incrementScrollOffset(-INCREMENT_VALUE);
    }
    if (keys.left && player.velocity.x === 0 && gameState.scrollOffset > 0) {
        gameState.incrementScrollOffset(INCREMENT_VALUE);
    }
}
export function generateRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}
