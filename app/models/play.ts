export enum PlayType {
  comedy = "comedy",
  tragedy = "tragedy"
}

export enum PlayId {
  hamlet = "hamlet",
  atHello = "atHello",
  asLike = "asLike"
}

export interface Play {
  [key: string]: {
    name: string;
    type: PlayType;
  };
}
