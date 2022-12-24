import { INCREMENT_VALUE, MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH, playerConstants, } from "./constants.js";
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
    return opponents.some((opp) => {
        const distBetween = Math.sqrt(Math.pow(opp.position.x - player.position.x, 2) +
            Math.pow(opp.position.y - player.position.y, 2));
        if (distBetween < playerConstants.radius * 2) {
            return true;
        }
        return false;
    });
}
function knifeStatus(player, opp) {
    if (!player.shanking)
        return false;
    if (player.facing === "right" && player.position.x < opp.position.x)
        return true;
    if (player.facing === "left" && player.position.x > opp.position.x)
        return true;
    return false;
}
export function updateLiveStatus(player, opponents) {
    return opponents.find((opp) => {
        const distBetween = Math.sqrt(Math.pow(opp.position.x - player.position.x, 2) +
            Math.pow(opp.position.y - player.position.y, 2));
        if (distBetween < playerConstants.radius * 4 && knifeStatus(player, opp)) {
            return opp;
        }
        return undefined;
    });
}
export function drawComponents(context, platforms, opponents, player, pot) {
    context.fillStyle = "white";
    context.fillRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
    platforms.forEach((plat) => plat.draw(context));
    opponents.forEach((opponent) => opponent.draw(context));
    player.draw(context);
    pot.draw(context);
}
