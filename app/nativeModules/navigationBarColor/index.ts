import {NativeModules} from 'react-native';
const {NavigationBarColor} = NativeModules;

interface NavigationBarColorInterface {
  /**
   * Changes the app navigation color
   * @param color a string color in the form #ffffff
   * @param light
   */
  changeNavigationBarColor(color: string, light: boolean): void;
}

export default NavigationBarColor as NavigationBarColorInterface;
