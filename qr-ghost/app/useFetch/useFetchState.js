import { useCallback, useState } from "react";
import { useRedux } from "./useRedux";

/**
 * Fetch state manager
 * @returns {[{[key: string]: any}, (obj: {[key: string]: any}) => void]} state and setState
 */
export const useFetchState = function () {
  let method = "state";
  let [state, setState] = useState({});
  try {
    [state, setState] = useRedux();
    method = "redux";
  } catch {
    console.warn("Redux provider does not exist");
  }

  const onUpdateState = useCallback(
    /**
     * Update the fetch state
     * @param {{[key: string]: any}} obj
     */
    function (obj) {
      if (method === "redux") {
        setState({ type: "SET_FETCH", payload: { ...obj } });
        return;
      }

      setState((state) => ({ ...state, ...obj }));
    },
    [method]
  );

  return [state, onUpdateState];
};
