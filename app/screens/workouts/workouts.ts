import {WorkoutsTypes} from './actions/workout';

export interface WorkoutInterface {
  type: WorkoutsTypes;
  level: number;
  title: string;
}

export const allWorkouts: WorkoutInterface[] = [
  {type: 'chest', level: 2, title: 'Entrenamiento de pecho'},
  {type: 'arms', level: 2, title: 'Entrenamiento de brazos'},
];

export const absWorkouts: WorkoutInterface[] = [
  {type: 'full_abs', level: 1, title: 'Abdmomen completo'},
  {type: 'lower_abs', level: 1, title: 'V abdominal'},
  {type: 'obliques', level: 1, title: 'Oblicuos'},
  {
    type: 'cardio_lower_abs',
    level: 1,
    title: 'Cardio + V abdominal',
  },
];

export const legWorkouts: WorkoutInterface[] = [
  {type: 'legs', level: 2, title: 'Piernas'},
  {type: 'glutes', level: 2, title: 'Glúteos'},
  {type: 'cardio_legs', level: 2, title: 'Cardio + piernas'},
];

export const cardioWorkouts: WorkoutInterface[] = [
  {type: 'cardio', level: 2, title: 'Cardio cuerpo completo'},
  {type: 'cardio_legs', level: 2, title: 'Cardio + piernas'},
  {
    type: 'cardio_lower_abs',
    level: 1,
    title: 'Cardio + V abdominal',
  },
];
