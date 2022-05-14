import { useDispatch, useSelector } from "react-redux";

export const useRedux = function () {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return [state, dispatch];
};
