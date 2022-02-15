import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import * as Common from 'common';
import { roboto } from 'styles';
import { WorkoutInterface } from '../actions/workout';
import { ExerciseInterface } from '../../../../resources/data/exercises';
import { exercisesUrls } from '../../../../resources/data/images';
import { useNavigation } from '@react-navigation/native';
import Skeleton from './workout-summary-skeleton';

const imageWidth = Common.width * 0.18;

interface Props {
  loading: boolean;
  rounds: WorkoutInterface['rounds'];
}

export default function RoundsSummary({ rounds, loading }: Props) {

  const navigation = useNavigation();
  const round = rounds[0];

  function goToSummary() {
    navigation.navigate('Watch_Summary', {
      sets: JSON.stringify(rounds),
    });
  }

  function onExercisePressed(name: string, side: string, volume: string) {
    Common.showToast(`${name} ${side} ${volume}`);
  }

  return (
    <View style={styles.mainGrap}>
      {loading === false ? (
        <View>
          {round.map((val: ExerciseInterface, i: number) => {
            const url = val.url.split('exercises%2F')[1].split('.mp4')[0];
            const side =
              val.side === 'left'
                ? 'izquierda'
                : val.side === 'right'
                  ? 'derecha'
                  : '';
            const volumeType = val.volume === 1 ? 'x' : 's';
            const volume = `${val.volume_amount}${volumeType}`;

            if (i > 2) {
              return null
            } else {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => onExercisePressed(val.name, side, volume)}>
                  <View style={styles.grap}>
                    <Image source={exercisesUrls[url]} style={styles.images} />
                    <Text style={styles.name} numberOfLines={2}>
                      {`${volume} ${val.name} ${side}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
          <TouchableOpacity onPress={goToSummary}>
            <View style={styles.btnGrap}>
              <Text style={styles.btnLabel}>Ver más..</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <Skeleton />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    padding: 20,
    paddingBottom: 20,
  },
  grap: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  images: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 16,
    lineHeight: 16,
    width: Common.width - (60 + imageWidth),
    textTransform: 'capitalize',
    fontFamily: roboto.regular,
    marginLeft: 10,
  },
  btnGrap: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: Common.width - 40,
    marginTop: 10,
  },
  btnLabel: {
    fontSize: 16,
    lineHeight: 16,
    color: 'rgba(0,0,0,.5)',
    fontFamily: roboto.bold,
  },
});
