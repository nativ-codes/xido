// Builds fictional XTB exports (Closed Positions / Cash Operations / Open Positions, same layout as a real XTB xlsx):
// - demo/XTB_demo_portfolio.xlsx: a clean portfolio for App Store review
// - demo/XTB_edge_cases.xlsx: sells, splits, closed positions, unknown/delisted/odd tickers, to catch import issues
// Run: node scripts/generate-demo-portfolio.js
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const DATE_FORMAT = 'yyyy-mm-dd hh:mm:ss';
const WHT = 0.15;

// Company: { ticker (XTB, with market suffix), instrument, category, dividend: [per share today, pay months], price at report time,
//   events: ['buy' | 'sell', date, shares, price] | ['split', date, new shares per old share] }
const company = (ticker, instrument, price, dividend, events, category = 'STOCK') => ({ ticker, instrument, price, dividend, events, category });
const buys = (...list) => list.map((buy) => ['buy', ...buy]);
const QUARTERLY = (first) => [first, first + 3, first + 6, first + 9];
const MONTHLY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PORTFOLIOS = [
	{
		file: 'XTB_demo_portfolio.xlsx',
		account: '1000001',
		reportDate: new Date(Date.UTC(2026, 10, 15, 9, 30)),
		companies: [
			company('AAPL.US', 'Apple', 268.4, [0.25, QUARTERLY(2)], buys(['2024-02-12', 10, 187.2], ['2025-04-08', 5, 172.4])),
			company('MSFT.US', 'Microsoft', 509.8, [0.83, QUARTERLY(3)], buys(['2024-03-05', 4, 402.1], ['2025-08-11', 2, 522.3])),
			company('JNJ.US', 'Johnson & Johnson', 194.6, [1.24, QUARTERLY(3)], buys(['2024-05-14', 12, 151.8])),
			company('KO.US', 'Coca-Cola', 70.2, [0.51, [4, 7, 10, 12]], buys(['2024-01-22', 30, 60.1], ['2025-02-18', 20, 68.9])),
			company('PEP.US', 'PepsiCo', 149.7, [1.355, [1, 3, 6, 9]], buys(['2024-06-10', 10, 166.5], ['2025-06-23', 8, 131.2])),
			company('PG.US', 'Procter & Gamble', 150.3, [1.0568, QUARTERLY(2)], buys(['2024-04-16', 12, 158.4])),
			company('O.US', 'Realty', 57.4, [0.2685, MONTHLY], buys(['2024-02-26', 60, 52.3], ['2024-11-12', 40, 56.1], ['2025-09-15', 30, 58.4])),
			company('JPM.US', 'JPMorgan Chase', 301.5, [1.4, QUARTERLY(1)], buys(['2024-07-09', 8, 205.7])),
			company('XOM.US', 'Exxon Mobil', 117.3, [0.99, QUARTERLY(3)], buys(['2024-09-03', 15, 115.6])),
			company('VZ.US', 'Verizon', 40.1, [0.6775, QUARTERLY(2)], buys(['2024-03-18', 40, 40.2], ['2025-01-13', 25, 38.9])),
			company('ABBV.US', 'AbbVie', 224.8, [1.64, QUARTERLY(2)], buys(['2024-10-21', 10, 190.4])),
			company('MCD.US', "McDonald's", 300.6, [1.77, QUARTERLY(3)], buys(['2025-03-10', 6, 305.2])),
			company('HD.US', 'Home Depot', 359.9, [2.3, QUARTERLY(3)], buys(['2024-08-19', 5, 362.8])),
			company('NKE.US', 'Nike', 63.2, [0.4, QUARTERLY(1)], buys(['2024-09-30', 15, 88.4])),
			company('AMZN.US', 'Amazon', 225.1, null, buys(['2025-05-12', 10, 206.3]))
		]
	},
	{
		file: 'XTB_edge_cases.xlsx',
		account: '1000002',
		reportDate: new Date(Date.UTC(2026, 10, 15, 9, 30)),
		companies: [
			// Partial sell of the oldest lot, then a rebuy
			company('AAPL.US', 'Apple', 268.4, [0.25, QUARTERLY(2)], [['buy', '2024-02-12', 10, 187.2], ['buy', '2024-08-05', 5, 209.3], ['sell', '2025-03-03', 6, 238.1], ['buy', '2025-10-06', 4, 256.5]]),
			// 10-for-1 split (June 2024): bought pre-split, dividends paid on the split-adjusted count afterwards
			company('NVDA.US', 'NVIDIA', 182.6, [0.01, QUARTERLY(3)], [['buy', '2024-03-04', 3, 852.4], ['split', '2024-06-10', 10], ['buy', '2025-01-21', 10, 140.8]]),
			// Fully sold: in Cash Operations and Closed Positions, absent from Open Positions
			company('TSLA.US', 'Tesla', 401.2, null, [['buy', '2024-04-22', 5, 142.1], ['sell', '2024-12-16', 5, 463.0]]),
			// Sold at a loss, leaving one lot open
			company('INTC.US', 'Intel', 51.3, null, [['buy', '2024-01-08', 20, 48.6], ['buy', '2024-07-15', 20, 33.9], ['sell', '2024-09-23', 20, 22.5]]),
			// Fully sold and bought again later
			company('KO.US', 'Coca-Cola', 70.2, [0.51, [4, 7, 10, 12]], [['buy', '2024-01-22', 20, 60.1], ['sell', '2024-09-09', 20, 71.3], ['buy', '2025-05-19', 15, 70.4]]),
			// Monthly payer with fractional shares
			company('O.US', 'Realty', 57.4, [0.2685, MONTHLY], buys(['2024-02-26', 12.5, 52.3], ['2025-06-30', 7.25, 56.9])),
			// ETF category
			company('VOO.US', 'Vanguard S&P 500 ETF', 621.4, [1.74, QUARTERLY(3)], buys(['2024-05-06', 3, 470.2]), 'ETF'),
			// Non-US listings: only US shares are supported, so the app skips these and lists them on upload
			company('SAP.DE', 'SAP', 245.3, [2.35, [5]], buys(['2024-06-17', 4, 172.4])),
			company('VOD.UK', 'Vodafone', 0.92, [0.045, [2, 8]], buys(['2024-03-11', 500, 0.69])),
			// Ticker with a dot in it
			company('BRK.B.US', 'Berkshire Hathaway B', 496.2, null, buys(['2024-10-14', 2, 454.7])),
			// Delisted (SVB, 2023) and made-up tickers the quote API can't know
			company('SIVB.US', 'SVB Financial', 0.5, null, buys(['2023-01-09', 3, 236.4])),
			company('FAKECO.US', 'Fake Company', 12.0, [0.1, QUARTERLY(1)], buys(['2024-05-20', 50, 10.0])),
			company('ZZZQ.US', 'Unknown Instrument', 3.3, null, buys(['2025-02-03', 100, 4.1]))
		],
		// Rows XTB also puts in Cash Operations that carry no position
		extraCash: [
			['Commission', 'Apple', 'AAPL.US', '2025-03-03', -0.25, 'Commission for transaction'],
			['Correction', '', '', '2025-07-01', 1.5, 'Correction of free funds interest'],
			['Withdrawal', '', '', '2025-11-03', -500, 'Transfer to bank account']
		]
	}
];

