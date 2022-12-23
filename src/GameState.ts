import { INCREMENT_VALUE, initialKeyStatus } from "./constants.js";
import { makeImage } from "./drawingUtils.js";
import {
  calcPlatColl,
  checkIfCaught,
  updateLiveStatus,
  updateWithPlayer,
} from "./GameStateFunctions.js";
import { Keys } from "./models.js";
import { Opponent } from "./Opponent.js";
import { Platform } from "./Platform.js";
import Player from "./Player.js";
import { Pot } from "./Pot.js";
import { createOpponents, createPlatforms, debounceLog } from "./utils.js";

type winState = "win" | "lose" | "playing";

export class GameState {
  scrollOffset: number;
  winState: winState;
  player: Player;
  platforms: Platform[];
  opponents: Opponent[];
  keys: Keys;
  pot: Pot;
  constructor() {
    this.scrollOffset = 0;
    this.winState = "playing";
    this.keys = initialKeyStatus;
    this.player = new Player();
    this.opponents = createOpponents();
    this.platforms = createPlatforms();
    this.pot = new Pot();
  }

  incrementScrollOffset(num: number) {
    this.scrollOffset -= num;
  }
  setGameState(state: winState) {
    this.winState = state;
  }

  reset() {
    this.setGameState("playing");
    this.scrollOffset = 0;
    this.player = new Player();
    this.opponents = createOpponents();
    this.platforms = createPlatforms();
    this.pot = new Pot();
  }

  calcInteractions() {
    this.platforms.forEach((platform) => {
      this.opponents.forEach((opp) => calcPlatColl(platform, opp));
      calcPlatColl(platform, this.player);
    });

    debounceLog(this.scrollOffset.toString());

    updateWithPlayer(this.keys, this.player, this.scrollOffset, this.platforms);
    updateWithPlayer(this.keys, this.player, this.scrollOffset, this.opponents);
    updateWithPlayer(this.keys, this.player, this.scrollOffset, [this.pot]);

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
    if (
      this.keys.left &&
      this.player.velocity.x === 0 &&
      this.scrollOffset > 0
    ) {
      this.incrementScrollOffset(INCREMENT_VALUE);
    }
  }
}
