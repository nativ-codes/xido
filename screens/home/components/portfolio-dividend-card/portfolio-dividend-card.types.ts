import { currencies } from "@/common/constants";
import { GetOverallReturnType, ParseUserDataReturnType } from "@/common/utils";

export type PortfolioDividendCardPropsType = {
  overall: GetOverallReturnType;
  currency: keyof typeof currencies;
  onInfoPress: () => void;
};
