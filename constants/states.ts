const defaultCompaniesState = {
  companies: {},
  summary: {
    dividends: 0,
    withholdingTax: 0,
    shares: 0,
    spinOffs: 0,
    boughtValue: 0,
    freeFundsInterest: 0,
    freeFundsInterestTax: 0,
  }
}

const columnTitles = ['ID', 'Type', 'Time', 'Symbol', 'Comment', 'Amount'];

export {
    columnTitles,
    defaultCompaniesState
};
