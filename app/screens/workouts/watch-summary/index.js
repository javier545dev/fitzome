import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {logEvent} from 'common';
import {roboto} from '../../../styles';
import {exercisesUrls} from '../../../../resources/data/images';

import SubHeader from '../../../components/sub-header-left';

const {width} = Dimensions.get('window');

export default ({route}) => {
  const {sets} = route.params;
  const rounds = JSON.parse(sets);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //const page = 'watch summary';

    logEvent('workout_summary_watched');
    //setTimeout( ()=> setLoading(false) ,900);

    return () => {
      //console.log(`%c 🚀Quit ${page}`, 'color: blue')
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.statusbarSubGrap} />
      <SubHeader title={'Resumen'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        style={{padding: 20}}>
        {loading
          ? null
          : rounds.map((round, r) => {
              return (
                <View key={r}>
                  <Text style={styles.label}>{`Ronda ${r + 1}/${
                    rounds.length
                  }`}</Text>
                  {round.map((val, i) => {
                    const url = val.url
                      .split('exercises%2F')[1]
                      .split('.mp4')[0];
                    const side =
                      val.side === 'left'
                        ? 'izquierda'
                        : val.side === 'right'
                        ? 'derecha'
                        : '';
                    const volumeType = val.volume === 1 ? 'x' : 's';
                    const volume = `${val.volume_amount}${volumeType}`;
                    return (
                      <View style={styles.grap} key={i}>
                        <Image
                          source={exercisesUrls[url]}
                          style={styles.images}
                        />
                        <Text style={styles.name} numberOfLines={2}>
                          {`${volume} ${val.name} ${side}`}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
        <View style={{height: 40, width: 100}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusbarSubGrap: {
    width,
    height: StatusBar.currentHeight + 55,
  },
  grap: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  images: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 16,
    lineHeight: 16,
    width: width - (60 + width * 0.18),
    textTransform: 'capitalize',
    fontFamily: roboto.regular,
    marginLeft: 10,
  },
  label: {
    fontFamily: roboto.medium,
    fontSize: 18,
    lineHeight: 18,
    padding: 20,
    paddingLeft: 0,
  },
});
