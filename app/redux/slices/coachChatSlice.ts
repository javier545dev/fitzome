import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {getCoachResponseV1} from 'screens/chat/actions';
import {setStorageValue, getStoragedValue} from 'local_storage';
import {RootState} from 'redux/store';
import * as Common from 'common';
import Config from "react-native-config";
import { eed } from 'common/text-to-speech';
import * as Speech from 'expo-speech';
/**
 * Message Interface
 */
export interface MessageInterface {
  type: 'user' | 'coach';
  message: string;
}
/**
 * State interface
 */
export interface CoachChatSliceInterface {
  messages: MessageInterface[];
  loading: boolean;
}
/**
 * Initial state
 */
const initialState: CoachChatSliceInterface = {
  messages: [],
  loading: false,
};

/**
 * Get wellcome message
 */
export const getWellcomeMessage = createAsyncThunk(
  'coachChat/getWellcomeMessage',
  async (_, {getState}) => {
    const {user} = getState() as RootState;
    const userName = user.name.split(' ')[0] ?? '';
    /**
     * Message
     */
    let message: MessageInterface = {
      type: 'coach',
      message: '',
    };
    try {
      const greeted = await getStoragedValue('greeted');
      if (greeted) {
        message.message = `Hola! ¿Cómo te puedo ayudar?`;
      } else {
        /**
         * greet
         */
        message.message = `Hola ${userName}! Soy tu entrenador personal, ¿Cómo te puedo ayudar?`;
        await setStorageValue('greeted', 'true');
      }
    } catch (error) {
      message.message = `Hola! ¿Cómo te puedo ayudar?`;
    }
    /**
     * Return the message
     */
    return message;
  },
);

/**
 * Get user message
 */
export const getCoachResponse = createAsyncThunk(
  'coachChat/getCoachResponse',
  async (userMessage:string, {getState}): Promise<MessageInterface> => {
      const WitMessage = userMessage.replace(' ', '%20');
      const url = `${Config.WIT_AI_URL}${WitMessage}`;
      let coachResponse = 'Parece que no tienes conexión a internet.\nAsí que no te puedo ayudar en este momento 👉👈';
    try {
        /**
         * connect to wit ai
         */
        const response = await fetch(url, {
            headers:{
                'Authorization': `Bearer ${Config.WIT_AI_TOKEN}`
            }
        });
        const data = await response.json();
        /**
         * Get coach response
         */
        coachResponse = await getCoachResponseV1(data);
        
    } catch (error) {
    }
    const responseCleaned = cleanResponse(coachResponse);
     startSpeach(responseCleaned);
    /**
     * Return the message
     */
    return {
        type: 'coach',
        message: coachResponse, 
    };
  },
);

function cleanResponse(text: string){
  const noHand = text.replace(/👉/gi, '');
  const noEyes = noHand.replace(/👀/gi, '');
  const noMm = noEyes.replace(/Mm../gi, '');
  const noFingers = noMm.replace(/👈/gi, '');
  return noFingers;
}

   async function startSpeach(phrase: string) {
    try {
      await Speech.speak(phrase, { ...eed });
    } catch (error) {
      Common.logEvent('EXPO_TEXT_SPEACH_FAIL');
    }
  }

const coachChatSlice = createSlice({
  name: 'coachChat',
  initialState,
  reducers: {
    updateMessages(state, action: PayloadAction<MessageInterface>){
      state.messages = [...state.messages, action.payload];
      state.loading = true;
    }
  },
  extraReducers: builder => {
    /**
     * Update wellcome message
     */
    builder.addCase(getWellcomeMessage.fulfilled, (state, action) => {
      state.messages = [...state.messages, action.payload];
    });
    /**
     * Get coach response
     */
     builder.addCase(getCoachResponse.fulfilled, (state, action) => {
      state.messages = [...state.messages, action.payload];
      state.loading = false;
    });
  },
});

export const { updateMessages} = coachChatSlice.actions;
export default coachChatSlice.reducer;
