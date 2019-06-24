import test from "ava";
import { head } from "ramda";

import plays from "./../data/plays.json";
import invoices from "./../data/invoices.json";
import { statement } from "./main";
import { Play, Invoice } from "./models";

test("ava should be configured", t => {
  t.deepEqual(true, true);
});

test("Should print title and customer name", t => {
  const invoice = head(invoices) as Invoice;
  const expected = statement(invoice as Invoice, plays as Play);
  const value = `Statement for ${invoice.customer}\n`; //?
  t.is(value, expected);
});
