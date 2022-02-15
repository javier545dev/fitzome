import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  StatusBar,
  Animated,
  Image,
} from 'react-native';

// import { logEvent, showToast, } from '../../docs';
import * as Common from 'common';
import {helvetica} from '../../styles/';
import {recipes} from '../../../resources/data/recipes';
import {recipesUrls} from '../../../resources/data/images';

const page = 'Article';
const {height: h, width} = Dimensions.get('window');
const height = width - StatusBar.currentHeight;
let ANIMATED = false;
const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
/*
 */
export default ({route}) => {
  const {key, imageId} = route.params;
  const recipe = getRecipe(key);
  const {url, title} = recipe;
  const barColorAnim = useRef(new Animated.Value(0)).current;
  const barColor = barColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(250,250,250,0)', 'rgba(250,250,250,1)'],
  });

  useEffect(() => {
    console.log(`%c 🏁init ${page}`, 'color: blue');
    Common.logEvent('recipe_watched');
    return () => {
      ANIMATED = false;
      console.log(`%c 🚀Quit ${page}`, 'color: blue');
    };
  }, []);

  function getRecipe(k) {
    for (let i = 0; i < recipes.length; i++) {
      const element = recipes[i];
      if (k === element.key) return {...element};
    }
  }

  const _onScroll = value => {
    const y = value.y;
    if (y > height && ANIMATED === false) {
      ANIMATED = true;
      Animated.timing(barColorAnim, {
        useNativeDriver: false,
        duration: 10,
        toValue: 1,
      }).start();
    }

    if (y < height && ANIMATED === true) {
      ANIMATED = false;
      Animated.timing(barColorAnim, {
        useNativeDriver: false,
        duration: 10,
        toValue: 0,
      }).start();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <AnimatedStatusBar
        animated={true}
        backgroundColor={barColor}
        barStyle={'dark-content'}
        translucent={true}
      />

      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        onScroll={x => _onScroll(x.nativeEvent.contentOffset)}
        showsVerticalScrollIndicator={false}>
        <Image
          style={{width, height, backgroundColor: 'white'}}
          source={recipesUrls[imageId]}
        />
        <View style={{paddingBottom: 40}}>
          <Text style={styles.title} numberOfLines={3} ellipsizeMode={'clip'}>
            {`${title}`}
          </Text>
          <View>
            <Text style={styles.description}>{recipe.description}</Text>
            <View style={styles.nutriments}>
              <View style={styles.nutriment}>
                <Text style={styles.nutriment_quantity}>
                  {recipe.nutriments.calories}
                </Text>
                <Text>{'Calorías'}</Text>
              </View>
              <View style={styles.nutriment}>
                <Text style={styles.nutriment_quantity}>{`${
                  recipe.nutriments.protein
                } g`}</Text>
                <Text>{'Proteínas'}</Text>
              </View>
              <View style={styles.nutriment}>
                <Text style={styles.nutriment_quantity}>{`${
                  recipe.nutriments.carbs
                } g`}</Text>
                <Text>{'Carbohi..'}</Text>
              </View>
              <View style={styles.nutriment}>
                <Text style={styles.nutriment_quantity}>{`${
                  recipe.nutriments.fat
                } g`}</Text>
                <Text>{'Grasa'}</Text>
              </View>
            </View>
            <Text style={styles.label}>Ingredientes</Text>
            {recipe.ingredients.map((ing, i) => (
              <View
                key={i}
                style={[
                  styles.ingredient,
                  {backgroundColor: i % 2 === 0 ? 'white' : '#fafafa'},
                ]}>
                <Text style={[styles.ingredient_quantity, {width: 100}]}>
                  {ing.quantity}
                </Text>
                <Text style={[styles.ingredient_name, {width: width - 140}]}>
                  {ing.name}
                </Text>
              </View>
            ))}
            <Text style={styles.label}>Preparación</Text>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              {recipe.steps.map((step, i) => (
                <View key={i} style={{flexDirection: 'row', marginBottom: 15}}>
                  <View style={styles.circle}>
                    <Text style={styles.circle_label}>{i + 1}</Text>
                  </View>
                  <Text style={[styles.step, {width: width - 75}]}>
                    {step.trim()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  step: {
    fontSize: 16,
    fontFamily: helvetica.regular,
    paddingLeft: 10,
  },
  circle_label: {
    fontSize: 11,
    fontFamily: helvetica.bold,
    color: 'white',
  },
  circle: {
    width: 22,
    height: 22,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  ingredient_name: {
    fontSize: 16,
    fontFamily: helvetica.regular,
    textAlign: 'left',
  },
  ingredient_quantity: {
    fontSize: 16,
    fontFamily: helvetica.bold,
    textAlign: 'right',
    paddingRight: 20,
  },
  ingredient: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: 'black',
    padding: 20,
    fontFamily: helvetica.bold,
  },
  nutriments: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  nutriment_quantity: {
    fontSize: 16,
    color: 'black',
    fontFamily: helvetica.bold,
  },
  nutriment_label: {
    fontSize: 13,
    color: 'black',
    fontFamily: helvetica.regular,
  },
  nutriment: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    color: 'black',
    fontFamily: helvetica.bold,
    fontSize: 24,
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: 'black',
    fontFamily: helvetica.regular,
    textAlign: 'justify',
    padding: 20,
    paddingTop: 0,
  },
});

// function checkInternetConnexion(){
//     NetInfo.fetch().then(state => {
//       if(state.isConnected && state.isInternetReachable){
//         getRecipe();
//       }else{
//         setInternetConnexion(!connexion);
//       }
//     });
// }

// function getRecipe(){
//     const ref = database().ref(`users/${user}/recipes/${value.key}/`);
//     ref.once('value').then(snapshot => {
//       const result =  snapshot.val();
//       if(result){
//           setRecipe(result);
//       }
//     });
// }
