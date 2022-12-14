export type PlayerAction =
  | "MoveRight"
  | "MoveLeft"
  | "Jump"
  | "Duck"
  | "StopX"
  | "StopY";

export interface Coordinates {
  x: number;
  y: number;
}

export interface hasPosition {
  position: Coordinates;
}

export interface Character {
  position: Coordinates;
  velocity: Coordinates;
  bottomPos: number;
  rightPos: number;
  height: number;
  move: (action: PlayerAction) => void;
}

export interface Keys {
  up: boolean;
  right: boolean;
  left: boolean;
  space: boolean;
}

export interface GameStats {
  level: number;
  score: number;
  lives: number;
}

export interface StatsHTML {
  level: HTMLElement;
  lives: HTMLElement;
  score: HTMLElement;
}