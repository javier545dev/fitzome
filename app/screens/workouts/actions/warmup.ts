import {
  exercises,
  ExerciseInterface,
} from '../../../../resources/data/exercises';
import {WorkoutInterface, WorkoutProps} from './workout';
import {getRandomNumber} from './';
import {filterExercises, findExerciseByKey} from './workout';

/**
 * Create warmup
 * @type upper | lower | full
 * @returns Warmup
 */
export function createWarmup(
  type: 'upper' | 'lower' | 'full',
): WorkoutInterface['rounds'] {
  let warmup: Array<ExerciseInterface> = [];
  if (type === 'upper') warmup = createUpperWarmup();
  if (type === 'lower') warmup = createLowerWarmup();
  if (type === 'full') warmup = createFullWarmup();
  return [[...warmup]];
}

/**
 * @returns Lower warmup
 */
function createLowerWarmup(): Array<ExerciseInterface> {
  const warmup = getLowerWarmupExercises(4);
  const stretching = getLowerStretchingExercises(4);
  const tempWorkout = warmup.concat(stretching);
  const lower = addVolumeToExercises(tempWorkout, 12);
  return lower;
}

/**
 * @returns Full warmup
 */
function createFullWarmup(): Array<ExerciseInterface> {
  const upperWarmup = getUpperWarmupExercises(2);
  const upperStretching = getUpperStretchingExercises(2);
  const lowerWarmup = getLowerWarmupExercises(2);
  const lowerStretching = getLowerStretchingExercises(2);
  const tempWorkout = lowerWarmup.concat(
    upperWarmup,
    lowerStretching,
    upperStretching,
  );
  const fullWamrup = addVolumeToExercises(tempWorkout, 12);
  return fullWamrup;
}

/**
 * Create upper Warmup
 * @returns Upper warmup
 */
function createUpperWarmup(): Array<ExerciseInterface> {
  const warmup = getUpperWarmupExercises(4);
  const stretching = getUpperStretchingExercises(4);
  const tempWorkout = warmup.concat(stretching);
  const upper = addVolumeToExercises(tempWorkout, 12);
  return upper;
}

//
//  METHODS
//

/**
 *  Get upper warmup exercises
 * @param exercisesLimit
 * @returns Upper warmup exercises array
 */
function getUpperWarmupExercises(
  exercisesLimit: number,
): Array<ExerciseInterface> {
  //
  let exerciseNames: Array<string> = [];
  let _exercises: Array<ExerciseInterface> = [];
  let temp_exercises: Array<ExerciseInterface> = [];
  let currentExercisesAdded = 0;
  const exercisesLimitArr = new Array(exercisesLimit).fill(1);

  for (let i = 0; i < exercises.length; i++) {
    const exercise = {...exercises[i]};
    const {type, name, target_muscles, key} = exercise;
    //check exercises of type warmup and of upper body
    if (type === 'warmup') {
      for (let i = 0; i < target_muscles.length; i++) {
        const [muscleName, intensity] = target_muscles[i];
        if (
          muscleName === 'arm' ||
          muscleName === 'shoulder' ||
          muscleName === 'chest' ||
          muscleName === 'wrist'
        ) {
          if (!exerciseNames.includes(key)) {
            exerciseNames.push(key);
            //save exercises found
            temp_exercises.push({...exercise, volume_amount: 0});
          }
        }
        break;
      }
    }
  }

  for (let i = 0; i < exercisesLimitArr.length; i++) {
    //get random index
    const index = getRandomNumber(0, temp_exercises.length - 1);
    //find random exercise from list
    const exerciseToAdd = temp_exercises[index];
    //saved
    _exercises.push(exerciseToAdd);
    //get exercises without the selected exercise
    temp_exercises = filterExercises(temp_exercises, exerciseToAdd.key);

    currentExercisesAdded += 1;
    if (exerciseToAdd.need_alternating === true) {
      const alternExercise = findExerciseByKey(
        temp_exercises,
        exerciseToAdd.altern_exercise_key,
      );
      temp_exercises = filterExercises(temp_exercises, alternExercise.key);
      _exercises.push(alternExercise);
    }
    // if(currentExercisesAdded === exercisesLimit) break;
  }

  return _exercises;
}

