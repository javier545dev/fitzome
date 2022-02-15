import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Dimensions, Text } from 'react-native';

import { roboto, colors } from 'styles';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window'); 

type Props = {
  active: number;
}

export default ({ active }: Props ) => {

    const navigation = useNavigation();

    return(
      <View style={styles.mainContainer}>

          <TouchableNativeFeedback onPress={() =>  navigation.navigate('Home')}>
              <View style={styles.btn}>
                  <Icon name={active === 1 ? "reader" : "reader-outline"} size={25} color="black" />
                  <Text style={styles.smallLabel}>Inicio</Text>
              </View>
          </TouchableNativeFeedback>

         
          <TouchableNativeFeedback onPress={() => navigation.navigate('Workouts')}>
              <View style={styles.btn}>
                <Icon name={active === 2 ? "ios-stopwatch" : "ios-stopwatch-outline"} size={25} color="black" />
                <Text style={styles.smallLabel} numberOfLines={1}>Entrenamientos</Text> 
              </View>            
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.navigate('Coach')}>
              <View style={styles.btn}>
                <Icon name={active === 3 ? "md-file-tray" : "md-file-tray-outline"} size={25} color="black" />
                <Text style={styles.smallLabel} numberOfLines={1}>Coach</Text>
              </View> 

          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.navigate('Programs')}>
              <View style={styles.btn}>
                <Icon name={active === 4 ? "clipboard" : "clipboard-outline"} size={25} color="black" />
                <Text style={styles.smallLabel} numberOfLines={1}>Programas</Text>
              </View> 
          </TouchableNativeFeedback>


          <TouchableNativeFeedback onPress={() => navigation.navigate('Account')}>
              <View style={styles.btn}>
                <Icon name={active === 5 ? "ios-person" : "ios-person-outline"} size={25} color="black" />
                <Text style={styles.smallLabel} numberOfLines={1}>Perfil</Text>
              </View> 
          </TouchableNativeFeedback>

      </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    position:'absolute',
    bottom:0,
    left:0,
    height:60,
    zIndex:100,
    width,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    borderTopWidth:1,
    borderTopColor: colors.backgroundGray,
  },
  smallLabel:{
    fontSize:10,
    lineHeight:16,
    fontFamily: roboto.regular,
  },  
  btn:{
      height: 60,
      width: width/5,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'white'
  },
});
