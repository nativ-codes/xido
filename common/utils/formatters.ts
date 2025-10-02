import { currencies } from "@/common/constants";

/**
 * Splits an array into chunks of a specified size.
 *
 * @param list - The array to be split into chunks.
 * @param chunkSize - The size of each chunk.
 * @returns An array of arrays, where each sub-array is a chunk of the original array.
 */
export const chunkList = (list: Array<any>, chunkSize: number) => {
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
export const formatValue = (
  value: number,
  currency: keyof typeof currencies
) => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  return `${isNegative ? "-" : ""}${currencies[currency]}${absoluteValue
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

/**
 * Formats a numeric value as a percentage string with two decimal places.
 *
 * @param value - The numeric value to format.
 * @returns The formatted percentage string.
 */
export const formatPercentValue = (value?: number) => {
  return `${(value || 0).toFixed(2)}%`;
};

/**
 * Converts a string to title case.
 */
export const toTitleCase = (text: string): string => {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
