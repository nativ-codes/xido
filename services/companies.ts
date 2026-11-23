import { chunkList } from "@/common/utils/formatters";
import { maxCompaniesPerBatch } from "@/common/constants";
import { CompanyData } from "@/types/companies";

const getCompanies = async (symbols: string) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/companies?symbol=${symbols}`);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

const getCompaniesInBatches = async (tickers: string[]): Promise<CompanyData[]> => {
    const batches = chunkList(tickers, maxCompaniesPerBatch);
    const batchesPromises = batches.map(batch => getCompanies(batch.join(',')))
    const batchesResponse = await Promise.all(batchesPromises);

    return batchesResponse.reduce((acc, batchResponse) => {
        if(batchResponse?.success && batchResponse.data?.length) {
            // Delisted tickers come back as a stub with no price (quoteType "NONE"); treat them as not found
            return [...acc, ...batchResponse.data.filter((company: CompanyData) => typeof company.regularMarketPrice === 'number')];
        } else {
            console.error('Error fetching companies:', batchResponse);
            return acc;
        }
    }, []);
}

export {
    getCompanies,
    getCompaniesInBatches
};
