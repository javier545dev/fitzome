import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

import {ExerciseInterface, exercises} from '@resources/data/exercises';
import {setStorageValue, getStoragedValue} from 'local_storage';
/**
 * State interface
 */
export interface ExercisesSliceInterface {
  exercises: {
    [key: string]: ExerciseInterface;
  };
  downloading: boolean;
}

/**
 * Initial state
 */
const initialState: ExercisesSliceInterface = {
  exercises: {},
  downloading: false,
};

/**
 * Get exercises
 */
export const getExercises = createAsyncThunk(
  'exercises/getExercises',
  async () => {
    let temExercises: {
      [key: string]: ExerciseInterface;
    } = {};
    try {
      /**
       * Check if exercises are allready saved
       */
      temExercises = await getStoragedValue('exercises');
      /**
       * If not saved exercises
       */
      if (temExercises === null) {
        temExercises = {...exercises};
        setStorageValue('exercises', temExercises);
      }
    } catch (error) {
      /**
       * Save exercises
       */
      temExercises = {...exercises};
      setStorageValue('exercises', temExercises);
    }
    /**
     * Return exercises
     */
    return {exercises: temExercises};
  },
);

const ExercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    /** */
    toogledDownloading(state, action: PayloadAction<boolean>) {
      state.downloading = action.payload;
    },
  },
  extraReducers: builder => {
    /**
     * Set exercises
     */
    builder.addCase(getExercises.fulfilled, (state, action) => {
      state.exercises = {...action.payload.exercises};
    });
    /**
     *
     */
  },
});

export const {toogledDownloading} = ExercisesSlice.actions;
export default ExercisesSlice.reducer;
