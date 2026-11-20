import * as XLSX from 'xlsx';
import { normalizeExtractedData, parseOpenPositions } from '../device';
import { parseTransactions, parseTransactionsForTotalCompanies } from '../parsers';
import { validateColumnTitles } from '../validators';
import { CASH_OPERATION, OPEN_POSITIONS } from '@/common/constants';
import { TransactionType } from '@/types';

// The demo export shipped for App Store review (scripts/generate-demo-portfolio.js), read the way the app reads uploads (jest runs from the project root)
const workbook = XLSX.readFile('demo/XTB_demo_portfolio.xlsx');
const getSheetRows = (name: string): string[][] => XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, raw: false, defval: '' });

const rows = normalizeExtractedData(getSheetRows(CASH_OPERATION)) as TransactionType[];
const openPositions = parseOpenPositions(getSheetRows(OPEN_POSITIONS));
const { companies } = parseTransactions(rows.slice(1));
const tickers = ['AAPL', 'MSFT', 'JNJ', 'KO', 'PEP', 'PG', 'O', 'JPM', 'XOM', 'VZ', 'ABBV', 'MCD', 'HD', 'NKE', 'AMZN'];

describe('demo XTB portfolio', () => {
	it('is accepted by the upload screen', () => {
		expect(validateColumnTitles(rows[0])).toBe(true);
		expect(parseTransactionsForTotalCompanies(rows).sort()).toEqual([...tickers].sort());
	});

	it('has the same shares in Cash Operations and Open Positions', () => {
		tickers.forEach((ticker) => expect([ticker, companies[ticker].summary.shares]).toEqual([ticker, openPositions[ticker]]));
	});

	it('has the same cost in Cash Operations and Open Positions', () => {
		const instrumentRows = getSheetRows(OPEN_POSITIONS).filter((row) => row[3] === 'STOCK');
		instrumentRows.forEach(([, , ticker, , , volume, , , openPrice]) => {
			const symbol = ticker.split('.')[0];
			// Open Positions shows the average open price rounded to cents
			expect(Math.abs(companies[symbol].summary.boughtValue)).toBeCloseTo(parseFloat(volume) * parseFloat(openPrice), -1);
		});
	});

	it('pays dividends, net of withholding tax, for every company except Amazon', () => {
		tickers.forEach((ticker) => {
			const { dividends, withholdingTax } = companies[ticker].summary;
			if (ticker === 'AMZN') return expect(dividends).toBe(0);
			expect(dividends).toBeGreaterThan(0);
			expect(withholdingTax).toBeCloseTo(-dividends * 0.15, 0);
		});
	});
});
