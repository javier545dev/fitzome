import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  ScrollView,
  Image,
} from 'react-native';

import {logEvent, showToast} from 'common';
import {articlesUrls} from '../../../resources/data/images';
import {tips} from '../../../resources/data/tips';
import {helvetica} from '../../../app/styles/';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
//import SubHeader from 'components/sub-header';
//import Ad from '../../components/ads/Ad-Banner';

//const page = 'Article';
const {width} = Dimensions.get('window');
const height = Math.round(width - StatusBar.currentHeight);

let ANIMATED = false;
const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);

//random

export default ({route}) => {
  const navigation = useNavigation();
  const {key, imageId} = route.params;
  const article = getArticle(key);
  const {title, text, img} = article;
  const content = text.split('</>');
  const ANIMATED_HEIGHT = useRef(new Animated.Value(0)).current;
  const barColorAnim = useRef(new Animated.Value(0)).current;
  const barColor = barColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(250,250,250,0)', 'rgba(250,250,250,1)'],
  });

  let SCROOLVIEW = useRef(null);

  useEffect(() => {
    //console.log(`%c 🏁init ${page}`, 'color: blue');

    logEvent(`article_readed`);

    return () => {
      ANIMATED = false;
      //console.log(`%c 🚀Quit ${page}`, 'color: blue')
    };
  }, []);

  function getArticle(k) {
    for (let i = 0; i < tips.length; i++) {
      const element = tips[i];
      if (element.key === k) return {...element};
    }
  }

  let opacity = ANIMATED_HEIGHT.interpolate({
    inputRange: [0, height],
    outputRange: [1, 0],
  });

  const _onScroll = value => {
    const y = value.y;
    const downLimit = width - StatusBar.currentHeight;
    if (y > downLimit && ANIMATED === false) {
      ANIMATED = true;
      animateStatusBar(1);
    }
    if (y < downLimit && ANIMATED === true) {
      ANIMATED = false;
      animateStatusBar(0);
    }
  };

  function animateStatusBar(toValue) {
    Animated.timing(barColorAnim, {
      useNativeDriver: false,
      duration: 10,
      toValue,
    }).start();
  }

  //console.log(`%c ♻ render was called on page ${page}`, 'color: green');

  return (
    <View style={styles.mainContainer}>
      <AnimatedStatusBar
        animated={true}
        backgroundColor={barColor}
        barStyle={'dark-content'}
        translucent={true}
      />

      <ScrollView
        ref={SCROOLVIEW}
        style={StyleSheet.absoluteFill}
        onScroll={({nativeEvent}) => _onScroll(nativeEvent.contentOffset)}
        showsVerticalScrollIndicator={false}>
        <Image style={styles.image} source={articlesUrls[imageId]} />

        <View
          style={{
            position: 'absolute',
            left: 10,
            top: StatusBar.currentHeight + 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Icon size={25} color={'white'} name={'arrow-back-outline'} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={{fontSize: 34, padding: 20, paddingBottom: 30}}>
          {title}
        </Text>

        <View style={{padding: 20, paddingTop: 0}}>
          {content.map((v, i) => (
            <Text key={i} style={[styles.text]}>
              {v.trim()}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width,
    height,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  sectionGrap: {
    padding: 20,
    paddingTop: 0,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: helvetica.regular,
    textAlign: 'justify',
    lineHeight: 20,
    paddingBottom: 10,
  },
  label: {
    fontSize: 18,
    color: 'black',
    paddingBottom: 10,
    paddingTop: 10,
    fontFamily: 'Roboto-Medium',
  },
});
