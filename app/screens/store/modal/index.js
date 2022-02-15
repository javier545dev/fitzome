import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  Pressable,
  Linking,
  TouchableOpacity,
} from 'react-native';

import {logEvent} from 'common';
import {roboto, colors} from '../../../styles';
import {plansUrls} from '../../../../resources/data/images';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import Benefits from '../components/benefits';
import Weeks from '../components/weeks';
import Prices from '../components/prices';
import RegularPrice from '../components/regular-price';
import HowWorks from '../components/how-it-works';

const {width, height} = Dimensions.get('window');

export default ({route}) => {
  const {user} = route.params;
  const imageUrl = user.gender === 1 ? 'custom_plan_m' : 'custom_plan_w';
  const navigation = useNavigation();

  useEffect(() => {
    logEvent('buy_modal_whatched');
  }, []);

  function goToAsessor() {
    Linking.canOpenURL('');
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} />
      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={1}>
        <View>
          <Image
            source={plansUrls[imageUrl]}
            style={{
              width: width,
              height: width * 0.8,
              backgroundColor: 'white', 
            }}
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,.6)',
              'rgba(0,0,0,1)',
              'rgba(0,0,0,1)',
            ]}
            style={styles.titleGrap}>
            <Text style={styles.title}>{'cumple'}</Text>
            <Text style={styles.title}>{'tus metas!'}</Text>
          </LinearGradient>
        </View>
        <View
          style={{
            backgroundColor: 'orange',
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}>
          <Text
            style={{color: 'white', fontSize: 16, fontFamily: roboto.regular}}>
            Obtén 50% de descuento en tu primer plan de entrenamiento
          </Text>
        </View>
        <View>
          <Text style={styles.description}>
            Alcanza tus objetivos con la ayuda de un entrenador profesional.
          </Text>
        </View>
        <Benefits />

        <Weeks />
        <RegularPrice price={195} weeks={4} />
        <Prices price={195} discount={50} weeks={4} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Pay_Screen', {
              user,
              price: 195,
              discount: 50,
              weeks: 4,
            })
          }>
          <View style={styles.mainBtn}>
            <Text style={styles.mainBtnLabel}>Comenzar plan</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'rgba(250,250,250,.7)'}}>
            ¿Tienes preguntas?
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://api.whatsapp.com/send?phone=523328151666&text=Hola!`,
            )
          }>
          <View style={styles.secondaryBtn}>
            <Icon name={'logo-whatsapp'} size={20} color={'black'} />
            <Text style={styles.secondaryBtnLabel}>Habla con un asesor</Text>
          </View>
        </TouchableOpacity>
        <HowWorks />
      </ScrollView>
      <View style={styles.grap}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.backBtn}>
            <Icon size={30} color={'black'} name={'close-outline'} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  description: {
    fontSize: 20,
    fontFamily: roboto.regular,
    color: 'white',
    padding: 20,
    paddingTop: 0,
    textAlign: 'left',
    paddingBottom: 0,
  },
  grap: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: StatusBar.currentHeight,
    zIndex: 1,
  },
  backBtn: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
  },
  video: {
    width,
    height: height + StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 34,
    fontFamily: roboto.black,
    textAlign: 'left',
    lineHeight: 34,
    textTransform: 'uppercase',
  },
  titleGrap: {
    width: width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 20,
  },
  mainBtn: {
    backgroundColor: colors.primary_blue,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
    marginLeft: 20,
    borderRadius: 8,
  },
  secondaryBtn: {
    backgroundColor: '#f3f3f3',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
    marginLeft: 20,
    borderRadius: 8,
    flexDirection: 'row',
  },
  secondaryBtnLabel: {
    color: 'black',
    fontSize: 18,
    fontFamily: roboto.regular,
    paddingLeft: 10,
  },
  mainBtnLabel: {
    color: 'white',
    fontSize: 18,
    fontFamily: roboto.medium,
  },
});
