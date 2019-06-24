import { head, add } from "ramda";

import plays from "./../data/plays.json";
import invoices from "./../data/invoices.json";
import { Invoice, Play, Plays, Performance, PlayType } from "./models";

export function statement(invoices: Invoice[], plays: Plays): string {
  const invoice = head(invoices);
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += `${_playFor(perf).name}: ${usd(_amountFor(perf))} ${
      perf.audience
    } seats\n`;
  }

  result += `Amount owed is ${usd(_totalAmount())}\n`;
  result += `You earned ${_totalVoulmeCredits()} credits\n`;
  return result;

  function _totalAmount(): number {
    let result = 0;
    for (let perf of invoice.performances) {
      result += _amountFor(perf);
    }
    return result;
  }

  function _totalVoulmeCredits(): number {
    let result = 0;
    for (let perf of invoice.performances) {
      result += _volumeCreditsFor(perf);
    }
    return result;
  }

  function usd(aNumber: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100);
  }

  function _volumeCreditsFor(aPerformance: Performance): number {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if (PlayType.comedy) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

  function _playFor(perf: Performance): Play {
    return plays[perf.playId];
  }

  function _amountFor(aPerformance: Performance): number {
    let result = 0;
    switch (_playFor(aPerformance).type) {
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
        throw new Error(`unknown type: ${_playFor(aPerformance).type}`);
    }
    return result;
  }
}
