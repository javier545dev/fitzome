import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { roboto } from 'styles';
import Sound from 'react-native-sound';
import * as Common from 'common';
import { eed } from 'common/text-to-speech';
import * as Speech from 'expo-speech';
/**
 * Redux
 */
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setExerciseLoading, changeExercise } from 'redux/slices/doWorkoutSlice';

let INTERVAL: any = null;
let START_TIME = 5;
let SECONDS = 0;
let MUSIC: any = null;
let ININITAL_TIME: any = null;

interface Props {
  volume: number;
  /**
   * reps = 1, seg = 2
   */
  type: any;
  name: string;
  nextExercise: string;
}

export default function RepsCounter({ volume, type, name, nextExercise }: Props) {
  const [label, setLabel] = React.useState('');
  const dispatch = useAppDispatch();
  const exerciseLoading = useAppSelector(
    state => state.doWorkout.exerciseLoading,
  );
  const _changeExercise = useAppSelector(
    state => state.doWorkout.changeExercise,
  );
  const user = useAppSelector(state => state.user);

  React.useEffect(() => {
    //console.log('|init counter|');
    startSpeach('');
    return () => {
      if (MUSIC) releaseMusic();
      //console.log('|quit counter|')
    };
  }, []);

  React.useEffect(() => {
    //console.log('init counter');
    setLabel(String(volume));
    /**
     * Init timer
     */
    if (type === 2) {
      if (exerciseLoading === false) {
        dispatch(setExerciseLoading(true));
      }
      ININITAL_TIME = volume;
      SECONDS = volume;
      //console.log('and timer')
      INTERVAL = setInterval(timer, 1000);
    } else {
      /**
       * Next exercise
       */
      dispatch(setExerciseLoading(false));
    }

    return () => {
      //console.log('quit counter');
      if (INTERVAL) {
        //console.log('and timer')
        clearInterval(INTERVAL);
      }
      START_TIME = 8;
      SECONDS = 0;
    };
  }, [name]);

  function timer() {
    START_TIME -= 1;
    if (START_TIME <= 0) countDown();
  }

  function countDown() {
    dispatch(setExerciseLoading(false));

    if (SECONDS === ININITAL_TIME) playMusic('go_sound');
    //Seconds sound
    if (SECONDS === 11) {
      const _10 = _10More();
      startSpeach(_10);
    }

    if (SECONDS === 6) startSpeach('5 segundos');
    // if (SECONDS === 5) startSpeach('4');
    //if (SECONDS === 4) startSpeach('3');
    // if (SECONDS === 3) startSpeach('2');
    if (SECONDS === 2) {
      const _godJob = goodJob();
      startSpeach(_godJob);
    }

    SECONDS -= 1;

    if (SECONDS === 0) timeDone();
    if (SECONDS > 0) count();
  }

  function count() {
    if (SECONDS < 10) setLabel(`0${SECONDS}`);
    if (SECONDS >= 10) setLabel(`${SECONDS}`);
  }

  function timeDone() {
    if (SECONDS < 10) setLabel(`0${SECONDS}`);
    clearInterval(INTERVAL);

    const nextLabel = nextExerciseSpeach();
    startSpeach(nextLabel);
    dispatch(changeExercise(!_changeExercise));
  }

  function goodJob(): string {
    const n = Common.getRandomNumber(1, 5);
    return n === 1
      ? `exelente!.`
      : n === 2
        ? `bien hecho!.`
        : n === 3
          ? `buen trabajo!.`
          : n === 4
            ? `estupendo!.`
            : ` Muy bien!.`;
  }

  function _10More(): string {
    const n = Common.getRandomNumber(1, 4);
    const userName = user.name.split(' ')[0];
    return n === 1
      ? 'faltan 10 segundos'
      : n === 2
        ? `vamos ${userName}.. 10 segundos más`
        : n === 3
          ? `te faltan 10 segundos ${userName}`
          : '10 segundos mas';
  }

  function nextExerciseSpeach(): string {
    if (nextExercise === 'Último ejercicio') {
      return '';
    } else {
      const n = Common.getRandomNumber(1, 3);
      const userName = user.name.split(' ')[0];
      return n === 1
        ? `${userName}. el siguiente ejercicio es ${nextExercise}`
        : n === 2
          ? `el siguiente ejercicio es${nextExercise}`
          : `ahora sigue ${nextExercise}`;
    }
  }

  const playMusic = (audioTrack: string) => {
    // console.log('paly music');
    Sound.setCategory('Playback');
    MUSIC = new Sound(audioTrack, Sound.MAIN_BUNDLE, error => {
      if (!error && MUSIC) {
        MUSIC.play((success: any) => {
          if (success) {
            if (MUSIC) releaseMusic();
          } else {
            Common.logEvent('AUDIO_FAIL');
            if (MUSIC) releaseMusic();
          }
        });
      }
    });
  };

  function releaseMusic() {
    MUSIC.release();
    MUSIC = null;
  }

  async function startSpeach(phrase: string) {
    try {
      await Speech.speak(phrase, { ...eed });
    } catch (error) {
      Common.logEvent('EXPO_TEXT_SPEACH_FAIL');
    }
  }

  // console.log(`%c ⏩ ♻render timer`, 'color: green');

  return (
    <View style={styles.grap}>
      <Text style={styles.text}>{label}</Text>
      <Text style={styles.smallLabel}>{type === 1 ? 'x' : 's'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  text: {
    fontFamily: roboto.bold,
    fontSize: 48,
    lineHeight: 48,
  },
  smallLabel: {
    fontFamily: roboto.bold,
    fontSize: 20,
    lineHeight: 20,
  },
});
