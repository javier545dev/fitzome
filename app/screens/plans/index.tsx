import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import * as plans from './plans';
// import { beginner, advanced, legs_gluteus, abs_training, chest_arms } from '../../../resources/data/programs/';
import * as Common from 'common';
import { colors } from 'styles';
import Header from 'components/ScreensMainHeader';
import BottomNav from 'components/main-nav';
import Text from 'components/text';
import { BlankSpace } from 'components/spacing';
import Carousel from './components/programs-carousel';

import TransparentStatusBar from 'components/CustomStatusbar';

export default function PlansScreen() {
  React.useEffect(() => {
    //console.log(`%c 🏁init ${page}`, 'color: blue');

    return () => {
      // console.log(`%c 🚀Quit ${page}`, 'color: blue');
    };
  }, []);

  // console.log(`%c ♻ render was called on page ${page}`, 'color: green');

  return (
    <View style={styles.mainContainer}>
      <TransparentStatusBar color={'white'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={'Programas'} />

        <Text variant={'label'}>Ganar músculo y tonificar</Text>
        <Text color={colors.text.secondary}>
          Gana músculo y tonifica tu cuerpo con entrenamientos de fuerza
        </Text>
        <BlankSpace size={'l'} />
        <Carousel plans={plans.muscleGrowth} />
        <Text variant={'label'}>Perder peso</Text>
        <Text color={colors.text.secondary}>
          Quema grasa y baja de peso con entrenamientos de cardio y hiit
        </Text>
        <BlankSpace size={'l'} />
        <Carousel plans={plans.loseWeight} />
        <View style={styles.blankSpace} />
      </ScrollView>
      <BottomNav active={4} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  blankSpace: {
    width: Common.width,
    height: 60,
  },
});
