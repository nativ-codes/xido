export enum OperationType {
  Deposit = 'Deposit',
  Dividend = 'Dividend',
  SpinOff = 'Spin off',
  WithholdingTax = 'Withholding tax',
  StocksEtfSale = 'Stocks/ETF sale',
  StocksEtfPurchase = 'Stocks/ETF purchase',
  FreeFundsInterests = 'Free funds interests',
  FreeFundsInterestsTax = 'Free funds interests tax'
}

export type SummaryType = {
    dividends: number;
    withholdingTax: number;
    stocks: number;
    spinOffs: number;
    freeFundsInterest: number;
    freeFundsInterestTax: number;
    boughtValue: number;
}

export type TransactionType = [string, OperationType, string, string, string, string];
