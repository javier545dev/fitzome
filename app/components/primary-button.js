import React from 'react';
import {View, TouchableNativeFeedback, Text, Dimensions, ActivityIndicator} from 'react-native';

import { helvetica } from '../styles/';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');
const buttonWidth = width-40;

export default ({ action, loading, }) => {
     
    return(
        <LinearGradient 
            colors={['rgba(22,22,22,0)','rgba(22,22,22,1)', 'rgba(22,22,22,1)']}
            style={{position:'absolute', bottom:0, left:0, width, height:70, alignItems:'center', paddingBottom:10}}
        >
            <TouchableNativeFeedback onPress={ action }>
              <View style={{backgroundColor: 'white',  borderRadius:30,
              height:60, alignItems:'center', justifyContent:'center', width: buttonWidth,}}>
                {loading ?
                  <ActivityIndicator size={'large'} color={'black'}/>
                  :
                  <Text style={{color:'black', fontSize:18, fontFamily: helvetica.bold,}}>
                    {'Comenzar plan'} 
                  </Text>
                }
                
              </View>
            </TouchableNativeFeedback>
        </LinearGradient>
    )
}