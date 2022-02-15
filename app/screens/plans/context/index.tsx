import { createContext } from 'react';

//https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
//https://www.youtube.com/watch?v=hYXFutvueA8

type InitialStateType = {
    days: number[];
};
  
export const initialState = {
    days: [0,0,0,0,0,0,0],
};

type ACTIONTYPE =
  | { type: "UPDATE_DAYS"; payload: number[] };

export const reducer = (state: InitialStateType, action: ACTIONTYPE) => {
    switch (action.type) {
      case 'UPDATE_DAYS': 
        return { ...state, days: action.payload, };
      default: throw new Error();
    }
}

export interface ContextProps {
    state: InitialStateType;
    dispatch: React.Dispatch<ACTIONTYPE>;
 }
 
 const PlanContext = createContext<ContextProps>({
    state: initialState,
    dispatch: () => {}
 });
 
 export const PlanContextConsumer = PlanContext.Consumer;
 export const PlanContextProvider = PlanContext.Provider;
 export default PlanContext;
