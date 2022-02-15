import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';

import {roboto} from 'styles';
import {InitialScreenEvents} from 'analitycs/events';
import {logEvent} from 'analitycs';
import locales from 'locales';
import {screens} from 'navigation/types';
import {useNavigation} from '@react-navigation/native';
import BigLabel from './components/bigLabel';
import SingUpButton from './components/MainButton';
import PrivacyAndTerms from './components/PrivacyAndTerms';

const {screens: screensStrgs} = locales();

export default function initScreen() {
  const navigation = useNavigation();

  function SingUp() {
    logEvent(InitialScreenEvents.singup_pressed);
    navigation.navigate(screens.Signup);
  }

  function Login() {
    logEvent(InitialScreenEvents.login_pressed);
    navigation.navigate(screens.Login);
  }

  return (
    <View style={styles.mainGrap}>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <BigLabel />
      <View>
        <SingUpButton
          testID="navigate-sing-btn"
          callback={SingUp}
          label={screensStrgs.initialScreen.signup}
          primary
        />
        <SingUpButton
          testID="navigate-login-btn"
          callback={Login}
          label={screensStrgs.initialScreen.login}
        />
        <PrivacyAndTerms />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  loadingGrap: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontFamily: roboto.regular,
    textAlign: 'center',
  },
});
