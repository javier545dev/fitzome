import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {colors, roboto} from 'styles';
import * as Common from 'common';
import {logEvent} from 'analitycs';
import {InitialScreenEvents} from 'analitycs/events';
import {setStorageValue} from 'local_storage';
import {UserKeys} from 'local_storage/keys';
import {updateUser, UserState} from 'redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';

import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';

export default function SingupFinalRoute() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const userName = user.name.split(' ')[0];
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function createAccount() {
    setLoading(true);
    logEvent(InitialScreenEvents.create_account_btn_pressed);
    NetInfo.fetch().then(s => {
      if (s.isConnected && s.isInternetReachable) {
        saveInfoOnline(user);
      } else {
        setLoading(false);
        Common.showToast('No hay conexión a internet');
        logEvent(InitialScreenEvents.create_account_no_internet);
      }
    });
  }

  function saveInfoOnline(user: UserState) {
    const ref = database().ref();
    let updates: any = {};
    updates[`_users_/${user.id}/account/`] = user;
    ref
      .update(updates)
      .then(responde => {
        storeData(user);
      })
      .catch(e => {
        setLoading(false);
        Common.showToast(`${e}`);
        logEvent(InitialScreenEvents.create_account_save_online_fail);
      });
  }

  const storeData = async (user: UserState) => {
    try {
      await setStorageValue(UserKeys.user_info, user);
      dispatch(updateUser(user));
      logEvent(InitialScreenEvents.create_account_successful);
      navigation.navigate('Coach');
    } catch (e) {
      setLoading(false);
      Common.showToast(`${e}`);
      logEvent(InitialScreenEvents.create_account_save_local_failed);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentGrap}>
        <View>
          <Text style={styles.bigLabel}>Ya terminamos,</Text>
          <Text style={styles.bigLabel}>{`${userName}.`}</Text>
        </View>
        <TouchableOpacity onPress={createAccount}>
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'white'} />
            ) : (
              <Text style={styles.label}>Ok, crear cuenta</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between',
    width: Common.width,
  },
  contentGrap: {
    justifyContent: 'space-between',
    marginTop: Common.height * 0.3,
  },
  bigLabel: {
    fontSize: 36,
    fontFamily: roboto.bold,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: roboto.regular,
    paddingTop: 20,
  },
  button: {
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  label: {
    fontSize: 18,
    fontFamily: roboto.bold,
    color: 'white',
  },
});
