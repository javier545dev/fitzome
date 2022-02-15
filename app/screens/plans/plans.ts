import {WorkoutsTypes} from 'screens/workouts/actions/workout';

export type PlansTypes = WorkoutsTypes;
export type PlansKeysTypes =
  | 'leg_1'
  | 'abs_1'
  | 'arms_1'
  | 'cardio_1'
  | 'cardio_2'
  | 'cardio_3';

export interface PlansInterface {
  type: PlansTypes;
  key: PlansKeysTypes;
  sessionsPerWeek: 2 | 3 | 4 | 5 | 6;
  weeks: 1 | 2 | 3 | 4 | 5 | 6;
}

export const muscleGrowth: PlansInterface[] = [
  {
    type: 'legs',
    key: 'leg_1',
    sessionsPerWeek: 3,
    weeks: 3,
  },
  {
    type: 'full_abs',
    key: 'abs_1',
    sessionsPerWeek: 3,
    weeks: 3,
  },
  {
    type: 'arms',
    key: 'arms_1',
    sessionsPerWeek: 3,
    weeks: 3,
  },
];

export const loseWeight: PlansInterface[] = [
  {
    type: 'cardio',
    key: 'cardio_1',
    sessionsPerWeek: 3,
    weeks: 3,
  },
  {
    type: 'cardio_legs',
    key: 'cardio_2',
    sessionsPerWeek: 3,
    weeks: 3,
  },
  {
    type: 'cardio_lower_abs',
    key: 'cardio_3',
    sessionsPerWeek: 3,
    weeks: 3,
  },
];
