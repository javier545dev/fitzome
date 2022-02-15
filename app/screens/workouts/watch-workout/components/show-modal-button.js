import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

import { helvetica, colors } from '../../../../styles/';

import Icon from 'react-native-vector-icons/Ionicons';

export default ({ showModal }) => {

    return(
        <TouchableNativeFeedback onPress={()=> showModal()}>
            <View style={styles.mainGrap}>
                <Text style={styles.label}>Información importante</Text>
                <Icon size={24} color={'black'} name={'information-circle-outline'}/>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    mainGrap:{
        marginTop:20,
        padding:20, 
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderTopColor: colors.backgroundGray,
        borderTopWidth: 1,
    },
    label:{
        fontSize:18,
        lineHeight: 18, 
        color:'black', 
        fontFamily: helvetica.bold,
    },
});