import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import { roboto } from '../../../../styles/';

export default ({ text }) => (

    <View style={styles.mainGrap}>
        <Text style={styles.text}>{ text }</Text>
    </View>

);

const styles = StyleSheet.create({
    mainGrap:{
        padding:20, 
    },
    text:{
        fontSize:18, 
        lineHeight:24, 
        fontFamily: roboto.regular, 
    },
});