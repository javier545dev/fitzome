import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
/*Common imports */
import * as Common from 'common';
import { eed } from 'common/text-to-speech';
import * as Speech from 'expo-speech';
import { roboto } from 'styles';
/**
 * Redux
 */
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
  startWorkout, changeExercise, setNextExercise, cleanWorkout,
  updateKey,
  showSelectRestModal, workoutFeedbackModal,
  updateTraningHistory,
  TrainingHistoryTypes
} from 'redux/slices/doWorkoutSlice';

import { useNavigation, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Exercise from './components/DoExercise';
import SelectRestModal from './components/AskRestModal';
import SelectDificultyModal from './components/GiveWorkoutFeedback';
import RestModal from './components/RestModal';
import FinalModal from './components/FinalModal';

type RootStackParamList = { do_workout: { workoutKey: string; title: string; }; };
type DoWorkoutsProps = RouteProp<RootStackParamList, 'do_workout'>;
type RouteParams = { route: DoWorkoutsProps; }

let round = 0;
let currentExercise = 0;
let exerciseCounter = 0;
let tempStartTime = 0;

export default function DoWorkout({ route }: RouteParams) {
  const { workoutKey, title } = route.params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const rounds = useAppSelector(state => state.workouts.currentWorkout.rounds);
  const loading = useAppSelector(state => state.doWorkout.loading);
  const exerciseLoading = useAppSelector(state => state.doWorkout.exerciseLoading);
  const exercise = useAppSelector(state => state.doWorkout.currentExercise);
  const nextExerciseName = useAppSelector(state => state.doWorkout.nextExerciseName);
  const totalOfExercises = useAppSelector(state => state.doWorkout.totalOfExercises);
  const _changeExercise = useAppSelector(state => state.doWorkout.changeExercise);
  const restModal = useAppSelector(state => state.doWorkout.restModal);
  const selectRestModal = useAppSelector(state => state.doWorkout.selectRestModal);
  const _currentRound = useAppSelector(state => state.doWorkout.currentRound);
  const giveFeedbackModal = useAppSelector(state => state.doWorkout.giveFeedbackModal);
  const finalModal = useAppSelector(state => state.doWorkout.finalModal);
  const trainingHistory = useAppSelector(state => state.doWorkout.trainingHistory);
  const user = useAppSelector(state => state.user);

  React.useEffect(() => {
    //console.log(`%c 🏁init DO WORKOUT`, 'color: blue');
    dispatch(startWorkout({ rounds }));
    dispatch(updateKey({
      workoutKey,
      title
    }));
    tempStartTime = new Date().valueOf();
    startSpeach(`Primer ejercicio`);
    return () => {
      round = 0;
      currentExercise = 0;
      exerciseCounter = 0;
      tempStartTime = 0;
      /**
      * Restart
      */
      dispatch(cleanWorkout())
      //console.log(`%c 🚀Quit DO WORKOUT`, 'color: blue');
    };
  }, []);

  React.useEffect(() => {
    if (_currentRound > 0) nextRound();
  }, [_currentRound]);

  React.useEffect(() => {
    if (loading === false) {
      nextExercise();
    }
  }, [_changeExercise]);


  function nextRound() {
    try {
      exerciseCounter += 1;
      const tempExercise = { ...rounds[round][currentExercise] };
      const _nextExerciseName = rounds[round][currentExercise + 1].name ?? '*_*';
      dispatch(setNextExercise([tempExercise, _nextExerciseName]));
      tempStartTime = new Date().valueOf();
    } catch (error) {
      Common.showToast('Ocurrio un error, por favor intentalo de nuevo');
      Common.logEvent('ERROR_NEXT_ROUND');
      navigation.goBack();
    }
  }
  /**
    * Update Training History
    */
  function updateHistory() {
    let tempTraningHistory: TrainingHistoryTypes = [...trainingHistory];
    tempTraningHistory.push({
      key: exercise.key,
      start_date: tempStartTime,
      end_date: new Date().valueOf(),
    })
    /**
     * Update
     */
    dispatch(updateTraningHistory(tempTraningHistory));
  }

  function nextExercise() {
    updateHistory();
    currentExercise += 1;
    exerciseCounter += 1;
    /**
    * Get current round
    */
    const currentRound = [...rounds[round]];
    const currentRoundLenght = currentRound.length - 1;
    /**
    * Check if there is next exercise
    */
    if (currentRoundLenght < currentExercise) {
      /**
       * Round ended
       */
      round += 1;
      /**
       * Restart exercise counter
       */
      currentExercise = 0;
      /**
       * Check if can end wrokout
       */
      if (round >= rounds.length) {
        /**
         * Wrokout ended
         */
        dispatch(workoutFeedbackModal(true));
      } else {
        /**
         * Start rest
         */
        dispatch(showSelectRestModal(true))
      }
    } else {
      /**
       * Set next exercise
       */
      let tempNextExerciseName = '';
      if (currentRoundLenght === currentExercise) {
        tempNextExerciseName = 'Último ejercicio';
      } else {
        tempNextExerciseName = rounds[round][currentExercise + 1].name ?? '';

      }
      const tempNextExercise = { ...rounds[round][currentExercise] };
      dispatch(setNextExercise([tempNextExercise, tempNextExerciseName]));
      tempStartTime = new Date().valueOf();
    }
  }

  function btnNext() {
    if (exercise.volume === 2) {
      Common.showToast('No puedes saltar este ejercicio');
    } else {
      dispatch(changeExercise(!_changeExercise))
    }
  }

  const goBack = () => navigation.goBack();

  async function startSpeach(phrase: string) {
    try {
      await Speech.speak(phrase, { ...eed });
    } catch (error) {
      Common.logEvent('EXPO_TEXT_SPEACH_FAIL');
    }
  }

  return (
    <View>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.grap}>
        <TouchableOpacity onPress={goBack}>
          <View style={styles.backBtn}>
            <Icon size={30} color={'black'} name={'arrow-back-outline'} />
          </View>
        </TouchableOpacity>
      </View>
      {loading ? null : (
        <View>
          <Exercise exercise={exercise} next={nextExerciseName}
            totalOfExercises={totalOfExercises}
            currentExerciseNumber={exerciseCounter} />
          <View style={styles.buttonGrap}>
            {exerciseLoading === false ? (
              <TouchableOpacity onPress={btnNext}>
                <View style={styles.button}>
                  <Icon
                    name={'caret-forward-circle'}
                    size={30}
                    color="rgba(0,0,0,.8)"
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.button}>
                <Text style={styles.label}>{`Prepárate`}</Text>
                <ActivityIndicator size={'small'} color={'black'} />
              </View>
            )}
          </View>
        </View>
      )}

      {selectRestModal ? <SelectRestModal round={round} user={user.name} /> : null}
      {restModal ? (<RestModal user={user.name} />) : null}
      {finalModal ? (<FinalModal />) : null}
      {giveFeedbackModal ? <SelectDificultyModal /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
  },
  buttonGrap: {
    position: 'absolute',
    zIndex: 5,
    right: 20,
    top: Common.height + (StatusBar.currentHeight ?? 0) - 60 - 40,
  },
  label: {
    fontFamily: roboto.regular,
    fontSize: 13,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    width: 100,
    borderRadius: 16,
  },
  backBtn: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grap: {
    height: 55,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: StatusBar.currentHeight,
    zIndex: 1,
    flexDirection: 'row',
  },
});
