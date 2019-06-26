import {
  Invoice,
  Play,
  Performance,
  PlayType,
  StatementData,
  EnrichedPerformance,
  Plays
} from "./models";
import construct from "ramda/es/construct";
import { tsConstructorType } from "@babel/types";

export function createStatementData(
  invoice: Invoice,
  plays: Plays
): StatementData {
  const statementData = {} as StatementData;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(statementData =>
    _enrichPerformance(statementData, plays)
  );
  statementData.totalVolumeCredits = _totalVoulmeCredits(statementData);
  statementData.totalAmount = _totalAmount(statementData);
  return statementData;
}

export function renderHtml(data: StatementData): string {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${_usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${_usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

export function _enrichPerformance(
  aPerformance: Performance,
  plays: Plays
): EnrichedPerformance {
  const calculator = _creatPerformanceCalculator(
    aPerformance,
    _playFor(aPerformance, plays)
  );
  const result: EnrichedPerformance = {
    ...aPerformance,
    play: calculator.play,
    amount: calculator.amount,
    volumeCredits: calculator.volumeCredits
  };

  return result;
}

export function _creatPerformanceCalculator(
  aPerformance: Performance,
  aPlay: Play
) {
  switch (aPlay.type) {
    case PlayType.tragedy:
      return new TagedyCalculator(aPerformance, aPlay);
    case PlayType.comedy:
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}
export class PerformanceCalculator {
  constructor(public performance: Performance, public play: Play) {}

  get volumeCredits(): number {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TagedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits(): number {
    return Math.floor(this.performance.audience / 5);
  }
}

export function _playFor(perf: Performance, plays: Plays): Play {
  return plays[perf.playId];
}

export function _totalVoulmeCredits(data: StatementData): number {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

export function _totalAmount(data: StatementData): number {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

export function _usd(aNumber: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
}
