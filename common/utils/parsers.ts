import {
  companiesStatsDefault,
  dividendStatsDefault,
  oneYearInMilliseconds,
  shareStatsDefault,
} from "@/common/constants";
import {
  OperationType,
  SummaryType,
  TransactionsToDisplayMapperPropTypes,
  TransactionsToDisplayPropTypes,
  TransactionType,
  CalculateMarketSummaryReturnType,
  Company,
  CompanyData,
  ParseTransactionsForExpectedDividendsReturnType,
  GoalsPropTypes,
  TransactionFields,
} from "@/types";
import {
  getIsOlderThanOneYear,
  getMonthByIndex,
  parseTransactionDate,
  ParseTransactionDateReturnType,
} from "./dates";
import { getTransactionValue } from "./misc";
import { getOperationType } from "./validators";

type ParseTransactionsForShareStatsReturnType = {
  maxShare: number;
  minShare: number;
};

const parseTransactionsForShareStats = (
  transactions: TransactionType[]
): ParseTransactionsForShareStatsReturnType =>
  transactions.reduce((acc, transaction) => {
    const getValue = getTransactionValue({ transaction });
    const type = getValue(TransactionFields.TYPE);
    const comment = getValue(TransactionFields.COMMENT);

    if (getOperationType(type) === OperationType.StockPurchase) {
      const stock = parseMessageForShares(comment);

      return {
        ...acc,
        maxShare: Math.max(acc.maxShare, parseFloat(stock.value)),
        minShare: Math.min(acc.minShare, parseFloat(stock.value)),
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
    const getValue = getTransactionValue({ transaction });
    const type = getValue(TransactionFields.TYPE);
    const time = getValue(TransactionFields.TIME);
    const amount = getValue(TransactionFields.AMOUNT);

    if (getOperationType(type) === OperationType.Dividend) {
      if (getIsOlderThanOneYear(time)) {
        return {
          ...acc,
          dividendsAllTime: acc.dividendsAllTime + parseFloat(amount),
        };
      } else {
        return {
          ...acc,
          dividendsLastYear: acc.dividendsLastYear + parseFloat(amount),
          dividendsAllTime: acc.dividendsAllTime + parseFloat(amount),
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
  // 'OPEN BUY 10/17 @ 114.51' -> ['OPEN BUY 10/17 ', ' 114.51']
  const splitByAt = message.split("@");
  // ['OPEN BUY 10/17 ', ' 114.51'] -> ['OPEN', 'BUY', '10/17']
  const splitBySpace = splitByAt[0].trim().split(" ");
  // ['OPEN', 'BUY', '10/17'] -> '10/17'
  const fraction = splitBySpace[splitBySpace.length - 1];
  // '10/17' -> '10'
  const amount = fraction.split("/")[0];

  // ['OPEN BUY 10/17 ', ' 114.51'] -> '114.51'
  const value = splitByAt[splitByAt.length - 1].trim();

  return { amount, value };
};

const parseMessageForDividends = (message: string): number => {
  // 'MMM.US USD 0.7000/ SHR'
  const splitBySpace = message.split(" ");
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
  totalPortfolioValue,
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
    dividendYield: company.dividendYield || 0,
    profitOrLossPercentage: profitOrLossPercentage,
    currency: company.currency,
    companyLogo: company.logoUrl || company.companyLogoUrl,
    companyName: company.shortName || company.longName,
    symbol: company.symbol,
    weight: (marketValue / totalPortfolioValue) * 100,
    ...shareStats,
    ...dividendStats,
    latestTransactions,
    expectedDividends,
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
  comment,
}: CalculateSummaryPropsType): SummaryType => {
  const newSummary = { ...summary };

  switch (getOperationType(type)) {
    case OperationType.Dividend:
      newSummary.dividends += parseFloat(amount);
      break;
    case OperationType.WithholdingTax:
      newSummary.withholdingTax += parseFloat(amount);
      break;
    case OperationType.StockPurchase:
      newSummary.boughtValue += parseFloat(amount);
      newSummary.shares += parseFloat(parseMessageForShares(comment).amount);
      break;
    case OperationType.StocksEtfSale:
      newSummary.boughtValue -= parseFloat(amount);
      newSummary.shares -= parseFloat(parseMessageForShares(comment).amount);
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

export type ParsedTransactionsType = {
  summary: SummaryType;
  companies: Record<string, ParsedTransactionsPropsType>;
};

const parseTransactions = (transactions: TransactionType[]) =>
  transactions.reduce(
    (
      parsedTransactions: ParsedTransactionsType,
      transaction
    ): ParsedTransactionsType => {
      const getValue = getTransactionValue({ transaction });
      const companySymbol = getValue(TransactionFields.SYMBOL)?.split(".")?.[0];
      const type = getValue(TransactionFields.TYPE) as OperationType;
      const comment = getValue(TransactionFields.COMMENT);
      const amount = getValue(TransactionFields.AMOUNT);

      const newCompanies = Boolean(companySymbol)
        ? {
            ...parsedTransactions.companies,
            [companySymbol]: {
              summary: calculateSummary({
                summary:
                  parsedTransactions.companies[companySymbol]?.summary ||
                  companiesStatsDefault.summary,
                type,
                amount,
                comment,
              }),
              transactions: [
                ...(parsedTransactions.companies[companySymbol]?.transactions ||
                  []),
                transaction,
              ],
            },
          }
        : parsedTransactions.companies;

      return {
        summary: calculateSummary({
          summary: parsedTransactions.summary,
          type,
          amount,
          comment,
        }),
        companies: newCompanies,
      };
    },
    companiesStatsDefault
  );

const parseTransactionsForLatestTransactions = (
  transactions: TransactionType[]
): TransactionsToDisplayPropTypes[] => {
  const transactionsMapper =
    transactions.reduce<TransactionsToDisplayMapperPropTypes>(
      (acc, transaction) => {
        const getValue = getTransactionValue({ transaction });
        const type = getValue(TransactionFields.TYPE);
        const operationType = getOperationType(type);

        if (
          operationType === OperationType.Dividend ||
          operationType === OperationType.StocksEtfSale ||
          operationType === OperationType.StockPurchase
        ) {
          const time = getValue(TransactionFields.TIME);
          const amount = getValue(TransactionFields.AMOUNT);
          const { displayDate } = parseTransactionDate(time);

          return {
            ...acc,
            [displayDate]: {
              date: displayDate,
              type: operationType,
              // Sum the amount for the same date
              amount: (acc[displayDate]?.amount || 0) + parseFloat(amount),
            },
          };
        } else {
          return acc;
        }
      },
      {}
    );

  return Object.values(transactionsMapper);
};

const parseCompanies = (
  companies: Company[]
): Omit<CompanyData, "shortName" | "longName">[] =>
  companies.map(({ symbol, bid, logoUrl, dividendYield, currency }) => ({
    symbol,
    bid,
    logoUrl,
    dividendYield,
    currency,
  }));

type ParseUserDataPropsType = {
  transactions: ParsedTransactionsType;
  companies: CompanyData[];
};

export type ParseUserDataCompanyType = {
  summary: CalculateMarketSummaryReturnType;
  transactions: TransactionType[];
};

export type ParseUserDataReturnType = {
  [companySymbol: string]: ParseUserDataCompanyType;
};

const parseUserData = ({
  transactions,
  companies,
}: ParseUserDataPropsType): ParseUserDataReturnType => {
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
          company,
        }),
      },
    };
  }, {});
};

type GroupTransactionsByMonths = {
  [key: number]: string[];
};

const groupTransactionsByMonths = (
  transactions: TransactionType[],
  lastTransactionDate: ParseTransactionDateReturnType
): GroupTransactionsByMonths =>
  transactions.reduce((acc, transaction) => {
    const getValue = getTransactionValue({ transaction });
    const type = getValue(TransactionFields.TYPE);

    if (getOperationType(type) === OperationType.Dividend) {
      const { month, year } = parseTransactionDate(
        getValue(TransactionFields.TIME)
      );
      const currentMonthList = (acc as GroupTransactionsByMonths)[month] || [];
      const isTransactionRecent =
        lastTransactionDate.year === year ||
        lastTransactionDate.year - 1 === year;

      return {
        ...acc,
        [month]:
          currentMonthList.includes(year.toString()) || !isTransactionRecent
            ? currentMonthList
            : [...currentMonthList, year],
      };
    } else {
      return acc;
    }
  }, {});

const parseTransactionsForExpectedDividends = (
  transactions: TransactionType[],
  lastTransaction: TransactionType
): ParseTransactionsForExpectedDividendsReturnType => {
  const lastTransactionDate = parseTransactionDate(
    getTransactionValue({ transaction: lastTransaction })(
      TransactionFields.TIME
    )
  );
  const lastDividendReceived = transactions.find(
    (transaction) =>
      getTransactionValue({ transaction })(TransactionFields.TYPE) ===
      OperationType.Dividend
  );

  if (lastDividendReceived) {
    const lastDividendValueReceived = parseMessageForDividends(
      lastDividendReceived[4]
    );
    const months = groupTransactionsByMonths(transactions, lastTransactionDate);

    const parsedMonths = Object.entries(months).reduce<{
      next: string[];
      previous: string[];
    }>(
      (acc, [month, years]) => {
        if (years.length) {
          if (Number(month) >= lastTransactionDate.month) {
            return {
              ...acc,
              next: [
                ...acc.next,
                `${getMonthByIndex(Number(month))} ${lastTransactionDate.year}`,
              ],
            };
          } else {
            return {
              ...acc,
              previous: [
                ...acc.previous,
                `${getMonthByIndex(Number(month))} ${
                  lastTransactionDate.year + 1
                }`,
              ],
            };
          }
        } else {
          return acc;
        }
      },
      {
        next: [],
        previous: [],
      }
    );

    return {
      months: [...parsedMonths.next, ...parsedMonths.previous],
      value: lastDividendValueReceived,
    };
  } else {
    return {
      months: [],
      value: 0,
    };
  }
};

export type ParseTransactionsForCalendarReturnType = {
  [year: number]: {
    data: {
      [monthByIndex: string]: {
        data: {
          [companySymbol: string]: {
            totalDividends: number;
          };
        };
        stats: {
          totalDividends: number;
          expectedDividends?: number;
        };
      };
    };
    stats: {
      totalDividends: number;
      expectedDividends?: number;
    };
  };
};

const parseTransactionsForCalendar = (
  transactions: TransactionType[]
): ParseTransactionsForCalendarReturnType => {
  const years = transactions.reduce<ParseTransactionsForCalendarReturnType>(
    (acc, transaction) => {
      const getValue = getTransactionValue({ transaction });

      if (getValue(TransactionFields.TYPE) === OperationType.Dividend) {
        const companySymbol = getValue(TransactionFields.SYMBOL)?.split(
          "."
        )?.[0];
        const { monthByIndex, year } = parseTransactionDate(
          getValue(TransactionFields.TIME)
        );
        const month = acc[year]?.data?.[monthByIndex];
        const amount = getValue(TransactionFields.AMOUNT);

        return {
          ...acc,
          [year]: {
            data: {
              ...(acc[year]?.data || {}),
              [monthByIndex]: {
                data: {
                  ...month?.data,
                  [companySymbol]: {
                    totalDividends:
                      (month?.data?.[companySymbol]?.totalDividends || 0) +
                      parseFloat(amount),
                  },
                },
                stats: {
                  totalDividends:
                    (month?.stats?.totalDividends || 0) + parseFloat(amount),
                },
              },
            },
            stats: {
              totalDividends:
                (acc[year]?.stats?.totalDividends || 0) + parseFloat(amount),
            },
          },
        };
      } else {
        return acc;
      }
    },
    {}
  );

  const { year } = parseTransactionDate(
    getTransactionValue({
      transaction: transactions[0],
    })(TransactionFields.TIME)
  );

  Array(12)
    .fill(void 0)
    .forEach((_, index) => {
      const month = getMonthByIndex(index + 1);

      if (years[year - 1]) {
        if (!years[year - 1].data[month] || years[year].data[month]) {
          return;
        } else {
          years[year].data[month] = {
            data: years[year - 1].data[month].data,
            stats: {
              totalDividends: 0,
              expectedDividends:
                years[year - 1].data[month].stats.totalDividends,
            },
          };
          years[year].stats = {
            ...years[year].stats,
            expectedDividends:
              (years[year].stats.expectedDividends || 0) +
              years[year - 1].data[month].stats.totalDividends,
          };
        }
      }
    });

  return years;
};

const parseTransactionsForLast12MonthsDividend = (
  transactions: TransactionType[]
) => {
  const lastDividendTransaction = transactions.find(
    (transaction) =>
      getOperationType(
        getTransactionValue({ transaction })(TransactionFields.TYPE)
      ) === OperationType.Dividend
  );

  console.log(
    "lastDividendTransaction",
    getTransactionValue({ transaction: transactions[4] })(
      TransactionFields.TYPE
    )
  );

  if (!lastDividendTransaction) {
    return [];
  }

  const lastDividendTransactionTime = getTransactionValue({
    transaction: lastDividendTransaction,
  })(TransactionFields.TIME);
  const { day, month, year } = parseTransactionDate(
    lastDividendTransactionTime
  );
  const lastDividendTransactionDate = new Date(year, month - 1, day);
  const lastDividendTransactionTimestamp =
    lastDividendTransactionDate.getTime();

  return transactions.filter((transaction) => {
    const getValue = getTransactionValue({ transaction });
    const type = getValue(TransactionFields.TYPE);

    if (getOperationType(type) === OperationType.Dividend) {
      const time = getValue(TransactionFields.TIME);
      const transactionDate = parseTransactionDate(time);
      const currentDate = new Date(
        transactionDate.year,
        transactionDate.month - 1,
        transactionDate.day
      );
      const currentDateTimestamp = currentDate.getTime();

      const timeDifference =
        lastDividendTransactionTimestamp - currentDateTimestamp;

      return timeDifference >= 0 && timeDifference <= oneYearInMilliseconds;
    } else {
      return false;
    }
  });
};

const getLast12MonthsDividend = (transactions: TransactionType[]): number =>
  transactions.reduce((total, transaction) => {
    const getValue = getTransactionValue({ transaction });
    const amount = getValue(TransactionFields.AMOUNT);

    return total + parseFloat(amount);
  }, 0);

type ParseGoalsPropTypes = {
  title: string;
  amount: number;
  isGoalAchieved: boolean;
  progress: number;
};

const parseGoals = ({
  goals,
  value,
}: {
  goals: GoalsPropTypes[];
  value: number;
}): ParseGoalsPropTypes[] =>
  goals.map(({ title, amount }) => {
    const progress = (value / (parseFloat(amount) * 12)) * 100;
    const isGoalAchieved = progress >= 100;

    return {
      title,
      amount: parseFloat(amount),
      isGoalAchieved,
      progress,
    };
  });

const parseTransactionsForTotalCompanies = (
  transactions: TransactionType[]
): string[] =>
  transactions.reduce<string[]>((acc, transaction, key) => {
    const getValue = getTransactionValue({ transaction });
    const companySymbol = getValue(TransactionFields.SYMBOL)?.split(".")?.[0];

    // Skip the first element, which is the header row
    if (key === 0) return acc;

    if (Boolean(companySymbol) && !acc.includes(companySymbol)) {
      return [...acc, companySymbol];
    } else {
      return acc;
    }
  }, []);

const filterRawTransactions = (
  transactions: TransactionType[],
  symbols: string[]
): TransactionType[] =>
  transactions.filter((transaction) => {
    const getValue = getTransactionValue({ transaction });
    const companySymbol = getValue(TransactionFields.SYMBOL)?.split(".")?.[0];

    return Boolean(companySymbol) && symbols.includes(companySymbol);
  });

export type GetOverallReturnType = {
  boughtValue: number;
  marketValue: number;
  dividendYields: number;
  profitOrLoss: number;
  profitOrLossPercentage: number;
  dividendYield: number;
};

const getOverall = (
  userData: ParseUserDataReturnType
): GetOverallReturnType => {
  const companiesData = Object.values(userData);
  const overall = companiesData.reduce(
    (total, company) => {
      const { boughtValue, marketValue, dividendYield = 0 } = company.summary;

      return {
        boughtValue: total.boughtValue + boughtValue,
        marketValue: total.marketValue + marketValue,
        dividendYields: total.dividendYields + dividendYield,
      };
    },
    {
      boughtValue: 0,
      marketValue: 0,
      dividendYields: 0,
    }
  );

  const profitOrLoss = overall.marketValue - Math.abs(overall.boughtValue);
  const profitOrLossPercentage =
    (profitOrLoss / Math.abs(overall.boughtValue)) * 100;

  return {
    ...overall,
    profitOrLoss,
    profitOrLossPercentage,
    dividendYield: overall.dividendYields / companiesData.length,
  };
};

export {
  filterRawTransactions,
  getLast12MonthsDividend,
  parseTransactionsForLast12MonthsDividend,
  parseTransactionsForTotalCompanies,
  parseTransactionsForCalendar,
  parseTransactions,
  parseCompanies,
  parseUserData,
  parseGoals,
  getOverall,
};
