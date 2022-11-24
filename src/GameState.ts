export class GameState {
  scrollOffset: number;
  winState: boolean;
  constructor() {
    this.scrollOffset = 0;
    this.winState = false;
  }

  incrementScrollOffset(num: number) {
    this.scrollOffset -= num;
  }
}
