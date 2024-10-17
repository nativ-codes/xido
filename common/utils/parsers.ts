import {
	companiesStatsDefault,
	dividendStatsDefault,
	shareStatsDefault
} from '@/constants';
import {
	OperationType,
	SummaryType,
	TransactionsToDisplayMapperPropTypes,
	TransactionsToDisplayPropTypes,
	TransactionType,
	CalculateMarketSummaryReturnType,
	Company,
	CompanyData,
	ParseTransactionsForExpectedDividendsReturnType
} from '@/types';
import {
	getIsOlderThanOneYear,
	getMonthByIndex,
	parseTransactionDate,
	ParseTransactionDateReturnType
} from './dates';

type ParseTransactionsForShareStatsReturnType = {
	maxShare: number;
	minShare: number;
};

const parseTransactionsForShareStats = (
	transactions: TransactionType[]
): ParseTransactionsForShareStatsReturnType =>
	transactions.reduce((acc, transaction) => {
		const [id, type, time, symbol, comment, amount] = transaction;

		if (type === OperationType.StocksEtfPurchase) {
			const stock = parseMessageForShares(comment);

			return {
				...acc,
				maxShare: Math.max(acc.maxShare, parseFloat(stock.value)),
				minShare: Math.min(acc.minShare, parseFloat(stock.value))
			};
		} else {
			return acc;
		}
	}, shareStatsDefault);

type ParseTransactionsForDividendStatsReturnType = {
	dividendsAllTime: number;
	dividendsLastYear: number;
};

const parseTransactionsForDividendStats = (
	transactions: TransactionType[]
): ParseTransactionsForDividendStatsReturnType =>
	transactions.reduce((acc, transaction) => {
		const [id, type, time, symbol, comment, amount] = transaction;

		if (type === OperationType.Dividend) {
			if (getIsOlderThanOneYear(time)) {
				return {
					...acc,
					dividendsAllTime: acc.dividendsAllTime + parseFloat(amount)
				};
			} else {
				return {
					...acc,
					dividendsLastYear:
						acc.dividendsLastYear + parseFloat(amount),
					dividendsAllTime: acc.dividendsAllTime + parseFloat(amount)
				};
			}
		} else {
			return acc;
		}
	}, dividendStatsDefault);

type ParseMessageForSharesReturnType = {
	amount: string;
	value: string;
};

const parseMessageForShares = (
	message: string
): ParseMessageForSharesReturnType => {
	// 'OPEN BUY 10 @ 114.51'
	const splitByAt = message.split('@');
	// ['OPEN BUY 10 ', ' 114.51']
	const splitBySpace = splitByAt[0].trim().split(' ');
	// ['OPEN', 'BUY', '10']
	const amount = splitBySpace[splitBySpace.length - 1];
	// ['OPEN BUY 10 ', ' 114.51']
	const value = splitByAt[splitByAt.length - 1].trim();

	return { amount, value };
};

const parseMessageForDividends = (message: string): number => {
	// 'MMM.US USD 0.7000/ SHR'
	const splitBySpace = message.split(' ');
	// ['MMM.US', 'USD', '0.7000/', 'SHR']
	return parseFloat(splitBySpace[2]);
};

type CalculateMarketSummaryPropsType = {
	summary: SummaryType;
	company: CompanyData;
	totalPortfolioValue: number;
	transactions: TransactionType[];
};

const calculateMarketSummary = ({
	summary,
	company,
	transactions,
	totalPortfolioValue
}: CalculateMarketSummaryPropsType): CalculateMarketSummaryReturnType => {
	const marketValue = company.bid * summary.shares;
	const profitOrLoss = marketValue - Math.abs(summary.boughtValue);
	const profitOrLossPercentage =
		(profitOrLoss / Math.abs(summary.boughtValue)) * 100;

	const latestTransactions =
		parseTransactionsForLatestTransactions(transactions);
	const expectedDividends = parseTransactionsForExpectedDividends(
		transactions,
		transactions[0]
	);
	const shareStats = parseTransactionsForShareStats(transactions);
	const dividendStats = parseTransactionsForDividendStats(transactions);

	return {
		bid: company.bid,
		shares: summary.shares,
		boughtValue: Math.abs(summary.boughtValue),
		marketValue: marketValue,
		profitOrLoss: profitOrLoss,
		dividendYield: company.dividendYield,
		profitOrLossPercentage: profitOrLossPercentage,
		currency: company.currency,
		companyLogo: company.logoUrl || company.companyLogoUrl,
		companyName: company.shortName || company.longName,
		symbol: company.symbol,
		weight: (marketValue / totalPortfolioValue) * 100,
		...shareStats,
		...dividendStats,
		latestTransactions,
		expectedDividends
	};
};

type CalculateSummaryPropsType = {
	summary: SummaryType;
	type: OperationType;
	amount: string;
	comment: string;
};

const calculateSummary = ({
	summary,
	type,
	amount,
	comment
}: CalculateSummaryPropsType): SummaryType => {
	const newSummary = { ...summary };

	switch (type) {
		case OperationType.Dividend:
			newSummary.dividends += parseFloat(amount);
			break;
		case OperationType.WithholdingTax:
			newSummary.withholdingTax += parseFloat(amount);
			break;
		case OperationType.StocksEtfPurchase:
			newSummary.boughtValue += parseFloat(amount);
			newSummary.shares += parseFloat(
				parseMessageForShares(comment).amount
			);
			break;
		case OperationType.StocksEtfSale:
			newSummary.boughtValue -= parseFloat(amount);
			newSummary.shares -= parseFloat(
				parseMessageForShares(comment).amount
			);
			break;
		case OperationType.SpinOff:
			newSummary.spinOffs += parseFloat(amount);
			break;
		case OperationType.FreeFundsInterests:
			newSummary.freeFundsInterest += parseFloat(amount);
			break;
		case OperationType.FreeFundsInterestsTax:
			newSummary.freeFundsInterestTax += parseFloat(amount);
			break;
	}

	return newSummary;
};

