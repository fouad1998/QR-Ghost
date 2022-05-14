/**
 * Check if two fetchers are the same
 * @param {{[key: string]: {key: string, fetch(): Promise}}} fetchersA Fecthers A
 * @param {{[key: string]: {key: string, fetch(): Promise}}} fetchersB Fetchers B
 * @returns {boolean} is the same
 */
export const isEqualFetchers = function (fetchersA, fetchersB) {
  if (typeof fetchersA !== typeof fetchersB) {
    return false;
  }

  const keysA = Object.keys(fetchersA);
  const keysB = Object.keys(fetchersB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  if (keysB.some((key) => !keysB.includes(key))) {
    return false;
  }

  for (const key of keysA) {
    if (fetchersA[key].key !== fetchersB[key].key) {
      return false;
    }
  }

  return true;
};
