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

export {
    chunkList
};
