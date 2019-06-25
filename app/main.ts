import { head } from "ramda";

import plays from "./../data/plays.json";
import invoices from "./../data/invoices.json";
import { Invoice, Plays } from "./models";
import { renderHtml, createStatementData } from "./statement.js";

export function statement(invoices: Invoice[], plays: Plays): string {
  const invoice = head(invoices);

  return renderHtml(createStatementData(invoice, plays));
}
