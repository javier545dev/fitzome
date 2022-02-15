import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { roboto } from 'styles';
import * as Common from 'common';
import { useAppDispatch } from 'redux/hooks';
import { updateUser } from 'redux/slices/userSlice';

interface Props {
  numberOfPages: number;
  callback: () => void;
}

export default function SignupThirdScreen({ numberOfPages, callback }: Props) {
  const dispath = useAppDispatch();

  function updateUserProfile(gender: number) {
    dispath(
      updateUser({
        gender,
      }),
    );
    callback();
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 40 }}>
        <Text style={styles.paginationLabel}>{`2/${numberOfPages}`}</Text>
      </View>
      <Text style={styles.bigLabel}>Eres</Text>
      <TouchableOpacity onPress={() => updateUserProfile(1)}>
        <View style={styles.button}>
          <Text style={styles.label}>Hombre</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateUserProfile(2)}>
        <View style={styles.button}>
          <Text style={styles.label}>Mujer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    width: Common.width,
  },
  paginationLabel: {
    fontSize: 16,
    fontFamily: roboto.bold,
    textAlign: 'center',
  },
  bigLabel: {
    fontSize: 22,
    fontFamily: roboto.bold,
    color: 'black',
    marginBottom: 40,
  },
  button: {
    height: 60,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: roboto.bold,
    color: 'black',
  },
});