/**
 *  Get lower warmup exercises
 * @param exercisesLimit
 * @returns Lower warmup exercises array
 */
function getLowerWarmupExercises(
  exercisesLimit: number,
): Array<ExerciseInterface> {
  //
  let exerciseNames: Array<string> = [];
  let _exercises: Array<ExerciseInterface> = [];
  let temp_exercises: Array<ExerciseInterface> = [];
  let currentExercisesAdded = 0;
  const exercisesLimitArr = new Array(exercisesLimit).fill(1);

  for (let i = 0; i < exercises.length; i++) {
    const exercise = {...exercises[i]};
    const {type, name, target_muscles, key} = exercise;
    if (type === 'warmup') {
      for (let i = 0; i < target_muscles.length; i++) {
        const [muscleName, intensity] = target_muscles[i];
        if (
          muscleName === 'leg' ||
          muscleName === 'knee' ||
          muscleName === 'ankle' ||
          muscleName === 'glute' ||
          muscleName === 'groin' ||
          muscleName === 'all'
        ) {
          if (!exerciseNames.includes(key)) {
            exerciseNames.push(key);
            temp_exercises.push({...exercise, volume_amount: 0});
          }
        }
        break;
      }
    }
  }

  for (let i = 0; i < exercisesLimitArr.length; i++) {
    const index = getRandomNumber(0, temp_exercises.length - 1);
    const exerciseToAdd = temp_exercises[index];
    temp_exercises = filterExercises(temp_exercises, exerciseToAdd.key);
    _exercises.push(exerciseToAdd);
    currentExercisesAdded += 1;
    if (exerciseToAdd.need_alternating === true) {
      const alternExercise = findExerciseByKey(
        temp_exercises,
        exerciseToAdd.altern_exercise_key,
      );
      temp_exercises = filterExercises(temp_exercises, alternExercise.key);
      _exercises.push(alternExercise);
    }
  }
  return _exercises;
}

/**
 * Get lower stretching exercises
 * @returns list of upper stretching exercises
 */
function getLowerStretchingExercises(
  exercisesLimit: number,
): Array<ExerciseInterface> {
  //
  let exerciseNames: Array<string> = [];
  let _exercises: Array<ExerciseInterface> = [];
  let temp_exercises: Array<ExerciseInterface> = [];
  let currentExercisesAdded = 0;
  const exercisesLimitArr = new Array(exercisesLimit).fill(1);

  for (let i = 0; i < exercises.length; i++) {
    const exercise = {...exercises[i]};
    const {type, name, target_muscles, key} = exercise;
    if (type === 'stretching') {
      for (let i = 0; i < target_muscles.length; i++) {
        const [muscleName, intensity] = target_muscles[i];
        if (
          muscleName === 'leg' ||
          muscleName === 'knee' ||
          muscleName === 'ankle' ||
          muscleName === 'glute' ||
          muscleName === 'groin' ||
          muscleName === 'all'
        ) {
          if (!exerciseNames.includes(key)) {
            exerciseNames.push(key);
            temp_exercises.push({...exercise, volume_amount: 0});
          }
        }
        break;
      }
    }
  }
  //console.log('[0] original ',temp_exercises);

  for (let i = 0; i < exercisesLimitArr.length; i++) {
    const index = getRandomNumber(0, temp_exercises.length - 1);
    const exerciseToAdd = temp_exercises[index];
    temp_exercises = filterExercises(temp_exercises, exerciseToAdd.key);
    _exercises.push(exerciseToAdd);
    currentExercisesAdded += 1;
    if (exerciseToAdd.need_alternating === true) {
      const alternExercise = findExerciseByKey(
        temp_exercises,
        exerciseToAdd.altern_exercise_key,
      );
      temp_exercises = filterExercises(temp_exercises, alternExercise.key);
      _exercises.push(alternExercise);
    }
  }
  return _exercises;
}

