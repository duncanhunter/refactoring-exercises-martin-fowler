import {
  Invoice,
  Play,
  Performance,
  PlayType,
  StatementData,
  EnrichedPerformance,
  Plays
} from "./models";

export function createStatementData(invoice: Invoice, plays: Plays): StatementData {
  const statementData = {} as StatementData;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(statementData => _enrichPerformance(statementData, plays));
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
  const result: EnrichedPerformance = {
    ...aPerformance,
    play: _playFor(aPerformance, plays),
    amount: 0,
    volumeCredits: 0
  };

  return {
    ...result,
    amount: _amountFor(result),
    volumeCredits: _volumeCreditsFor(result)
  };
}

export function _playFor(perf: Performance, plays: Plays): Play {
  return plays[perf.playId];
}

export function _amountFor(aPerformance: EnrichedPerformance): number {
  let result = 0;
  switch (aPerformance.play.type) {
    case PlayType.tragedy:
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case PlayType.comedy:
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${aPerformance.play.type}`);
  }
  return result;
}

export function _volumeCreditsFor(aPerformance: EnrichedPerformance): number {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if (PlayType.comedy) {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result;
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
