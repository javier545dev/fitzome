import {TraningHistoryType} from 'screens/workouts/do-workout/components/FinalModal';
import {exercises, ExerciseInterface} from '@resources/data/exercises';
import { primaryColor, secondaryColor, ternaryColor} from 'components/BodyMuscles';
import * as Common from 'common';

type TrainingHistoryWithExercise = Array<{
  key: string;
  exercise: ExerciseInterface;
  start_date?: number;
  end_date?: number;
  value?: 30 | 60 | 90;
}>;

interface WorkoutsWithExercisesInterface {
  title: string;
  key: string;
  start_date: number;
  end_date: number;
  feedback: 1 | 2 | 3 | 4 | 5;
  training_history: TrainingHistoryWithExercise;
}

/**
 * Get workouts with full exercises
 * @param trainingHistory
 * @returns
 */
export function getWorkoutsWithFullExercises(
  trainingHistory: TraningHistoryType,
): WorkoutsWithExercisesInterface[] {
  let workouts: WorkoutsWithExercisesInterface[] = [];
  /**
   * Loop history
   */
  trainingHistory.forEach((singleWorkout, i) => {
    /**
     * copy old exercise properties
     */
    const {training_history: _, ...oldProperties} = singleWorkout;
    let fullWorkout: WorkoutsWithExercisesInterface = {
      ...oldProperties,
      training_history: [],
    };
    let training_history: TrainingHistoryWithExercise = [];
    /**
     * Get old exercises
     */
    const history = singleWorkout.training_history;
    history.forEach(single => {
      /**
       * Get full exercise
       */
      const fullExercise = exercises[single.key];
      const tempExercise = {...single, exercise: fullExercise};
      training_history.push(tempExercise);
    });
    /**
     * Update Workout
     */
    fullWorkout = {...fullWorkout, training_history};
    /**
     * Update new history training
     */
    workouts.push(fullWorkout);
  });

  return workouts;
}
/**
 * Get front muscles colors based on traning history
 * @param tempTrainingHistory
 * @returns musclesColors = {}
 */
