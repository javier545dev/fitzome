import {
  exercises,
  ExerciseInterface,
  getExercises,
  getExercisesInterface, 
} from '../../../../resources/data/exercises';
import {getRandomNumber} from './';
import {UserState} from 'redux/slices/userSlice';

export interface FeedBackInterface {
  date: number;
  feedback: number;
  completed: boolean;
  history: any[];
}

export interface WorkoutInterface {
  rounds: Array<Array<ExerciseInterface>>;
}

export interface WorkoutProps {
  type: string;
  level: number;
  title: string;
}

export type WorkoutsTypes = 'cardio_lower_abs' | 'cardio'| 'cardio_legs' | 'stretching' |
 'chest'|'full_abs' | 'lower_abs' | 'obliques'| 'legs' | 'glutes' | 'legs_glutes' | 'arms' |
  'lower_warmup' | 'upper_warmup' | 'general_warmup';

/**
 * ---------- WORKOUTS --------------
 */

/**
 * Create a workout
 * tested:
 * @param type
 * @param level
 * @param user
 * @returns new workout
 */
export function createWorkout(
  type: WorkoutsTypes,
  level: number,
  user: UserState,
): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = height / 100;
  const imc = weight / (heightInMeters * heightInMeters);

  let workout: WorkoutInterface['rounds'] = [];
  /**
   * ABS WORKOUTS
   */
  /**
   * full workout
   */
  /**
   * Create lower abs workout
   */
  if (type === 'lower_abs') {
    workout = createLowerAbsWorkout(user);
  }
  /**
   * Create oblques workout
   */
  if (type === 'obliques') {
    workout = createObliquesWorkout(user);
  }
  /**
   * Create full abs workouts
   */
  if (type === 'full_abs') {
    workout = createFullAbsWorkout(user);
  }
  /**
   * UPPER BODY WORKOUTS
   */
  /**
   * Arms workouts
   */
  if (type === 'arms') {
    workout = createArmsWorkout(user);
  }
  /**
   * Chest workout
   */
  if (type === 'chest') {
    workout = createChestWorkout(user);
  }
  /**
   * LOWER BODY WORKOUTS
   */
  /**
   * Glutes workout
   */
  if (type === 'glutes') {
    workout = createGlutesWorkout(user);
  }
  /**
   * Legs workout
   */
  if (type === 'legs') {
    workout = createLegsWorkout(user);
  }
  /**
   * Legs and glutes
   */
  if (type === 'legs_glutes') {
    workout = createLegsAndGlutesWorkout(user);
  }
  /**
   * Cardio only
   */
  if (type === 'cardio') {
    workout = createCardioWorkout(user);
  }
  /**
   * Cardio & legs
   */
  if (type === 'cardio_legs') {
    workout = createCardioAndLegWorkout(user);
  }
  /**
   * Cardio & lower abs
   */
  if (type === 'cardio_lower_abs') {
    workout = createCardioAndLowerAbsWorkout(user);
  }
  /**
   * Stretching and Warmup
   */
  if (type === 'stretching') {
    workout = createStretchingWorkout(user);
  }
  if(type === 'lower_warmup'){
    workout = createLowerWarmup(user);
  }
  if(type === 'upper_warmup'){
    workout = createUpperWarmup(user);
  }
  if(type === 'general_warmup'){
    workout = createGeneralWarmup(user);
  }
  return workout;
}

/**
 * Select random exercises from a exercises list
 * Tested: 
 * @param limit
 * @param allExercises
 * @returns A list of exercises selected
 */
