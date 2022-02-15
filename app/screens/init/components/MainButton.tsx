import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {roboto, colors} from 'styles';

const {width, height} = Dimensions.get('window');
const verticalBreakPoint = 840;
const adjustVertical = height < verticalBreakPoint ? true : false;

interface Props {
  callback: () => void;
  children?: React.ReactNode;
  label?: string;
  testID?: string;
  primary?: boolean;
  loading?: boolean;
}

const androidRippleBlack = {color: 'rgba(0,0,0,.15)', borderless: true};
const androidRippleWhite = {color: 'rgba(1,1,1,.1)', borderless: true};

export default function MainButton({
  callback,
  children,
  label,
  primary = false,
  testID = 'any-id',
  loading = false,
}: Props) {
  return (
    <View style={primary ? styles.grapPrimary : styles.grap}>
      <Pressable
        testID={testID}
        onPress={callback}
        disabled={loading}
        android_ripple={primary ? androidRippleBlack : androidRippleWhite}>
        {loading ? (
          <ActivityIndicator
            size={'large'}
            color={primary ? 'white' : 'black'}
          />
        ) : children ? (
          children
        ) : (
          <View style={styles.btn}>
            <Text style={primary ? styles.labelPrimary : styles.label}>
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  grapPrimary: {
    height: 60,
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary_blue,
    width: width - 40,
    marginLeft: 20,
    marginBottom: adjustVertical ? 0 : 10,
  },
  grap: {
    height: 60,
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width - 40,
    marginLeft: 20,
    marginBottom: adjustVertical ? 0 : 10,
    elevation: 1,
  },
  btn: {
    height: 60,
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelPrimary: {
    color: 'white',
    fontSize: adjustVertical ? 15 : 20,
    fontFamily: adjustVertical ? roboto.medium : roboto.bold,
    textTransform: 'capitalize',
  },
  label: {
    color: 'black',
    fontSize: adjustVertical ? 15 : 20,
    textTransform: 'capitalize',
    fontFamily: adjustVertical ? roboto.medium : roboto.bold,
  },
});
