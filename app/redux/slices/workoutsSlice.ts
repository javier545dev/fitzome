import {createSlice, PayloadAction,  createAsyncThunk} from '@reduxjs/toolkit';

import {createWorkout, mergeExercises, getNoRepitedExercises,  } from 'screens/workouts/actions';
import {
  WorkoutInterface,
  WorkoutsTypes,
} from 'screens/workouts/actions/workout';

import { SavedExerciseInterface } from 'screens/workouts/components/DownloadExercise';

import {ExerciseInterface} from '@resources/data/exercises';
import {UserState} from 'redux/slices/userSlice';
import {setStorageValue, getStoragedValue} from 'local_storage';
import { RootState } from 'redux/store';
/**
 * State interface
 */
export interface WorkoutsSliceInterface {
  currentWorkout: {
    rounds: WorkoutInterface['rounds'];
  };
  noRepitedExercises: ExerciseInterface[];
  loading: boolean;
}

/**
 * Initial state
 */
const initialState: WorkoutsSliceInterface = {
  currentWorkout: {
    rounds: [],
  },
  noRepitedExercises: [],
  loading: true,
};

/**
 * Get workout interface
 */
interface getWorkoutProps {
  workoutKey: string;
  type: WorkoutsTypes;
  user: UserState;
}
/**
 * Get current workout
 */
export const getWorkout = createAsyncThunk(
  'workouts/getWorkout',
  async ({workoutKey, type, user}: getWorkoutProps, thunkAPI) => {
    /**
     * 
     */
    let rounds: WorkoutInterface['rounds'] = [];
    let savedExercises: {
      [key:string]: SavedExerciseInterface;
    } = {};
    try {
      /**
       * If workout is type stretching or warmup create a new workout
       * every time
       */
      if(!(type === 'general_warmup' || type === 'stretching' || type === 'lower_warmup' || type === 'upper_warmup')){
          /**
         * Check if workout is saved
         */
         rounds = await getStoragedValue(workoutKey) ?? [];
      }
      /**
       * Get saved exercises
       */
      savedExercises = await getStoragedValue(`exercises`) ?? {};
      /**
       * Create a new workout
       */
      if (rounds.length === 0) {
        rounds = createWorkout(type, 2, user);
        // save workout
        await setStorageValue(workoutKey, rounds);
      }
    } catch (error) {
      /**
       * Create a new workout
       */
      rounds = createWorkout(type, 2, user);
      // save workout
      await setStorageValue(workoutKey, rounds);
    }
    /**
     * Remplace workout exercises with saved exercises
     */
    const workoutWithSavedExercises = mergeExercises(savedExercises, rounds);
    /**
    * Get no repited exercises
    */
    const noRepitedExercises = getNoRepitedExercises(workoutWithSavedExercises);
    /**
     * Return the workout
     */
    return {
      rounds: workoutWithSavedExercises,
      noRepitedExercises,
    };
  },
);

/**
 * Update no repited exercises
 */
export const updateNoRepitedExercises = createAsyncThunk(
  'workouts/noRepitedExercises',
    async (_, {getState}) => {
    /** */
    const { workouts} = getState() as RootState;
    const {rounds} = workouts.currentWorkout;
    /** */
    let savedExercises: {
      [key:string]: SavedExerciseInterface;
    } = {};
    /** */
    try {
      /**
       * Get saved exercises
       */
      savedExercises = await getStoragedValue(`exercises`) ?? {};
    } catch (error) {
     
    }
    /**
     * Remplace workout exercises with saved exercises
     */
    const workoutWithSavedExercises = mergeExercises(savedExercises, rounds);
    /**
    * Get no repited exercises
    */
    const noRepitedExercises = getNoRepitedExercises(workoutWithSavedExercises);
    /**
     * Return the exercises
     */
    return {
      rounds: workoutWithSavedExercises,
      noRepitedExercises,
    };
  },
);


const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    toogleLoading(state, action:PayloadAction<boolean>) {
      state.loading = action.payload
    }
  },
  extraReducers: builder => {
    /**
     * Get workout reducer
     */
    builder.addCase(getWorkout.fulfilled, (state, action) => {
      state.currentWorkout = {
        ...state.currentWorkout,
        rounds: action.payload.rounds,
      };
      state.noRepitedExercises = action.payload.noRepitedExercises;
      if(action.payload.rounds.length > 0){
        state.loading = false;
      }
    });
    /**
     * Update no repited exercises
     */
    builder.addCase(updateNoRepitedExercises.fulfilled, (state, action)=> {
       state.currentWorkout = {
        ...state.currentWorkout,
        rounds: action.payload.rounds,
      };
      state.noRepitedExercises = action.payload.noRepitedExercises;
    })
  },
});

export const { toogleLoading } = workoutsSlice.actions;
export default workoutsSlice.reducer;
