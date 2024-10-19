import { currencies } from "@/constants";
import { TransactionsToDisplayPropTypes } from "./transactions";

export interface Company {
  language: string;
  region: string;
  quoteType: string;
  typeDisp: string;
  quoteSourceName: string;
  triggerable: boolean;
  customPriceAlertConfidence: string;
  quoteSummary: QuoteSummary;
  currency: string;
  components?: (string)[] | null;
  totalCash: number;
  floatShares: number;
  ebitda?: number | null;
  earningsTimestampEnd: number;
  trailingAnnualDividendRate: number;
  trailingPE: number;
  pegRatio: number;
  dividendsPerShare: number;
  dividendRate: number;
  trailingAnnualDividendYield: number;
  dividendYield: number;
  revenue: number;
  priceToSales: number;
  marketState: string;
  epsTrailingTwelveMonths: number;
  epsForward: number;
  epsCurrentYear: number;
  epsNextQuarter: number;
  priceEpsCurrentYear: number;
  priceEpsNextQuarter: number;
  sharesOutstanding: number;
  bookValue: number;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
  forwardPE: number;
  priceToBook: number;
  sourceInterval: number;
  exchangeDataDelayedBy: number;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  pageViews: PageViews;
  gmtOffSetMilliseconds: number;
  esgPopulated: boolean;
  tradeable: boolean;
  cryptoTradeable: boolean;
  ask: number;
  bidSize: number;
  askSize: number;
  exchange: string;
  market: string;
  messageBoardId: string;
  fullExchangeName: string;
  shortName: string;
  companyLogoUrl?: string | null;
  longName: string;
  regularMarketOpen: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  beta: number;
  logoUrl?: string | null;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  dividendDate: number;
  exDividendDate: number;
  earningsTimestamp: number;
  earningsTimestampStart: number;
  shortRatio: number;
  preMarketChange: number;
  preMarketChangePercent: number;
  preMarketTime: number;
  targetPriceHigh: number;
  targetPriceLow: number;
  targetPriceMean: number;
  targetPriceMedian: number;
  preMarketPrice: number;
  heldPercentInsiders: number;
  heldPercentInstitutions: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: number;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  sharesShort: number;
  sharesShortPrevMonth: number;
  shortPercentFloat: number;
  regularMarketPreviousClose: number;
  bid: number;
  hasPrePostMarketData: boolean;
  firstTradeDateMilliseconds: number;
  priceHint: number;
  symbol: string;
}

export interface QuoteSummary {
  summaryDetail: SummaryDetail;
}

export interface SummaryDetail {
  maxAge: number;
  priceHint: number;
  previousClose: number;
  open: number;
  dayLow: number;
  dayHigh: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
  dividendRate: number;
  dividendYield: number;
  exDividendDate: number;
  payoutRatio: number;
  fiveYearAvgDividendYield: number;
  beta: number;
  trailingPE: number;
  forwardPE: number;
  volume: number;
  regularMarketVolume: number;
  averageVolume: number;
  averageVolume10days: number;
  averageDailyVolume10Day: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  marketCap: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  priceToSalesTrailing12Months: number;
  fiftyDayAverage: number;
  twoHundredDayAverage: number;
  trailingAnnualDividendRate: number;
  trailingAnnualDividendYield: number;
  currency: string;
  fromCurrency?: null;
  toCurrency?: null;
  lastMarket?: null;
  coinMarketCapLink?: null;
  algorithm?: null;
  tradeable: boolean;
}

export interface PageViews {
  midTermTrend: string;
  longTermTrend: string;
  shortTermTrend: string;
}

export type CompanyData = {
  symbol: string;
  bid: number;
  logoUrl?: string | null | undefined;
  companyLogoUrl?: string | null | undefined;
  shortName?: string;
  longName?: string;
  dividendYield: number;
  currency: string;
}

export type ParseTransactionsForExpectedDividendsReturnType = {
  months: string[];
  value: number;
};

export type CalculateMarketSummaryReturnType = {
  bid: number;
  marketValue: number;
  profitOrLoss: number;
  dividendYield: number;
  profitOrLossPercentage: number;
  currency: typeof currencies;
  companyLogo: string | null | undefined;
  companyName: string | undefined;
  symbol: string;
  weight: number;
  boughtValue: number;
  shares: number;
  maxShare: number;
  minShare: number;
  dividendsLastYear: number;
  dividendsAllTime: number;
  latestTransactions: TransactionsToDisplayPropTypes[];
  expectedDividends: ParseTransactionsForExpectedDividendsReturnType
}