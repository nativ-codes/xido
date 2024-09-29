import { defaultCompaniesState } from '@/constants/states';
import { Company, CompanyData } from '@/types/companies';
import {OperationType, SummaryType, TransactionType} from '@/types/transactions';

/**
 * Parses a message for stocks and returns the amount.
 *
 * @param {string} message - The message to parse.
 * @returns {string} - The amount of stocks in the message.
 */
const parseMessageForStocks = (message: string) => {
    // 'OPEN BUY 10 @ 114.51'
    const splitByAt = message.split('@');
    // ['OPEN BUY 10 ', ' 114.51']
    const splitBySpace = splitByAt[0].trim().split(' ');
    // ['OPEN', 'BUY', '10']
    const amount = splitBySpace[splitBySpace.length - 1];

    return amount;
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
      newSummary.stocks += parseFloat(parseMessageForStocks(comment));
      break;
    case OperationType.StocksEtfSale:
      newSummary.boughtValue -= parseFloat(amount);
      newSummary.stocks -= parseFloat(parseMessageForStocks(comment));
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
    const newCompanies = Boolean(symbol) ? {
      ...parsedTransactions.companies,
      [symbol]: {
        summary: calculateSummary({
            summary: parsedTransactions.companies[symbol]?.summary || defaultCompaniesState.summary,
            type,
            amount,
            comment
        }),
        transactions: [...(parsedTransactions.companies[symbol]?.transactions || []), transaction]
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
    companies.map(({symbol, bid, logoUrl}) => ({
        symbol,
        bid,
        logoUrl,
    }))

const parseUserData = (transactions, companies) => {

}

export {
    parseTransactions,
    parseCompanies
};