/**
 * @returns upper stretching exercises
 */

function getUpperStretchingExercises(
  exercisesLimit: number,
): ExerciseInterface[] {
  let exerciseNames: string[] = [];
  let _exercises: ExerciseInterface[] = [];
  let temp_exercises: ExerciseInterface[] = [];
  let currentExercisesAdded = 0;
  const exercisesLimitArr = new Array(exercisesLimit).fill(1);

  for (let i = 0; i < exercises.length; i++) {
    const exercise = {...exercises[i]};
    const {type, name, target_muscles, key} = exercise;
    if (type === 'stretching') {
      for (let i = 0; i < target_muscles.length; i++) {
        const [muscleName, intensity] = target_muscles[i];
        if (
          muscleName === 'arm' ||
          muscleName === 'shoulder' ||
          muscleName === 'chest' ||
          muscleName === 'wrist'
        ) {
          if (!exerciseNames.includes(key)) {
            exerciseNames.push(key);
            temp_exercises.push({...exercise, volume_amount: 0});
          }
        }
        break;
      }
    }
  }
  //console.log('[0] original ',temp_exercises);

  for (let i = 0; i < exercisesLimitArr.length; i++) {
    const index = getRandomNumber(0, temp_exercises.length - 1);
    const exerciseToAdd = temp_exercises[index];
    temp_exercises = filterExercises(temp_exercises, exerciseToAdd.key);
    _exercises.push(exerciseToAdd);
    currentExercisesAdded += 1;
    if (exerciseToAdd.need_alternating === true) {
      const alternExercise = findExerciseByKey(
        temp_exercises,
        exerciseToAdd.altern_exercise_key,
      );
      temp_exercises = filterExercises(temp_exercises, alternExercise.key);
      _exercises.push(alternExercise);
    }
    // if(currentExercisesAdded === exercisesLimit) break;
  }
  //console.log('[10] final::', _exercises);
  // console.log('[10] exercises added::', currentExercisesAdded);
  return _exercises;
}

/**
 * Add  the volume to exercises in warmup
 * @returns list of exercises with volume added
 */
function addVolumeToExercises(
  workout: Array<ExerciseInterface>,
  volume_amount: number,
): Array<ExerciseInterface> {
  //
  let _w: Array<ExerciseInterface> = [];
  let amount = 0;
  for (let i = 0; i < workout.length; i++) {
    const exercise = workout[i];
    const {level} = exercise;
    // modify the initial valume to add bassed on exercise diffculty
    if (level === 2 || level === 1) amount = volume_amount + 2;
    if (level === 3) amount = volume_amount;
    if (level === 4) amount = volume_amount - 1;
    if (level === 5) amount = volume_amount - 2;

    _w.push({...exercise, volume_amount: amount});
  }
  return _w;
}

/**
 *
 * @param type
 * @param title
 * @returns Warm description
 */
export function getWarmUpDescription(type: string, title: string): string {
  let description =
    'Un calentamiento adecuado mejora tu rendimiento y reduce el riesgo de sufrir lesiones.';
  if (type === 'lower') {
    description = `${title}. Estos ejercicios te ayudarán a preparar tu cuerpo para el siguiente entrenamiento.`;
  }
  return description;
}

/**
 *
 * @param muscles
 * @returns type oh warmup needed for the especific workout
 */
export function getWarmupType(muscles: Array<number>): string {
  let type = 'full';
  for (let i = 0; i < muscles.length; i++) {
    const muscle = muscles[i];
    if (muscle === 3) type = 'full';
    if (muscle === 4 || muscle === 5) type = 'lower';
    if (muscle === 1 || muscle === 6 || muscle === 7) type = 'upper';
  }
  return type;
}
