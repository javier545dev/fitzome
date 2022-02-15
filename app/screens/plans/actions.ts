import {setStorageValue, getStoragedValue} from '@storage/index';

import {WorkoutPlanInterface} from './watch-plan-ai';
import {WorkoutsTypes} from 'screens/workouts/actions/workout';

export interface PlansInterface {
  fullPlan: Array<
    Array<
      Array<{
        type: 'workout' | 'rest';
        key?: string;
      }>
    >
  >;
}

export function getFullPlanWeeks(
  workouts: WorkoutPlanInterface[],
  trainingDays: number[],
  numberOfWeeks: number,
): PlansInterface['fullPlan'] {
  /** */
  let tempPlan: PlansInterface['fullPlan'] = [];
  /**
   * Iterate for number of weeks
   */
  for (let i = 0; i < numberOfWeeks; i++) {
    /**
     * Add a new week
     */
    tempPlan.push([]);
    /**
     * Get Workouts
     */
    const weekWorkout = workouts[i];
    /**
     * Loop week days
     */
    for (let d = 0; d < 7; d++) {
      /**
       * Get day index
       */
      const day = trainingDays[d];
      /**
       * Add a new day in week
       */
      tempPlan[i].push([]);
      /**
       * Check if day is a training day
       * add workout
       */
      if (day === 1) {
        tempPlan[i][d].push({
          type: 'workout',
          key: `${weekWorkout.key}`,
        });
      } else {
        /**
         * Add rest
         */
        tempPlan[i][d].push({
          type: 'rest',
        });
      }
    }
  }

  /**
   * Return training plans
   */
  return tempPlan;
}

/**
 * Get start plan date in iso format
 * @returns Primise string with the date
 */
export async function getPlanStartDate(): Promise<string> {
  /**
   * Default start date
   */
  let startDateIsoFormat = '2015-03-25';
  /**
   * Get current date
   */
  const d = new Date();
  const fullyear = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  /**
   * Update date to cuurent day
   */
  startDateIsoFormat = `${fullyear}-${month}-${day}`;
  /**
   * Check if previus date was saved
   */
  try {
    /**
     * Check if date is storage
     */
    const value = await getStoragedValue('plan_start_date');
    if (value) {
      /**
       * Update date with the saved
       */
      startDateIsoFormat = value;
    } else {
      /**
       * Save start date
       */
      await setStorageValue('plan_start_date', startDateIsoFormat);
    }
    /**
     * Return start date
     */
    return startDateIsoFormat;
  } catch (error) {
    /**
     * Return start date
     */
    return startDateIsoFormat;
  }
}

/**
 * Get workous for the plan
 * @param nWeeks
 * @param workoutsType
 * @returns
 */
export function createWorkouts(
  numberOfWeeks: number,
  type: WorkoutsTypes,
): WorkoutPlanInterface[] {
  /** */
  let workouts: WorkoutPlanInterface[] = [];
  /**
   * Workout template
   */
  const workoutTemplate = {
    custom: false,
    description: `Entrenamiento personalizado`,
    key: 1345,
    title: '',
    type: type,
  };
  /**
   * Loop every week
   */
  for (let i = 0; i < numberOfWeeks; i++) {
    let singleWorkout = {...workoutTemplate};
    singleWorkout.key = new Date().valueOf() + i * 3;
    singleWorkout.title = getWorkoutTitle(type);
    //const rounds = createWorkout(type, 2, userInfo);
    //workouts.push({ ...singleWorkout, rounds });
    workouts.push({...singleWorkout});
  }
  /**
   * Return plan workouts
   */
  return workouts;
}
/**
 * Get workoout title
 *
 */
function getWorkoutTitle(type: WorkoutsTypes): string {
  if (type === 'legs') {
    return 'Entrenamiento de pierna';
  } else if (type === 'full_abs') {
    return 'Entrenamiento abdominal';
  } else if (type === 'arms') {
    return 'Entrenamiento de brazos';
  } else if (type === 'cardio') {
    return 'Entrenamiento de cardio';
  } else if (type === 'cardio_legs') {
    return 'Entrenamiento de cardio y piernas';
  } else if (type === 'cardio_lower_abs') {
    return 'Entrenamiento de cardio y abdomen';
  } else {
    return '';
  }
}
