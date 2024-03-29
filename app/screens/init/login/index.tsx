import React, { useEffect, useState, } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import { roboto } from 'styles';
import { logEvent } from 'analitycs';
import * as Common from 'common';
import locales from 'locales'
import { InitialScreenEvents } from 'analitycs/events';
import { screens } from 'navigation/types';
import { setStorageValue } from 'local_storage';
import { UserKeys } from 'local_storage/keys';
import database from '@react-native-firebase/database';
import {
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

import { useNavigation } from '@react-navigation/native';
import { updateUser } from 'redux/slices/userSlice';
import { useAppDispatch } from 'redux/hooks';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Config from "react-native-config";
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Ionicons';

import SubHeader from 'components/subHeader';
import SingUpButton from '../components/MainButton';
import ContactAsesor from 'screens/coach/components/ContactAsesor';

const { screens: screensStrgs } = locales();
const googleImg = require('../../../../resources/media/google/btn_google.png');
GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
});

export default function SignupScreen() {

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    logEvent(InitialScreenEvents.login_screen_visited);
  }, []);

  /**
  * Check internet conexion
  */
  function checkInternet(type: 'google' | 'facebook') {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        if (type === 'google') {
          loginWithGoogle();
        } else {
          loginWithFacebook();
        }
      } else {
        Common.showToast('No hay conexión a internet');
      }
    });
  }

  /**
  * Login with google
  */
  async function loginWithGoogle() {
    logEvent(InitialScreenEvents.login_with_google_started);
    setLoadingGoogle(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      logEvent(InitialScreenEvents.login_with_google_successfull);
      checkUserId(user.id, 'google');
    } catch (error: any) {
      setLoadingGoogle(false);
      /**
      * User cancelled the login flow
       */
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        logEvent(InitialScreenEvents.login_with_google_cancelled)
        Common.showToast('Inicio de sesión cancelado');
      }
      /**
       * Operation (e.g. sign in) is in progress already
       */
      else if (error.code === statusCodes.IN_PROGRESS) {
        logEvent(InitialScreenEvents.login_with_google_in_progress)
        Common.showToast('Inicio de sesión en proceso');
      }
      /**
      * Play services not available or outdated
      */
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        logEvent(InitialScreenEvents.login_with_google_not_available)
        Common.showToast('Google play services no disponible');
      }
      /**
      * some other error happened
       */
      else {
        logEvent(InitialScreenEvents.login_with_google_failed)
        Common.showToast(`Error: ${error}`);
      }
    }
  }

  /**
   * Login with facebook
   */
  function loginWithFacebook() {
    setLoadingFacebook(true);
    logEvent(InitialScreenEvents.login_with_facebook_started);
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          setLoadingFacebook(false);
          logEvent(InitialScreenEvents.login_with_facebook_cancelled);
          Common.showToast('Inicio de sesión cancelado');
        } else {
          logEvent(InitialScreenEvents.login_with_facebook_successful);
          /**
           * Fetch user info
           */
          const request = new GraphRequest(
            'me?fields=id,name,picture.type(large)',
            null,
            (error, result: any) => {
              if (result) {
                checkUserId(result.id, 'facebook');
              } else {
                setLoadingFacebook(false);
                logEvent(InitialScreenEvents.login_with_facebook_req_failed);
                Common.showToast(`Error: ${error}`);
              }
            },
          );
          new GraphRequestManager().addRequest(request).start();
        }
      },
      error => {
        setLoadingFacebook(false);
        logEvent(InitialScreenEvents.login_with_facebook_failed);
        Common.showToast(`Error: ${error}`);
      },
    );
  }


  /**
   * Check if user id exists
   * @param id String
   */
  function checkUserId(id: string, type: 'facebook' | 'google') {
    const ref = database().ref(`_users_/${id}/account/`);
    ref.once('value').then(snapshot => {
      const result = snapshot.val();
      if (result) {
        if (result.name) {
          storageUser(result, type);
        } else {
          setLoadingFacebook(false);
          setLoadingGoogle(false);
          logEvent(InitialScreenEvents.no_account_found);
          Common.showToast('Esta cuenta no existe');
        }
      } else {
        setLoadingFacebook(false);
        setLoadingGoogle(false);
        logEvent(InitialScreenEvents.no_account_found);
        Common.showToast('Esta cuenta no existe');
      }
    });
  }

  /**
   * Storage user and start app
   * @param user
   */
  async function storageUser(user: any, type: 'google' | 'facebook') {
    try {
      await setStorageValue(UserKeys.user_info, user);
      if (type === 'facebook') {
        logEvent(InitialScreenEvents.login_with_facebook_completed);
      } else {
        logEvent(InitialScreenEvents.login_with_google_completed);
      }
      dispatch(updateUser(user));
      navigation.navigate(screens.Coach);
    } catch (e) {
      setLoadingFacebook(false);
      setLoadingGoogle(false);
      Common.showToast(`${e}`);
    }
  }


  return (
    <View style={styles.mainGrap}>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} barStyle={'dark-content'} />
      <View style={styles.statusbarSubGrap} />
      <SubHeader title={screensStrgs.loginScreen.title} />
      <View style={styles.contentGrap}>
        <Text style={styles.text}>
          {screensStrgs.loginScreen.mainLabel}
        </Text>
      </View>
      <View style={styles.buttonGrap}>
        <SingUpButton callback={() => checkInternet('google')} loading={loadingGoogle}>
          <View style={styles.btnGrapContent}>
            <Image style={styles.googleImg} source={googleImg} />
            <Text style={{ ...styles.btnLabel, color: 'gray' }}>
              {screensStrgs.loginScreen.loginWithGoogle}
            </Text>
          </View>
        </SingUpButton>
        <SingUpButton callback={() => checkInternet('facebook')} loading={loadingFacebook} primary>
          <View style={styles.btnGrapContent}>
            <Icon name={'logo-facebook'} size={25} color={'white'} />
            <Text style={styles.btnLabel}>
              {screensStrgs.loginScreen.loginWithFacebook}
            </Text>
          </View>
        </SingUpButton>
        <View style={styles.asesorGrap}>
          <ContactAsesor />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    backgroundColor: 'white',
    flex: 1,
  },
  statusbarSubGrap: {
    width: Common.width,
    height: (StatusBar.currentHeight ?? 0) + 55,
  },
  contentGrap: {
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: roboto.regular,
    lineHeight: 24,
  },
  buttonGrap: {
    paddingTop: 80,
  },
  btnGrapContent: {
    flexDirection: 'row',
    width: Common.width - 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
  },
  btnLabel: {
    color: 'white',
    fontSize: 18,
    fontFamily: roboto.bold,
    textTransform: 'capitalize',
    paddingLeft: 10,
  },
  asesorGrap: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  googleImg: {
    width: 32,
    aspectRatio: 1
  },
});