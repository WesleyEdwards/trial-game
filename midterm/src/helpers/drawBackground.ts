import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAY_AREA_START,
  LEFT_EXTRA,
  CANVAS_BORDER,
  PLAY_AREA_END,
} from "./constants";
import { colorPalette, images } from "./drawingHelpers";

const bgImage = (() => {
  const img = new Image();
  img.src = images.background;
  return img;
})();

const bgLeft = (() => {
  const img = new Image();
  img.src = images.leftBg;
  return img;
})();

const bgRight = (() => {
  const img = new Image();
  img.src = images.rightBg;
  return img;
})();

export function drawBackground(
  context: CanvasRenderingContext2D,
  score: number
) {
  context.drawImage(bgRight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.drawImage(bgLeft, 0, 0, PLAY_AREA_START, CANVAS_HEIGHT);

  context.drawImage(
    bgImage,
    PLAY_AREA_START,
    0,
    CANVAS_WIDTH - 2 * LEFT_EXTRA,
    CANVAS_HEIGHT
  );

  context.fillStyle = colorPalette.timerBg;
  context.fillRect(PLAY_AREA_END + 20, 20, 120, 50);

  context.fillStyle = colorPalette.timerText;
  context.font = "30px Arial";

  context.fillText(`Score: ${score}`, PLAY_AREA_END + 25, 60, 100);
}

export function drawPlayBorder(context: CanvasRenderingContext2D) {
  context.strokeStyle = colorPalette.border;
  context.lineWidth = CANVAS_BORDER;
  context.strokeRect(
    PLAY_AREA_START,
    0,
    CANVAS_WIDTH - PLAY_AREA_START * 2,
    CANVAS_HEIGHT
  );
}
