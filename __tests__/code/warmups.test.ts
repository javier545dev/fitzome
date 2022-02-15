import {createWarmup} from '../../app/screens/workouts/actions';

describe('Warmups', () => {
  test('Can create upper warmups successfully', () => {
    const upperWarmup = createWarmup('upper');
    expect(upperWarmup.length).toEqual(1);
    expect(upperWarmup[0].length).toBeGreaterThanOrEqual(12);
  });

  test('Can create lower warmups successfully', () => {
    const lowerWarmup = createWarmup('lower');
    expect(lowerWarmup.length).toEqual(1);
    expect(lowerWarmup[0].length).toBeGreaterThanOrEqual(11);
  });

  test('Can create full warmups successfully', () => {
    const fullWarmup = createWarmup('full');
    expect(fullWarmup.length).toEqual(1);
    expect(fullWarmup[0].length).toBeGreaterThanOrEqual(12);
  });
});
