export enum PlayType {
  comedy = "comedy",
  tragedy = "tragedy"
}

export enum PlayId {
  hamlet = "hamlet",
  atHello = "atHello",
  asLike = "asLike"
}

export interface Plays {
  [key: string]: {
    name: string;
    type: PlayType;
  };
}

export interface Play {
  name: string;
  type: PlayType;
}
