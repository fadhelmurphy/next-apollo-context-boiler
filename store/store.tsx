/* eslint-disable react/display-name */
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import rootReducer from "./reducers";
import { combineDispatch, stateToPersist } from "@/utils/utils";
import { IGlobalStateInterface } from "Types/collection";

const initialState: IGlobalStateInterface = {
  collection: {
    AllCollection: [],
  },
};

export const RootContext = createContext({});
export const RootDispatch = createContext({});

export const STORAGE_KEY = "rootState";

const selectedStateToPersist: string[] = ["collection"];

const Context = ({ children }: { children: JSX.Element }) => {
  //#COMBINE STATE
  const [stateCollection, dispatchCollection] = useReducer(
    rootReducer,
    initialState,
    () => {
      const Local: string | null = typeof window !== 'undefined' ? (localStorage?.getItem(STORAGE_KEY)) : null;
      return Local ? JSON.parse(Local) : initialState;
    }
  ); // some init state {}
  const combinedDispatch = useMemo(() => dispatchCollection, [dispatchCollection]);
  const combinedState = React.useMemo(
    () => ({ ...stateCollection }),
    [stateCollection]
  );

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(stateToPersist(selectedStateToPersist, combinedState))
    );
  }, [combinedState]);

  return (
    <RootDispatch.Provider value={combinedDispatch}>
      <RootContext.Provider value={combinedState}>
        {children}
      </RootContext.Provider>
    </RootDispatch.Provider>
  );
};

export const useRootContext = () => {
  const context = useContext(RootContext);

  return useMemo(() => context, [context]);
};

export const useRootDispatch = () => {
  const dispatchContext = useContext(RootDispatch);

  return useMemo(() => dispatchContext, [dispatchContext]);
};

export default Context;
