import { PlayId, Play } from "./play";

export interface Invoice {
  customer: string;
  performances: Performance[];
}

export interface Performance {
  playId: PlayId;
  audience: number;
}

export interface StatementData {
  customer: string;
  performances: EnrichedPerformance[];
  totalVolumeCredits: number;
  totalAmount: number;
}

export interface EnrichedPerformance extends Performance {
  play: Play;
  amount: number;
  volumeCredits: number;
}
