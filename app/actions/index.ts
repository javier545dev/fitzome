import {UserState} from 'redux/slices/userSlice';

import {getRandomNumber} from 'screens/workouts/actions';

export const shortDaysNames = ['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do'];

export const getCoachMessage = (type: string, user: UserState): string => {
  if (type === 'greeting') {
    return getGreeting(user);
  } else {
    return 'Hey';
  }
};

const getGreeting = (user: UserState): string => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return getRandomGreating('Buenos días', user);
  } else if (hour < 20) {
    return getRandomGreating('Buenas tardes', user);
  } else {
    return getRandomGreating('Buenas noches', user);
  }
};

function getRandomGreating(greeting: string, user: UserState): string {
  const index = getRandomNumber(1, 3);
  if (index === 1) {
    return `${greeting} ${user.name.split(' ')[0]}`;
  } else if (index === 2) {
    return `${user.name.split(' ')[0]}`;
  } else if (index === 3) {
    return `Hey ${user.name.split(' ')[0]}!`;
  } else {
    return 'Hey';
  }
}
