import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {setStorageValue, getStoragedValue} from 'local_storage';
import {RootState} from 'redux/store';

/**
 * State interface
 */
export interface PlansSliceInterface {
  loading: boolean;
  planConfig: {
    days: number[];
    daysSelected: number;
  };
}

/**
 * Initial state
 */
const initialState: PlansSliceInterface = {
  loading: false,
  planConfig: {
    daysSelected: 0,
    days: [0, 0, 0, 0, 0, 0, 0],
  },
};

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    toogleLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateTrainingDays(state, action: PayloadAction<number[]>) {
      let daysSelected = 0;
      action.payload.forEach(d => {
        if (d === 1) daysSelected += 1;
      });
      /** */
      state.planConfig = {
        ...state.planConfig,
        days: action.payload,
        daysSelected,
      };
    },
  },
  extraReducers: builder => {
    /**
     * Get workout reducer
     */
  },
});

export const {toogleLoading, updateTrainingDays} = plansSlice.actions;
export default plansSlice.reducer;
