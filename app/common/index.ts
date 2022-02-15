import analytics from '@react-native-firebase/analytics';
import {Dimensions, ToastAndroid} from 'react-native';

export const PRODUCTION = false;

export const {width, height} = Dimensions.get('window');

/**
 * Show a toast (android only)
 * @param message
 */
export const showToast = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    `${message}`,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    100,
  );
};

/**
 * Log a event to analitycs (must not be larger than 32 characters)
 * @param event string
 */
export const logEvent = (event: string) => {
  if (PRODUCTION && event.length <= 32) {
    analytics().logEvent(event);
  }
};
/**
 * Get current date in iso format
 * @return Curent date in iso format 2015-03-25
 */
export function getCurrentDate(): string {
  /**
   * Default start date
   */
  let startDateIsoFormat = '2015-03-25';
  /**
   * Get current date
   */
  const d = new Date();
  const fullyear = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  /**
   * Update date to current day
   */
  startDateIsoFormat = `${fullyear}-${month}-${day}`;
  /**
   * return date
   */
  return startDateIsoFormat;
}

/**
 * Convert a date to iso format 2021-10-20
 * @param date
 */
export function isofy(date: number) {
  let d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}-${month}-${day}`;
}

/**
 * Get a random number (inclusive)
 * @returns random number
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
