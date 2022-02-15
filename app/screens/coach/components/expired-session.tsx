import React from 'react';
import { Dimensions, View, StyleSheet, } from 'react-native';

import { roboto, } from '@styles/index';

const { width } = Dimensions.get('window');

export default () => {

    return(
            <View style={{marginBottom:20, }}>
                {/* <Text style={styles.actLabel}>{'Esta sesión de entrenamiento ya expiró '}</Text> */}
                {/* <View style={styles.workout}/> */}
            </View>
    );
}

const styles = StyleSheet.create({
    actLabel:{
        fontSize:16,
        fontFamily: roboto.medium,
        color:'black',
        marginBottom:10,
    },
    workout:{
        width: width -40,
        height: (width-40)*.8,
        backgroundColor:'#f3f3f3',
        borderRadius: 16,
    },
});