type ParsedTransactionsPropsType = {
	summary: SummaryType;
	transactions: Array<TransactionType>;
};

type ParsedTransactionsType = {
	summary: SummaryType;
	companies: Record<string, ParsedTransactionsPropsType>;
};

const parseTransactions = (transactions: TransactionType[]) => {
	return transactions.reduce(
		(parsedTransactions: ParsedTransactionsType, transaction, key) => {
			// Skip the first element, which is the header row
			if (key === 0) return parsedTransactions;

			const [id, type, time, symbol, comment, amount] =
				transaction as TransactionType;
			const companySymbol = symbol?.split('.')?.[0];
			const newCompanies = Boolean(companySymbol)
				? {
					...parsedTransactions.companies,
					[companySymbol]: {
						summary: calculateSummary({
							summary:
								parsedTransactions.companies[companySymbol]
									?.summary ||
								companiesStatsDefault.summary,
							type,
							amount,
							comment
						}),
						transactions: [
							...(parsedTransactions.companies[companySymbol]
								?.transactions || []),
							transaction
						]
					}
				}
				: parsedTransactions.companies;

			return {
				summary: calculateSummary({
					summary: parsedTransactions.summary,
					type,
					amount,
					comment
				}),
				companies: newCompanies
			};
		},
		companiesStatsDefault
	);
};

const parseTransactionsForLatestTransactions = (
	transactions: TransactionType[]
): TransactionsToDisplayPropTypes[] => {
	const transactionsMapper =
		transactions.reduce<TransactionsToDisplayMapperPropTypes>(
			(acc, transaction) => {
				const [id, type, time, symbol, comment, amount] = transaction;

				if (
					type === OperationType.Dividend ||
					type === OperationType.StocksEtfSale ||
					type === OperationType.StocksEtfPurchase
				) {
					const date = time.split(' ')[0];

					return {
						...acc,
						[date]: {
							date,
							type,
							// Sum the amount for the same date
							amount:
								(acc[date]?.amount || 0) + parseFloat(amount)
						}
					};
				} else {
					return acc;
				}
			},
			{}
		);

	return Object.values(transactionsMapper);
};

const parseCompanies = (companies: Company[]): CompanyData[] =>
	companies.map(({ symbol, bid, logoUrl, dividendYield, currency }) => ({
		symbol,
		bid,
		logoUrl,
		dividendYield,
		currency
	}));

type ParseUserDataPropsType = {
	transactions: ParsedTransactionsType;
	companies: CompanyData[];
};

const parseUserData = ({ transactions, companies }: ParseUserDataPropsType) => {
	const totalPortfolioValue = companies.reduce((acc, company) => {
		const currentCompany = transactions.companies[company.symbol];
		return acc + company.bid * currentCompany.summary.shares;
	}, 0);

	return companies.reduce((acc, company) => {
		const currentCompany = transactions.companies[company.symbol];

		return {
			...acc,
			[company.symbol]: {
				...currentCompany,
				summary: calculateMarketSummary({
					...currentCompany,
					totalPortfolioValue,
					company
				})
			}
		};
	}, {});
};

type GroupTransactionsByMonths = {
	[key: number]: string[];
}

const groupTransactionsByMonths = (
	transactions: TransactionType[],
	lastTransactionDate: ParseTransactionDateReturnType
): GroupTransactionsByMonths => transactions.reduce((acc, transaction) => {
	const [id, type, time, symbol, comment, amount] = transaction;

	if (type === OperationType.Dividend) {
		const { month, year } = parseTransactionDate(time);
		const currentMonthList = (acc as GroupTransactionsByMonths)[month] || [];
		const isTransactionRecent =
			lastTransactionDate.year === year ||
			lastTransactionDate.year - 1 === year;

		return {
			...acc,
			[month]:
				currentMonthList.includes(year.toString()) || !isTransactionRecent
					? currentMonthList
					: [...currentMonthList, year]
		};
	} else {
		return acc;
	}
}, {});

const parseTransactionsForExpectedDividends = (
	transactions: TransactionType[],
	lastTransaction: TransactionType
): ParseTransactionsForExpectedDividendsReturnType => {
	const lastTransactionDate = parseTransactionDate(lastTransaction[2]);
	const lastDividendReceived = transactions.find(
		(transaction) => transaction[1] === OperationType.Dividend
	);

	if (lastDividendReceived) {
		const lastDividendValueReceived = parseMessageForDividends(
			lastDividendReceived[4]
		);
		const months = groupTransactionsByMonths(
			transactions,
			lastTransactionDate
		);

		const parsedMonths = Object.entries(months).reduce<{ next: string[]; previous: string[] }>((acc, [month, years]) => {
			if (years.length) {
				if (Number(month) >= lastTransactionDate.month) {
					return {
						...acc,
						next: [
							...acc.next,
							`${getMonthByIndex(Number(month))} ${lastTransactionDate.year
							}`
						]
					};
				} else {
					return {
						...acc,
						previous: [
							...acc.previous,
							`${getMonthByIndex(Number(month))} ${lastTransactionDate.year + 1}`
						]
					};
				}
			} else {
				return acc;
			}
		},
			{
				next: [],
				previous: []
			}
		);

		return {
			months: [...parsedMonths.next, ...parsedMonths.previous],
			value: lastDividendValueReceived
		};
	} else {
		return {
			months: [],
			value: 0
		};
	}
};

export {
	parseTransactions,
	parseCompanies,
	parseUserData
};
