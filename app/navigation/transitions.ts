import {TransitionSpecs} from '@react-navigation/stack';

interface CardStyleInterface {
  current: any;
  next: any;
  layouts: any;
}
/**
 * Default animation
 */
const config = {
  animation: 'timing',
  config: {
    duration: 0.1,
  },
};
const transitionSpec = {open: config, close: config};
export const options = {header: () => null, transitionSpec};
/**
 * Horizontal animation
 */
export const horizontalTransition = {
  header: () => null,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, next, layouts}: CardStyleInterface) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

/**
 * Vertical animation
 */
export const verticalTransition = {
  header: () => null,
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, next, layouts}: CardStyleInterface) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};
