import { END_POS, INCREMENT_VALUE, MAX_HEIGHT, MAX_WIDTH, NUM_OPPONENTS, NUM_PLATFORMS, } from "./constants.js";
import { Opponent } from "./Opponent.js";
import { Platform } from "./Platform.js";
export function updateEverything(gameState) {
    const { player, opponents, keys, scrollOffset } = gameState;
    player.update(keys, scrollOffset);
    opponents.forEach((opponent) => opponent.update());
}
export function createPlatforms() {
    return new Array(NUM_PLATFORMS).fill(null).map((_, i) => {
        const sectionY = i % 3 === 0 ? "top" : i % 3 === 1 ? "middle" : "bottom";
        return new Platform(END_POS - i * 150, sectionY);
    });
}
export function createOpponents() {
    return new Array(NUM_OPPONENTS).fill(null).map((_, i) => {
        return new Opponent(generateRandomInt(0, END_POS));
    });
}
export function drawEverything(context, gameState) {
    const { platforms, opponents, player } = gameState;
    context.fillStyle = "white";
    context.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    platforms.forEach((plat) => plat.draw(context));
    opponents.forEach((opponent) => opponent.draw(context));
    player.draw(context);
}
function updateWithPlayer(gameState, objects) {
    const { keys, player } = gameState;
    if (keys.right && player.velocity.x === 0) {
        objects.forEach((object) => {
            object.position.x -= INCREMENT_VALUE;
        });
    }
    if (keys.left && player.velocity.x === 0 && gameState.scrollOffset > 0) {
        objects.forEach((object) => {
            object.position.x += INCREMENT_VALUE;
        });
    }
}
function calcPlatColl(platform, char) {
    if (char.bottomPos <= platform.position.y &&
        char.bottomPos + char.velocity.y >= platform.position.y &&
        char.rightPos >= platform.position.x &&
        char.position.x <= platform.rightPos) {
        char.move("StopY");
        char.position.y = platform.position.y - char.height;
    }
}
export function calcInteractions(gameState) {
    const { platforms, opponents, player, keys } = gameState;
    platforms.forEach((platform) => {
        opponents.forEach((opp) => calcPlatColl(platform, opp));
        calcPlatColl(platform, player);
    });
    updateWithPlayer(gameState, platforms);
    updateWithPlayer(gameState, opponents);
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
export function randomOutOf(max) {
    return generateRandomInt(0, max) === 1;
}
export function debounceLog(val) {
    if (generateRandomInt(0, 100) === 1) {
        console.log(val);
    }
}
