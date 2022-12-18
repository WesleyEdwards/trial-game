import { INCREMENT_VALUE, initialKeyStatus } from "./constants.js";
import { calcPlatColl, checkIfCaught, updateWithPlayer, } from "./GameStateFunctions.js";
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
    calcInteractions() {
        this.platforms.forEach((platform) => {
            this.opponents.forEach((opp) => calcPlatColl(platform, opp));
            calcPlatColl(platform, this.player);
        });
        updateWithPlayer(this.keys, this.player, this.scrollOffset, this.platforms);
        updateWithPlayer(this.keys, this.player, this.scrollOffset, this.opponents);
        if (checkIfCaught(this.player, this.opponents)) {
            console.log("caught");
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
