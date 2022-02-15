import {historyTrainig01} from './data';
import {getWorkoutsWithFullExercises} from 'screens/account/methods';
/**
 * Account
 */
describe('Account', () => {
  /**
   *
   */
  test('Should add a full exercise to each exercise in training history', () => {
    const workout01 = getWorkoutsWithFullExercises(historyTrainig01);

    /**
     * Asserts
     */
    expect(workout01).toBeTruthy();
    /**
     * Check if exercise exists
     */
    expect(workout01[0].training_history[0].exercise).toBeTruthy();
    /**
     * Check if key and the exercise match
     */
    expect(historyTrainig01[0].training_history[0].key).toBe('e130');
    expect(workout01[0].training_history[0].exercise.key).toBe('e130');
    /**
     * Check match
     */
    expect(workout01[0].training_history[0].exercise.key).toBe(
      historyTrainig01[0].training_history[0].key,
    );
  });
});