const round = (value) => Math.round(value * 100) / 100;
const toSerial = (date) => date.getTime() / 86400000 + 25569;
const at = (isoDate, hour, minute = 0) => new Date(`${isoDate}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`);
const market = (ticker) => ticker.slice(ticker.lastIndexOf('.') + 1);

const build = ({ account, reportDate, companies, extraCash = [] }) => {
	let nextId = 900000000;
	let nextPositionId = 3100000000;
	const cash = [];
	const closed = [];
	const open = [];
	const addCash = (type, instrument, ticker, date, amount, comment, positionId = '', category = 'STOCK') =>
		cash.push([type, instrument, ticker, ticker ? category : '', date, round(amount), String(nextId++), comment, 'My Trades', positionId]);

	companies.forEach(({ ticker, instrument, price, dividend, events, category }) => {
		const lots = [];
		const timeline = events.map((event) => ({ date: at(event[1], 15, 31), event }));
		if (dividend) {
			const [perShare, months] = dividend;
			for (let date = new Date(Date.UTC(2023, 0, 15, 10)); date < reportDate; date.setUTCMonth(date.getUTCMonth() + 1)) {
				if (months.includes(date.getUTCMonth() + 1)) timeline.push({ date: new Date(date), event: ['dividend', perShare] });
			}
		}
		timeline.sort((a, b) => a.date - b.date);

		// Dividends declared per share before a split are worth the split ratio more per share
		const perShareAt = (date, perShare) =>
			events.filter(([type, day]) => type === 'split' && at(day, 15, 31) > date).reduce((value, [, , ratio]) => value * ratio, perShare);

		timeline.forEach(({ date, event: [type, ...args] }) => {
			if (type === 'buy') {
				const [, shares, buyPrice] = args;
				const cost = round(shares * buyPrice);
				const positionId = String(nextPositionId++);
				addCash('Deposit', '', '', new Date(date.getTime() - 7 * 3600000), Math.ceil(cost / 100) * 100, 'Transfer from bank account');
				addCash('Stock purchase', instrument, ticker, date, -cost, `OPEN BUY ${shares} @ ${buyPrice.toFixed(2)}`, positionId, category);
				lots.push({ shares, buyPrice, date, positionId, originalShares: shares });
			} else if (type === 'sell') {
				let [, toSell, sellPrice] = args;
				// FIFO, one close per lot touched, like XTB
				while (toSell > 0 && lots.length) {
					const lot = lots[0];
					const sold = Math.min(toSell, lot.shares);
					const partial = sold < lot.shares ? `/${lot.shares}` : '';
					const purchase = round(sold * lot.buyPrice);
					const sale = round(sold * sellPrice);
					addCash('Stock sell', instrument, ticker, date, sale, `CLOSE BUY ${sold}${partial} @ ${sellPrice.toFixed(2)}`, lot.positionId, category);
					closed.push([instrument, ticker, category, 'BUY', sold, lot.buyPrice, toSerial(lot.date), sellPrice, toSerial(date), 'My Trades', round(sale - purchase), round(sale - purchase), purchase, sale, '', '', 0, '', '', '', '', '', 'Market', lot.positionId, '']);
					lot.shares = round(lot.shares - sold);
					toSell = round(toSell - sold);
					if (!lot.shares) lots.shift();
				}
			} else if (type === 'split') {
				// Non-cash: XTB adjusts the open positions' volume and open price
				const [, ratio] = args;
				lots.forEach((lot) => {
					lot.shares *= ratio;
					lot.buyPrice = round(lot.buyPrice / ratio);
				});
			} else {
				const held = lots.reduce((sum, lot) => sum + lot.shares, 0);
				if (!held) return;
				const perShare = perShareAt(date, args[0]);
				const gross = round(held * perShare);
				const currency = market(ticker) === 'DE' ? 'EUR' : market(ticker) === 'UK' ? 'GBP' : 'USD';
				addCash('Dividend', instrument, ticker, date, gross, `${ticker} ${currency} ${perShare.toFixed(4)}/ SHR`, '', category);
				addCash('Withholding tax', instrument, ticker, date, -round(gross * WHT), `${ticker} ${currency} WHT ${WHT * 100}%`, '', category);
			}
		});

		if (lots.length) open.push({ ticker, instrument, category, price, lots });
	});

	extraCash.forEach(([type, instrument, ticker, day, amount, comment]) => addCash(type, instrument, ticker, at(day, 12), amount, comment));

	for (let date = new Date(Date.UTC(2024, 1, 3, 10, 41)); date < reportDate; date.setUTCMonth(date.getUTCMonth() + 1)) {
		const previous = new Date(date);
		previous.setUTCMonth(previous.getUTCMonth() - 1);
		const label = `${previous.getUTCFullYear()}-${String(previous.getUTCMonth() + 1).padStart(2, '0')}`;
		const interest = round(1.2 + (date.getUTCMonth() % 5) * 0.45);
		addCash('Free funds interest', '', '', new Date(date), interest, `Free-funds Interest ${label}`);
		addCash('Free funds interest tax', '', '', new Date(date), -round(interest * 0.1), `Free-funds Interest Tax ${label}`);
	}

	// XTB lists newest first
	cash.sort((a, b) => b[4] - a[4]);

	const reportHeader = (title) => [
		['Account number', account],
		[title],
		['Date from (UTC)', toSerial(new Date(Date.UTC(2006, 0, 1)))],
		['Date to (UTC)', toSerial(reportDate)]
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
	open.forEach(({ ticker, instrument, category, price, lots }) => {
		const shares = round(lots.reduce((sum, lot) => sum + lot.shares, 0));
		const cost = round(lots.reduce((sum, lot) => sum + lot.shares * lot.buyPrice, 0));
		const value = round(shares * price);
		const profit = round(value - cost);
		totalValue += value;
		totalProfit += profit;
		instrumentRows.push(['My Trades', instrument, ticker, category, '', shares, value, '', round(cost / shares), '', '', '', round((profit / cost) * 100), profit, profit, '', '', '', '']);
		lots.forEach((lot) => {
			const lotValue = round(lot.shares * price);
			const lotProfit = round(lotValue - lot.shares * lot.buyPrice);
			instrumentRows.push(['My Trades', lot.positionId, ticker, '', 'BUY', lot.shares, lotValue, price, lot.buyPrice, toSerial(lot.date), '', '', round((lotProfit / (lot.shares * lot.buyPrice)) * 100), lotProfit, lotProfit, '', '', '', '']);
		});
	});

	const openRows = [
		['Account number', account],
		['Open Positions'],
		['Data as of report generated', toSerial(reportDate)],
		['Product', 'Metric', 'Amount', 'Currency'],
		['My Trades', 'Open position value', round(totalValue), 'USD'],
		['My Trades', 'Open position profit', round(totalProfit), 'USD'],
		[],
		['Note', 'Summary values and open positions are shown as of the report generation time'],
		['Product', 'Instrument/Position', 'Ticker', 'Category', 'Type', 'Volume', 'Value', 'Current price', 'Open price', 'Open time (UTC)', 'Stop Loss', 'Take Profit', 'Net Profit %', 'Net Profit', 'Gross Profit', 'Margin', 'Open Commission', 'Swap', 'Rollover'],
		...instrumentRows
	];

	const closedProfit = round(closed.reduce((sum, row) => sum + row[10], 0));
	const closedRows = [
		...reportHeader('Closed Positions'),
		['Instrument', 'Ticker', 'Category', 'Type', 'Volume', 'Open Price', 'Open Time (UTC)', 'Close Price', 'Close Time (UTC)', 'Product', 'Profit/Loss', 'Gross Profit', 'Purchase Value', 'Sale Value', 'Stop Loss', 'Take Profit', 'Commission', 'Margin', 'Swap', 'Rollover', 'Open Conversion Rate', 'Close Conversion Rate', 'Close Origin', 'Position ID', 'Comment'],
		...closed,
		['Profit/loss', '', '', '', '', '', '', '', '', '', closedProfit, closedProfit]
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
	return { workbook, cashCount: cash.length, closedCount: closed.length };
};

PORTFOLIOS.forEach((portfolio) => {
	const output = path.join(__dirname, '..', 'demo', portfolio.file);
	const { workbook, cashCount, closedCount } = build(portfolio);
	fs.mkdirSync(path.dirname(output), { recursive: true });
	XLSX.writeFile(workbook, output, { compression: true });
	console.log(`Wrote ${output}: ${portfolio.companies.length} companies, ${cashCount} cash operations, ${closedCount} closed positions`);
});
