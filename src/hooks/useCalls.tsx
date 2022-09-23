import { useContext } from "react";
import { CallsContext } from "../contexts";

export const useCalls = () => {
  return useContext(CallsContext);
};