export function getFrontMusclesColorsActivited(
  tempTrainingHistory: TraningHistoryType,
): {
  [key: string]: string;
} {
  const d = new Date();
  let musclesColors: {
    [key: string]: string;
  } = {};
  /**
   * Get dates that will be used to update muscles
   */
  const today = Common.isofy(d.valueOf());
  const yesterday = Common.isofy(d.setDate(d.getDate() - 1));
  const dayBeforeYesterday = Common.isofy(d.setDate(d.getDate() - 1)); // -1 + -1 = -2
  /**
   * Use only last 6 traingins
   */
  const customTrainingHistory = tempTrainingHistory.slice(0, 6);
  /**
   * Loop training history
   */
  customTrainingHistory.forEach(training => {
    /**
     * Get training date
     */
    let tempDate = Common.isofy(training.start_date);
      /**
     * Hoy
     */
    if (tempDate === today) {
      /**
       * Get history exercises
       */
      const historyExercises = training.training_history;
      /**
       * Loop exercises
       */
      historyExercises.forEach(singleExercise => {
        if(singleExercise.key !== 'rest'){
          const targetMuscles = singleExercise.exercise?.target_muscles;
          /**
           * Loop muscles
           */
          targetMuscles?.forEach(muscle => {
            /**
             * Select colors
             */
            const [name, level] = muscle;
            const color = level === 1 ? primaryColor :  secondaryColor ;
            if (name === 'leg') {
                musclesColors = {
                    ...musclesColors,
                    quadriceps: color,
                };
            } else if (name === 'groin') {
                musclesColors = {
                    ...musclesColors,
                    groin: color,
                };
            } else if (name === 'arm') {
                musclesColors = {
                    ...musclesColors,
                    biceps: color,
                };
            } else if (name === 'ankle') {
                musclesColors = {
                    ...musclesColors,
                    ankle: color,
                };
            } else if (name === 'lower_abs' || name === 'upper_abs') {
                musclesColors = {
                    ...musclesColors,
                    abs: color,
                };
            } else if (name === 'obliques') {
                musclesColors = {
                    ...musclesColors,
                    obliques: color,
                };
            } else if (name === 'shoulder') {
                musclesColors = {
                    ...musclesColors,
                    shoulders: color,
                };
            } else if (name === 'chest') {
                musclesColors = {
                    ...musclesColors,
                    chest: color,
                };
            }
          });
        }
      });
    }

    /**
     * The day before yesterday
     */
    if (tempDate === dayBeforeYesterday) {
      
      /**
       * Get history exercises
       */
      const historyExercises = training.training_history;
      /**
       * Loop exercises
       */
      historyExercises.forEach(singleExercise => {
        if(singleExercise.key !== 'rest'){
          const targetMuscles = singleExercise.exercise?.target_muscles;
          /**
           * Loop muscles
           */
          targetMuscles?.forEach(muscle => {
            /**
             * Select colors
             */
            const [name, level] = muscle;
            const color = level === 1 ? ternaryColor : ternaryColor;
             if (name === 'leg' && !('quadriceps' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    quadriceps: color,
                };
            } else if (name === 'groin' &&  !('groin' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    groin: color,
                };
            } else if (name === 'arm' &&  !('biceps' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    biceps: color,
                };
            } else if (name === 'ankle' &&  !('ankle' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    ankle: color,
                };
            } else if ((name === 'lower_abs' || name === 'upper_abs') &&  !('abs' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    abs: color,
                };
            } else if (name === 'obliques' &&  !('obliques' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    obliques: color,
                };
            } else if (name === 'shoulder' &&  !('shoulders' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    shoulders: color,
                };
            } else if (name === 'chest' &&  !('chest' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    chest: color,
                };
            }
          });
        }
      });
    } 
    /**
     * Yesterday
     */
    if (tempDate === yesterday) {
      
      /**
       * Get history exercises
       */
      const historyExercises = training.training_history;
      /**
       * Loop exercises
       */
      historyExercises.forEach(singleExercise => {
        if(singleExercise.key !== 'rest'){
          const targetMuscles = singleExercise.exercise?.target_muscles;
          /**
           * Loop muscles
           */
          targetMuscles?.forEach(muscle => {
            /**
             * Select colors
             */
            const [name, level] = muscle;
            const color = level === 1 ? secondaryColor : ternaryColor ;
            if (name === 'leg' && !('quadriceps' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    quadriceps: color,
                };
            } else if (name === 'groin' &&  !('groin' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    groin: color,
                };
            } else if (name === 'arm' &&  !('biceps' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    biceps: color,
                };
            } else if (name === 'ankle' &&  !('ankle' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    ankle: color,
                };
            } else if ((name === 'lower_abs' || name === 'upper_abs') &&  !('abs' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    abs: color,
                };
            } else if (name === 'obliques' &&  !('obliques' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    obliques: color,
                };
            } else if (name === 'shoulder' &&  !('shoulders' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    shoulders: color,
                };
            } else if (name === 'chest' &&  !('chest' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    chest: color,
                };
            }
          });
        }
      });
    } 
    /**
     * Too old, tranings too old to be counted
     */
  });
  return musclesColors;
}
/**
 * Get back muscles colors based on traning history
 * @param tempTrainingHistory
 * @returns musclesColors = {}
 */
