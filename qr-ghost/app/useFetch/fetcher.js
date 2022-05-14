import { configuration } from "./configuration";

/**
 * Fetch Data from remote service within an endpoint
 * @param {string} endpoint URL endpoint ex: customers/active
 * @param {{queryParams: {[key: string]: string}}} options some query params to passe in the request
 */
export const fetcher = function (endpoint, options = { queryParams: {} }) {
  const params = Object.keys(options?.queryParams || {})
    .map((key) => `${key}=${options.queryParams[key]}`)
    .join("&");
  const url = `${configuration.baseUrl}${endpoint}${params.length > 0 ? `?${params}` : ""}`;
  return {
    key: url,
    fetch() {
      return new Promise(async function (resolve, reject) {
        try {
          const response = await fetch(url, { method: "GET", headers: { ...configuration.authentificationHeader() } });
          if (!response.ok) {
            return resolve(void 0);
          }

          const textContent = await response.text();
          if (new Blob([textContent]).size > configuration.maximumSize) {
            return resolve(void 0);
          }

          return resolve(JSON.parse(textContent));
        } catch (error) {
          console.error(error);
          reject(error.message);
        }
      });
    },
  };
};
