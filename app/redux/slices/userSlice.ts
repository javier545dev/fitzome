import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  name: string;
  img: string;
  email: string;
  gender: number;
  date: {
    year: string;
    month: number;
    day: number;
  };
  current_physical_activity: number;
  physical_activity_level: number;
  preferences: {
    objective: number;
    training_duration: number;
    acivity: number;
  };
  time_stamp: number;
  weight: number;
  height: number;
  training_info: {
    ableToDoPhysicalActivity: boolean;
    crunch: boolean;
    crunches: number;
    jumps: boolean;
    pushUps: number;
    days: Array<number>;
  };
}

const initialState: UserState = {
  id: '1878957708834251',
  name: 'Rivas',
  email: '',
  img:
    'https://platform-lookaside.fbsbx.com/platform/profilepic/?as…height=200&width=200&ext=1626533988&hash=AeSLtrgDBRz1qQHlqz0',
  gender: 1,
  height: 141,
  weight: 46,
  date: {
    year: '2009',
    month: 0,
    day: 0,
  },
  current_physical_activity: 3,
  physical_activity_level: 2,
  preferences: {
    objective: 2,
    training_duration: 0,
    acivity: 0,
  },
  time_stamp: 1623941952003,
  training_info: {
    ableToDoPhysicalActivity: true,
    crunch: true,
    crunches: 16,
    jumps: true,
    pushUps: 8,
    days: [1, 0, 1, 0, 1, 0, 0],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<object>) {
      return {...state, ...action.payload};
    },
  },
});

export const {updateUser} = userSlice.actions;
export default userSlice.reducer;
