import * as React from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';

import * as Workouts from './workouts';
import { roboto } from 'styles';
import * as Common from 'common';
/**
 * Redux
 */
// import { useAppSelector, useAppDispatch } from 'redux/hooks';
// import { getTrainingHistory } from 'redux/slices/accountSlice';
/**
 * Componenets
 */
import Header from 'components/ScreensMainHeader';
import { useFocusEffect } from '@react-navigation/native';
import Nav from 'components/main-nav';
import TransparentStatusBar from 'components/CustomStatusbar';
import WorkoutCarousel from './components/WorkoutCarousel';
// import Label from 'components/Label';
// import Muscles from './components/Muscles';
// import SavedWorkouts from './components/HistoryWorkouts';
const key = "AIzaSyBaefEAHSCMQRhOXoeh8uIgiGV9zHsbkRM";

export default function WorkoutsScreen() {

  //const dispatch = useAppDispatch();
  // const loading = useAppSelector(state => state.account.loading);
  // const trainingHistory = useAppSelector(
  //   state => state.account.trainingHistory,
  // );


  useFocusEffect(
    React.useCallback(() => {
      //dispatch(getTrainingHistory());
      //speech("Siguiente ejercicio")
    }, []),
  );




  //console.log(`%c ♻ render was called on page ${page}`, 'color: green');

  return (
    <View style={styles.mainContainer}>
      <TransparentStatusBar color={'white'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={'Entrenamientos'} />
        <WorkoutCarousel items={Workouts.allWorkouts} label={'Brazos y pecho'} />
        <WorkoutCarousel items={Workouts.absWorkouts} label={'Core - Abdomen'} />
        <WorkoutCarousel items={Workouts.legWorkouts} label={'Pierna y glúteos'} />
        <WorkoutCarousel items={Workouts.cardioWorkouts} label={'Cardio quema grasa'} />
        <View style={styles.blankSpace} />
      </ScrollView>
      <Nav active={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: roboto.regular,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  myTrainingsGrap: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    marginLeft: 0,
  },
  bntContentGrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blankSpace: {
    width: Common.width,
    height: 100,
  },
});

/*
 Cardio para quemar grasa
 Entrenamientos para principiantes
HIIT para quemar grasa
    Pecho y brazos
    Tonificar piernas y glúteos
    Entrenamiento abdominal
    Tonificar los brazos
    */

/* <Label label={'Músculos'} />
        <Muscles trainingHistory={trainingHistory} /> */
/* <Label label={'Historial de entrenamiento'} />
        <View>
          {loading ? (
            <ActivityIndicator size={'large'} />
          ) : trainingHistory.length > 0 ? (
            trainingHistory.map((workout, i) => {
              return <SavedWorkouts {...workout} />;
            })
          ) : null}
        </View> */


/* <WorkoutCarousel
        items={Workouts.absWorkouts}
        label={'Core - Abdomen'}
      />
      <WorkoutCarousel
        items={Workouts.lowerBodyWorkouts}
        label={'Tren inferior'}
      />
      <WorkoutCarousel
        items={Workouts.upperBodyWorkouts}
        label={'Tren superior'}
      /> */


// const speech = async (text: string) => {
//   const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`;

//   try {
//     const response = await fetch(address, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         input: {
//           //text,
//           ssml: "<speak><emphasis level=\"strong\">El siguiente ejercicio es</emphasis></speak>"
//         },
//         voice: {
//           languageCode: "es-US",
//           name: "es-US-Wavenet-B",
//           ssmlGender: "MALE",
//         },
//         audioConfig: {
//           audioEncoding: "MP3",
//           effectsProfileId: ["handset-class-device"],
//           pitch: 0,
//           speakingRate: 1,
//         },
//       }),
//     });
//     const result = await response.json();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
