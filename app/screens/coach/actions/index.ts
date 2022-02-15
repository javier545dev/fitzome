import {exercises} from '../../../../resources/data/exercises';

import {PlansInterface} from 'screens/plans/actions';

const dayNames = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

function getDayNameAndNumber(start: Date, current: number): string {
  const d = new Date();
  const tempDate = new Date(start);
  tempDate.setDate(tempDate.getDate() + current);
  const tempDateLabel = `${tempDate.getDate()}/${tempDate.getMonth() +
    1}/${tempDate.getFullYear()}`;
  const today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  if (current === 0) {
    if (today === tempDateLabel) {
      return 'hoy';
    } else {
      return `${dayNames[new Date(start).getDay()]} ${tempDateLabel}`;
    }
  } else {
    if (today === tempDateLabel) {
      return 'hoy';
    } else {
      return `${dayNames[tempDate.getDay()]} ${tempDateLabel}`;
    }
  }
}

function getDayName(start: Date, current: number): string {
  const d = new Date();
  const tempDate = new Date(start);
  tempDate.setDate(tempDate.getDate() + current);
  const tempDateLabel = `${tempDate.getDate()}/${tempDate.getMonth()}/${tempDate.getFullYear()}`;
  const today = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

  if (current === 0) {
    if (today === tempDateLabel) {
      return 'hoy';
    } else {
      return dayNames[new Date(start).getDay()];
    }
  } else {
    if (today === tempDateLabel) {
      return 'hoy';
    } else {
      return dayNames[tempDate.getDay()];
    }
  }
}

/**
 * Get training days
 * @param weeks
 * @returns
 */
function getDays(
  weeks: PlansInterface['fullPlan'],
): Array<{
  type: 'workout' | 'rest';
  key?: string;
}> {
  let tempDays: Array<{
    type: 'workout' | 'rest';
    key?: string;
  }> = [];
  weeks.forEach(week => {
    week.forEach((d: any) => tempDays.push(d));
  });
  return tempDays;
}

function getFullActivities(days: any[], availableWorkouts: any[]): any[] {
  let tempActivities: any[] = [];
  for (let i = 0; i < days.length; i++) {
    const d = days[i];
    tempActivities.push([]);
    for (let z = 0; z < d.length; z++) {
      const act = d[z];
      if (act.type != 'rest') {
        if (act.type === 'expired') {
          tempActivities[i].push({...act});
        } else {
          const fullWorkout = findWorkoutById(
            availableWorkouts,
            Number(act.key),
          );
          tempActivities[i].push({type: 'workout', workout: {...fullWorkout}});
        }
      } else {
        tempActivities[i].push({...act});
      }
    }
  }
  return tempActivities;
}

function getFullWorkouts(oldWorkouts: any[]): any[] {
  let temp = [];
  for (let i = 0; i < oldWorkouts.length; i++) {
    const _workout = oldWorkouts[i];
    const newRounds = getSets(_workout.rounds);
    temp.push({..._workout, rounds: newRounds});
  }
  return temp;
}

function findExerciseById(key: string): object | undefined {
  for (let i = 0; i < Object.entries(exercises).length; i++) {
    const exercise = exercises[i];
    if (key === exercise.key) {
      return exercise;
    }
  }
}

function getSets(rounds: any[]): any[] {
  let tempSets = [];
  for (let i = 0; i < rounds.length; i++) {
    const round = rounds[i];
    let tempRound = [];
    for (let z = 0; z < round.length; z++) {
      const e = round[z];
      const exercise = findExerciseById(e.key);
      tempRound.push({...exercise, volume_amount: e.volume_amount});
    }
    tempSets.push(tempRound);
  }
  return tempSets;
}

function findWorkoutById(workouts: any[], id: number): object | undefined {
  for (let i = 0; i < workouts.length; i++) {
    const _workout = workouts[i];
    if (_workout.key === id) {
      return _workout;
    }
  }
}

/**
 * Get the plan with days expired
 * @param weeks
 * @param startDayByUser
 * @returns Weeks with days expired
 */
function getWeeksWithDaysExpired(weeks: any[], startDayByUser: Date): any[] {
  let tempWeeks = [...weeks];
  let weeksCorrected = [];
  const weekStartDayByUser = new Date(startDayByUser).getDay();
  const daysFromMonday = Math.abs(weekStartDayByUser - 1);
  const pd = new Date(startDayByUser);
  const realPlanStartDate = new Date(pd.setDate(pd.getDate() - daysFromMonday));
  const indexesToDelete = daysFromMonday - 1;
  // console.log('dio de inicio de programa por le usuario: ', new Date(startDayByUser));
  // console.log('dio de inicio de programa real: ', realPlanStartDate);
  // console.log('dias desde el lunes', daysFromMonday);
  // console.log('index para borrar ',  indexesToDelete);
  if (daysFromMonday === 0) {
    return [tempWeeks, realPlanStartDate];
  } else {
    for (let i = 0; i < tempWeeks.length; i++) {
      const singleWeek = tempWeeks[i];
      if (i === 0) {
        let temp = [];
        for (let z = 0; z < singleWeek.length; z++) {
          const singleDay = singleWeek[z];
          if (z <= indexesToDelete) {
            temp.push([{type: 'expired'}]);
          } else {
            temp.push([...singleDay]);
          }
        }
        weeksCorrected.push([...temp]);
      } else {
        weeksCorrected.push([...singleWeek]);
      }
    }
  }
  return [weeksCorrected, realPlanStartDate];
}

export {
  getDayNameAndNumber,
  getDayName,
  getDays,
  getFullActivities,
  getFullWorkouts,
  getWeeksWithDaysExpired,
};
