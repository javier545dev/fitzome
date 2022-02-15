import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {roboto, colors} from 'styles';
import * as Common from 'common';
import {logEvent} from 'analitycs';
import {InitialScreenEvents} from 'analitycs/events';
import {useAppSelector, useAppDispatch} from 'redux/hooks';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {updateUser} from 'redux/slices/userSlice';

const currentYear = new Date().getFullYear();
const startYear = currentYear - 10;
const yearsArr = new Array(60).fill(0);
const startWeight = 45;
const weightArr = new Array(160).fill(0);
const startHeight = 140;
const heighttArr = new Array(80).fill(0);

interface Props {
  numberOfPages: number;
  callback: () => void;
}

export default function SignupSecondScreen({numberOfPages, callback}: Props) {
  const user = useAppSelector(state => state.user);
  const dispath = useAppDispatch();

  useEffect(() => {
    logEvent(InitialScreenEvents.create_account_started);
  }, []);

  function updateUserProfile(type: 'year' | 'weight' | 'height', val: any) {
    if (type === 'year') {
      dispath(
        updateUser({
          date: {
            ...user.date,
            year: val,
          },
        }),
      );
    } else if (type === 'weight') {
      dispath(
        updateUser({
          weight: Number(val),
        }),
      );
    } else if (type === 'height') {
      dispath(
        updateUser({
          height: Number(val),
        }),
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingBottom: 40}}>
        <Text style={styles.paginationLabel}>{`1/${numberOfPages}`}</Text>
      </View>
      <View>
        <View style={styles.labelGrap}>
          <Text style={styles.bigLabel}>Año de nacimiento</Text>
          <Icon
            name={'md-checkmark-circle'}
            size={22}
            color={user.date.year === '2009' ? '#fafafa' : colors.primary}
          />
        </View>
        <View style={styles.pickerGrap}>
          <Picker
            selectedValue={user.date.year}
            style={styles.picker}
            onValueChange={(val, i) => updateUserProfile('year', val)}>
            {yearsArr.map((val, i) => {
              const y = startYear - (i + 1);
              return <Picker.Item key={i} label={`${y}`} value={`${y}`} />;
            })}
          </Picker>
        </View>
      </View>
      <View>
        <View style={styles.labelGrap}>
          <Text style={styles.bigLabel}>Peso</Text>
          <Icon
            name={'md-checkmark-circle'}
            size={22}
            color={user.weight === 46 ? '#fafafa' : colors.primary}
          />
        </View>
        <View style={styles.pickerGrap}>
          <Picker
            selectedValue={String(user.weight)}
            style={styles.picker}
            onValueChange={(val, i) => updateUserProfile('weight', val)}>
            {weightArr.map((val, i) => {
              const w = startWeight + (i + 1);
              return <Picker.Item key={i} label={`${w} kg`} value={`${w}`} />;
            })}
          </Picker>
        </View>
      </View>
      <View>
        <View style={styles.labelGrap}>
          <Text style={styles.bigLabel}>Altura</Text>
          <Icon
            name={'md-checkmark-circle'}
            size={22}
            color={user.height === 141 ? '#fafafa' : colors.primary}
          />
        </View>
        <View style={styles.pickerGrap}>
          <Picker
            selectedValue={String(user.height)}
            style={styles.picker}
            onValueChange={(val, i) => updateUserProfile('height', val)}>
            {heighttArr.map((val, i) => {
              const h = startHeight + (i + 1);
              return <Picker.Item key={i} label={`${h} cm`} value={`${h}`} />;
            })}
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        onPress={callback}
        disabled={
          user.date.year === '2009' || user.weight === 46 || user.height === 141
            ? true
            : false
        }>
        <View
          style={[
            styles.button,
            {
              backgroundColor:
                user.date.year === '2009' ||
                user.weight === 46 ||
                user.height === 141
                  ? '#fafafa'
                  : colors.primary,
            },
          ]}>
          <Text style={[styles.label, {color: '#fafafa'}]}>Siguiente</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  paginationLabel: {
    fontSize: 16,
    fontFamily: roboto.bold,
    textAlign: 'center',
  },
  bigLabel: {
    fontSize: 20,
    fontFamily: roboto.bold,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: roboto.regular,
    paddingTop: 20,
  },
  button: {
    height: 60,
    backgroundColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  label: {
    fontSize: 18,
    fontFamily: roboto.bold,
    color: 'white',
  },
  pickerGrap: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
    paddingLeft: 10,
  },
  picker: {
    width: Common.width * 0.9 - 10,
  },
  labelGrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
