import { useEffect } from 'react';
import Store from '@/config/store/slices/user-data';
import { oneDayInMilliseconds } from '@/common/constants';
import { getCompaniesInBatches } from '@/services/companies';
import { parseUserData } from './parsers';
import { safelyPrintError } from './misc';
import { Analytics } from '@/config/analytics';

export const useFetchCompaniesOnceADay = () => {
	useEffect(() => {
		(async () => {
			const timestamp = Store.getTimestamp();
			const storedSymbols = Store.getSymbols();

			if (storedSymbols && timestamp + oneDayInMilliseconds < Date.now()) {
				try {
					const transactions = Store.getTransactions();
					const companies = await getCompaniesInBatches(storedSymbols);

					// Unknown or delisted tickers return no quote; refresh the rest, as onboarding does
					if (companies.length) {
						const parsedUserData = parseUserData({
							transactions,
							companies
						});

						const newTimestamp = Date.now();
						Store.setTimestamp(newTimestamp);
						Store.setUserData(parsedUserData);
						Analytics.sendEvent(Analytics.events.fetch_companies, newTimestamp.toString());
					} else {
						throw new Error(`No quotes for ${storedSymbols.length} symbols`);
					}
				} catch (error) {
					Analytics.sendEvent(Analytics.events.error_daily_fetch, safelyPrintError(error));
				}
			}
		})();
	}, []);
};
