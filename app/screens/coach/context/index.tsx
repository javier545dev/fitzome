import { createContext } from 'react';

type InitialStateType = {
    currentIndex: number, 
    showWhatsappModal: boolean,
};
  
export const initialState = {
    currentIndex: 0, 
    showWhatsappModal: false,
};

type ACTIONTYPE =
  | { type: "UPDATE_INDEX"; payload: number }
  | { type: "SHOW_WHATSAPP_MODAL"; payload: boolean };

export const reducer = (state: InitialStateType, action: ACTIONTYPE) => {
    switch (action.type) {
       case 'UPDATE_INDEX':
          return { ...state, currentIndex: action.payload, };
      case 'SHOW_WHATSAPP_MODAL':
          return { ...state, showWhatsappModal: action.payload, };
      default: throw new Error();
    }
}

export interface ContextProps {
    state: InitialStateType;
    dispatch: React.Dispatch<ACTIONTYPE>;
 }
 
 const CoachContext = createContext<ContextProps>({
    state: initialState,
    dispatch: () => {}
 });
 
 export const CoachContextConsumer = CoachContext.Consumer;
 export const CoachContextProvider = CoachContext.Provider;
 export default CoachContext;
