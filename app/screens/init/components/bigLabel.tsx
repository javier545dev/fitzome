import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import LottieView from 'lottie-react-native';
import {roboto} from 'styles';
import locales from 'locales';

const {width, height} = Dimensions.get('window');
const verticalBreakPoint = 840;
const {screens} = locales();
const lottieImage = require('../../../../resources/media/lottie/intro-scene-08.json');

export default function BigLabel() {
  return (
    <View style={styles.mainGrap}>
      <View style={styles.lottieGrap}>
        <LottieView source={lottieImage} autoPlay loop style={styles.lottie} />
      </View>
      <Text style={styles.label}>{screens.initialScreen.mainLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 40,
  },
  label: {
    fontSize: height < verticalBreakPoint ? 32 : 46,
    lineHeight: height < verticalBreakPoint ? 40 : 60,
    fontFamily: roboto.bold,
    color: 'rgba(0,0,0,.8)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    textAlign: 'center',
    width,
  },
  text: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: roboto.medium,
    color: 'rgba(0,0,0,.7)',
    padding: 20,
    paddingRight: 40,
    paddingBottom: 0,
  },
  lottieGrap: {
    width: width,
  },
  lottie: {
    width: width,
  },
});
