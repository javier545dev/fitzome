import React, {useRef, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {logScreenView} from 'analitycs';
import {screens} from './types';
import * as Common from 'common';
import {getStoragedValue} from 'local_storage';
import {UserKeys} from 'local_storage/keys';
/**
 * Redux
 */
import {updateUser} from 'redux/slices/userSlice';
import {useAppDispatch} from 'redux/hooks';
/**
 * Screens
 */
import {
  InitialScreens,
  WorkoutScreens,
  AccountScreens,
  PlanScreens,
  CoachScreens,
  FeedScreens,
} from './screens';
import LoadingApp from 'components/LoadingApp';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const dispatch = useAppDispatch();
  const [initialRouteName, setInitialRoute] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const user = await getStoragedValue(UserKeys.user_info);
      if (user) {
        dispatch(updateUser(user));
        setTimeout(() => setInitialRoute(screens.Coach), 300);
      } else {
        setInitialRoute(screens.Init);
      }
    } catch (error) {
      Common.showToast(`${error}`);
      setInitialRoute(screens.Init);
    }
    RNBootSplash.hide();
  }

  const routeNameRef = useRef();
  const navigationRef = useRef();

  async function trackScreens() {
    try {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      if (previousRouteName !== currentRouteName) {
        await logScreenView(currentRouteName);
      }
      routeNameRef.current = currentRouteName;
    } catch (error) {}
  }

  function onReady() {
    if (navigationRef.current) {
      routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    }
  }

  if (initialRouteName === '') {
    return <LoadingApp />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={trackScreens}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {InitialScreens()}
        {WorkoutScreens()}
        {AccountScreens()}
        {PlanScreens()}
        {CoachScreens()}
        {FeedScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
