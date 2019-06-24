export enum PlayType {
  comdey = "comdey",
  tragedy = "tragedy"
}

export enum Plays {
  hamlet = "hamlet",
  athello = "athello",
  asLike = "asLike"
}

export interface Play {
  [key: string]: {
    name: Plays;
    type: PlayType;
  };
}
