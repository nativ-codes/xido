import { CalculateMarketSummaryReturnType } from "./companies";

export enum ListItemVariants {
  DEFAULT = 'DEFAULT',
  PROFIT = 'PROFIT',
  LOSS = 'LOSS'
}

export type SortByPropTypes = {
	label: string;
	key: keyof CalculateMarketSummaryReturnType;
};

export enum CompanyInfoSections {
  OVERALL = 'OVERALL',
  SHARES = 'SHARES',
  DIVIDENDS = 'DIVIDENDS',
  EXPECTED_DIVIDENDS = 'EXPECTED_DIVIDENDS',
  LATEST_TRANSACTIONS = 'LATEST_TRANSACTIONS'
}

export enum LegalTypes {
  TERMS_AND_CONDITIONS = 'TermsAndConditions',
  PRIVACY_POLICY = 'PrivacyPolicy'
};

export enum HomeInfoSections {
  DIVIDENDS = 'DIVIDENDS',
  PORTFOLIO = 'PORTFOLIO'
};

export type InfoSectionType = {
  title: string;
  description: string;
};

export type GoalsPropTypes = {
  id: string;
  title: string;
  amount: string;
  isGoalAchieved?: boolean;
  progress?: string;
};
