const shareStatsDefault = {
  maxShare: 0,
  minShare: Number.MAX_SAFE_INTEGER,
};

const dividendStatsDefault = {
  dividendsAllTime: 0,
  dividendsLastYear: 0,
};

const companiesStatsDefault = {
  companies: {},
  summary: {
    dividends: 0,
    withholdingTax: 0,
    shares: 0,
    spinOffs: 0,
    boughtValue: 0,
    freeFundsInterest: 0,
    freeFundsInterestTax: 0,
  },
};

export { companiesStatsDefault, shareStatsDefault, dividendStatsDefault };
