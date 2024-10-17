export enum ListItemVariants {
  DEFAULT = 'DEFAULT',
  PROFIT = 'PROFIT',
  LOSS = 'LOSS'
}

export type SortByPropTypes = {
  label: string;
  key: string;
}

export enum InfoSections {
  OVERALL = 'OVERALL',
  SHARES = 'SHARES',
  DIVIDENDS = 'DIVIDENDS',
  EXPECTED_DIVIDENDS = 'EXPECTED_DIVIDENDS',
  LATEST_TRANSACTIONS = 'LATEST_TRANSACTIONS',
}