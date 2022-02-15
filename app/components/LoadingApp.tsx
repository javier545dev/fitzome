import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import {colors} from 'styles'

export default function LoadingApp(){
    return(
        <View style={styles.grap}>
            <ActivityIndicator color={colors.primary} size={'large'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    grap:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
});