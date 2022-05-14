import { useEffect, useMemo, useRef, useState } from "react";
import Cache from "./cache";
import { fetcher } from "./fetcher";
import { isEqualFetchers } from "./tools";
import { useFetchState } from "./useFetchState";

/**
 * Make batch of request within cache for performance
 * @param {(fetch: typeof fetcher) => {[key: string]:{key: string, fetch(): Promise<any>}}} requester function which create an object of key value of requests
 * @returns {[{[key: string]: any}, boolean]} batch requests result
 */
export const useFetch = function (requester) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useFetchState();
  const previousFetchers = useRef(void 0);
  const fetchers = useMemo(
    /**
     * @returns {{[key: string]: {key: string, fetch(): Promise}}}
     */
    function () {
      const currentFetchers = requester(fetcher);
      if (isEqualFetchers(previousFetchers.current, currentFetchers)) {
        return previousFetchers.current;
      }

      return currentFetchers;
    },
    [requester]
  );
  const keys = useMemo(
    function () {
      return Object.keys(fetchers);
    },
    [fetchers]
  );
  previousFetchers.current = fetchers;

  useEffect(
    function () {
      setLoading(true);
      const resolvedRequests = [];
      const requestsLength = Object.keys(fetchers).length;
      Object.keys(fetchers).forEach(function (key) {
        const { key: cacheKey, fetch } = fetchers[key];
        if (Cache.hasKey(cacheKey)) {
          const obj = Cache.readObject(cacheKey);
          setState({ [key]: obj });
          resolvedRequests.push(cacheKey);
          if (requestsLength === resolvedRequests.length) {
            setLoading(false);
          }
        }

        fetch()
          .then(function (obj) {
            if (typeof obj === "undefined") {
              return;
            }

            setState({ [key]: obj });
            Cache.writeObject(cacheKey, obj);
          })
          .finally(function () {
            if (resolvedRequests.indexOf(cacheKey) === -1) {
              resolvedRequests.push(cacheKey);
            }

            if (requestsLength === resolvedRequests.length) {
              setLoading(false);
            }
          });
      });
    },
    [fetchers, setState]
  );

  return [keys.reduce((prev, key) => ({ ...prev, [key]: state[key] }), {}), loading];
};
