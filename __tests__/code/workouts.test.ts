import {user} from './data';
import {exercises} from '../../resources/data/exercises';
import {
  //calculateIntensity,
  createWorkout,
  getMusclesActivatedInWorkout,
} from '../../app/screens/workouts/actions';

/**
 * Jest documentation -> https://jestjs.io/docs/expect
 * https://blog.logrocket.com/javascript-testing-best-practices/
 */

/**
 * ABS WORKOUTS
 */
describe('Abs workouts', () => {
  /**
   * Lower abs (v) workouts
   */
  /**
   * Normal weight
   */
  test('Should create a lower abs workout to users with normal weight', () => {
    const workout = createWorkout('lower_abs', 2, user);

    let isRightMuscle = false;
    let isRightLevel = false;

    for (let i = 0; i < workout[0].length; i++) {
      const {target_muscles, level} = workout[0][i];
      /**
       * Check muscles
       */
      target_muscles.forEach(muscle => {
        const muscleType = muscle[0];
        if (muscleType === 'lower_abs') {
          isRightMuscle = true;
        }
      });
      /**
       * Check exercise level
       */
      if (level === 3 || level === 4 || level === 5) {
        isRightLevel = true;
      }
    }

    /**
     * Asserts
     */
    expect(workout).toBeTruthy();
    /**
     * Check muscles, must be lower_abs
     */
    expect(isRightMuscle).toBeTruthy();
    /**
     * Check exercices levels, must be 3,4,5
     */
    expect(isRightLevel).toBeTruthy();
    /**
     * Check number of exercises by set, must be at least 5
     */
    expect(workout[0].length).toBeGreaterThanOrEqual(5);
    expect(workout[1].length).toBeGreaterThanOrEqual(5);
    expect(workout[2].length).toBeGreaterThanOrEqual(5);
    expect(workout[3].length).toBeGreaterThanOrEqual(5);
    /**
     * Must have 4 rounds
     */
    expect(workout).toHaveLength(4);
  });
  /**
   * Obesity
   */
  test('Should create a lower abs workout to users with ovesity', () => {
    const userWithObesity = {
      ...user,
      weight: 87,
    };

    const workout = createWorkout('lower_abs', 2, userWithObesity);

    let isRightMuscle = false;
    let isRightLevel = false;

    for (let i = 0; i < workout[0].length; i++) {
      const {target_muscles, level} = workout[0][i];
      /**
       * Check muscles
       */
      target_muscles.forEach(muscle => {
        const muscleType = muscle[0];
        if (muscleType === 'lower_abs') {
          isRightMuscle = true;
        }
      });
      /**
       * Check exercise level
       */
      if (level === 3) {
        isRightLevel = true;
      }
    }

    /**
     * Asserts
     */
    expect(workout).toBeTruthy();
    /**
     * Check muscles, must be lower_abs
     */
    expect(isRightMuscle).toBeTruthy();
    /**
     * Check exercices levels, must be 3
     */
    expect(isRightLevel).toBeTruthy();
    /**
     * Check number of exercises by set, must be at least 3
     */
    expect(workout[0].length).toBeGreaterThanOrEqual(3);
    expect(workout[1].length).toBeGreaterThanOrEqual(3);
    expect(workout[2].length).toBeGreaterThanOrEqual(3);
    /**
     * Must have 3 rounds
     */
    expect(workout).toHaveLength(3);
  });
  /**
   * Obesity type 2 and more
   */
  test('Should create a lower abs workout to users with ovesity type  2 and avobe', () => {
    const userWithObesity = {
      ...user,
      weight: 110,
    };

    const workout = createWorkout('lower_abs', 2, userWithObesity);

    let isRightMuscle = false;
    let isRightLevel = false;

    for (let i = 0; i < workout[0].length; i++) {
      const {target_muscles, level} = workout[0][i];
      /**
       * Check muscles
       */
      target_muscles.forEach(muscle => {
        const muscleType = muscle[0];
        if (muscleType === 'lower_abs') {
          isRightMuscle = true;
        }
      });
      /**
       * Check exercise level
       */
      if (level === 3 || level === 2 || level === 1) {
        isRightLevel = true;
      }
    }

    /**
     * Asserts
     */
    expect(workout).toBeTruthy();
    /**
     * Check muscles, must be lower_abs
     */
    expect(isRightMuscle).toBeTruthy();
    /**
     * Check exercices levels, must be 1, 2, 3
     */
    expect(isRightLevel).toBeTruthy();
    /**
     * Check number of exercises by set, must be at least 3
     */
    expect(workout[0].length).toBeGreaterThanOrEqual(3);
    expect(workout[1].length).toBeGreaterThanOrEqual(3);
    expect(workout[2].length).toBeGreaterThanOrEqual(3);
    /**
     * Must have 3 rounds
     */
    expect(workout).toHaveLength(3);
  });
  /**
   * Obliques workouts
   */
  /**
   * Normal weight
   */
  test('Should create a oblique workout to users with normal weight', () => {
    const workout = createWorkout('obliques', 2, user);

    let isRightMuscle = false;
    let isRightLevel = false;

    for (let i = 0; i < workout[0].length; i++) {
      const {target_muscles, level} = workout[0][i];
      /**
       * Check muscles
       */
      target_muscles.forEach(muscle => {
        const muscleType = muscle[0];
        if (muscleType === 'obliques') {
          isRightMuscle = true;
        }
      });
      /**
       * Check exercise level
       */
      if (level === 3 || level === 4 || level === 5) {
        isRightLevel = true;
      }
    }

    /**
     * Asserts
     */
    expect(workout).toBeTruthy();
    /**
     * Check muscles, must be lower_abs
     */
    expect(isRightMuscle).toBeTruthy();
    /**
     * Check exercices levels, must be 3,4,5
     */
    expect(isRightLevel).toBeTruthy();
    /**
     * Check number of exercises by set, must be at least 5
     */
    expect(workout[0].length).toBeGreaterThanOrEqual(5);
    expect(workout[1].length).toBeGreaterThanOrEqual(5);
    expect(workout[2].length).toBeGreaterThanOrEqual(5);
    expect(workout[3].length).toBeGreaterThanOrEqual(5);
    /**
     * Must have 4 rounds
     */
    expect(workout).toHaveLength(4);
  });
});

