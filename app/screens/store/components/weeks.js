import React from 'react';
import { StyleSheet, Text, View, Dimensions, } from 'react-native';

import { roboto, colors, } from '../../../styles';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default () => (
   <View style={{ justifyContent:'center', alignItems:'center', paddingBottom:20, }}>
        <Text style={styles.label}>4 semanas</Text>
   </View>
 );

 const styles = StyleSheet.create({
   label:{
        fontSize:18, 
        fontFamily: roboto.bold, 
        color:'white',
        textTransform:'uppercase',
        borderBottomColor:'white',
        borderBottomWidth:2,
        padding:10, 
    }
  });