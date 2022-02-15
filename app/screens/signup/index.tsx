import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar, FlatList} from 'react-native';

import * as Common from 'common';
import {RouteParams} from './types';
import {logEvent} from 'analitycs';
import {InitialScreenEvents} from 'analitycs/events';
/**
 * Redux
 */
import {updateUser} from 'redux/slices/userSlice';
import {useAppDispatch} from 'redux/hooks';
/**
 * Screens
 */
import InitialScreen from './screens/initial';
import SecondRoute from './screens/second';
import ThirdRoute from './screens/third';
import FourthRoute from './screens/fourth'; 
import FifthRoute from './screens/fifth';
import SixthRoute from './screens/sixth';
import FinalRoute from './screens/final';

const routes = [1, 2, 3, 4, 5, 6, 7];

export default function CreateAccount({route}: RouteParams) {
  const {name, id, img, email} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useAppDispatch();
  const flatList = useRef<FlatList>(null);

  useEffect(() => {
    dispatch(
      updateUser({
        name,
        id,
        img,
        email,
      }),
    );
    logEvent(InitialScreenEvents.create_account_screen_visited);
  }, []);

  useEffect(() => {
    if (flatList.current) {
      flatList.current.scrollToIndex({index: currentIndex});
    }
  }, [currentIndex]);

  function renderScreen(item: number): JSX.Element {
    if (item === 1)
      return <InitialScreen callback={() => setCurrentIndex(1)} />;
    else if (item === 2)
      return (
        <SecondRoute numberOfPages={5} callback={() => setCurrentIndex(2)} />
      );
    else if (item === 3)
      return (
        <ThirdRoute numberOfPages={5} callback={() => setCurrentIndex(3)} />
      );
    else if (item === 4)
      return (
        <FourthRoute numberOfPages={5} callback={() => setCurrentIndex(4)} />
      );
    else if (item === 5)
      return (
        <FifthRoute numberOfPages={5} callback={() => setCurrentIndex(5)} />
      );
    else if (item === 6)
      return (
        <SixthRoute numberOfPages={5} callback={() => setCurrentIndex(6)} />
      );
    else {
      return <FinalRoute />;
    }
  }

  return (
    <View style={styles.mainGrap}>
      <StatusBar
        translucent={false}
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      <FlatList
        ref={flatList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        removeClippedSubviews={true}
        pagingEnabled={true}
        data={routes}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        scrollEventThrottle={16}
        renderItem={({item, index}) => renderScreen(item)}
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => ({
          length: Common.width,
          offset: Common.width * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainGrap: {
    flex: 1,
  },
});
