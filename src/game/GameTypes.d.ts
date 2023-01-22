export type Round = {
  player: number;
  darts: { multiplier: Multiplier; point: Point }[];
};

export type Multiplier = 1 | 2 | 3;
export type Point = number;
