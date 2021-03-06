import plays from "./../data/plays.json";
import invoices from "./../data/invoices.json";
import { statement } from "./main";
import { Play, Invoice, PlayId } from "./models";

test("jest should be configured", () => {});

test("Should print title and customer name", () => {
  const result = statement(invoices as Invoice[], plays as Play);
  expect(result).toMatchInlineSnapshot(`
    "Statement for BigCo
    Hamlet: $650.00 55 seats
    As You Like: $580.00 35 seats
    Othello: $500.00 40 seats
    Amount owed is $1,730.00
    You earned 66 credits
    "
  `);
});

test("Should charge for one play", () => {
  const testInvoices: Invoice[] = [
    { ...invoices[0], performances: [{ playId: PlayId.asLike, audience: 10 }] },
  ];
  const result = statement(testInvoices, plays as Play);
  expect(result).toMatchInlineSnapshot(`
    "Statement for BigCo
    As You Like: $330.00 10 seats
    Amount owed is $330.00
    You earned 2 credits
    "
  `);
});
