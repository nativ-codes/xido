import { currencies } from "@/common/constants";
import { GetOverallReturnType } from "@/common/utils";

export type PortfolioInvestmentCardPropsType = {
  overall: GetOverallReturnType;
  currency: keyof typeof currencies;
  onInfoPress: () => void;
};
