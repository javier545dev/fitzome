import analytics from '@react-native-firebase/analytics';
import {PRODUCTION} from 'common';
import {AnalyticsEventType, AppEvents} from './events';
/**
 * Log a event to analitycs
 * @param event string
 */
export const logEvent = async (event: AnalyticsEventType, extra?: object) => {
  try {
    if (PRODUCTION) {
      if (event.length <= 32) {
        await analytics().logEvent(event);
        //  await analytics().logEvent('basket', {
        //    id: 3745092,
        //    item: 'mens grey t-shirt',
        //    description: ['round neck', 'long sleeved'],
        //    size: 'L',
        //  });
      } else {
        await analytics().logEvent(AppEvents.event_too_large);
      }
    } else {
      if (event.length <= 32) {
        console.log('[*_*]: ', {event});
      } else {
        console.log('[*_*]: ', {event: AppEvents.event_too_large});
      }
    }
  } catch (error) {}
};

/**
 * Log the screen name that the user is currently viewing
 * @param screen_name the screen name
 */
export const logScreenView = async (screen_name: string) => {
  try {
    if (PRODUCTION) {
      await analytics().logScreenView({
        screen_name,
        screen_class: screen_name,
      });
    } else {
      console.log('[*_*]: ', {screen_name});
    }
  } catch (error) {}
};
