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
        if (distBetween < playerConstants.radius * 3 && knifeStatus(player, opp)) {
            return opp;
        }
        return undefined;
    });
}
