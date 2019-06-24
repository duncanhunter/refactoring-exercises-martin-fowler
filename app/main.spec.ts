import { head, compose } from "ramda";

import plays from "./../data/plays.json";
import invoices from "./../data/invoices.json";
import { statement } from "./main";
import { Plays, Invoice } from "./models";

test("jest should be configured", () => {
  expect(true).toEqual(true);
});

test("Should print title and customer name", () => {
  const result = statement(invoices as Invoice[], plays as Plays);
  const expected = 
`Statement for BigCo
Hamlet: $650.00 55 seats
As You Like: $580.00 35 seats
Othello: $500.00 40 seats
Amount owed is $1,730.00
You earned 66 credits
`;
  expect(result).toEqual(expected);
});
