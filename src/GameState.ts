import { initialKeyStatus, Keys } from "./constants.js";
import { Opponent } from "./Opponent.js";
import { Platform } from "./Platform.js";
import Player from "./Player.js";
import { createOpponents, createPlatforms } from "./utils.js";

export class GameState {
  scrollOffset: number;
  winState: boolean;
  player: Player;
  platforms: Platform[];
  opponents: Opponent[];
  keys: Keys;
  constructor() {
    this.scrollOffset = 0;
    this.winState = false;
    this.keys = initialKeyStatus;
    this.player = new Player();
    this.opponents = createOpponents();
    this.platforms = createPlatforms();
  }

  incrementScrollOffset(num: number) {
    this.scrollOffset -= num;
  }
}
