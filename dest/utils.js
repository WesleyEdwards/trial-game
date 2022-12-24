import { END_POS, listOfColors, MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH, oppPerLevel, NUM_PLATFORMS, oppSpeedBase, } from "./constants.js";
import { Opponent } from "./Opponent.js";
import { Platform } from "./Platform.js";
export function createPlatforms(level) {
    const platColor = listOfColors[(level - 1) % listOfColors.length];
    return new Array(NUM_PLATFORMS).fill(null).map((_, i) => {
        const sectionY = i % 3 === 0 ? "top" : i % 3 === 1 ? "middle" : "bottom";
        return new Platform(END_POS - i * 150, sectionY, platColor);
    });
}
export function createOpponents(level) {
    const moveSpeed = oppSpeedBase + level * 0.3;
    return new Array(oppPerLevel * level)
        .fill(null)
        .map(() => new Opponent(generateRandomInt(500, END_POS), moveSpeed));
}
export function drawEverything(context, gameState) {
    const { platforms, opponents, player, pot } = gameState;
    context.fillStyle = "white";
    context.fillRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
    platforms.forEach((plat) => plat.draw(context));
    opponents.forEach((opponent) => opponent.draw(context));
    player.draw(context);
    pot.draw(context);
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