function selectRandomExercises(
  limit: number,
  allExercises: {[key: string]: ExerciseInterface},
): {[key: string]: ExerciseInterface} {
  //
  let temExercises: {[key: string]: ExerciseInterface} = {...allExercises};
  let exercisesSelected: {[key: string]: ExerciseInterface} = {};
  /**
   * Set exercises limit
   * if the limit is more than the exercises
   * availables then this ones are the limit
   */
  const limitOfExercises =
    limit > Object.entries(temExercises).length ? Object.entries(temExercises).length : limit;
  /**
   * Add a exercise for every in limit
   */
  for (let i = 0; i < limitOfExercises; i++) {
    /**
     * Get a random exercise to add
     */

    /**
     * Break loop if there is not items
     */
    if(Object.entries(temExercises).length <= 0) break;
    const index = getRandomNumber(0, Object.entries(temExercises).length - 1);
    const [key, exerciseToAdd] = Object.entries(temExercises)[index];

    /**
     * Remove the exercise selected from the list of exercises
     */
     delete temExercises[exerciseToAdd.key];
    /**
     * Add the exercise selected to the new list
     */
    exercisesSelected = {
      ...exercisesSelected,
      [exerciseToAdd.key]: exerciseToAdd,
    }
    /**
     * Check if the exercise has an altern exercise
     */
    if (exerciseToAdd.need_alternating === true) {
      const alternExercise = temExercises[exerciseToAdd.altern_exercise_key];
      /**
       * Delete exercise from list
       */
      delete temExercises[alternExercise.key];
      /**
       * Add the exercise selected to the new list
       */
      exercisesSelected = {
        ...exercisesSelected,
        [alternExercise.key]: alternExercise,
      }
    }
    
  }
  /**
   * Return the new list of exercises selected
   */
  return exercisesSelected;
}
/**
 * Create chest workout based on user profile
 * 
 * @param user
 * @return a chest workout []
 */
function createChestWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;
  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    workout  = createWorkoutV1({
      targetMuscles: ['chest'],
      trainingType:['strength', 'pliometric',],
      level:[3,4,5],
      exercisesLimit: 7,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
    workout  = createWorkoutV1({
      targetMuscles: ['chest'],
      trainingType:['strength',],
      level:[3,2],
      exercisesLimit: 5,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 8,
      user,
    });
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
   workout  = createWorkoutV1({
        targetMuscles: ['chest'],
      trainingType:['strength',],
      level:[1,2,3],
      exercisesLimit: 6,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 6,
      user,
    });
  }
  return workout;
}
/**
 * Create arms workout based on user profile
 * 
 * @param user
 * @return a arms workout []
 */
function createArmsWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;
  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    workout  = createWorkoutV1({
      targetMuscles: ['arm'],
      trainingType:['strength', 'pliometric', 'hipertrofy'],
      level:[3,4],
      exercisesLimit: 7,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
    workout  = createWorkoutV1({
      targetMuscles: ['arm'],
      trainingType:['strength', 'hipertrofy'],
      level:[3,2],
      exercisesLimit: 6,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 8,
      user,
    });
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
   workout  = createWorkoutV1({
      targetMuscles: ['arm'],
      trainingType:['strength', 'hipertrofy'],
      level:[1,2],
      exercisesLimit: 6,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 7,
      user,
    });
  }
  return workout;
}
/**
 * Create general wamrup
 * 
 * @param user
 * @return a general wamrup []
 */
function createGeneralWarmup(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const warmupExercises  = createWorkoutV1({
      targetMuscles: ['leg', 'arm', 'all'],
      trainingType:['warmup'],
      level:[1,2,3,4],
      exercisesLimit: 5,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });

  const stretchingExercises  = createWorkoutV1({
      targetMuscles: ['leg', 'arm'],
      trainingType:['stretching'],
      level:[1,2,3,4],
      exercisesLimit: 3,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
  });
  return warmupExercises.concat(stretchingExercises);
}
/**
 * Create upper warmup
 * 
 * @param user
 * @return a upper warmup []
 */
function createUpperWarmup(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const warmupExercises  = createWorkoutV1({
      targetMuscles: ['arm', 'chest', 'all'],
      trainingType:['warmup'],
      level:[1,2,3,4],
      exercisesLimit: 5,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });

  const stretchingExercises  = createWorkoutV1({
      targetMuscles: ['arm', 'chest',],
      trainingType:['stretching'],
      level:[1,2,3,4],
      exercisesLimit: 3,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
  });
  return warmupExercises.concat(stretchingExercises);
}
/**
 * Create cardio & leg Workout
 * 
 * @param user
 * @return a cardio & leg Workout []
 */
