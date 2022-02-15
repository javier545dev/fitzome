import {WitResponseInterface, CustomWorkoutTypes} from './types';
import {WorkoutInterface} from 'screens/workouts/workouts';
import { setStorageValue, removeStorageValue } from 'local_storage';

export async function getCoachResponseV1(data: WitResponseInterface): Promise<string> {
//   const intents = data.intents;
//   const entities = data.entities;
//   console.log(JSON.stringify(data), null, 2);
//   console.log({intents});
//   console.log(JSON.stringify({entities}));
  /**
   * Get intent
   */
  const intent = data.intents.length > 0 ? data.intents[0] : {
        id: '123',
        name: 'unknown',
        confidence: 0,
  };
  /**
   * Check availables intents
   */
  switch (intent.name) {
    case 'greet':
      return 'Hola! Como te puedo ayudar?';
    case 'create_workout':
      return await createWorkout(data);
    case 'bye':
      return '👀';
    case 'thanks':
      return 'De nada!';
    case 'ask':
      return returnAnswer(data);
    default:
      return 'Por el momento no te puedo ayudar con eso, pero puedo:\n 👉 Crearte un entrenamiento.';
  }
}

/**
 * Return an answer to x question
 * @param data 
 * @returns answer => string
 */
function returnAnswer(data: WitResponseInterface): string{
  let answer = 'Me puedes repetir tu pregunta? 👀\n Intenta con algo como: Como bajar de peso?';
  const entities = data.entities;
   /**
   * Get action
   */
  const actions = Object.entries(entities).length > 0 ?? null;
   /**
   * Check actions
   */
  if (actions) {
    let bajar_peso = false;
    /**
     * loop entities / actions
     */
    for (const key in entities) {
        if (Object.prototype.hasOwnProperty.call(entities, key)) {
            /**
             * Get nested entities
             */
            const entitiesNested = entities[key];
            /**
             * get sigle entitie
             */
            entitiesNested.forEach(entitie => {
                if(entitie.value === 'bajar de peso') bajar_peso = true;
            })
        }
    }
    /**
     * if bajar de peso
     */
    if(bajar_peso){
      return `Para bajar de peso es necesario "quemar" más calorías de las que comes.\n \n Aquí te dejo unos tips: \n \n 👉Se necesita un déficit calórico de 3500 kcal para perder 354 gramos de grasa.\n \n 👉 La pérdida de peso debe ser gradual y menor a 900 gramos por semana.\n \n 👉 El aporte calórico debe ser de 1200 kcal por día y el déficit calórico no debe superar las 1000 kcal por día.\n \n 👉 La pérdida de peso debe ser por pérdida de grasa y no de músculo.\n \n👉 Debes ingerir al menos 3 comidas diarias. `
    }else{
      return 'Que te gustaría saber?'
    }
  }
  /**
  * Default return - no actions
  */
  return answer;
}

/**
 * Create a custom workout
 * @param data 
 * @returns 
 */
async function createWorkout(data: WitResponseInterface): Promise<string> {
  let message = 'Cómo?';
  const entities = data.entities;
//   console.log(JSON.stringify(data));
//   console.log(JSON.stringify({entities}));
  /**
   * Get action
   */
  const actions = Object.entries(entities).length > 0 ?? null;
  /**
   * Check actions
   */
  if (actions) {
    let entrenar = false;
    /**
     * loop entities / actions
     */
    for (const key in entities) {
        if (Object.prototype.hasOwnProperty.call(entities, key)) {
            /**
             * Get nested entities
             */
            const entitiesNested = entities[key];
            /**
             * get sigle entitie
             */
            entitiesNested.forEach(entitie => {
                if(entitie.value === 'entrenar') entrenar = true;
            })
        }
    }
    /**
     * If actions is "entrenar"
     */
    if (entrenar) {
      /**
       * Check muscles
       */
      const muscle = entities['fit_muscle:fit_muscle'] ?? null;
      if(muscle){
          /**
           * Muscles sopported
           */
          if(muscle[0].value === 'abs'){
            return await createCustomWorkout('abs');
          }
          else if(muscle[0].value === 'pierna'){
            return await createCustomWorkout('pierna');
          }
          else if(muscle[0].value === 'gluteo'){
             return await createCustomWorkout('gluteo');
          }
          else if(muscle[0].value === 'tren superior' || muscle[0].value === 'brazos'){
             return await createCustomWorkout('tren_superior');
          }
          else if(muscle[0].value === 'hoy'){
             return 'Que te gustaría entrenar hoy?';
          }
          /**
           * Muscle no supported
           */
          else{
            return 'Mm.. Puedo crear solo entrenamientos para: Pierna, glúteos, abdomen y tren superior.';
          }
      }
      /**
       * Muscle no found
       */
      else{
        return 'Mm.. Intenta con algo como: Quiero una rutina de abdomen';
      }
    } 
    /**
     * Actions is not "entrenar"
     */
    else {
      return 'Mm.. intenta con algo como: Quiero una rutina de abdomen';
    }
  }
  /**
   * Default return - no actions
   */
  else{
    return message;
  }
}

/**
 * Create custom workout
 * @param type 
 * @returns 
 */
async function createCustomWorkout(type:CustomWorkoutTypes):Promise<string>{
  try {
    const [workout, message] = getWorkoutType(type);
    await setStorageValue('coach_custom_training', workout);
    await removeStorageValue('custom_coach_workout_key');
    return message;
  } catch (error) {
    return 'Ocurrio un error al crear tu entrenamiento, intentalo nuevamente 👉👈';
  }
}

/**
 * Initerface
 */
interface WorkoutPrivateInterface extends WorkoutInterface{
  custom:boolean,
}
/**
 * Get workout type
 * @param spanishType 
 * @returns 
 */
function getWorkoutType(spanishType: CustomWorkoutTypes):[WorkoutPrivateInterface, string]{
  let workout: WorkoutPrivateInterface = {
      type: 'full_abs', 
      level: 1, 
      title: 'Abdmomen completo',
      custom: true,
  }
  let message = 'fit';

    if(spanishType === 'abs'){
      workout.type = 'full_abs';
      workout.title = 'Entrenamiento de abdomen';
      message = getWorkoutCreatedMessage('abdomen');
    }
    else if(spanishType === 'pierna'){
      workout.type = 'legs';
      workout.title = 'Entrenamiento de piernas';
      message =  getWorkoutCreatedMessage('pierna'); 
    }
    else if(spanishType === 'gluteo'){
      workout.type = 'glutes';
      workout.title = 'Entrenamiento de glúteo';
      message =  getWorkoutCreatedMessage('glúteos');
    }
    else if(spanishType === 'tren_superior'){
      workout.type = 'arms';
      workout.title = 'Entrenamiento del tren superior';
      message = getWorkoutCreatedMessage('tren superior');
    }

    return [workout, message];
}

/**
 * Get a message when a workout
 * is created
 * @param muscle 
 */
function getWorkoutCreatedMessage(muscle: string):string{
return `Listo, tu entrenamiento del ${muscle} está disponible en "Mis entrenamientos"`;
}
