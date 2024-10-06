import { defaultCompaniesState } from '@/constants/states';
import { CalculateMarketSummaryReturnType, Company, CompanyData } from '@/types/companies';
import {OperationType, SummaryType, TransactionType} from '@/types/transactions';

import {getIsOlderThanOneYear} from './dates';

const stats = {
  maxShare: 0,
  minShare: Number.MAX_SAFE_INTEGER,
  dividendsLastYear: 0,
  dividendsAllTime: 0,
}

const parseTransactionsForCompany = (transactions: TransactionType[]) => 
  transactions.reduce((acc, transaction) => {
    const [id, type, time, symbol, comment, amount] = transaction;

    if(type === OperationType.StocksEtfPurchase) {
      const stock = parseMessageForShares(comment);

      return {
        ...acc,
        maxShare: Math.max(acc.maxShare, parseFloat(stock.value)),
        minShare: Math.min(acc.minShare, parseFloat(stock.value)),
      }
    } else if (type === OperationType.Dividend) {
      if(getIsOlderThanOneYear(time)) {
      return {
        ...acc,
        dividendsAllTime: acc.dividendsAllTime + parseFloat(amount)
      }
      } else {
      return {
        ...acc,
        dividendsLastYear: acc.dividendsLastYear + parseFloat(amount),
        dividendsAllTime: acc.dividendsAllTime + parseFloat(amount)
      }
      }

    } else {
      return acc;
    }
}, stats);


/**
 * Parses a message string to extract stock trading information.
 *
 * The expected format of the message is 'OPEN BUY <amount> @ <value>'.
 * For example: 'OPEN BUY 10 @ 114.51'.
 *
 * @param {string} message - The message string to parse.
 * @returns {{ amount: string, value: string }} An object containing the extracted amount and value.
 */
const parseMessageForShares = (message: string) => {
    // 'OPEN BUY 10 @ 114.51'
    const splitByAt = message.split('@');
    // ['OPEN BUY 10 ', ' 114.51']
    const splitBySpace = splitByAt[0].trim().split(' ');
    // ['OPEN', 'BUY', '10']
    const amount = splitBySpace[splitBySpace.length - 1];
    // ['OPEN BUY 10 ', ' 114.51']
    const value = splitByAt[splitByAt.length - 1].trim();

    return {amount, value};
}

type CalculateMarketSummaryPropsType = {
    summary: SummaryType;
    company: CompanyData;
    totalPortfolioValue: number;
}

/**
 * Calculates the market summary for a given company.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {Object} params.summary - The summary object containing stock information.
 * @param {Object} params.company - The company object containing bid information.
 * @returns {Object} The updated summary object with calculated market value and profit or loss.
 */
const calculateMarketSummary = ({
    summary,
    company,
    totalPortfolioValue
}: CalculateMarketSummaryPropsType): CalculateMarketSummaryReturnType => {
    const marketValue = company.bid * summary.shares;
    const profitOrLoss = marketValue - Math.abs(summary.boughtValue);
    const profitOrLossPercentage = (profitOrLoss / Math.abs(summary.boughtValue)) * 100;

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
        weight: ((marketValue / totalPortfolioValue) * 100)
    }
}

type CalculateSummaryPropsType = {
    summary: SummaryType;
    type: OperationType;
    amount: string;
    comment: string;
}

/**
 * Calculates and updates the summary based on the operation type and amount.
 *
 * @param {CalculateSummaryPropsType} param0 - The properties required to calculate the summary.
 * @param {SummaryType} param0.summary - The current summary object.
 * @param {OperationType} param0.type - The type of operation to be performed.
 * @param {string} param0.amount - The amount associated with the operation.
 * @returns {SummaryType} - The updated summary object.
 */
const calculateSummary = ({summary, type, amount, comment}: CalculateSummaryPropsType): SummaryType => {
  const newSummary = {...summary};

  switch(type) {
    case OperationType.Dividend:
      newSummary.dividends += parseFloat(amount);
      break;
    case OperationType.WithholdingTax:
      newSummary.withholdingTax += parseFloat(amount);
      break;      
    case OperationType.StocksEtfPurchase:
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
}

type ParsedTransactionsPropsType = {
    summary: SummaryType;
    transactions: Array<TransactionType>;
}

type ParsedTransactionsType = {
    summary: SummaryType;
    companies: Record<string, ParsedTransactionsPropsType>;
}

/**
 * Parses an array of transactions and returns a summary and detailed transactions for each company.
 *
 * @param {TransactionType[]} transactions - The array of transactions to parse. The first element is assumed to be the header row and is skipped.
 * @returns {ParsedTransactionsType} An object containing the summary of all transactions and detailed transactions for each company.
 */
const parseTransactions = (transactions: TransactionType[]) => {
  return transactions.reduce((parsedTransactions: ParsedTransactionsType, transaction, key) => {
    // Skip the first element, which is the header row
    if(key === 0) return parsedTransactions;

    const [id, type, time, symbol, comment, amount] = transaction as TransactionType;
    const companySymbol = symbol?.split('.')?.[0];
    const newCompanies = Boolean(companySymbol) ? {
      ...parsedTransactions.companies,
      [companySymbol]: {
        summary: calculateSummary({
            summary: parsedTransactions.companies[companySymbol]?.summary || defaultCompaniesState.summary,
            type,
            amount,
            comment
        }),
        transactions: [...(parsedTransactions.companies[companySymbol]?.transactions || []), transaction]
      },
    } : parsedTransactions.companies;

    return {
      summary: calculateSummary({summary: parsedTransactions.summary, type, amount, comment}),
      companies: newCompanies,
    };
  }, defaultCompaniesState);
}

/**
 * Parses an array of Company objects and extracts specific fields to create an array of CompanyData objects.
 *
 * @param {Company[]} companies - The array of Company objects to be parsed.
 * @returns {CompanyData[]} An array of CompanyData objects containing the symbol, bid, and logoUrl fields.
 */
const parseCompanies = (companies: Company[]): CompanyData[] => 
    companies.map(({symbol, bid, logoUrl, dividendYield, currency}) => ({
        symbol,
        bid,
        logoUrl,
        dividendYield,
        currency
    }))

type ParseUserDataPropsType = {
    transactions: ParsedTransactionsType;
    companies: CompanyData[];
}

/**
 * Parses user data by reducing the companies array and calculating the market summary for each company.
 *
 * @param {ParseUserDataPropsType} param0 - The input object containing transactions and companies.
 * @param {Array} param0.transactions - The transactions data.
 * @param {Array} param0.companies - The companies data.
 * @returns {Object} An object where each key is a company symbol and the value is the company's data with an updated summary.
 */
const parseUserData = ({
    transactions,
    companies
}: ParseUserDataPropsType) => {
    const totalPortfolioValue = companies.reduce((acc, company) => {
        const currentCompany = transactions.companies[company.symbol];
        return acc + (company.bid * currentCompany.summary.shares);
    }, 0);

    return companies.reduce((acc, company) => {
        const currentCompany = transactions.companies[company.symbol];

        return {
            ...acc,
            [company.symbol]: {
                ...currentCompany,
                summary: calculateMarketSummary({
                    totalPortfolioValue,
                    summary: currentCompany.summary,
                    company
                })
            }
        }
    }, {})
}

export {
    parseTransactionsForCompany,
    parseTransactions,
    parseCompanies,
    parseUserData
};
