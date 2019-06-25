import { head, compose } from "ramda";

import plays from "./../data/plays.json";
import invoices from "./../data/invoices.json";
import { statement } from "./main";
import { _totalAmount, _totalVoulmeCredits } from "./statement";
import { Plays, Invoice, EnrichedPerformance } from "./models";

test("jest should be configured", () => {
  expect(true).toEqual(true);
});

test("Should print title and customer name", () => {
  const result = statement(invoices as Invoice[], plays as Plays);
  const expected = `<h1>Statement for BigCo</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
  <tr><td>As You Like</td><td>35</td><td>$580.00</td></tr>
  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
</table>
<p>Amount owed is <em>$1,730.00</em></p>
<p>You earned <em>66</em> credits</p>
`;
  expect(result).toEqual(expected);
});

test("_totalAmount", () => {
  const invoice = head(invoices);
  const enrichedPerformance = {
    performances: [{ amount: 1 }, { amount: 1 }, { amount: 1 }]
  };
  const result = _totalAmount(enrichedPerformance as any);
  const expected = 3;
  expect(result).toEqual(expected);
});

test("_totalVolumeCredits", () => {
  const invoice = head(invoices);
  const enrichedPerformance = {
    performances: [
      { volumeCredits: 1 },
      { volumeCredits: 1 },
      { volumeCredits: 1 }
    ]
  };
  const result = _totalVoulmeCredits(enrichedPerformance as any);
  const expected = 3;
  expect(result).toEqual(expected);
});
