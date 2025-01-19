import { months, providers } from '@/constants';
import { TransactionFields, TransactionProvider, TransactionType } from '@/types';

const noop = () => {};
const defaultKeyExtractor = (item: string | number) => item;

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

export {
	sortByNumbers,
	noop,
	getRandomString,
	defaultKeyExtractor,
	sortByKey,
	sortByMonthKeyExtractor,
	getTransactionValue
};
