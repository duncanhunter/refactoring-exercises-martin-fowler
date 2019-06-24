import plays from './../data/plays.json'
import invoice from './../data/invoices.json'
import { Invoice, Play } from './models';


export function statement (invoice: Invoice, plays: Play) {
    let totalAmount = 0;
    let voumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    return result;
}