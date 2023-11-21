type ImageName = "player" | "background" | "leftBg" | "rightBg";

export const images: Record<ImageName, string> = {
  player:
    "https://steamuserimages-a.akamaihd.net/ugc/3336348870692605210/2DB65000D1AE5B34BCEC2E3E91A27537B3EFC057/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
  background:
    "https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80",
  leftBg:
    "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
  rightBg:
    "https://images.hdqwalls.com/download/nebula-space-scifi-4k-l7-1366x768.jpg",
};

type ColorName =
  | "border"
  | "timerBg"
  | "timerText"
  | "block"
  | "readyBlock"
  | "loseText";

export const colorPalette: Record<ColorName, string> = {
  border: "green",
  timerBg: "black",
  timerText: "white",
  block: "#DE3163",
  readyBlock: "#FF7F50",
  loseText: "red",
}

export const particleColors = [
  "#FFBF00",
  "#DFFF00",
  "#FF7F50",
  "#DE3163",
] as const;