export function getBackMusclesColorsActivited(
  tempTrainingHistory: TraningHistoryType,
): {
  [key: string]: string;
} {
  const d = new Date();
  let musclesColors: {
    [key: string]: string;
  } = {};
  /**
   * Get dates that will be used to update muscles
   */
  const today = Common.isofy(d.valueOf());
  const yesterday = Common.isofy(d.setDate(d.getDate() - 1));
  const dayBeforeYesterday = Common.isofy(d.setDate(d.getDate() - 1)); // -1 + -1 = -2
  /**
   * Use only last 6 traingins
   */
  const customTrainingHistory = tempTrainingHistory.slice(0, 6);
  /**
   * Loop training history
   */
  customTrainingHistory.forEach(training => {
    /**
     * Get training date
     */
    let tempDate = Common.isofy(training.start_date);
      /**
     * Hoy
     */
    if (tempDate === today) {
      
      /**
       * Get history exercises
       */
      const historyExercises = training.training_history;
      /**
       * Loop exercises
       */
      historyExercises.forEach(singleExercise => {
        if(singleExercise.key !== 'rest'){
          const targetMuscles = singleExercise.exercise?.target_muscles;
          /**
           * Loop muscles
           */
          targetMuscles?.forEach(muscle => {
            /**
             * Select colors
             */
            const [name, level] = muscle;
            const color = level === 1 ? primaryColor :  secondaryColor ;
             if (name === 'leg') {
                musclesColors = {
                    ...musclesColors,
                    hamstrings: color,
                };
            } else if (name === 'groin') {
                musclesColors = {
                    ...musclesColors,
                    groin: color,
                };
            } else if (name === 'glute') {
                musclesColors = {
                    ...musclesColors,
                    glute: color,
                };
            } else if (name === 'arm') {
                musclesColors = {
                    ...musclesColors,
                    triceps: color,
                };
            } else if (name === 'ankle') {
                musclesColors = {
                    ...musclesColors,
                    ankle: color,
                };
            } else if (name === 'back') {
                musclesColors = {
                    ...musclesColors,
                    back: color,
                };
            } else if (name === 'shoulder') {
                musclesColors = {
                    ...musclesColors,
                    shoulders: color,
                };
            }
          });
        }
      });
    }

    /**
     * The day before yesterday
     */
    if (tempDate === dayBeforeYesterday) {
      
      /**
       * Get history exercises
       */
      const historyExercises = training.training_history;
      /**
       * Loop exercises
       */
      historyExercises.forEach(singleExercise => {
        if(singleExercise.key !== 'rest'){
          const targetMuscles = singleExercise.exercise?.target_muscles;
          /**
           * Loop muscles
           */
          targetMuscles?.forEach(muscle => {
            /**
             * Select colors
             */
            const [name, level] = muscle;
            const color = level === 1 ? ternaryColor : '#e9e9e9';
            //
             if (name === 'leg' && !('hamstrings' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    hamstrings: color,
                };
            } else if (name === 'groin' && !('groin' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    groin: color,
                };
            } else if (name === 'glute' && !('glute' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    glute: color,
                };
            } else if (name === 'arm' && !('triceps' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    triceps: color,
                };
            } else if (name === 'ankle' && !('ankle' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    ankle: color,
                };
            } else if (name === 'back' && !('back' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    back: color,
                };
            } else if (name === 'shoulder' && !('shoulders' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    shoulders: color,
                };
            }
          });
        }
      });
    } 
    /**
     * Yesterday
     */
    if (tempDate === yesterday) {
      
      /**
       * Get history exercises
       */
      const historyExercises = training.training_history;
      /**
       * Loop exercises
       */
      historyExercises.forEach(singleExercise => {
        if(singleExercise.key !== 'rest'){
          const targetMuscles = singleExercise.exercise?.target_muscles;
          /**
           * Loop muscles
           */
          targetMuscles?.forEach(muscle => {
            /**
             * Select colors
             */
            const [name, level] = muscle;
            const color = level === 1 ? secondaryColor : ternaryColor ;
                  if (name === 'leg' && !('hamstrings' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    hamstrings: color,
                };
            } else if (name === 'groin' && !('groin' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    groin: color,
                };
            } else if (name === 'glute' && !('glute' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    glute: color,
                };
            } else if (name === 'arm' && !('triceps' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    triceps: color,
                };
            } else if (name === 'ankle' && !('ankle' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    ankle: color,
                };
            } else if (name === 'back' && !('back' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    back: color,
                };
            } else if (name === 'shoulder' && !('shoulders' in musclesColors)) {
                musclesColors = {
                    ...musclesColors,
                    shoulders: color,
                };
            }
          });
        }
      });
    } 
    /**
     * Too old, tranings too old to be counted
     */
  });
  return musclesColors;
}
