const maxCompaniesPerBatch = 10;

const currencies = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
}

const sortBy = [
  {
    label: 'Weight',
    key: 'weight'
  },
  {
    label: 'Market value',
    key: 'marketValue'
  },
  {
    label: 'Dividend yield',
    key: 'dividendYield'
  },
  {
    label: 'Profit/Loss',
    key: 'profitOrLoss'
  },
]

export {
    sortBy,
    currencies,
    maxCompaniesPerBatch
};
