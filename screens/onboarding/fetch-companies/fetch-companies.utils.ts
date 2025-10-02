import { parseUserData } from '@/common/utils';

import { getLast12MonthsDividend, parseTransactionsForCalendar } from '@/common/utils';

import { parseTransactionsForLast12MonthsDividend } from '@/common/utils';

import { defaultGoals } from '@/common/constants';
import { parseTransactions } from '@/common/utils';
import { filterRawTransactions } from '@/common/utils';
import { CompanyData } from '@/types';
import Store from '@/config/store/slices/user-data';

type SetDataByCompanyDataType = {
	companies: CompanyData[];
	storedSymbols: string[];
};

export const setDataByCompanyData = ({ companies, storedSymbols }: SetDataByCompanyDataType) => {
	const storedRawTransactions = Store.getRawTransactions();
	const filteredRawTransactions = filterRawTransactions(storedRawTransactions, storedSymbols);

	const parsedTransactions = parseTransactions(filteredRawTransactions);
	const dividend = parseTransactionsForLast12MonthsDividend(filteredRawTransactions);
	// console.log("dividend", JSON.stringify(filteredRawTransactions));
	const parsedTransactionsForLast12MonthsDividend = getLast12MonthsDividend(dividend);
	const parsedTransactionsForCalendar = parseTransactionsForCalendar(filteredRawTransactions);
	const parsedUserData = parseUserData({
		transactions: parsedTransactions,
		companies
	});
	// console.log('parsedUserData', JSON.stringify(parsedUserData));

	const goals = Store.getGoals();
	Store.setGoals(goals.length ? goals : defaultGoals);

	Store.setCurrency(companies[0].currency);
	Store.setUserData(parsedUserData);
	Store.setTransactions(parsedTransactions);
	Store.setRawTransactions(filteredRawTransactions);
	Store.setCalendar(parsedTransactionsForCalendar);
	Store.setTimestamp(Date.now());
	Store.setLast12MonthsDividend(parsedTransactionsForLast12MonthsDividend);
};

export const getErrorMessage = (missingSymbols: string[]) => {
	const companyText = missingSymbols.length === 1 ? 'company' : 'companies';
	return `We couldn't find data for the following ${companyText}: ${missingSymbols.join(
		', '
	)}.\nWould you like to proceed without ${missingSymbols.length === 1 ? 'it' : 'them'}?`;
};
