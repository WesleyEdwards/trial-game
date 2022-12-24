import { emptyStats, INCREMENT_VALUE, initialKeyStatus } from "./constants.js";
import { calcPlatColl, checkIfCaught, updateLiveStatus, updateWithPlayer, } from "./GameStateFunctions.js";
import Player from "./Player.js";
import { Pot } from "./Pot.js";
import { createOpponents, createPlatforms } from "./utils.js";
export class GameState {
    constructor(statsHTML) {
        this.scrollOffset = 0;
        this.winState = "playing";
        this.keys = initialKeyStatus;
        this.player = new Player();
        this.opponents = createOpponents(1);
        this.platforms = createPlatforms(1);
        this.pot = new Pot();
        this.stats = Object.assign({}, emptyStats);
        this.statsHTML = statsHTML;
    }
    incrementScrollOffset(num) {
        this.scrollOffset -= num;
    }
    setGameState(state) {
        this.winState = state;
    }
    reset(all) {
        if (all) {
            this.stats = Object.assign({}, emptyStats);
            this.drawStats();
        }
        this.setGameState("playing");
        this.scrollOffset = 0;
        this.player = new Player();
        this.opponents = createOpponents(this.stats.level);
        this.platforms = createPlatforms(this.stats.level);
        this.pot = new Pot();
    }
    nextLevel() {
        this.stats.level++;
        this.stats.score += 100;
        this.reset();
        this.drawStats();
    }
    handleLose() {
        this.setGameState("lose");
        this.drawStats();
    }
    handleLoseLife() {
        this.stats.lives--;
        this.reset();
        if (this.stats.lives === 0) {
            this.handleLose();
        }
    }
    killOpponent(opp) {
        this.stats.score += 10;
        this.opponents.splice(this.opponents.indexOf(opp), 1);
        this.drawStats();
    }
    enterGame() {
        this.reset(true);
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
        removeOpp && this.killOpponent(removeOpp);
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
    drawStats() {
        this.statsHTML.level.innerHTML = `Level: ${this.stats.level}`;
        this.statsHTML.score.innerHTML = `Score: ${this.stats.score}`;
        this.statsHTML.lives.innerHTML = `Lives: ${this.stats.lives}`;
    }
    getScrollOffset() {
        return this.scrollOffset;
    }
}
