import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';

//import { showToast, } from '../../../global';
import {smoothies} from '../../../resources/data/recipes';
import {tips} from '../../../resources/data/tips';
//import { helvetica } from '../../styles/';

//import database from '@react-native-firebase/database';
import Header from '../../components/ScreensMainHeader';
import Nav from '../../components/main-nav';
import TransparentStatusBar from '../../components/CustomStatusbar';
import RecipeCarousel from './components/carousel';
import TipsCarousel from './components/tips-carousel';
import FollowBox from './components/follow-box';

const page = 'FEED';

export default () => {
  const [connexion, setInternetConnexion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [render, renderItems] = useState(false);

  useEffect(() => {
    console.log(`%c 🏁init ${page}`, 'color: blue');

    return () => {
      console.log(`%c 🚀Quit ${page}`, 'color: blue');
    };
  }, []);

  //console.log(`%c ♻ render was called on page ${page}`, 'color: green');

  return (
    <View style={styles.mainContainer}>
      <TransparentStatusBar color={'white'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={'Inicio'} label={''} />
        <TipsCarousel label={'Consejos y tips'} data={tips} />
        <RecipeCarousel label={'Licuados y Batidos'} data={smoothies()} />
        {/* <RecipeCarousel label={'Comidas'} data={lunch()}/> */}
        <FollowBox />
        <View style={{width: Dimensions.get('window').width, height: 60}} />
      </ScrollView>
      <Nav active={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    marginRight: 5,
    backgroundColor: 'black',
    elevation: 4,
    borderRadius: 8,
  },
});

//user_info={_USER_INFO_}
