import { useEffect } from 'react';
import Store from '@/config/store/slices/user-data';
import { oneDayInMilliseconds } from '@/constants';
import { getCompaniesInBatches } from '@/services/companies';
import { parseUserData, safelyPrintError } from './utils';
import { Analytics } from '@/config/store/analytics';

export const useFetchCompaniesOnceADay = () => {
	useEffect(() => {
		(async () => {
			const timestamp = Store.getTimestamp();
			const storedSymbols = Store.getSymbols();

			if (storedSymbols && timestamp + oneDayInMilliseconds < Date.now()) {
				try {
					const transactions = Store.getTransactions();
					const companies = await getCompaniesInBatches(storedSymbols);

					if (companies.length === storedSymbols.length) {
						const parsedUserData = parseUserData({
							transactions,
							companies
						});

						const newTimestamp = Date.now();
						Store.setTimestamp(newTimestamp);
						Store.setUserData(parsedUserData);
						Analytics.sendEvent(Analytics.events.fetch_companies, newTimestamp.toString());
					} else {
						throw new Error(`Lists have different sizes: ${companies.length} vs. ${storedSymbols.length}`);
					}
				} catch (error) {
					Analytics.sendEvent(Analytics.events.error_daily_fetch, safelyPrintError(error));
				}
			}
		})();
	}, []);
};
