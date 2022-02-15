import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import workoutsReducer from '../slices/workoutsSlice';
import exercisesReducer from '../slices/exercisesSlice';
import plansSlice from '../slices/plansSlice';
import coachChatSlice from 'redux/slices/coachChatSlice';
import doWorkoutSlice from 'redux/slices/doWorkoutSlice';
import accountSlice from 'redux/slices/accountSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    workouts: workoutsReducer,
    doWorkout: doWorkoutSlice,
    exercises: exercisesReducer,
    plans: plansSlice,
    chat: coachChatSlice,
    account: accountSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
