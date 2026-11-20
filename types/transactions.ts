export enum OperationType {
	Deposit = 'Deposit',
	Dividend = 'Dividend',
	SpinOff = 'Spin off',
	WithholdingTax = 'Withholding tax',
	StocksEtfSale = 'Stocks/ETF sale',
	StocksEtfPurchase = 'Stocks/ETF purchase',
	FreeFundsInterests = 'Free funds interests',
	FreeFundsInterestsTax = 'Free funds interests tax',
	Other = 'Other'
}

export type SummaryType = {
	dividends: number;
	withholdingTax: number;
	shares: number;
	spinOffs: number;
	freeFundsInterest: number;
	freeFundsInterestTax: number;
	boughtValue: number;
};

// One "Cash Operations" row: Type, Instrument, Ticker, Category, Time, Amount, ID, Comment, Product, Position ID
export type TransactionType = [string, string, string, string, string, string, string, string, string, string];

export type TransactionsToDisplayMapperPropTypes = {
	[key: string]: TransactionsToDisplayPropTypes;
};

export type TransactionsToDisplayPropTypes = {
	date: string;
	type: OperationType;
	amount: number;
};

export enum TransactionFields {
	ID = 'ID',
	TYPE = 'TYPE',
	TIME = 'TIME',
	SYMBOL = 'SYMBOL',
	COMMENT = 'COMMENT',
	AMOUNT = 'AMOUNT'
}

// Column indexes of the XTB xlsx "Cash Operations" sheet
export enum XTBTransactionFields {
	TYPE = 0,
	SYMBOL = 2,
	TIME = 4,
	AMOUNT = 5,
	ID = 6,
	COMMENT = 7
}

export enum TransactionProvider {
	XTB = 'XTB'
}
