import { initialKeyStatus } from "./constants.js";
import Player from "./Player.js";
import { createOpponents, createPlatforms } from "./utils.js";
export class GameState {
    constructor() {
        this.scrollOffset = 0;
        this.winState = false;
        this.keys = initialKeyStatus;
        this.player = new Player();
        this.opponents = createOpponents();
        this.platforms = createPlatforms();
    }
    incrementScrollOffset(num) {
        this.scrollOffset -= num;
    }
}
