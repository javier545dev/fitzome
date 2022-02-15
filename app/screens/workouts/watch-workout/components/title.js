import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import { helvetica, colors } from '../../../../styles/';

export default ({ title }) => {

    // function capitalize(str){
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // }

    return(
        <View style={styles.mainGrap}>
            <Text style={styles.title}>{ title }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainGrap:{
        padding:20, 
        paddingBottom: 30, 
        paddingTop: 30, 
    },
    title:{
        fontSize: 24,
        lineHeight: 24,
        color:'black',
        fontFamily: helvetica.extra_bold, 
        letterSpacing:-1,
        textTransform: 'uppercase',
    },
});