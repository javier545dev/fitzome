import * as React from 'react';
import { FlatList, View } from 'react-native';

import { ExerciseInterface } from '@resources/data/exercises';
import Skeleton from './DownloadExercisesCarousel';
import Exercise from './DownloadExercise';

interface Props {
  loading: boolean;
  exercises: ExerciseInterface[];
}

interface ItemProps {
  item: ExerciseInterface;
  index: number;
}

export default function ExercisesCarousel({ exercises, loading }: Props) {
  const Exercises = ({ item, index }: ItemProps) => (
    <Exercise key={index} item={item} />
  );
  return (
    <>
      {loading === false ? (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={exercises}
          maxToRenderPerBatch={4}
          scrollEventThrottle={16}
          scrollEnabled={true}
          removeClippedSubviews={true}
          renderItem={Exercises}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <View style={{ width: 20, height: 40 }} />}
          ListFooterComponent={() => <View style={{ width: 10, height: 40 }} />}
        />
      ) : (
        <Skeleton />
      )}
    </>
  );
}
