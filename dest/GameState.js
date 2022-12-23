import { INCREMENT_VALUE, initialKeyStatus } from "./constants.js";
import { calcPlatColl, checkIfCaught, updateLiveStatus, updateWithPlayer, } from "./GameStateFunctions.js";
import Player from "./Player.js";
import { createOpponents, createPlatforms } from "./utils.js";
export class GameState {
    constructor() {
        this.scrollOffset = 0;
        this.winState = "playing";
        this.keys = initialKeyStatus;
        this.player = new Player();
        this.opponents = createOpponents();
        this.platforms = createPlatforms();
    }
    incrementScrollOffset(num) {
        this.scrollOffset -= num;
    }
    setGameState(state) {
        this.winState = state;
    }
    reset() {
        this.setGameState("playing");
        this.scrollOffset = 0;
        this.player = new Player();
        this.opponents = createOpponents();
        this.platforms = createPlatforms();
    }
    calcInteractions() {
        this.platforms.forEach((platform) => {
            this.opponents.forEach((opp) => calcPlatColl(platform, opp));
            calcPlatColl(platform, this.player);
        });
        updateWithPlayer(this.keys, this.player, this.scrollOffset, this.platforms);
        updateWithPlayer(this.keys, this.player, this.scrollOffset, this.opponents);
        const remove = updateLiveStatus(this.player, this.opponents);
        if (remove !== undefined) {
            this.opponents.splice(this.opponents.indexOf(remove), 1);
        }
        if (checkIfCaught(this.player, this.opponents)) {
            this.setGameState("lose");
        }
        if (this.keys.right && this.player.velocity.x === 0) {
            this.incrementScrollOffset(-INCREMENT_VALUE);
        }
        if (this.keys.left &&
            this.player.velocity.x === 0 &&
            this.scrollOffset > 0) {
            this.incrementScrollOffset(INCREMENT_VALUE);
        }
    }
}
