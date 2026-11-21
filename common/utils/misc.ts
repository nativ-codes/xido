import { months, providers } from '@/common/constants';
import { TransactionFields, TransactionProvider, TransactionType } from '@/types';

const noop = () => {};
const defaultKeyExtractor = (item: string | number) => item;
const safelyPrintError = (error: unknown) => (typeof error === 'string' ? error : error.message || 'An error occurred');

const sortByKey = (list: any[], keyExtractor: (props: any) => string | number) =>
	list.sort((a, b) => {
		const keyA = keyExtractor(a);
		const keyB = keyExtractor(b);
		return keyA < keyB ? 1 : keyA > keyB ? -1 : 0;
	});

const sortByMonthKeyExtractor = (keyExtractor: (props: any) => string) => (item: any) =>
	months.indexOf(keyExtractor(item));
const sortByNumbers = (list: any[], keyExtractor: (props: any) => string | number) =>
	list.sort((a, b) => {
		const keyA = keyExtractor(a) as any;
		const keyB = keyExtractor(b) as any;
		return keyA - keyB;
	});

const getRandomString = () => (Math.random() + 1).toString(36).substring(7);

type GetTransactionValueType = {
	transaction: TransactionType;
	provider?: TransactionProvider;
};

const getTransactionValue =
	({ transaction, provider = TransactionProvider.XTB }: GetTransactionValueType) =>
	(fieldType: TransactionFields) => {
		const field = providers[provider][fieldType];

		return transaction[field];
	};

// XTB tickers end with their market ("AAPL.US", "BRK.B.US"); the app and the quote API use "AAPL", "BRK-B".
// Only US shares are supported: other markets ("VOD.UK") give '' so they are ignored like rows with no company.
const getSymbol = (ticker = '') => {
	const [, symbol, market] = ticker.trim().match(/^(.+)\.([A-Z]+)$/) ?? [];
	return market === 'US' ? symbol.replace(/\./g, '-') : '';
};

export {
	sortByNumbers,
	safelyPrintError,
	noop,
	getRandomString,
	defaultKeyExtractor,
	sortByKey,
	sortByMonthKeyExtractor,
	getTransactionValue,
	getSymbol
};
