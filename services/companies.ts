import { chunkList } from "@/common/utils";
import { maxCompaniesPerBatch } from "@/constants";
import { CompanyData } from "@/types/companies";

type EnvType = {
    EXPO_PUBLIC_API_URL: string;
    EXPO_PUBLIC_HEADER_KEY_KEY: string;
    EXPO_PUBLIC_HEADER_KEY_VALUE: string;
    EXPO_PUBLIC_HEADER_HOST_KEY: string;
    EXPO_PUBLIC_HEADER_HOST_VALUE: string;
}

const getCompanies = async (symbols: string) => {
    const {
        EXPO_PUBLIC_API_URL,
        EXPO_PUBLIC_HEADER_KEY_KEY,
        EXPO_PUBLIC_HEADER_KEY_VALUE,
        EXPO_PUBLIC_HEADER_HOST_KEY,
        EXPO_PUBLIC_HEADER_HOST_VALUE
    } = process.env as EnvType;

  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}?symbol=${symbols}`, {
        method: 'GET',
        headers: {
            [EXPO_PUBLIC_HEADER_KEY_KEY]: EXPO_PUBLIC_HEADER_KEY_VALUE,
            [EXPO_PUBLIC_HEADER_HOST_KEY]: EXPO_PUBLIC_HEADER_HOST_VALUE
        }
    });

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
        if(batchResponse.success && batchResponse.data?.length) {
            return [...acc, ...batchResponse.data];
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
