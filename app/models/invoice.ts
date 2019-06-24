import { PlayId } from "./play";

export interface Invoice {
    customer: string;
    performances: Performance[]
}

export interface Performance {
    playId: PlayId;
    audience: number;
}