/**
 * DIVERSE WORKOUT METHODS
 */
describe('Workout methods', () => {
  //   /**
  //    * Check if intensity in workous is calculated
  //    * based on user feedBack
  //    */
  //   test('Itensity in workouts is updated correctly based on user feedback', () => {
  //     const feedback1 = [
  //       {
  //         feedback: 1,
  //       },
  //       {
  //         feedback: 5,
  //       },
  //     ];
  //     const feedback2 = [
  //       {
  //         feedback: 1,
  //       },
  //       {
  //         feedback: 1,
  //       },
  //     ];
  //     /**
  //      * Asserts
  //      */
  //     expect(feedback1)).toBe(0);
  //     expect(feedback2)).toBe(40);
  //   });
  /**
   * Check if muscles colors are shown correctly
   */
  test('Muscles colors are shown correctly', () => {
    const workout = [[exercises['e111'], exercises['e2']]];
    const workout2 = [[exercises['e111'], exercises['e111']]];
    const muscles = getMusclesActivatedInWorkout(workout);
    const muscles2 = getMusclesActivatedInWorkout(workout2);
    /**
     * Asserts
     */
    //workout 1
    expect(muscles).toBeTruthy();
    expect(muscles.upper_abs.intensity).toBe(1);
    expect(muscles.lower_abs.intensity).toBe(2);
    expect(muscles.all).toBeFalsy(); // It does not exist
    //workout 2
    /**
     * Intensity must be 1
     */
    expect(muscles2.upper_abs.intensity).toBe(1);
    /**
     * Check the number of times that appear the exercise
     * must be 2
     */
    expect(muscles2.upper_abs.quantity).toBe(2);
  });
  /**
   * Check if volume is assigned based on user crunches
   */
  // test('Should update exercise volume based on user crunches', () => {
  //   const training_info = {
  //     ableToDoPhysicalActivity: true,
  //     crunch: false,
  //     crunches: 30,
  //     jumps: false,
  //     pushUps: 20,
  //     days: [1, 0, 1, 0, 1, 0, 0],
  //   };
  //   const user30 = {...user, training_info};
  //   const workout = createWorkout('lower_abs', 2, user30);
  //   let has23 = false;

  //   workout[0].forEach(exercise => {
  //     console.log(exercise);
  //     if (exercise.crunch && exercise.volume_amount === 23) {
  //       has23 = true;
  //     }
  //   });

  //   /**
  //    * Asserts
  //    */
  //   /**
  //    * Volume should be 23
  //    */
  //   expect(has23).toBeTruthy();
  // });
});
