import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';


import Modal from 'react-native-modal';
import { roboto, lightTheme } from 'styles';
import * as Common from 'common';
import { eed } from 'common/text-to-speech';
import * as Speech from 'expo-speech';
/**
 * Redux
 */
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { showRestModal, updateCurrentRound, } from 'redux/slices/doWorkoutSlice';
import RestCircle from './RestCircle';

let interval: any;
let s = 0;
let timeElapsed = 0;

interface Props {
  user: string;
}

export default function RestModal({ user }: Props) {
  const dispatch = useAppDispatch();
  const [seconds, setSeconds] = React.useState(0);
  const rest = useAppSelector(state => state.doWorkout.rest);
  const currentRound = useAppSelector(state => state.doWorkout.currentRound);
  const restModal = useAppSelector(state => state.doWorkout.restModal);

  React.useEffect(() => {
    s = rest;
    setSeconds(s);
    interval = setInterval(timer, 1000);

    startSpeach(`Bien!. tómate un descanso de ${rest} segundos`);

    return () => {
      s = 0;
      timeElapsed = 0;
      if (interval) clearInterval(interval);
    };
  }, []);

  

  function timer() {
    s -= 1;
    timeElapsed++;
    if (timeElapsed === 10) {
      startSpeach('Relájate. camina y estira un poco.');
    }


    if (s === 10) {
      const name = user.split(' ')[0];
      startSpeach(`${name}. El descanso está apunto de terminar.`);
    }

    if (s === 5) {
      startSpeach(`Faltan 5 segundos.`);
    }

    if (s < 0) {
      clearInterval(interval);
      endRest();
    } else {
      setSeconds(s);
    }
  }

  function endRest() {
    dispatch(updateCurrentRound(currentRound + 1));
    setTimeout(() => {
      dispatch(showRestModal(false));
    }, 500);
  }

  async function startSpeach(phrase: string) {
    try {
      await Speech.speak(phrase, { ...eed });
    } catch (error) {
      Common.logEvent('EXPO_TEXT_SPEACH_FAIL');
    }
  }

  return (
    <Modal
      isVisible={restModal}
      backdropOpacity={0.2}
      propagateSwipe={true}
      style={styles.modal}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainGrap}>
          <View>
            <Text style={{ ...styles.bigLabel, color: lightTheme.text }}>
              Relajate,
            </Text>
            <Text style={{ ...styles.bigLabel, color: lightTheme.secondaryText }}>
              estira un poco
            </Text>
          </View>
          <RestCircle />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.secondsLabel}>{`${seconds < 10 ? `0${seconds}` : seconds
              }`}</Text>
            <Text
              style={styles.secondsLeft}>{`Faltan ${seconds} segundos`}</Text>
          </View>
          <TouchableNativeFeedback onPress={endRest}>
            <View style={{ padding: 10 }}>
              <Text style={{ color: lightTheme.secondaryText }}>
                Terminar descanso
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: lightTheme.background,
  },
  mainGrap: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    padding: 40,
    height: Dimensions.get('window').height,
  },
  secondsLabel: {
    fontSize: 95,
    fontFamily: roboto.medium,
    color: lightTheme.text,
  },
  secondsLeft: {
    fontSize: 20,
    fontFamily: roboto.medium,
    color: lightTheme.secondaryText,
  },
  bigLabel: {
    fontSize: 42,
    lineHeight: 52,
    fontFamily: roboto.medium,
  },
});
