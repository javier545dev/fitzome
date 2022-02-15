import React, {useState, useEffect, useReducer} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import * as Common from 'common';
import {roboto, colors} from 'styles';

import {setStorageValue} from 'local_storage';
import {useAppDispatch} from 'redux/hooks';
import {updateUser} from 'redux/slices/userSlice';
import {AccountProvider} from '../context';
import {reducer, initialState} from '../reducer';

import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';

import SubHeader from '../../../components/subHeader';
import DaysPicker from './components/days-picker';
import JumpsPicker from './components/jumps-picker';
import CrunchPicker from './components/crunch-picker';
import HealthPicker from './components/health-picker';
import PushUpInput from './components/pushup-input';
import CrunchesInput from './components/crunches-input';

const {width} = Dimensions.get('window');

export default ({route}) => {
  const {user} = route.params;
  const [state, dispatch] = useReducer(reducer, initialState);

  const _dispatch = useAppDispatch();

  useEffect(() => {
    //const page = 'watch warkout';
    return () => {
      //console.log(`%c 🚀Quit ${page}`, 'color: blue')
    };
  }, []);

  const profileCompleted = checkIfProfileIsCompleted(state);

  function checkIfProfileIsCompleted(info) {
    const daysCompleted = checkIfDaysAreCompleted(info.days);
    const jumpsCompleted = info.jumps != 0 ? true : false;
    const crunchCompleted = info.crunch != 0 ? true : false;
    const ableToDoPhysicalActivityCompleted =
      info.ableToDoPhysicalActivity != 0 ? true : false;
    if (
      daysCompleted &&
      jumpsCompleted &&
      crunchCompleted &&
      ableToDoPhysicalActivityCompleted
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkIfDaysAreCompleted(d) {
    let i = 0;
    d.forEach(element => {
      if (element === 1) i++;
    });
    return i > 1 && i < 7 ? true : false;
  }

  function saveInfo(completed) {
    if (completed) {
      const fullUserInfo = {
        ...user,
        training_info: {
          ...state,
          jumps: state.jumps === 1 ? true : false,
          crunch: state.crunch === 1 ? true : false,
          ableToDoPhysicalActivity:
            state.ableToDoPhysicalActivity === 1 ? true : false,
        },
      };

      Common.logEvent(`profile_updated`);
      //save info
      setStorageValue('user_info', fullUserInfo);
      _dispatch(updateUser(fullUserInfo));
      NetInfo.fetch().then(s => {
        if (s.isConnected && s.isInternetReachable) {
          saveOnline(fullUserInfo);
        } else {
          Common.showToast(`No hay conexión a internet`);
        }
      });
    } else {
      Common.showToast(`Completa todos los campos`);
    }
  }

  function saveOnline(info) {
    const ref = database().ref();
    let updates = {};
    updates[`_users_/${info.id}/account/training_info/`] = info.training_info;
    ref
      .update(updates)
      .then(responde => {
        Common.showToast(`Tus datos se guardaron correctamente`);
      })
      .catch(e => {
        Common.showToast(`${e}`);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior={'height'}>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.statusbarSubGrap} />
      <SubHeader title={`Completa tu perfil`} />

      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={1}>
        <AccountProvider value={{state, dispatch}}>
          <DaysPicker />
          <JumpsPicker />
          <CrunchPicker />
          <HealthPicker />
          <PushUpInput />
          <CrunchesInput />
        </AccountProvider>
        <View style={{width: 100, height: 100}} />
      </ScrollView>
      <LinearGradient
        colors={['rgba(250,250,250,0)', 'rgba(250,250,250,1)', 'white']}
        style={styles.gradientGrap}>
        <TouchableOpacity onPress={() => saveInfo(profileCompleted)}>
          <View
            style={{
              ...styles.btnGrap,
              backgroundColor: profileCompleted
                ? colors.primary_blue
                : '#f3f3f3',
            }}>
            <Text style={styles.btnLabel}>{`Guardar`}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusbarSubGrap: {
    width,
    height: StatusBar.currentHeight + 55,
  },
  btnGrap: {
    borderRadius: 50,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 40,
  },
  btnLabel: {
    fontSize: 18,
    lineHeight: 18,
    color: 'white',
    fontFamily: roboto.bold,
  },
  gradientGrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
    height: 70,
    alignItems: 'center',
    paddingBottom: 10,
  },
});
