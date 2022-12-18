import { INCREMENT_VALUE, playerConstants } from "./constants.js";
export function updateWithPlayer(keys, player, scrollOffset, objects) {
    if (keys.right && player.velocity.x === 0) {
        objects.forEach((object) => {
            object.position.x -= INCREMENT_VALUE;
        });
    }
    if (keys.left && player.velocity.x === 0 && scrollOffset > 0) {
        objects.forEach((object) => {
            object.position.x += INCREMENT_VALUE;
        });
    }
}
export function calcPlatColl(platform, char) {
    if (char.bottomPos <= platform.position.y &&
        char.bottomPos + char.velocity.y >= platform.position.y &&
        char.rightPos >= platform.position.x &&
        char.position.x <= platform.rightPos) {
        char.move("StopY");
        char.position.y = platform.position.y - char.height;
    }
}
export function checkIfCaught(player, opponents) {
    let caught = false;
    opponents.forEach((opp) => {
        const distBetween = Math.sqrt(Math.pow(opp.position.x - player.position.x, 2) +
            Math.pow(opp.position.y - player.position.y, 2));
        if (distBetween < playerConstants.radius * 2) {
            caught = true;
        }
    });
    return caught;
}
