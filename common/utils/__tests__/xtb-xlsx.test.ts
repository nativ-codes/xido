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

	it('reads held shares and their cost from the Open Positions instrument rows', () => {
		// Real XTB rows (columns after Gross Profit trimmed)
		const header = ['Product', 'Instrument/Position', 'Ticker', 'Category', 'Type', 'Volume', 'Value', 'Current price', 'Open price', 'Open time (UTC)', 'Stop Loss', 'Take Profit', 'Net Profit %', 'Net Profit', 'Gross Profit'];
		const openPositionRows = [
			['Product', 'Metric', 'Amount', 'Currency'],
			['My Trades', 'Open position value', '51875.15', 'USD'],
			header,
			['My Trades', 'Realty', 'O.US', 'STOCK', '', '113', '6433.09', '', '55.22', '', '', '', '3.11', '193.76', '193.76'],
			['My Trades', '1101645631', 'O.US', '', 'BUY', '45', '2561.85', '56.93', '50.53', '2023-10-06 18:41:15', '', '', '12.67', '288', '288'],
			['My Trades', 'Berkshire Hathaway B', 'BRK.B.US', 'STOCK', '', '2', '992.4', '', '454.7', '', '', '', '9.13', '83', '83']
		];
		expect(parseOpenPositions(openPositionRows)).toEqual({ O: { shares: 113, cost: 6239.33 }, 'BRK-B': { shares: 2, cost: 909.4 } });
		expect(parseOpenPositions([])).toEqual({});
	});
});
