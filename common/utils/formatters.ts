import { currencies } from "@/constants";

/**
 * Splits an array into chunks of a specified size.
 *
 * @param list - The array to be split into chunks.
 * @param chunkSize - The size of each chunk.
 * @returns An array of arrays, where each sub-array is a chunk of the original array.
 */
const chunkList = (list: Array<any>, chunkSize: number) => {
  const result = [];

  for (let i = 0; i < list.length; i += chunkSize) {
    result.push(list.slice(i, i + chunkSize));
  }

  return result;
};

/**
 * Formats a numeric value as a currency string.
 *
 * @param value - The numeric value to format.
 * @param currency - The currency type to format the value in.
 * @returns A string representing the formatted currency value.
 */
const formatValue = (value: number, currency: keyof typeof currencies) => {
  return `${currencies[currency]}${(value || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/**
 * Formats a numeric value as a percentage string with two decimal places.
 *
 * @param value - The numeric value to format.
 * @returns The formatted percentage string.
 */
const formatPercentValue = (value?: number) => {
  return `${(value || 0).toFixed(2)}%`;
}

export {
    chunkList,
    formatValue,
    formatPercentValue
};
