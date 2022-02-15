import React, {useContext} from 'react';
import {StyleSheet, View, Dimensions, Text, TextInput} from 'react-native';

import {roboto, colors} from '../../../../styles/';
import AccountContext from '../../context';

const {width} = Dimensions.get('window');

export default () => {
  const {state, dispatch} = useContext(AccountContext);
  const {crunches} = state;

  const onChangeText = value =>
    dispatch({type: 'UPDATE_CRUNCHES', value: Number(value)});

  return (
    <View style={styles.mainGrap}>
      <Text style={styles.bigLabel}>Cuántas abdominales puedes hacer?</Text>
      <Text style={styles.text}>
        Número de abdominales que puedes hacer hasta el cansancio.
      </Text>
      <View style={styles.inputGrap}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={String(crunches)}
          keyboardType={'numeric'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainGrap: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  grap: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 15,
  },
  bigLabel: {
    fontFamily: roboto.regular,
    fontSize: 22,
    paddingLeft: 20,
    width: width - 40,
  },
  text: {
    fontSize: 16,
    fontFamily: roboto.regular,
    padding: 20,
    paddingTop: 10,
    color: 'rgba(0,0,0,.7)',
  },
  inputGrap: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
    marginLeft: 20,
  },
  input: {
    fontSize: 18,
    fontFamily: roboto.regular,
    width: 200,
    width: width - 40,
    padding: 15,
  },
});
