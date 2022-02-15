import {UserState} from 'redux/slices/userSlice';
import { fitzomeExercises } from './fitzome_exercises';
/**
 * Volume types
 */
enum VolumeType {
  reps = 1,
  seconds,
}

/**
 * Training types
 */
type TraningTypes =
  | 'stretching'
  | 'cardio'
  | 'pliometric'
  | 'isometric'
  | 'hipertrofy'
  | 'strength'
  | 'warmup';
/**
 * Muscles types/names
 */
export type MusclesType =
  | 'all'
  | 'ankle'
  | 'lumbar'
  | 'back'
  | 'leg'
  | 'glute'
  | 'groin'
  | 'hip'
  | 'upper_abs'
  | 'lower_abs'
  | 'obliques'
  | 'arm'
  | 'shoulder'
  | 'chest'
  | 'wrist'
  | 'knee';

type MusclesIntensity = 1 | 2 | 3;
type ExercisesLevel = 1 | 2 | 3 | 4 | 5;

export interface ExerciseInterface {
    altern_exercise_key: string;
    crunch: boolean;
    excluded: boolean;
    jumps: boolean;
    key: string;
    level: ExercisesLevel;
    name: string;
    need_alternating: boolean;
    obesity: boolean;
    side: 'both' | 'left' | 'right';
    target_muscles: Array<[MusclesType, MusclesIntensity]>;
    type: TraningTypes;
    url: string;
    volume: VolumeType;
    volume_amount: number;
    wide_space: boolean;
    updates?: number;
    video?: string;
}

export const exercises:{
  [key: string]: ExerciseInterface;
} = {...fitzomeExercises};

export interface getExercisesInterface {
  targetMuscles: MusclesType[];
  level?: ExercisesLevel[];
  trainingType?: TraningTypes[];
  user: UserState;
}

/**
 * Get exercises filtered by target_muscles, level, training type, crunch and jumps
 * @param targetMuscles
 * @param level
 * @param type
 * @returns And array of exercises
 */
export function getExercises({
  targetMuscles,
  level = [],
  trainingType = [],
  user,
}: getExercisesInterface): { [key: string]: ExerciseInterface} {
  //
  let exercisesList: {[key: string]: ExerciseInterface} = {};
  /**
   * filter muscles
   * only primaries and secondaries
   */
  Object.entries(exercises).forEach(e => {
    const [_, exercise] = e;
    //loop the muscles wanted
    targetMuscles.forEach(muscle => {
      //check if the exercise has
      //theses muscles as a target
      exercise.target_muscles.forEach(exerciseMuscle => {
        const [name, level] = exerciseMuscle;
        //if the exercise has the muscle wanted
        //add it to the list
        if (muscle === name && level < 3) {
          exercisesList = {
            ...exercisesList,
           [exercise.key]: exercise,
          }
        }
      });
    });
  });
  
  /**
   * if level is passed filter by level
   */
  if (level.length > 0) {
    let exercisesFilteredByLevel: {[key: string]: ExerciseInterface} = {};

     Object.entries(exercisesList).forEach(e => {
       const [key, exercise] = e;
      for (let i = 0; i < level.length; i++) {
        if (level[i] === exercise.level) {
          exercisesFilteredByLevel = {
            ...exercisesFilteredByLevel,
            [exercise.key]: exercise,
          }
        }
      }
    });
    exercisesList = {...exercisesFilteredByLevel}
  }
  /**
   * if training types are passed filter by them
   */
  if (trainingType.length > 0) {
    let exercicesFilteredByMuscle: {[key: string]: ExerciseInterface} = {};

    Object.entries(exercisesList).forEach(e=> {
      const [key, exercise] = e;
      for (let i = 0; i < trainingType.length; i++) {
        const tType = trainingType[i];
        if (exercise.type === tType) {
          exercicesFilteredByMuscle = {
            ...exercicesFilteredByMuscle,
            [exercise.key]: exercise,
           }
        }
      }
    });
    exercisesList = {...exercicesFilteredByMuscle}
  }

  /**
   * Filter exercises by user preferences
   */
  if(user.training_info){
    /**
     * Filter exercises by crunch
     */
    let exercisesFilteredByCrunch:  {[key: string]: ExerciseInterface} = {};
    Object.entries(exercisesList).forEach(e => {
      const [key, exercise] = e;
       //user can not crunch
        if(user.training_info?.crunch === false){
          //return only exercises that do not requiere to crunch
          if(exercise.crunch === false){
            exercisesFilteredByCrunch = {
              ...exercisesFilteredByCrunch,
              [exercise.key]: exercise,
            }
          }
        }
        //user can do crunches
        else{
            exercisesFilteredByCrunch = {
              ...exercisesFilteredByCrunch,
              [exercise.key]: exercise,
            }
        }
    });
    exercisesList = {...exercisesFilteredByCrunch};
     /**
     * Filter exercises by jumps
     */
    let exercisesFilteredByJumps: {[key: string]: ExerciseInterface} = {};
    Object.entries(exercisesList).forEach(e => {
      const [key, exercise] = e;
       //user can not jump
        if(user.training_info?.jumps === false){
          //return only exercises that do not requiere jumping
          if(exercise.jumps === false){
            exercisesFilteredByJumps = {
              ...exercisesFilteredByJumps,
              [exercise.key]: exercise,
            }
          }
        }
        //user can jump
        else{
             exercisesFilteredByJumps = {
              ...exercisesFilteredByJumps,
              [exercise.key]: exercise,
            }
        }
    });
    exercisesList = {
      ...exercisesFilteredByJumps
    };
  }
  /*
    TODO:
    filter by excluded exercises
  */
  //return exercises filtered
  return exercisesList;
}