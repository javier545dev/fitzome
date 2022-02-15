import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screens} from './types';
import {
  horizontalTransition,
  verticalTransition,
  options,
} from 'navigation/transitions';
// initial screens
import InitScreen from 'screens/init/';
import SignupScreen from 'screens/init/signup';
import LoginScreen from 'screens/init/login';
import Signup from 'screens/signup/';
// workouts screens
import Workouts from 'screens/workouts/index';
import WatchWorkout from 'screens/workouts/watch-workout';
import WatchExercise from 'screens/workouts/watch-exercise';
import DoWorkout from 'screens/workouts/do-workout';
import WatchSummary from 'screens/workouts/watch-summary';
// account screens
import Settings from 'screens/settings';
import Account from 'screens/account/Index';
import CompleteAccount from 'screens/account/complete-profile/';
// plan screens
import Programs from 'screens/plans/';
import WatchPlan from 'screens/plans/watch-plan/';
import WatchPlanAI from 'screens/plans/watch-plan-ai/';
// coach screens
import Coach from 'screens/coach';
import ChatScreen from 'screens/chat/Index';
// feed screens
import Feed from 'screens/feed/index';
// TODO: Refactor this screen
import Article from '../../android/screens/Home/Face-Article';
import FaceRecipe from 'screens/recipes/face';
// others screens
import Exercises from 'screens/exercises/';
import StoreModal from 'screens/store/modal/';
//import Pay from 'screens/pay/';
//import PayScreen from 'screens/pay/pay-screen';

const Stack = createStackNavigator();

export const InitialScreens = () => {
  return (
    <>
      <Stack.Screen
        name={screens.Init} 
        component={InitScreen}
        options={options}
      />
      <Stack.Screen
        name={screens.Signup}
        component={SignupScreen}
        options={horizontalTransition}
      />
      <Stack.Screen
        name={screens.Login}
        component={LoginScreen}
        options={horizontalTransition}
      />
      <Stack.Screen
        name={screens.CreateAccount}
        component={Signup}
        options={options}
      />
    </>
  );
};

export const WorkoutScreens = () => {
  return (
    <>
      <Stack.Screen
        name={screens.Workouts}
        component={Workouts}
        options={options}
      />
      <Stack.Screen
        name={screens.WhatchWorkouts}
        component={WatchWorkout}
        options={horizontalTransition}
      />
      <Stack.Screen
        name={screens.WhatchExercise}
        component={WatchExercise}
        options={verticalTransition}
      />
      <Stack.Screen
        name={screens.WhatchWorkoutSummary}
        component={WatchSummary}
        options={verticalTransition}
      />
      <Stack.Screen
        name={screens.DoWorkout}
        component={DoWorkout}
        options={horizontalTransition}
      />
    </>
  );
};

export const AccountScreens = () => {
  return (
    <>
      <Stack.Screen
        name={screens.Account}
        component={Account}
        options={options}
      />
      <Stack.Screen
        name={screens.CompleteAccount}
        component={CompleteAccount}
        options={horizontalTransition}
      />
      <Stack.Screen
        name={screens.Settings}
        component={Settings}
        options={horizontalTransition}
      />
    </>
  );
};

export const PlanScreens = () => {
  return (
    <>
      <Stack.Screen
        name={screens.Plans}
        component={Programs}
        options={options}
      />
      <Stack.Screen
        name={screens.WhatchPlan}
        component={WatchPlan}
        options={horizontalTransition}
      />
      <Stack.Screen
        name={screens.WhatchPlanAi}
        component={WatchPlanAI}
        options={horizontalTransition}
      />
    </>
  );
};

export const CoachScreens = () => {
  return (
    <>
      <Stack.Screen name={screens.Coach} component={Coach} options={options} />
      <Stack.Screen
        name={screens.CoachChat}
        component={ChatScreen}
        options={verticalTransition}
      />
    </>
  );
};

export const FeedScreens = () => {
  return (
    <>
      <Stack.Screen name={screens.Feed} component={Feed} options={options} />
      <Stack.Screen
        name={screens.WhatchRecipe}
        component={FaceRecipe}
        options={options}
      />
      <Stack.Screen
        name={screens.WhatchArticle}
        component={Article}
        options={options}
      />
    </>
  );
};

export const OthersScreens = () => {
  return (
    <>
      <Stack.Screen
        name={screens.StoreModal}
        component={StoreModal}
        options={verticalTransition}
      />
      <Stack.Screen
        name={screens.Exercises}
        component={Exercises}
        options={horizontalTransition}
      />
      {/*<Stack.Screen
          name="Pay_Screen"
          component={PayScreen}
          options={horizontalTransition}
        />*/}
      {/*<Stack.Screen name="Pay" component={Pay} options={options} />*/}
    </>
  );
};
