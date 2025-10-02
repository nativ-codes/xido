import { mockedCompanies } from "@/__mocks__";
import { getCompaniesInBatches } from "@/services/companies";
import { FetchCompaniesErrorEnum } from "./fetch-companies.types";
import { CompanyData } from "@/types/companies";

export const shouldUseMockedData = false;

type FetchCompaniesReturnType = {
  companies?: CompanyData[];
  error?: {
    type: FetchCompaniesErrorEnum;
    data: string[];
  };
};

type FetchCompaniesType = {
  storedSymbols: string[];
};

export const fetchCompanies = async ({
  storedSymbols,
}: FetchCompaniesType): Promise<FetchCompaniesReturnType> => {
  if (storedSymbols.length) {
    const companies = shouldUseMockedData
      ? mockedCompanies
      : await getCompaniesInBatches(storedSymbols);

    if (companies.length === storedSymbols.length) {
      return {
        companies,
      };
    } else {
      const companySymbols = companies.map((company) => company.symbol);
      const missingSymbols = storedSymbols.filter(
        (symbol) => !companySymbols.includes(symbol)
      );

      // console.log('lengths not matching', companies.length, storedSymbols.length);
      return {
        companies,
        error: {
          type: FetchCompaniesErrorEnum.MISSING_COMPANIES,
          data: missingSymbols,
        },
      };
    }
  } else {
    return {
      error: {
        type: FetchCompaniesErrorEnum.NO_SYMBOLS,
        data: [],
      },
    };
  }
};
