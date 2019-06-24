import { head, add } from "ramda";

import plays from "./../data/plays.json";
import invoices from "./../data/invoices.json";
import { Invoice, Play, Plays, Performance, PlayType } from "./models";

// const invoices =
export function statement(invoices: Invoice[], plays: Plays): string {
  const invoice = head(invoices);
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    volumeCredits += _volumeCreditsFor(perf);

    // print line for this order
    result += `${_playFor(perf).name}: ${format(_amountFor(perf) / 100)} ${
      perf.audience
    } seats\n`;
    totalAmount += _amountFor(perf);
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

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
