import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { roboto } from 'styles';

type Props = {
  title: string,
}

export default ({ title }: Props) => (
  <View style={[styles.mainContainer,]}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: roboto.bold
  },
});


