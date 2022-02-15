import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';

import { roboto, colors } from '../../../../styles/';
import { createWarmup,  getWarmUpDescription } from '../../actions';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

//const { width } = Dimensions.get('window');

export default ({ type }) => {

    const [warmup, setWarmup] = useState([]);
    const navigation = useNavigation();
    const warmupName = type === 'full' ? 'Calentamiento general' :
                       type === 'lower' ? 'Calentamiento de miembros inferiores' : 'Calentamiento de miembros superiores';
    const description = getWarmUpDescription(type, warmupName);

    useEffect(()=>{
        const _warmup = createWarmup(type);
        setWarmup(_warmup); 
    },[]);

    return(
        <TouchableOpacity onPress={()=> navigation.navigate('WatchWorkout', { 
            sets: JSON.stringify(warmup), title: warmupName, 
            workout_description: description, type: 'warmup', workoutKey: 'warmup',
            level: 2, user: {}, 
        })}>
            <View style={styles.grap}>
                <Text style={styles.label}>Calentamiento recomendado</Text>
                <Icon size={26} name={'chevron-forward-outline'} color={'black'}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    grap:{
        //backgroundColor: '#f3f3f3',
        padding:20, 
        borderRadius:8, 
        marginBottom:20, 
       // marginLeft:20, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // borderColor: colors.backgroundGray,
        // borderWidth:1,
    },
    label:{
        fontSize: 16,
        fontFamily: roboto.medium,
        color:'black',
    },
});