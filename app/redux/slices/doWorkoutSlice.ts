import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
/**
 * Types
 */
import {WorkoutInterface} from 'screens/workouts/actions/workout';
/**
 * Methods
 */
import {getExercisesTotal} from 'screens/workouts/do-workout/actions';
import {ExerciseInterface, exercises} from '@resources/data/exercises';
import * as Common from 'common';
/**
 * State interface
 */
export type TrainingHistoryTypes = Array<{
  key: string;
  start_date?: number;
  end_date?: number;
  value?: 30 | 60 | 90;
  exercise?: ExerciseInterface;
}>;

export interface WorkoutsSliceInterface {
  currentWorkout: {
    rounds: WorkoutInterface['rounds'];
  };
  key: string;
  title: string;
  currentExercise: ExerciseInterface;
  nextExerciseName: string;
  totalOfExercises: number[];
  /**
   * Boolean
   */
  loading: boolean;
  exerciseLoading: boolean;
  changeExercise: boolean;
  restModal: boolean;
  selectRestModal: boolean;
  finalModal: boolean;
  giveFeedbackModal: boolean;
  /**
   *
   */
  startTime: number;
  endTime: number;
  currentRound: number;
  rest: 30 | 60 | 90;
  workoutFeedback: 1 | 2 | 3 | 4 | 5;
  trainingHistory: TrainingHistoryTypes;
}

/**
 * Initial state
 */
const initialState: WorkoutsSliceInterface = {
  currentWorkout: {
    rounds: [],
  },
  currentExercise: exercises['e1'],
  totalOfExercises: [],
  nextExerciseName: '',
  key: '',
  title: '',
  loading: true,
  exerciseLoading: false,
  changeExercise: false,
  restModal: false,
  selectRestModal: false,
  finalModal: false,
  giveFeedbackModal: false,
  startTime: 0,
  endTime: new Date().valueOf(),
  currentRound: 0,
  workoutFeedback: 1,
  rest: 30,
  trainingHistory: [],
};

interface StartWorkoutProps {
  rounds: WorkoutInterface['rounds'];
}
/**
 * Start the workout
 */
export const startWorkout = createAsyncThunk(
  'doWorkout/startWorkout',
  async ({rounds}: StartWorkoutProps, thunkAPI) => {
    /**
     * Get first exercise
     */
    const firstExercise = {
      ...rounds[0][0],
    };
    /**
     * Next exercise name
     */
    const nextExerciseName = rounds[0][1].name;
    /**
     * Get total of exercises
     */
    const totalOfExercises = getExercisesTotal(rounds);
    /**
     * Workout start time
     */
    const startTime = new Date().valueOf();
    /**
     *
     */
    Common.logEvent('WORKOUT_STARTED');
    /**
     *
     */
    return {
      startTime,
      currentExercise: firstExercise,
      nextExerciseName,
      totalOfExercises,
    };
  },
);

const doWorkoutSlice = createSlice({
  name: 'doWorkout',
  initialState,
  reducers: {
    changeExercise(state, action: PayloadAction<boolean>) {
      state.changeExercise = action.payload;
    },
    setExerciseLoading(state, action: PayloadAction<boolean>) {
      state.exerciseLoading = action.payload;
    },
    setNextExercise(state, action: PayloadAction<Array<any>>) {
      state.currentExercise = action.payload[0];
      state.nextExerciseName = action.payload[1];
    },
    showRestModal(state, action: PayloadAction<boolean>) {
      state.restModal = action.payload;
    },
    showSelectRestModal(state, action: PayloadAction<boolean>) {
      state.selectRestModal = action.payload;
    },
    updateRest(state, action: PayloadAction<30 | 60 | 90>) {
      state.rest = action.payload;
    },
    updateKey(
      state,
      action: PayloadAction<{
        workoutKey: string;
        title: string;
      }>,
    ) {
      state.key = action.payload.workoutKey;
      state.title = action.payload.title;
    },
    updateCurrentRound(state, action: PayloadAction<number>) {
      state.currentRound = action.payload;
    },
    workoutFeedbackModal(state, action: PayloadAction<boolean>) {
      state.giveFeedbackModal = action.payload;
    },
    updateWorkoutFeedback(state, action: PayloadAction<1 | 2 | 3 | 4 | 5>) {
      state.workoutFeedback = action.payload;
    },
    showFinalModal(state, action: PayloadAction<boolean>) {
      state.finalModal = action.payload;
    },
    updateTraningHistory(state, action: PayloadAction<TrainingHistoryTypes>) {
      state.trainingHistory = action.payload;
    },
    cleanWorkout(state) {
      //
      state.currentExercise = exercises['e1'];
      state.totalOfExercises = [];
      state.nextExerciseName = '';
      state.key = '';
      state.loading = true;
      state.exerciseLoading = false;
      state.changeExercise = false;
      state.restModal = false;
      state.selectRestModal = false;
      state.finalModal = false;
      state.giveFeedbackModal = false;
      state.startTime = 0;
      state.endTime = 0;
      state.currentRound = 0;
      // state.workoutFeedback = 1;
      // state.rest = 30;
      state.trainingHistory = [];
    },
  },
  extraReducers: builder => {
    /**
     * Start workout
     */
    builder.addCase(startWorkout.fulfilled, (state, action) => {
      const {
        startTime,
        currentExercise,
        nextExerciseName,
        totalOfExercises,
      } = action.payload;

      state.startTime = startTime;
      state.currentExercise = currentExercise;
      state.nextExerciseName = nextExerciseName;
      state.totalOfExercises = totalOfExercises;
      state.loading = false;
    });
  },
});

export const {
  changeExercise,
  setNextExercise,
  cleanWorkout,
  setExerciseLoading,
  showRestModal,
  showSelectRestModal,
  updateRest,
  updateCurrentRound,
  workoutFeedbackModal,
  updateWorkoutFeedback,
  showFinalModal,
  updateKey,
  updateTraningHistory,
} = doWorkoutSlice.actions;
export default doWorkoutSlice.reducer;
