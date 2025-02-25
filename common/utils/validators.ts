import { columnTitles } from '@/constants';
import { OperationType } from '@/types';

const validateColumnTitles = (titles: string[]): boolean => titles.every((title) => columnTitles.includes(title));

const getIsEmpty = (value: any) => !Object.keys(value).length;

const getOperationType = (type: string): OperationType => {
	switch (type) {
		case 'Cumpărare Acțiuni/ETF-uri':
		case 'Stocks/ETF purchase':
			return OperationType.StocksEtfPurchase;
		case 'Vânzare Acțiuni/ETF-uri':
		case 'Stocks/ETF sale':
			return OperationType.StocksEtfSale;
		case 'Dividend':
			return OperationType.Dividend;
		default:
			return OperationType.Other;
	}
};

export { getIsEmpty, validateColumnTitles, getOperationType };
