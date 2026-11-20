// Builds demo/XTB_demo_portfolio.xlsx: a fictional XTB "Cash Operations / Open Positions / Closed Positions" export
// for testing and App Store review. Same sheet layout as a real XTB xlsx export. Run: node scripts/generate-demo-portfolio.js
const path = require('path');
const XLSX = require('xlsx');

const ACCOUNT = '1000001';
const REPORT_DATE = new Date(Date.UTC(2026, 10, 15, 9, 30, 0));
const WHT = 0.15;
const DATE_FORMAT = 'yyyy-mm-dd hh:mm:ss';

// [ticker, instrument, dividend per share, pay months (1-12, [] = no dividend), price at report time, buys: [date, shares, price]]
const COMPANIES = [
	['AAPL', 'Apple', 0.25, [2, 5, 8, 11], 268.4, [['2024-02-12', 10, 187.2], ['2025-04-08', 5, 172.4]]],
	['MSFT', 'Microsoft', 0.83, [3, 6, 9, 12], 509.8, [['2024-03-05', 4, 402.1], ['2025-08-11', 2, 522.3]]],
	['JNJ', 'Johnson & Johnson', 1.24, [3, 6, 9, 12], 194.6, [['2024-05-14', 12, 151.8]]],
	['KO', 'Coca-Cola', 0.51, [4, 7, 10, 12], 70.2, [['2024-01-22', 30, 60.1], ['2025-02-18', 20, 68.9]]],
	['PEP', 'PepsiCo', 1.355, [1, 3, 6, 9], 149.7, [['2024-06-10', 10, 166.5], ['2025-06-23', 8, 131.2]]],
	['PG', 'Procter & Gamble', 1.0568, [2, 5, 8, 11], 150.3, [['2024-04-16', 12, 158.4]]],
	['O', 'Realty', 0.2685, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 57.4, [['2024-02-26', 60, 52.3], ['2024-11-12', 40, 56.1], ['2025-09-15', 30, 58.4]]],
	['JPM', 'JPMorgan Chase', 1.4, [1, 4, 7, 10], 301.5, [['2024-07-09', 8, 205.7]]],
	['XOM', 'Exxon Mobil', 0.99, [3, 6, 9, 12], 117.3, [['2024-09-03', 15, 115.6]]],
	['VZ', 'Verizon', 0.6775, [2, 5, 8, 11], 40.1, [['2024-03-18', 40, 40.2], ['2025-01-13', 25, 38.9]]],
	['ABBV', 'AbbVie', 1.64, [2, 5, 8, 11], 224.8, [['2024-10-21', 10, 190.4]]],
	['MCD', "McDonald's", 1.77, [3, 6, 9, 12], 300.6, [['2025-03-10', 6, 305.2]]],
	['HD', 'Home Depot', 2.3, [3, 6, 9, 12], 359.9, [['2024-08-19', 5, 362.8]]],
	['NKE', 'Nike', 0.4, [1, 4, 7, 10], 63.2, [['2024-09-30', 15, 88.4]]],
	['AMZN', 'Amazon', 0, [], 225.1, [['2025-05-12', 10, 206.3]]]
];

const round = (value) => Math.round(value * 100) / 100;
const toSerial = (date) => date.getTime() / 86400000 + 25569;
const at = (isoDate, hour, minute = 0) => new Date(`${isoDate}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`);

let nextId = 900000000;
let nextPositionId = 3100000000;
const id = () => String(nextId++);

const cash = [];
const addCash = (type, instrument, ticker, date, amount, comment, positionId = '') =>
	cash.push([type, instrument, ticker ? `${ticker}.US` : '', ticker ? 'STOCK' : '', date, round(amount), id(), comment, 'My Trades', positionId]);

const positions = [];

COMPANIES.forEach(([ticker, instrument, dividend, payMonths, price, buys]) => {
	buys.forEach(([day, shares, buyPrice]) => {
		const cost = round(shares * buyPrice);
		const positionId = String(nextPositionId++);
		addCash('Deposit', '', '', at(day, 8), Math.ceil(cost / 100) * 100, 'Transfer from bank account');
		addCash('Stock purchase', instrument, ticker, at(day, 15, 31), -cost, `OPEN BUY ${shares} @ ${buyPrice.toFixed(2)}`, positionId);
		positions.push({ ticker, instrument, shares, buyPrice, price, date: at(day, 15, 31), positionId });
	});

	if (!dividend) return;
	// One payment on the 15th of each pay month, on the shares held that day
	for (let month = new Date(Date.UTC(2024, 0, 15, 10)); month < REPORT_DATE; month.setUTCMonth(month.getUTCMonth() + 1)) {
		if (!payMonths.includes(month.getUTCMonth() + 1)) continue;
		const held = buys.filter(([day]) => at(day, 15, 31) < month).reduce((sum, [, shares]) => sum + shares, 0);
		if (!held) continue;
		const gross = round(held * dividend);
		const date = new Date(month);
		addCash('Dividend', instrument, ticker, date, gross, `${ticker}.US USD ${dividend.toFixed(4)}/ SHR`);
		addCash('Withholding tax', instrument, ticker, date, -round(gross * WHT), `${ticker}.US USD WHT ${WHT * 100}%`);
	}
});

