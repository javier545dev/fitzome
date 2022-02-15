import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { helvetica, colors } from '../../../styles';

export default ({ label }) => (
    <View style={styles.grap}>
        <Text style={styles.label}>{ label }</Text>
    </View>
);


const styles = StyleSheet.create({
    grap:{
        padding:20,
        paddingTop:10, 
        // borderTopColor: colors.backgroundGray,
        // borderTopWidth: 1, 
    },
    label:{
        fontFamily: helvetica.bold,
        fontSize: 18,
        color:'black',
        lineHeight:18,
        textTransform: 'capitalize',
    }
});