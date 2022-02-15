import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { roboto, colors } from 'styles';
import * as Common from 'common';

interface Props {
  callback: () => void;
  label: string;
  loading: boolean;
}

export default function MainButton({ label, callback, loading }: Props) {
  return (
    <View>
      <TouchableOpacity onPress={() => callback()}>
        <View style={styles.btnGrap}>
          {loading ? (
            <ActivityIndicator size={'large'} color={'white'} />
          ) : (
            <Text style={styles.btnLabel}>{label}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnGrap: {
    backgroundColor: colors.primary_blue,
    borderRadius: 50,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: Common.width - 40,
    marginHorizontal: 20,
  },
  btnLabel: {
    fontSize: 18,
    lineHeight: 18,
    color: 'white',
    fontFamily: roboto.bold,
  },
});