function createCardioAndLowerAbsWorkout(user: UserState): WorkoutInterface['rounds'] {
 /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;

  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
     const cardioWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[3,4,5],
      exercisesLimit: 4,
      rounds: 2,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 30,
      user,
    });
    const lowerAbs  = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[3,4,5],
      exercisesLimit: 4,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 15,
      user,
    });
    workout = [...cardioWorkout, ...lowerAbs];
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
    const cardioWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[3,4,],
      exercisesLimit: 4,
      rounds: 2,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 20,
      user,
    });

     const lowerAbs  = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[3],
      exercisesLimit: 4,
      rounds: 2,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });

    workout = [...cardioWorkout, ...lowerAbs];
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
    const cardioWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[1,2,3],
      exercisesLimit: 3,
      rounds: 3,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });

     const lowerAbs = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[1,2,3],
      exercisesLimit: 4,
      rounds: 2,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });

    workout = [...cardioWorkout, ...lowerAbs];
  }

  return workout;
}
/**
 * Create cardio & leg Workout
 * 
 * @param user
 * @return a cardio & leg Workout []
 */
function createCardioAndLegWorkout(user: UserState): WorkoutInterface['rounds'] {
 /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;

  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
     const cardioWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[3,4,5],
      exercisesLimit: 4,
      rounds: 2,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 30,
      user,
    });
    const legsWorkout  = createWorkoutV1({
      targetMuscles: ['leg'],
      trainingType:['hipertrofy', 'strength', 'pliometric', ],
      level:[3,4,5],
      exercisesLimit: 4,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
    workout = [...cardioWorkout, ...legsWorkout];
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
    const cardioWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[3,4,],
      exercisesLimit: 4,
      rounds: 2,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 20,
      user,
    });

     const legsWorkout  = createWorkoutV1({
      targetMuscles: ['leg'],
      trainingType:['hipertrofy', 'strength',],
      level:[3],
      exercisesLimit: 4,
      rounds: 2,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });

    workout = [...cardioWorkout, ...legsWorkout];
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
    const cardioWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[1,2,3],
      exercisesLimit: 3,
      rounds: 3,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });

     const legsWorkout = createWorkoutV1({
      targetMuscles: ['leg'],
      trainingType:['strength',],
      level:[1,2,3],
      exercisesLimit: 4,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });

    workout = [...cardioWorkout, ...legsWorkout];
  }

  return workout;
}

/**
 * Create cardio Workout
 * 
 * @param user
 * @return a cardio Workout []
 */
function createCardioWorkout(user: UserState): WorkoutInterface['rounds'] {
 /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;

  let workout: WorkoutInterface['rounds'] = [];

  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    workout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[3,4,5],
      exercisesLimit: 8,
      rounds: 4,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 30,
      user,
    });
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
     workout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[3,4,],
      exercisesLimit: 7,
      rounds: 4,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 20,
      user,
    });
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
     workout = createWorkoutV1({
      targetMuscles: ['lower_abs', 'all', 'leg', 'glute', 'arm', 'upper_abs'],
      level:[1,2,3],
      exercisesLimit: 5,
      rounds: 6,
      trainingType: ['cardio'],
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
  }

  return workout;
}
/**
 * Create lower warmup
 * 
 * @param user
 * @return a lower warmup []
 */
function createLowerWarmup(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const warmupExercises  = createWorkoutV1({
      targetMuscles: ['leg', 'glute', 'all'],
      trainingType:['warmup'],
      level:[1,2,3,4],
      exercisesLimit: 5,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });

  const stretchingExercises  = createWorkoutV1({
      targetMuscles: ['leg', 'glute',],
      trainingType:['stretching'],
      level:[1,2,3,4],
      exercisesLimit: 3,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
  });
  return warmupExercises.concat(stretchingExercises);
}
/**
 * Create stretching workout
 * 
 * @param user
 * @return a stretch workout []
 */
function createStretchingWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  // const {height, weight} = user;
  // const heightInMeters = (height / 100) ?? 1.75;
  // const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;
  let workout: WorkoutInterface['rounds'] = [];

  workout  = createWorkoutV1({
      targetMuscles: ['leg', 'glute', 'arm',],
      trainingType:['stretching'],
      level:[1,2,3,4,5],
      exercisesLimit: 7,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });

  return workout;
}
/**
 * Create legs and glutes workout based on user profile
 * 
 * @param user
 * @return a legs anf glutes workout []
 */
function createLegsAndGlutesWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;
  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    workout  = createWorkoutV1({
      targetMuscles: ['leg', 'glute'],
      trainingType:['hipertrofy', 'strength', 'pliometric', ],
      level:[3,4,5],
      exercisesLimit: 7,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
    workout  = createWorkoutV1({
      targetMuscles: ['leg', 'glute'],
      trainingType:['hipertrofy', 'strength',],
      level:[3],
      exercisesLimit: 6,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
   workout  = createWorkoutV1({
      targetMuscles: ['leg', 'glute'],
      trainingType:['strength',],
      level:[1,2,3],
      exercisesLimit: 5,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
  }
  return workout;
}
/**
 * Create legs workout based on user profile
 * 
 * @param user
 * @return a legs workout []
 */
function createLegsWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;
  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    workout  = createWorkoutV1({
      targetMuscles: ['leg'],
      trainingType:['hipertrofy', 'strength', 'pliometric', ],
      level:[3,4,5],
      exercisesLimit: 7,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
    workout  = createWorkoutV1({
      targetMuscles: ['leg'],
      trainingType:['hipertrofy', 'strength',],
      level:[3],
      exercisesLimit: 6,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
   workout  = createWorkoutV1({
      targetMuscles: ['leg'],
      trainingType:['strength',],
      level:[1,2,3],
      exercisesLimit: 5,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
  }
  return workout;
}
/**
 * Create glutes workout based on user profile
 * 
 * @param user
 * @return a glutes workout []
 */
function createGlutesWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;
  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    workout  = createWorkoutV1({
      targetMuscles: ['glute'],
      trainingType:['hipertrofy', 'strength', 'pliometric', ],
      level:[3,4,5],
      exercisesLimit: 7,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
    workout  = createWorkoutV1({
      targetMuscles: ['glute'],
      trainingType:['hipertrofy', 'strength',],
      level:[3],
      exercisesLimit: 6,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
   workout  = createWorkoutV1({
      targetMuscles: ['glute'],
      trainingType:['strength',],
      level:[1,2,3],
      exercisesLimit: 5,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
  }
  return workout;
}
/**
 * Create full abs workout workout based on user profile
 * 
 * @param user
 * @return a full abs workout workout []
 */
function createFullAbsWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;
  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    const lowerAbsWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[3,4,5],
      exercisesLimit: 3,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
    const upperAbsWorkout = createWorkoutV1({
      targetMuscles: ['upper_abs'],
      level:[3,4,5],
      exercisesLimit: 3,
      rounds: 2,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
    const obliquesWorkout = createWorkoutV1({
      targetMuscles: ['obliques'],
      level:[3,4,5],
      exercisesLimit: 3,
      rounds: 2,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
    workout = [...lowerAbsWorkout,...upperAbsWorkout, ...obliquesWorkout];
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
      const lowerAbsWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[3],
      exercisesLimit: 2,
      rounds: 2,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });
    const upperAbsWorkout = createWorkoutV1({
      targetMuscles: ['upper_abs'],
      level:[3],
      exercisesLimit: 2,
      rounds: 2,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });
    const obliquesWorkout = createWorkoutV1({
     targetMuscles: ['obliques'],
      level:[3],
      exercisesLimit: 2,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });
    workout = [...lowerAbsWorkout,...upperAbsWorkout, ...obliquesWorkout];

  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
     const lowerAbsWorkout = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[1,2,3],
      exercisesLimit: 2,
      rounds: 2,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
    const upperAbsWorkout = createWorkoutV1({
      targetMuscles: ['upper_abs'],
      level:[1,2,3],
      exercisesLimit: 2,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
    const obliquesWorkout = createWorkoutV1({
     targetMuscles: ['obliques'],
      level:[1,2,3],
      exercisesLimit: 2,
      rounds: 1,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
    workout = [...lowerAbsWorkout,...upperAbsWorkout, ...obliquesWorkout];
  }
  return workout;
}
/**
 * Create obliques workout based on user profile
 * Tested:
 * @param imc
 * @return a obliques workout []
 */
function createObliquesWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;
  let workout: WorkoutInterface['rounds'] = [];
  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    workout = createWorkoutV1({
      targetMuscles: ['obliques'],
      level:[3,4,5],
      exercisesLimit: 6,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 16,
      user,
    });
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
  
     workout = createWorkoutV1({
      targetMuscles: ['obliques'],
      level:[3],
      exercisesLimit: 6,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });

  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
     workout = createWorkoutV1({
      targetMuscles: ['obliques'],
      level:[1,2,3],
      exercisesLimit: 5,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
  }
  return workout;
}

/**
 * Create lower abs workout based on user profile
 * Tested:
 * @param imc
 * @return a lower workout
 */

function createLowerAbsWorkout(user: UserState): WorkoutInterface['rounds'] {
  /**
   * TO DO:
   * Add more uses cases
   */
  /**
   * Get user info
   */
  const {height, weight} = user;
  const heightInMeters = (height / 100) ?? 1.75;
  const imc = (weight / (heightInMeters * heightInMeters)) ?? 27;

  let workout: WorkoutInterface['rounds'] = [];

  /**
   * User with normal weight / overweight
   */
  if (imc <= 28) {
    workout = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[3,4,5],
      exercisesLimit: 8,
      rounds: 4,
      trainingMethod: 'circuit',
      baseVolume: 15,
      user,
    });
  }
   /**
   * User with obesity
   */
  else if (imc > 28 && imc < 33) {
     workout = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[3],
      exercisesLimit: 7,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 12,
      user,
    });
  }
  /**
   * User with obesity type 2 and above
   */
  else if (imc >= 33) {
     workout = createWorkoutV1({
      targetMuscles: ['lower_abs'],
      level:[1,2,3],
      exercisesLimit: 6,
      rounds: 3,
      trainingMethod: 'circuit',
      baseVolume: 10,
      user,
    });
  }

  return workout;
}

interface CreateWorkoutInterface extends getExercisesInterface {
  exercisesLimit: number,
  rounds: number,
  trainingMethod: 'circuit',
  baseVolume: number,
  user: UserState,
}
/**
 * Create a workout depending on the props provided
 * Tested:
 * @param object with the info needed 
 * @returns a workout
 */
function createWorkoutV1({
  targetMuscles,
  level = [],
  trainingType = [],
  exercisesLimit,
  rounds,
  trainingMethod,
  baseVolume,
  user,
}: CreateWorkoutInterface):  WorkoutInterface['rounds']{
  //
  let workout:  WorkoutInterface['rounds'] = []
  /**
   * Select the target exercises
   */
  const targetExercises: {[key:string]: ExerciseInterface} = getExercises({targetMuscles, level, trainingType, user});
  /**
   * Select radom exercises from the target list
   */
  const randomExercises = selectRandomExercises(exercisesLimit, targetExercises);

  /**
   * Create a circuit workout
   */
  if(trainingMethod === 'circuit'){
    workout = createCircuitWorkout(randomExercises, rounds);
  }
  /**
   * Add custom volume to exercises
   */
  workout = addVolumeToExercises(workout, baseVolume, user);
  
  // return the workout
  return workout;
}


/**
 * Updates the workout intensity every 3 times
 * @returns Intensity to increase
 */
export function updateWorkoutIntensityEvery3times(
  feedback: Array<{feedback: number}>,
): number {
  let intensity = 0;
  for (let i = 0; i < feedback.length; i++) {
    if (feedback[i].feedback === 1) intensity += 20;
    if (feedback[i].feedback === 2) intensity += 10;
    if (feedback[i].feedback === 4) intensity -= 10;
    if (feedback[i].feedback === 5) intensity -= 20;
  }
  return intensity;
}


/**
 * Create a circuit workout
 * Tested:
 * @param tempWorkout
 * @param rounds
 * @returns A circuit workout (array)
 */
function createCircuitWorkout(tempExercises: {
  [key: string]: ExerciseInterface;
}, rounds: number): WorkoutInterface['rounds'] {
  //
  let sets: WorkoutInterface['rounds'] = [];
  /**
   * Add the exercises to every round
   */
  for (let i = 0; i < rounds; i++) {
    const arrExercises = Object.entries(tempExercises);
    const setExercises = arrExercises.map(([key, e]) => {
      return e;
    })
    sets.push([...setExercises]);
  }
  /**
   * Return the sets
   */
  return sets;
}

/**
 * Update the workout intensity
 * @returns Rounds with intensity updated
 */
export function updateWorkoutIntensity(
  rounds: WorkoutInterface['rounds'],
  intensity: number,
): WorkoutInterface['rounds'] {
  let workoutUpdated: WorkoutInterface['rounds'] = [];

  for (let i = 0; i < rounds.length; i++) {
    const singleRound = rounds[i];
    workoutUpdated.push([]);
    for (let z = 0; z < singleRound.length; z++) {
      const singleExercise = singleRound[z];
      const valueToIncrese = Math.round(
        singleExercise.volume_amount * (intensity / 100),
      );
      const volume_amount = singleExercise.volume_amount + valueToIncrese;
      workoutUpdated[i].push({...singleExercise, volume_amount});
    }
  }
  return workoutUpdated;
}

//
// ---------- GENERIC --------------
//

/**
 * Add  the volume to exercises in rounds
 * @returns Rounds with volume added
 */
function addVolumeToExercises(
  workout: WorkoutInterface['rounds'],
  volume_amount: number,
  user?: UserState,
): WorkoutInterface['rounds'] {
  let _w: WorkoutInterface['rounds'] = [];
  let amount = 0;
  for (let i = 0; i < workout.length; i++) {
    const round = workout[i];
    _w.push([]);
    for (let x = 0; x < round.length; x++) {
      const exercise = round[x];
      const {level} = exercise;
      /**
       * Modify the initial value to add, based on exercise difficulty
       */
      if (level === 2 || level === 1) amount = volume_amount + 2;
      if (level === 3) amount = volume_amount;
      if (level === 4) amount = volume_amount - 1;
      if (level === 5) amount = volume_amount - 2;

      //check if exercises is crunch type
      if(exercise.crunch){
        //check if user is passed
        if(user){
          //check if user have training info
          if(user.training_info){
            //check crunches
            if(user.training_info.crunches){
              const crunchesAmount = user.training_info.crunches === 0 ? amount : Math.round(user.training_info.crunches * .75);
              amount = crunchesAmount;
            }
          }
        }
      }
     

      _w[i].push({...exercise, volume_amount: amount});
    }
  }
  return _w;
}

//
//  METHODS
//

/**
 * Remove the exercise passed from the array of exercices
 * @returns Array of exercises without the exercise passed
 */
export function filterExercises(
  tempExercises: Array<ExerciseInterface>,
  key: string,
): Array<ExerciseInterface> {
  let temp: Array<ExerciseInterface> = [];
  for (let i = 0; i < tempExercises.length; i++) {
    const exercise = tempExercises[i];
    if (exercise.key != key) temp.push(exercise);
  }
  return temp;
}

/**
 * Find a exercise by Key
 * @param _exercises
 * @param key
 * @returns The exercise wanted
 */
export function findExerciseByKey(
  _exercises: Array<ExerciseInterface>,
  key: String,
): ExerciseInterface {
  //
  let temp: ExerciseInterface = {...exercises[0], volume_amount: 0};
  for (let i = 0; i < _exercises.length; i++) {
    const exercise = _exercises[i];
    if (exercise.key === key) temp = {...exercise};
  }
  return temp;
}

/**
 *
 * @param item
 * @param gender
 * @returns image workout local url
 */
export function getWorkoutImageUrl(item: WorkoutProps, gender: number): string {
  const {type, level} = item;
  /**
   * Abs
   */
  if (type === 'lower_abs' || type === 'cardio_lower_abs') {
    return gender === 1 ? 'v_shape' :'v_shape';
  }
  else if (type === 'obliques') {
     return gender === 1 ?'obliques' : 'obliques';
  }
  else if (type === 'full_abs') {
     return gender === 1 ?'full_abs' : 'full_abs';
  }
  /**
   * Lower body
   */
  else if (type === 'legs' || type === 'cardio_legs') {
     return gender === 1 ?'legs' : 'legs';
  }
  else if (type === 'glutes') {
     return gender === 1 ?'glutes' : 'glutes';
  }
  // else if(type === 'legs_glutes'){
  //   return gender === 1 ?'m_leg_glutes' : 'w_leg_glutes';
  // }
  /**
   * Upper body
   */
  else if(type === 'arms'){
    return gender === 1 ?'arms' : 'arms';
  }
  else if(type === 'chest'){
    return gender === 1 ?'chest' : 'chest';
  }
  /**
   * Deafult case
   */
  else{
    return 'full_abs'
  }
  /**
   * 
   */
}

/**
 *
 * @param gender
 * @returns Workout title
 */
export function getWorkoutTitle(
  {title, type}: WorkoutProps,
  gender: number,
): string {
  let workoutTitle = '';
  if (type === 'leg') {
    workoutTitle = `Pierna - ${title}`;
  } else if (type === 'abs') {
    workoutTitle = `Abdomen - ${title}`;
  } else if (type === 'chest_arms') {
    if (gender === 1) {
      workoutTitle = `Pecho y brazos - ${title}`;
    } else {
      workoutTitle = `Tonificar brazos - ${title}`;
    }
  }
  return workoutTitle;
}

/**
 *
 * @param param0
 * @returns Workout description
 */
export function getWorkoutDescription({type, level}: WorkoutProps): string {
  let description = '';
  if (type != 'warmup') {
    if (level === 1) {
      if (type === 'leg') {
        description =
          'Estos ejercicios fortalecerán tus piernas y te prepararán para entrenamientos más intensos.';
      } else if (type === 'abs') {
        description =
          'Estos ejercicios fortalecerán tu abdomen y te prepararán para entrenamientos más intensos.';
      } else if (type === 'chest_arms') {
        description =
          'Estos ejercicios fortalecerán la parte superior de tu cuerpo y te prepararán para entrenamientos más intensos.';
      }
    } else if (level === 2) {
      if (type === 'leg') {
        description =
          'Activa los músculos del tren inferior con esta serie de ejercicios elegidos para ti.';
      } else if (type === 'abs') {
        description =
          'Fortalece tus músculos abdominales con estos ejercicios elegidos para ti. ';
      } else if (type === 'chest_arms') {
        description =
          'Incrementa tu fuerza y resistencia con estos ejercicios elegidos para ti.';
      }
    } else if (level === 3) {
      if (type === 'leg') {
        description =
          'Aumenta la intensidad y lleva tus piernas al siguiente nivel.';
      } else if (type === 'abs') {
        description =
          'Aumenta la intensidad y lleva tu abdomen al siguiente nivel.';
      } else if (type === 'chest_arms') {
        description =
          'Aumenta la intensidad y lleva tu cuerpo al siguiente nivel.';
      }
    }
  } else {
    description =
      'Estos ejercicios te ayudarán a preparar tu cuerpo para el siguiente entrenamiento.';
  }
  return description;
}
