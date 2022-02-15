import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import { roboto } from '../../app/styles/';
 
export default ({ title, label, }) => (
  <View style={[styles.mainContainer,]}>     
    <Text style={styles.title}>{ title }</Text>
    <Text style={styles.label}>{ label }</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    padding:20,
  },
  title:{
      fontSize: 22,
      lineHeight: 22,
      color: 'black',
      fontFamily: roboto.medium,
  },
  label:{
    fontFamily: roboto.regular, 
    paddingTop:10, 
    fontSize:16, 
    lineHeight:20,
    color:'rgba(0,0,0,.5)',
  }
});


