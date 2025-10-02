const maxCompaniesPerBatch = 10;
const maxCompaniesAllowed = 30;

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const currencies = {
	USD: '$',
	EUR: '€',
	GBP: '£',
	JPY: '¥'
};

const sortBy = [
	{
		label: 'Weight',
		key: 'weight'
	},
	{
		label: 'Market value',
		key: 'marketValue'
	},
	{
		label: 'Dividend yield',
		key: 'dividendYield'
	},
	{
		label: 'Profit/Loss',
		key: 'profitOrLoss'
	}
];

const CASH_OPERATION = 'cash operation';

export { months, sortBy, currencies, maxCompaniesAllowed, maxCompaniesPerBatch, CASH_OPERATION };
