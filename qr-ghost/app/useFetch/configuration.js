const defaultConfig = {
  baseUrl: "",
  authentificationHeader() {
    return {};
  },
  compressionTimeoutDelay: 200,
  maximumSize: 2 * 1024 * 1024,
  protectedFromCleaning: [],
};

export const configuration = defaultConfig;

/**
 * Config your useFetch preferences
 * @param {(configuration: typeof defaultConfig) => void} hanlder
 */
export const configure = function (hanlder = () => {}) {
  hanlder(configuration);
};
