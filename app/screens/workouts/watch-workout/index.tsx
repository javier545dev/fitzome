import * as React from 'react';
import { StyleSheet, View, ScrollView, StatusBar, } from 'react-native';
import * as Common from 'common';

import { WorkoutsTypes } from '../actions/workout';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { getWorkout, toogleLoading } from 'redux/slices/workoutsSlice';
import { useNavigation, RouteProp } from '@react-navigation/native';

import SubHeader from 'components/subHeader';
import Description from './components/description';
import Exercises from '../components/ExercisesCarousel';
import PrimaryButton from '../components/primary-button';
import RoundsSummary from '../components/RoundsSummary';
import AiModal from './components/ai-modal';
import BodyMuscles from 'components/BodyMuscles';
import Label from 'components/Label';

type RootStackParamList = {
  watch_workout: {
    title: string,
    description: string;
    type: WorkoutsTypes,
    custom?: boolean;
  };
};

type WatchWrokoutRouteProp = RouteProp<RootStackParamList, 'watch_workout'>;

type RouteParams = { route: WatchWrokoutRouteProp; }

let aiModalMessage =
  'Creamos este entrenamiento con base en tu perfil, lo adaptaremos cada vez que termines una sesión.';
let workoutKey = '';

export default function WatchWorkout({ route }: RouteParams) {

  const { title, description, type, custom = false } = route.params;

  const navigation = useNavigation();
  const user = useAppSelector(state => state.user);
  //const user = { ...u, weight: 87, }
  //const user = { ...u, weight: 115, }
  const loading = useAppSelector(state => state.workouts.loading);
  const rounds = useAppSelector(state => state.workouts.currentWorkout.rounds);
  const noRepitedExercises = useAppSelector(state => state.workouts.noRepitedExercises);

  const [aiInfoModal, setAiInfoModal] = React.useState(false);
  const appDispatch = useAppDispatch();

  React.useEffect(() => {
    workoutKey = custom ? `custom_coach_workout_key` : `${type}`;
    appDispatch(getWorkout({ workoutKey, type, user }));
    //console.log(`%c 🏁init watch warkout`, 'color: blue');
    Common.logEvent('WORKOUT_WATCHED');

    return () => {
      //console.log(`%c 🚀Quit watch warkout`, 'color: blue');
      appDispatch(toogleLoading(true));
    };
  }, []);

  const showAiModal = () => setAiInfoModal(!aiInfoModal);

  function goToDoWorkout() {
    navigation.navigate('Do_Workout', { workoutKey, title })
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.statusbarSubGrap} />
      <SubHeader title={title} />

      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
        <Description text={description} />
        <Label label={'Ejercicios'} />
        <Exercises exercises={noRepitedExercises} loading={loading} />
        <Label label={'Resumen'} />
        <RoundsSummary rounds={rounds} loading={loading} />
        <Label label={'Objetivo'} />
        {
          !loading ?
            <BodyMuscles rounds={rounds} /> :
            null
        }
        <View style={{ width: 100, height: 100 }} />
      </ScrollView>
      <AiModal
        message={aiModalMessage}
        // smallMessage={"No olvides descargar los ejercicios antes de comenzar tu entrenamiento."}
        smallMessage={''}
        show={() => showAiModal()}
        visible={aiInfoModal}
        btnLabel={'Ok'}
      />
      <PrimaryButton
        label={'Comenzar'}
        action={goToDoWorkout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusbarSubGrap: {
    width: Common.width,
    height: (StatusBar.currentHeight ?? 0) + 55,
  },
});
