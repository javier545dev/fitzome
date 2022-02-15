import {WorkoutInterface} from '../actions/workout';

/**
 * Get and array with all the exercises and rounds
 * @param rounds
 * @returns
 */
export function getExercisesTotal(
  rounds: WorkoutInterface['rounds'],
): number[] {
  let exercisesAndRounds: number[] = [];
  /**
   * Loop the workouts rounds
   */
  rounds.forEach(singleRound => {
    /**
     * Add a round equivalent to a empty space
     */
    exercisesAndRounds.push(0);
    /**
     * Add a exercise equivalent to a blue line
     */
    singleRound.forEach(round => exercisesAndRounds.push(1));
  });
  /**
   * Remove first round
   */
  exercisesAndRounds.shift();
  /**
   *
   */
  return exercisesAndRounds;
}

// function getHistoryExercises(historyExercises, round, sets) {
//   let h = [];
//   // console.log('[1] round: ', round, historyExercises);
//   for (let i = 0; i < historyExercises[round].length; i++) {
//     const singleExercise = historyExercises[round][i];
//     //console.log('[2] in round: ', singleExercise);
//     for (let a = 0; a < sets[round].length; a++) {
//       const {key, name, url, side, volume, volume_amount} = sets[round][a];
//       //console.log('[3]: ', sets[round][a]);
//       if (singleExercise.key === key) {
//         h.push({
//           name,
//           time: getTime(singleExercise.start, singleExercise.end),
//           url,
//           side,
//           volume,
//           volume_amount,
//         });
//         break;
//       }
//     }
//   }
//   return h;
// }

// function getTime(begin, end) {
//   const beginFixed = begin ? begin : 0;
//   const endFixed = end ? end : 0;
//   const time = endFixed - beginFixed;
//   const seg = time / 1000;
//   const segFixed = Math.round(Math.abs(seg));

//   if (segFixed < 10) {
//     return `00:0${segFixed}`;
//   } else if (segFixed >= 10 && segFixed <= 60) {
//     return `00:${segFixed}`;
//   } else if (segFixed > 60) {
//     return `01:${segFixed}`;
//   }
// }

// export {getExercisesTotal, getHistoryExercises, getTime};
