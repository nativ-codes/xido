import { columnTitles } from '@/common/constants';
import { OperationType } from '@/types';

const validateColumnTitles = (titles: string[]): boolean =>
	titles.length > 0 && columnTitles.every((title) => titles.includes(title));

const getIsEmpty = (value: any) => !Object.keys(value).length;

const getOperationType = (type: string): OperationType => {
	switch (type) {
		case 'Cumpărare Acțiuni/ETF-uri':
		case 'Stocks/ETF purchase':
		case 'Stock purchase':
			return OperationType.StocksEtfPurchase;
		case 'Vânzare Acțiuni/ETF-uri':
		case 'Stocks/ETF sale':
		case 'Stock sell':
			return OperationType.StocksEtfSale;
		case 'Dividend':
			return OperationType.Dividend;
		case 'Withholding tax':
			return OperationType.WithholdingTax;
		case 'Spinoff':
			return OperationType.SpinOff;
		case 'Free funds interest':
			return OperationType.FreeFundsInterests;
		case 'Free funds interest tax':
			return OperationType.FreeFundsInterestsTax;
		default:
			return OperationType.Other;
	}
};

export { getIsEmpty, validateColumnTitles, getOperationType };
