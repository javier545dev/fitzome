import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
} from 'react-native';

import * as Common from 'common';
import { roboto } from 'styles';
import { Video } from 'expo-av';
import { exercisesUrls } from '../../../../../resources/data/images';
import ProgressLines from './ProgressLines';
import RepsCounter from './RepsCounter';
import { ExerciseInterface } from '@resources/data/exercises';

interface Props {
  exercise: ExerciseInterface,
  totalOfExercises: number[],
  next: string;
  currentExerciseNumber: number;
}

const height = Common.height + (StatusBar.currentHeight ?? 0);

export default function DoExercise({ exercise, next, totalOfExercises, currentExerciseNumber }: Props) {

  const { url, name, side } = exercise;

  const thumb = url.split('exercises%2F')[1].split('.mp4')[0];
  const nextExercise = next.includes('Último ejercicio')
    ? next
    : `Siguiente: ${next}`;
  const exerciseName =
    side === 'both'
      ? name
      : side === 'left'
        ? name.concat(' - izquierda')
        : name.concat(' - derecha');

  // function onPlaybackStatusUpdate(playbackStatus: any) {
  //   console.log(playbackStatus)
  // }

  return (
    <View style={styles.mainContainer}>
      {exercise.video ? (
        <Video
          style={styles.video}
          source={{ uri: exercise.video, }}
          resizeMode={'cover'}
          isLooping
          shouldPlay
          isMuted
        //useNativeControls
        // onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
      ) : (
        <View>
          <Image source={exercisesUrls[thumb]} style={styles.image} />
        </View>
      )}

      <View style={styles.infoGrap}>
        <RepsCounter
          volume={exercise.volume_amount}
          type={exercise.volume}
          name={exerciseName}
          nextExercise={next}
        />
        <Text style={styles.name} numberOfLines={3}>
          {exerciseName}
        </Text>
        <Text style={styles.next} numberOfLines={1}>
          {nextExercise}
        </Text>
        <ProgressLines totalOfExercises={totalOfExercises} current={currentExerciseNumber} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
    width: Common.width,
    height,
  },
  name: {
    fontSize: 26,
    width: Common.width - 160,
    fontFamily: roboto.bold,
    textTransform: 'capitalize',
    paddingBottom: 10,
  },
  next: {
    fontFamily: roboto.regular,
    fontSize: 16,
    color: 'rgba(0,0,0,.7)',
    paddingBottom: 10,
    textTransform: 'capitalize',
    width: Common.width - 160,
  },
  infoGrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 20,
  },
  video: {
    backgroundColor: 'white',
    width: Common.width,
    height,
  },
  image: {
    width: Common.width,
    height,
  },
});