for (let month = new Date(Date.UTC(2024, 1, 3, 10, 41)); month < REPORT_DATE; month.setUTCMonth(month.getUTCMonth() + 1)) {
	const previous = new Date(month);
	previous.setUTCMonth(previous.getUTCMonth() - 1);
	const label = `${previous.getUTCFullYear()}-${String(previous.getUTCMonth() + 1).padStart(2, '0')}`;
	const interest = round(1.2 + (month.getUTCMonth() % 5) * 0.45);
	addCash('Free funds interest', '', '', new Date(month), interest, `Free-funds Interest ${label}`);
	addCash('Free funds interest tax', '', '', new Date(month), -round(interest * 0.1), `Free-funds Interest Tax ${label}`);
}

// XTB lists newest first
cash.sort((a, b) => b[4] - a[4]);

const reportHeader = (title) => [
	['Account number', ACCOUNT],
	[title],
	['Date from (UTC)', toSerial(new Date(Date.UTC(2006, 0, 1)))],
	['Date to (UTC)', toSerial(REPORT_DATE)]
];

const cashRows = [
	...reportHeader('Cash Operations'),
	['Type', 'Instrument', 'Ticker', 'Category', 'Time', 'Amount', 'ID', 'Comment', 'Product', 'Position ID'],
	...cash.map((row) => [...row.slice(0, 4), toSerial(row[4]), ...row.slice(5)]),
	['Total', '', '', '', '', round(cash.reduce((sum, row) => sum + row[5], 0)), '', '', '', '']
];

const instrumentRows = [];
let totalValue = 0;
let totalProfit = 0;
COMPANIES.forEach(([ticker, instrument, , , price]) => {
	const own = positions.filter((position) => position.ticker === ticker);
	const shares = own.reduce((sum, position) => sum + position.shares, 0);
	const cost = round(own.reduce((sum, position) => sum + position.shares * position.buyPrice, 0));
	const value = round(shares * price);
	const profit = round(value - cost);
	totalValue += value;
	totalProfit += profit;
	instrumentRows.push(['My Trades', instrument, `${ticker}.US`, 'STOCK', '', shares, value, '', round(cost / shares), '', '', '', round((profit / cost) * 100), profit, profit, '', '', '', '']);
	own.forEach((position) => {
		const positionValue = round(position.shares * price);
		const positionProfit = round(positionValue - position.shares * position.buyPrice);
		instrumentRows.push([
			'My Trades', position.positionId, `${ticker}.US`, '', 'BUY', position.shares, positionValue, price, position.buyPrice,
			toSerial(position.date), '', '', round((positionProfit / (position.shares * position.buyPrice)) * 100), positionProfit, positionProfit, '', '', '', ''
		]);
	});
});

const openRows = [
	['Account number', ACCOUNT],
	['Open Positions'],
	['Data as of report generated', toSerial(REPORT_DATE)],
	['Product', 'Metric', 'Amount', 'Currency'],
	['My Trades', 'Open position value', round(totalValue), 'USD'],
	['My Trades', 'Open position profit', round(totalProfit), 'USD'],
	[],
	['Note', 'Summary values and open positions are shown as of the report generation time'],
	['Product', 'Instrument/Position', 'Ticker', 'Category', 'Type', 'Volume', 'Value', 'Current price', 'Open price', 'Open time (UTC)', 'Stop Loss', 'Take Profit', 'Net Profit %', 'Net Profit', 'Gross Profit', 'Margin', 'Open Commission', 'Swap', 'Rollover'],
	...instrumentRows
];

const closedRows = [
	...reportHeader('Closed Positions'),
	['Instrument', 'Ticker', 'Category', 'Type', 'Volume', 'Open Price', 'Open Time (UTC)', 'Close Price', 'Close Time (UTC)', 'Product', 'Profit/Loss', 'Gross Profit', 'Purchase Value', 'Sale Value', 'Stop Loss', 'Take Profit', 'Commission', 'Margin', 'Swap', 'Rollover', 'Open Conversion Rate', 'Close Conversion Rate', 'Close Origin', 'Position ID', 'Comment'],
	['Profit/loss', '', '', '', '', '', '', '', '', '', 0, 0]
];

// Date cells are numbers formatted like XTB's, so the app reads them as "2026-10-15 10:19:25"
const sheet = (rows, dateColumns, firstDataRow) => {
	const worksheet = XLSX.utils.aoa_to_sheet(rows);
	rows.forEach((row, rowIndex) => {
		const columns = rowIndex < firstDataRow ? (typeof row[1] === 'number' ? [1] : []) : dateColumns;
		columns.forEach((column) => {
			const cell = worksheet[XLSX.utils.encode_cell({ r: rowIndex, c: column })];
			if (cell && cell.t === 'n') cell.z = DATE_FORMAT;
		});
	});
	return worksheet;
};

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, sheet(closedRows, [6, 8], 5), 'Closed Positions');
XLSX.utils.book_append_sheet(workbook, sheet(cashRows, [4], 5), 'Cash Operations');
XLSX.utils.book_append_sheet(workbook, sheet(openRows, [9], 9), 'Open Positions');

const output = path.join(__dirname, '..', 'demo', 'XTB_demo_portfolio.xlsx');
require('fs').mkdirSync(path.dirname(output), { recursive: true });
XLSX.writeFile(workbook, output, { compression: true });
console.log(`Wrote ${output}: ${COMPANIES.length} companies, ${cash.length} cash operations`);
