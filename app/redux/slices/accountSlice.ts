import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {setStorageValue, getStoragedValue} from 'local_storage';
import {RootState} from 'redux/store';
import {TraningHistoryType} from 'screens/workouts/do-workout/components/FinalModal';
/**
 * State interface
 */
export interface CoachChatSliceInterface {
  trainingHistory: TraningHistoryType;
  loading: boolean;
}
/**
 * Initial state
 */
const initialState: CoachChatSliceInterface = {
  trainingHistory: [],
  loading: true,
};

/**
 * Get training history
 */
export const getTrainingHistory = createAsyncThunk(
  'account/getTrainingHistory',
  async (_, {getState}) => {
    // const {user} = getState() as RootState;
    let tempTraningHistory: TraningHistoryType = [];
    try {
      tempTraningHistory = await getStoragedValue('training_history');
    } catch (error) {}
    tempTraningHistory.reverse();
    /**
     * Return
     */
    return tempTraningHistory;
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    /**
     * Get training history
     */
    builder.addCase(getTrainingHistory.fulfilled, (state, action) => {
      state.trainingHistory = action.payload;
      state.loading = false;
    });
    builder.addCase(getTrainingHistory.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;
