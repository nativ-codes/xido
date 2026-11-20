import { normalizeExtractedData, parseOpenPositions } from '../device';
import { parseTransactionDate } from '../dates';
import { parseTransactions, parseTransactionsForTotalCompanies, parseUserData } from '../parsers';
import { validateColumnTitles } from '../validators';
import { CompanyData, TransactionType } from '@/types';

// Shape of the XTB xlsx "Cash Operations" sheet, read with sheet_to_json({ header: 1, raw: false, defval: '' })
const sheetRows = [
	['Account number', '1234567'],
	['Cash Operations', ''],
	['Date from (UTC)', '2006-01-01 00:00:00'],
	['Date to (UTC)', '2026-10-31 00:14:35'],
	['Type', 'Instrument', 'Ticker', 'Category', 'Time', 'Amount', 'ID', 'Comment', 'Product', 'Position ID'],
	['Withholding tax', 'Realty', 'O.US', 'STOCK', '2026-10-15 10:19:25', '-3.07', '2', 'O.US USD WHT 10%', 'My Trades', ''],
	['Dividend', 'Realty', 'O.US', 'STOCK', '2026-10-15 10:19:25', '30.68', '1', 'O.US USD 0.2715/ SHR', 'My Trades', ''],
	['Free funds interest', '', '', '', '2026-10-03 10:41:37', '1.86', '3', 'Free-funds Interest 2026-09', 'My Trades', ''],
	['Stock purchase', 'Ally Financial', 'ALLY.US', 'STOCK', '2025-09-30 16:19:03', '-424.6', '4', 'OPEN BUY 11/16 @ 38.60', 'My Trades', '9'],
	['Stock purchase', 'Realty', 'O.US', 'STOCK', '2025-04-10 19:28:48', '-1948.68', '5', 'OPEN BUY 36 @ 54.13', 'My Trades', '8'],
	['Total', '', '', '', '', '1496.76', '', '', '', '']
];

describe('XTB xlsx cash operations', () => {
	const rows = normalizeExtractedData(sheetRows) as TransactionType[];

	it('keeps the header first and drops metadata and Total rows', () => {
		expect(validateColumnTitles(rows[0])).toBe(true);
		expect(rows).toHaveLength(6);
		expect(normalizeExtractedData([['Account number', '1']])).toEqual([]);
	});

	it('parses ISO dates, keeping the DD.MM.YYYY display format', () => {
		expect(parseTransactionDate('2026-10-15 10:19:25')).toMatchObject({ day: 15, month: 10, year: 2026, displayDate: '15.10.2026' });
	});

	it('summarises per company', () => {
		expect(parseTransactionsForTotalCompanies(rows)).toEqual(['O', 'ALLY']);

		const { companies, summary } = parseTransactions(rows.slice(1));
		expect(companies.O.summary).toMatchObject({ shares: 36, dividends: 30.68, withholdingTax: -3.07, boughtValue: -1948.68 });
		// "11/16" is a partial fill: 11 of 16 shares
		expect(companies.ALLY.summary.shares).toBe(11);
		expect(summary.freeFundsInterest).toBe(1.86);
	});

	it('shows 0% profit for a near-zero cost (spin-off shares booked at 0.01), like XTB', () => {
		const transactions = parseTransactions(rows.slice(1));
		const company = { symbol: 'O', bid: 59, regularMarketPrice: 60 } as CompanyData;
		expect(parseUserData({ transactions, companies: [company] }).O.summary.profitOrLossPercentage).toBeCloseTo(10.84);

		transactions.companies.O.summary.boughtValue = -0.05;
		expect(parseUserData({ transactions, companies: [company] }).O.summary).toMatchObject({ profitOrLoss: 2159.95, profitOrLossPercentage: 0 });
	});

	it('reads held shares from the Open Positions instrument rows', () => {
		const openPositionRows = [
			['Product', 'Metric', 'Amount', 'Currency'],
			['My Trades', 'Open position value', '51875.15', 'USD'],
			['Product', 'Instrument/Position', 'Ticker', 'Category', 'Type', 'Volume', 'Value'],
			['My Trades', 'Realty', 'O.US', 'STOCK', '', '113', '6433.09'],
			['My Trades', '1101645631', 'O.US', '', 'BUY', '45', '2561.85'],
			['My Trades', 'FedEx Freight Holding', 'FDXF.US', 'STOCK', '', '4.5', '566.24'],
			['My Trades', '2633451462', 'FDXF.US', '', 'BUY', '4.5', '566.24']
		];
		expect(parseOpenPositions(openPositionRows)).toEqual({ O: 113, FDXF: 4.5 });
		expect(parseOpenPositions([])).toEqual({});
	});
});
