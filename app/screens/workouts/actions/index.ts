import {ExerciseInterface} from '../../../../resources/data/exercises';

import {
  createWorkout,
  WorkoutProps,
  updateWorkoutIntensityEvery3times,
  updateWorkoutIntensity,
  WorkoutInterface,
  getWorkoutImageUrl,
  getWorkoutDescription,
  getWorkoutTitle,
} from './workout';

import {SavedExerciseInterface} from '../components/DownloadExercise';

import {createWarmup, getWarmUpDescription, getWarmupType} from './warmup';

//

/**
 * Get a random number
 * @returns random number
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * Get exercises with video
 * @param savedExercises List with saved exercises
 * @param workout Normal workout
 * @returns The workout with videos urls (if any)
 */
function mergeExercises(
  savedExercises: {
    [key: string]: SavedExerciseInterface;
  },
  workout: WorkoutInterface['rounds'],
): WorkoutInterface['rounds'] {
  //
  let newSets: WorkoutInterface['rounds'] = [];
  /**
   * Loop rounds
   */
  for (let i = 0; i < workout.length; i++) {
    const round = workout[i];
    newSets.push([]);
    /**
     * Loop exercises
     */
    for (let x = 0; x < round.length; x++) {
      const singleExercise: ExerciseInterface = round[x];
      /**
       * Check if the exercise has the video url
       * if yes save it
       */
      if (singleExercise.video) {
        newSets[i].push({...singleExercise});
      } else {
        /**
         * Get exercise with video (if is saved) or
         * the normal exercise
         */
        const exercise = getExerciseWithVideo(savedExercises, singleExercise);
        /**
         * Saved the exercise
         */
        newSets[i].push(exercise);
      }
    }
  }
  /**
   * Return the new rounds
   */
  return [...newSets];
}

/**
 *
 * @param savedExercises Array of exercies saved in the device
 * @param currentExercise The exersice we are looking for
 * @returns The exercise with the local video url or the normal exercise
 */
function getExerciseWithVideo(
  savedExercises: {
    [key: string]: SavedExerciseInterface;
  },
  currentExercise: ExerciseInterface,
): ExerciseInterface {
  //
  let singleExercise: ExerciseInterface = {...currentExercise};
  /**
   * Loop the exercises saved
   */
  for (let i = 0; i < Object.entries(savedExercises).length; i++) {
    const [_, exerciseSaved] = Object.entries(savedExercises)[i];
    /**
     * Check if the current execise is saved
     */
    if (currentExercise.key === exerciseSaved.key) {
      /**
       * Copy the normal exercise + the video url
       */
      singleExercise = {
        ...singleExercise,
        video: exerciseSaved.storageUrl,
      };
      /**
       * Return th exercise with the video url
       */
      return singleExercise;
    }
  }
  /**
   * Return the normal exercise
   */
  return singleExercise;
}

/**
 * Get no repited exercises
 * @param rounds [] with the workout rounds
 * @returns A list with the workout exercises
 */
function getNoRepitedExercises(
  rounds: WorkoutInterface['rounds'],
): ExerciseInterface[] {
  let keysExercises: string[] = [];
  let excercisesNotRepited: ExerciseInterface[] = [];
  /**
   * Loop the sets
   */
  rounds.forEach(round => {
    /**
     * Loop the exercises in set
     */
    round.forEach((single: any) => {
      /**
       * Get the exercise key
       */
      const key = single.key;
      /**
       * Check if the exercise is already saved
       */
      const isRepited = keysExercises.includes(key);
      /**
       * If the exercise is no save, saved it
       */
      if (!isRepited) {
        keysExercises.push(key);
        excercisesNotRepited.push(single);
      }
    });
  });
  /**
   * Return the list of exercises
   */
  return excercisesNotRepited;
}

export interface MusclesActivatedInterface {
  [key: string]: {
    name: ExerciseInterface['target_muscles'][0][0];
    intensity: ExerciseInterface['target_muscles'][0][1];
    quantity: number;
  };
}

/**
 * Get the muscles needed to perform the workout
 * Tested:
 * @param workout
 * @returns and object with the exercises used/activated
 */
function getMusclesActivatedInWorkout(
  workout: WorkoutInterface['rounds'],
): MusclesActivatedInterface {
  //
  let activatedMuscles: MusclesActivatedInterface = {};
  /**
   * Loop through  the sets
   */
  for (let i = 0; i < workout.length; i++) {
    /**
     * Single round/set
     */
    const round = workout[i];
    /**
     * Loop through the round/set
     */
    round.forEach(exercise => {
      /**
       * Get target muscles
       * ej. target_muscles: [['upper_abs', 1], ['lower_abs', 2]],
       */
      const {target_muscles} = exercise;
      /**
       * Loop through the muscles
       */
      target_muscles.forEach(muscle => {
        const [name, intensity] = muscle;
        /**
         * Save activated muscles
         */
        activatedMuscles = {
          ...activatedMuscles,
          [name]: {
            name,
            quantity: activatedMuscles[name]
              ? activatedMuscles[name].quantity + 1
              : 1,
            intensity,
          },
        };
      });
    });
  }

  return activatedMuscles;
}

export {
  // getWorkout,
  //increaseIntesityInSets,
  getMusclesActivatedInWorkout,
  createWarmup,
  getWarmUpDescription,
  mergeExercises,
  getWarmupType,
  createWorkout,
  getWorkoutTitle,
  getWorkoutImageUrl,
  getWorkoutDescription,
  updateWorkoutIntensity,
  updateWorkoutIntensityEvery3times,
  getNoRepitedExercises,
};
