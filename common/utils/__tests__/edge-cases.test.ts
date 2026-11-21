import * as XLSX from 'xlsx';
import { normalizeExtractedData, parseOpenPositions } from '../device';
import { getSymbol } from '../misc';
import { applyOpenPositions, parseTransactions, parseTransactionsForTotalCompanies, parseUnsupportedTickers, parseUserData } from '../parsers';
import { CASH_OPERATION, OPEN_POSITIONS } from '@/common/constants';
import { CompanyData, TransactionType } from '@/types';

// demo/XTB_edge_cases.xlsx (scripts/generate-demo-portfolio.js): sells, a split, closed positions, odd and unknown tickers
const workbook = XLSX.readFile('demo/XTB_edge_cases.xlsx');
const getSheetRows = (name: string): string[][] => XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, raw: false, defval: '' });

const rows = normalizeExtractedData(getSheetRows(CASH_OPERATION)) as TransactionType[];
const openPositions = parseOpenPositions(getSheetRows(OPEN_POSITIONS));
const transactions = parseTransactions(rows.slice(1));
applyOpenPositions(transactions.companies, openPositions);
const { companies } = transactions;

describe('XTB edge cases', () => {
	it('keeps the full ticker and drops only the market suffix', () => {
		expect(getSymbol('AAPL.US')).toBe('AAPL');
		expect(getSymbol('BRK.B.US')).toBe('BRK-B');
		expect(getSymbol(' O.US ')).toBe('O');
		expect(getSymbol(undefined)).toBe('');
		expect(parseTransactionsForTotalCompanies(rows)).toContain('BRK-B');
	});

	it('skips non-US shares (only US is supported) and reports them', () => {
		expect(getSymbol('VOD.UK')).toBe('');
		expect(getSymbol('SAP.DE')).toBe('');
		expect(getSymbol('AAPL')).toBe('');
		expect(parseUnsupportedTickers(rows).sort()).toEqual(['SAP.DE', 'VOD.UK']);
		expect(parseTransactionsForTotalCompanies(rows)).not.toContain('SAP');
		expect(Object.keys(companies)).not.toContain('VOD');
		expect(Object.keys(openPositions)).not.toContain('');
	});

	it('takes the cost of what is still held from Open Positions, so sales reduce it', () => {
		// Partial sell of the oldest lot (FIFO): 4 of the first 10 at 187.20, 5 at 209.30, 4 at 256.50
		expect(companies.AAPL.summary).toMatchObject({ shares: 13, boughtValue: -(4 * 187.2 + 5 * 209.3 + 4 * 256.5) });
		// Sold the first lot at a loss, the second is still open
		expect(companies.INTC.summary).toMatchObject({ shares: 20, boughtValue: -678 });
		// Sold everything, then bought again: only the new lot counts
		expect(companies.KO.summary).toMatchObject({ shares: 15, boughtValue: -1056 });
	});

	it('counts split shares from Open Positions', () => {
		// 3 bought before the 10:1 split + 10 after; cash operations alone only see 13
		expect(companies.NVDA.summary).toMatchObject({ shares: 40, boughtValue: -(3 * 852.4 + 10 * 140.8) });
	});

	it('treats fully sold companies as not held', () => {
		expect(openPositions.TSLA).toBeUndefined();
		expect(companies.TSLA.summary).toMatchObject({ shares: 0, boughtValue: -0 });
	});

	it('values only the companies the quote API knows', () => {
		// FAKECO, ZZZQ, SIVB (delisted) get no quote; an unexpected symbol in the response must not crash
		const quote = (symbol: string, regularMarketPrice: number) => ({ symbol, regularMarketPrice, currency: 'USD' }) as CompanyData;
		const userData = parseUserData({ transactions, companies: [quote('AAPL', 300), quote('KO', 70), quote('NOT-HELD', 1)] });

		expect(Object.keys(userData)).toEqual(['AAPL', 'KO']);
		expect(userData.AAPL.summary).toMatchObject({ marketValue: 3900, weight: (3900 / (3900 + 1050)) * 100 });
	});
});
