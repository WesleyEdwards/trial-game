export class GameState {
    constructor() {
        this.scrollOffset = 0;
        this.winState = false;
    }
    incrementScrollOffset(num) {
        this.scrollOffset -= num;
    }
}
