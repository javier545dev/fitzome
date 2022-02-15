//import Login from 'screens/account/Login';
import {getExercises} from '../../resources/data/exercises';
import {user} from './data';

describe('Exercises Filter', () => {
  /**
   * filter exercises by muscles
   */
  test('Should filter exercises by one muscle', () => {
    const legExercises = getExercises({targetMuscles: ['leg'], user});
    const lowerExercises = getExercises({targetMuscles: ['lower_abs'], user});
    const chestExercises = getExercises({targetMuscles: ['chest'], user});
    /**
     * check that the muscle is inclueded in exercises
     */
    expect(legExercises['e1']).toBeTruthy();
    expect(lowerExercises['e111']).toBeTruthy();
    expect(chestExercises['e124']).toBeTruthy();
    /**
     * check that have two or more exercises
     */
    expect(Object.entries(legExercises).length).toBeGreaterThan(1);
    expect(Object.entries(lowerExercises).length).toBeGreaterThan(1);
    expect(Object.entries(chestExercises).length).toBeGreaterThan(1);
  });

  test('Should filter exercises by two or more muscles', () => {
    const legAndLowerAbs = getExercises({
      targetMuscles: ['leg', 'lower_abs'],
      user,
    });
    const chestLegtAndUpperAbs = getExercises({
      targetMuscles: ['leg', 'chest', 'upper_abs'],
      user,
    });
    /**
     * check that the muscle is inclueded in exercises
     */
    //leg & lower abs
    expect(legAndLowerAbs['e1']).toBeTruthy();
    expect(legAndLowerAbs['e111']).toBeTruthy();
    //chest, leg & upper abs
    expect(chestLegtAndUpperAbs['e124']).toBeTruthy();
    expect(chestLegtAndUpperAbs['e1']).toBeTruthy();
    expect(chestLegtAndUpperAbs['e111']).toBeTruthy();
    /**
     * check that have two or more exercises
     */
    expect(Object.entries(legAndLowerAbs).length).toBeGreaterThan(1);
    expect(Object.entries(chestLegtAndUpperAbs).length).toBeGreaterThan(5);
  });

  test('Should filter exercises by one or more levels', () => {
    const legExercises23 = getExercises({
      targetMuscles: ['leg'],
      level: [2, 3],
      user,
    });

    const legExercises45 = getExercises({
      targetMuscles: ['upper_abs'],
      level: [4, 5],
      user,
    });

    //2 & 3
    expect(legExercises23['e13']).toBeTruthy();
    expect(legExercises23['e16']).toBeTruthy();
    //4 & 5
    expect(legExercises45['e111']).toBeTruthy();
    expect(legExercises45['e87']).toBeTruthy();
  });

  test('Should filter exercises by one or more training types', () => {
    const pliometric = getExercises({
      targetMuscles: ['arm'],
      trainingType: ['pliometric'],
      user,
    });

    const strengthAndPliometric = getExercises({
      targetMuscles: ['leg'],
      trainingType: ['pliometric', 'strength'],
      user,
    });

    //arm
    expect(pliometric['e136']).toBeTruthy();
    expect(pliometric['e137']).toBeTruthy();
    //leg
    expect(strengthAndPliometric['e38']).toBeTruthy();
    expect(strengthAndPliometric['e39']).toBeTruthy();
  });

  test('Should filter exercises when user can not jump', () => {
    const training_info = {
      ableToDoPhysicalActivity: true,
      crunch: true,
      crunches: 35,
      jumps: false,
      pushUps: 20,
      days: [1, 0, 1, 0, 1, 0, 0],
    };

    const notJumpingUser = {...user, training_info};

    const exercices = getExercises({
      targetMuscles: ['leg'],
      user: notJumpingUser,
    });

    expect(exercices['e39']).toBeTruthy();
    expect(exercices['e1']).toBeTruthy();
    //
    expect(exercices['e13']).toBeFalsy();
  });

  test('Should filter exercises when user can not crunch', () => {
    const training_info = {
      ableToDoPhysicalActivity: true,
      crunch: false,
      crunches: 35,
      jumps: true,
      pushUps: 20,
      days: [1, 0, 1, 0, 1, 0, 0],
    };

    const notCrunchingUser = {...user, training_info};

    const exercices = getExercises({
      targetMuscles: ['lower_abs', 'upper_abs'],
      user: notCrunchingUser,
    });

    expect(exercices['e111']).toBeTruthy();
    //
    expect(exercices['e101']).toBeFalsy();
  });

  test('Should filter only  obliques exercises', () => {
    const exercices = getExercises({
      targetMuscles: ['obliques'],
      user: user,
    });
    expect(exercices).toBeTruthy();
    //
  });
});
