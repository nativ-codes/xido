import { columnTitles } from "@/common/constants";
import { OperationType } from "@/types";

const validateColumnTitles = (titles: string[]): boolean =>
  titles.every((title) => columnTitles.includes(title));

const getIsEmpty = (value: any) => !Object.keys(value).length;

const getOperationType = (type: string): OperationType => {
  switch (type.toLowerCase()) {
    case "cumpărare acțiuni/etf-uri":
    case "stock purchase":
      return OperationType.StockPurchase;
    case "vânzare acțiuni/etf-uri":
    case "stocks/etf sale":
      return OperationType.StocksEtfSale;
    case "dividend":
    case "divident":
      return OperationType.Dividend;
    default:
      return OperationType.Other;
  }
};

export { getIsEmpty, validateColumnTitles, getOperationType };
