import { emptyStats, INCREMENT_VALUE, initialKeyStatus } from "./constants.js";
import { calcPlatColl, checkIfCaught, updateLiveStatus, updateWithPlayer, } from "./GameStateFunctions.js";
import Player from "./Player.js";
import { Pot } from "./Pot.js";
import { createOpponents, createPlatforms } from "./utils.js";
export class GameState {
    constructor() {
        this.scrollOffset = 0;
        this.winState = "playing";
        this.keys = initialKeyStatus;
        this.player = new Player();
        this.opponents = createOpponents();
        this.platforms = createPlatforms();
        this.pot = new Pot();
        this.stats = emptyStats;
    }
    incrementScrollOffset(num) {
        this.scrollOffset -= num;
    }
    setGameState(state) {
        this.winState = state;
    }
    reset(all) {
        this.setGameState("playing");
        this.scrollOffset = 0;
        this.player = new Player();
        this.opponents = createOpponents();
        this.platforms = createPlatforms();
        this.pot = new Pot();
        if (all) {
            this.stats = emptyStats;
        }
    }
    enterGame() {
        this.reset(true);
    }
    nextLevel() {
        this.stats.level++;
        this.stats.score += 100;
        this.reset();
    }
    handleLose() {
        this.setGameState("lose");
    }
    handleLoseLife() {
        this.stats.lives--;
        this.reset();
        if (this.stats.lives === 0) {
            this.handleLose();
        }
    }
    calcInteractions() {
        this.platforms.forEach((platform) => {
            this.opponents.forEach((opp) => calcPlatColl(platform, opp));
            calcPlatColl(platform, this.player);
        });
        updateWithPlayer(this.keys, this.player, this.scrollOffset, this.platforms);
        updateWithPlayer(this.keys, this.player, this.scrollOffset, this.opponents);
        updateWithPlayer(this.keys, this.player, this.scrollOffset, [this.pot]);
        const removeOpp = updateLiveStatus(this.player, this.opponents);
        if (removeOpp !== undefined) {
            this.opponents.splice(this.opponents.indexOf(removeOpp), 1);
        }
        if (checkIfCaught(this.player, this.opponents)) {
            this.handleLoseLife();
        }
        if (this.player.position.x > this.pot.position.x) {
            this.nextLevel();
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
